const express = require('express'); // 引入 Express 框架
const router = express.Router(); // 创建一个路由实例
const url = require("url"); // 引入 URL 模块
const sqlConnect = require("./sqlConnect"); // 引入自定义的数据库连接模块
const jsonwebtoken = require("jsonwebtoken"); // 引入 jsonwebtoken 模块用于生成和验证 token
const jsonwebtokenSecret = require("./jsonwebtokenSecret.js"); // 引入 token 的密钥配置
const multer = require("multer"); // 引入 multer 模块用于文件上传
const path = require("path");
// 配置文件上传存储路径和文件名
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 文件存储目录
    },
    filename: (req, file, cb) => {
        // 获取文件扩展名
        const ext = path.extname(file.originalname).toLowerCase();
        // 生成安全的文件名
        const timestamp = Date.now();
        const randomNum = Math.round(Math.random() * 1E9);
        // 使用更简单的命名方式
        const safeFilename = `img_${timestamp}_${randomNum}${ext}`;
        cb(null, safeFilename);
    }
});
const upload = multer({ storage: storage });

/**
 * 文件上传接口
 */
router.post('/uploads', upload.single('file'), (req, res) => {
    console.log('收到上传请求');
    console.log('文件信息:', req.file);
    console.log('表单数据:', req.body);

    if (!req.file) {
        return res.status(400).send({
            status: 400,
            message: '没有文件被上传'
        });
    }

    // 获取额外参数
    const { productId, productName, price, introduce, productType } = req.body;
    console.log('解析参数:', { productId, productName, price, introduce, productType });

    // 文件信息
    const fileInfo = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype
    };

    // 如果提供了产品ID，则更新现有产品
    if (productId) {
        console.log('更新产品图片,产品ID:', productId);
        /**
         * 
         * ！！！！！更新指定产品的image字段
         * 
         */
        const sql = `UPDATE picture SET image = ? WHERE id = ?`;
        const params = [fileInfo.path, productId];
        console.log('执行SQL:', sql, '参数:', params);

        sqlConnect(sql, params, result => {
            console.log('SQL执行结果:', result);
            if (result.affectedRows > 0) {
                res.send({
                    status: 200,
                    message: '文件上传成功并更新产品图片',
                    data: {
                        ...fileInfo,
                        productId: productId
                    }
                });
            } else {
                res.status(500).send({
                    status: 500,
                    message: '文件上传成功但更新产品失败，可能产品ID不存在'
                });
            }
        });
    }
    // 如果提供了产品名称、价格和类型，则创建新产品
    else if (productName && price && productType) {
        console.log('创建新产品:', { productName, price, introduce, productType });

        // 根据类型确定目标表
        let targetTable;
        switch (productType) {
            case 'fishtool':
                targetTable = 'fishtool';
                break;
            case 'freshwaterfish':
                targetTable = 'freshwaterfish';
                break;
            case 'saltwaterfish':
                targetTable = 'saltwaterfish';
                break;
            default:
                targetTable = 'fishtool'; // 默认表
        }

        // 插入新产品记录
        const sql = `INSERT INTO ${targetTable} (name, price, image, introduce) VALUES (?, ?, ?, ?)`;
        const params = [productName, price, fileInfo.path, introduce || ''];
        console.log('执行SQL:', sql, '参数:', params);

        sqlConnect(sql, params, result => {
            console.log('SQL执行结果:', result);
            if (result.affectedRows > 0) {
                res.send({
                    status: 200,
                    message: '文件上传成功并创建新产品',
                    data: {
                        ...fileInfo,
                        productId: result.insertId,
                        productName: productName,
                        price: price,
                        introduce: introduce || '',
                        productType: productType // 添加productType到返回数据
                    }
                });
            } else {
                res.status(500).send({
                    status: 500,
                    message: '文件上传成功但创建产品失败'
                });
            }
        });
    }
    // 仅上传文件，不关联到数据库记录
    else {
        console.log('仅上传文件，不关联数据库');
        res.send({
            status: 200,
            message: '文件上传成功',
            data: fileInfo
        });
    }
});
/**
 * 用户登录接口
 */
router.post("/login", (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;
    // 查询数据库，检查用户名和密码是否匹配
    const sql = `select * from user where username = ? and password = ?`;

    // 执行 SQL 查询
    sqlConnect(sql, [username, password], result => {
        if (result.length > 0) {
            /**
             * 生成 token：用于前后端登录状态验证
             * token 中包含用户的基本信息（id、username、permission）
             * 设置 token 有效期为 7 天
             */
            const expiresInSeconds = 7 * 24 * 60 * 60; // 7 天的秒数
            const token = jsonwebtoken.sign({
                id: result[0].id,
                username: result[0].username,
                permission: result[0].permission
            }, jsonwebtokenSecret.secret, {
                expiresIn: expiresInSeconds
            }); // 使用密钥加密生成带过期时间的 token

            // 计算过期时间的时间戳（毫秒）
            const expiresAt = Date.now() + expiresInSeconds * 1000;

            // 登录成功，返回用户信息、token 以及有效期信息
            res.send({
                status: 200,
                username: result[0].username,
                permission: result[0].permission,
                token,
                expiresIn: expiresInSeconds,
                expiresAt
            });
        } else {
            // 用户名或密码错误，返回错误信息
            res.send({
                status: 500,
                msg: "用户名或密码错误"
            });
        }
    });
});
/**
 * 用户注册接口
 */
router.post("/register", (req, res) => {
    const { username, password, phone, email } = req.body;
    const sql = `insert into user (username, password, phone, email, permission) values (?, ?, ?, ?, 'vip')`;
    sqlConnect(sql, [username, password, phone, email], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "注册成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "注册失败"
            });
        }
    });
});
/**
 * 获取logo信息接口
 */
router.get("/logo", (req, res) => {
    const sql = "select * from picture";
    sqlConnect(sql, [], result => {
        res.send({
            status: 200,
            data: result[0]
        });
    });
});
/**
 * 获取优惠券信息接口
 */
router.get("/discount", (req, res) => {
    const sql = `select * from discount`;
    sqlConnect(sql, [], result => {
        res.send({
            status: 200,
            data: result
        });
    });
})
/**
 * 获取商品分类接口
 */
router.get("/category", (req, res) => {
    const sql = `select * from category`;
    sqlConnect(sql, [], result => {
        res.send({
            status: 200,
            data: result
        });
    });
})
/**
 * 热销推荐接口
 */
router.get("/hotProducts", (req, res) => {
    const freshwaterfishSql = `select * from freshwaterfish limit 4, 4`;
    const saltwaterfishSql = `select * from saltwaterfish limit 4, 5`;
    // 执行淡水生物查询
    sqlConnect(freshwaterfishSql, [], freshwaterResult => {
        // 执行海水生物查询
        sqlConnect(saltwaterfishSql, [], saltwaterResult => {
            res.send({
                status: 200,
                data: {
                    freshwaterfish: freshwaterResult,
                    saltwaterfish: saltwaterResult
                }
            });
        });
    });
})
/**
 * 新品上市接口 - 分别获取第一条和其他四条数据
 */
router.get("/newProducts", (req, res) => {
    // 获取第一条数据
    const firstSql = `select * from freshwaterfish order by id desc limit 1`;
    // 获取其余五条数据
    const otherSql = `select * from saltwaterfish order by id desc limit 5`;

    sqlConnect(firstSql, [], firstResult => {
        sqlConnect(otherSql, [], otherResult => {
            res.send({
                status: 200,
                data: {
                    firstProduct: firstResult[0] || null,
                    otherProducts: otherResult
                }
            });
        });
    });
})
/**
 * 获取页脚信息
 */
router.get("/footer", (req, res) => {
    const sql = `select * from footer`;
    sqlConnect(sql, [], result => {
        res.send({
            status: 200,
            data: result
        })
    })
})
/**
 * 淡水生物 
 */
router.get("/freshwaterfish", (req, res) => {
    // 分页处理
    const page = parseInt(url.parse(req.url, true).query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量

    // 查询语句：每次获取10条数据，按ID降序排列
    const sql = `SELECT * FROM freshwaterfish ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,           // 返回查询到的数据数组
                page: page,             // 返回当前页码
                pageSize: pageSize      // 返回每页大小
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 获得淡水生物总记录数
 */
router.get("/freshwaterfishtotal", (req, res) => {
    const sql = "SELECT COUNT(*) as total FROM freshwaterfish";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0].total // 返回具体的数值
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/** 
 * 淡水生物模糊查询
 */
router.get("/freshwaterfish/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM freshwaterfish WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
})
/**
 * 海水生物
 */
router.get("/saltwaterfish", (req, res) => {
    // 分页处理
    const page = parseInt(url.parse(req.url, true).query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量

    // 查询语句：每次获取10条数据，按ID降序排列
    const sql = `SELECT * FROM saltwaterfish ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,           // 返回查询到的数据数组
                page: page,             // 返回当前页码
                pageSize: pageSize      // 返回每页大小
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 获得海水生物总记录数
 */
router.get("/saltwaterfishtotal", (req, res) => {
    const sql = "SELECT COUNT(*) as total FROM saltwaterfish";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0].total // 返回具体的数值
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 海水生物模糊查询
 */
router.get("/saltwaterfish/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM saltwaterfish WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
})
/**
 * 精选器械
 */
router.get("/fishtool", (req, res) => {
    // 分页处理
    const page = parseInt(url.parse(req.url, true).query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量

    // 查询语句：每次获取10条数据，按ID降序排列
    const sql = `SELECT * FROM fishtool ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,           // 返回查询到的数据数组
                page: page,             // 返回当前页码
                pageSize: pageSize      // 返回每页大小
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 获得精选器械总记录数
 */
router.get("/fishtooltotal", (req, res) => {
    const sql = "SELECT COUNT(*) as total FROM fishtool";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0].total // 返回具体的数值
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 精选器械模糊查询
 */
router.get("/fishtool/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM fishtool WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
})
/**
 * 关于我们简介接口
 */
router.get("/about/intro", (req, res) => {
    const sql = "SELECT * FROM aboutintro";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0]
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
})
/**
 * 关于我们历史接口
 */
router.get("/about/history", (req, res) => {
    const sql = "SELECT * FROM abouthistory";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
});
/**
 * 关于我们的使命接口
 */
router.get("/about/mission", (req, res) => {
    const sql = "SELECT * FROM aboutmission";
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})
/**
 * 用户信息接口
 */
router.get("/userInfo", (req, res) => {
    // 从请求头中获取 token
    const token = req.headers.authorization || req.query.token;
    if (token) {
        // 验证 token 的有效性
        jsonwebtoken.verify(token, jsonwebtokenSecret.secret, (err, decoded) => {
            if (err) {
                // token 无效或过期
                res.send({
                    status: 401,
                    msg: "无效的 token"
                });
            } else {
                // token 有效，返回用户信息
                const sql = `select id, username, password, phone, email from user where id = ?`;
                sqlConnect(sql, [decoded.id], result => {
                    if (result.length > 0) {
                        res.send({
                            status: 200,
                            data: result[0]
                        });
                    } else {
                        res.send({
                            status: 404,
                            msg: "用户不存在"
                        });
                    }
                });
            }
        });
    } else {
        // 未提供 token
        res.send({
            status: 400,
            msg: "未提供 token"
        });
    }
})
/**
 * 更新用户信息接口
 */
router.post('/updateUserInfo', function (req, res) {
    const { username, password, phone, email } = req.body;
    const sql = `update user set username='${username}',password='${password}',phone='${phone}',email='${email}' where username='${username}'`;
    sqlConnect(sql, null, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '用户信息更新成功'
            });
        } else {
            res.send({
                status: 500,
                msg: '用户信息更新失败'
            });
        }
    });
})
/**
 * 商品详情接口
 */
router.get("/productdetails", (req, res) => {
    const cid = req.query.cid;
    const sql = `SELECT * FROM productdetails WHERE cid = ?`;
    sqlConnect(sql, [cid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0]
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    });
})
/**
 * 提交订单接口实现
 */
router.post("/checkout", (req, res) => {
    const { name, phone, address, remark, items, totalAmount } = req.body;

    // console.log('接收到的订单数据:', req.body); // 调试用

    // 验证必要字段
    if (!name || !phone || !address || !items || !Array.isArray(items)) {
        return res.send({
            status: 400,
            msg: '缺少必要参数或商品信息格式错误'
        });
    }

    // 生成订单号
    const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

    // 处理商品信息，确保数据完整性
    const processedItems = items.map(item => {
        return {
            id: item.id || null,
            name: item.name || '',
            price: parseFloat(item.price) || 0,
            image: item.image || '',
            quantity: parseInt(item.quantity) || 0
        };
    });

    // console.log('处理后的商品数据:', processedItems); // 调试用

    // 过滤掉无效的商品项
    const validItems = processedItems.filter(item =>
        item.name && item.price > 0 && item.quantity > 0
    );

    if (validItems.length === 0) {
        return res.send({
            status: 400,
            msg: '没有有效的商品信息'
        });
    }

    // 将商品信息转换为 JSON 字符串
    let itemsJson;
    try {
        itemsJson = JSON.stringify(validItems);
        console.log('序列化后的商品数据:', itemsJson); // 调试用
    } catch (error) {
        console.error('序列化商品数据失败:', error);
        return res.send({
            status: 500,
            msg: '商品信息序列化失败'
        });
    }

    // 确保总金额是数字
    const orderTotalAmount = parseFloat(totalAmount) || 0;

    // 插入订单数据
    /**
     * 默认订单状态为 0（待付款）
     */
    const sql = `INSERT INTO orders (order_number, name, phone, address, remark, items, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, 0)`;
    const params = [orderNumber, name, phone, address, remark || '', itemsJson, orderTotalAmount];

    console.log('准备执行的SQL:', sql); // 调试用
    console.log('SQL参数:', params); // 调试用

    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '订单提交成功',
                data: {
                    orderId: result.insertId,
                    orderNumber
                }
            });
        } else {
            res.send({
                status: 500,
                msg: '订单提交失败'
            });
        }
    });
});
/**
 * 后台管理系统 - 用户管理接口（分页）
 */
router.get("/backend/users", (req, res) => {
    // 分页处理
    const page = parseInt(req.query.page) || 1; // 当前页码，默认为 1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量

    // 查询当前页数据（避免返回密码字段）
    const sql = `SELECT id, username, phone, email, permission FROM user ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    // 查询总记录数
    const countSql = "SELECT COUNT(*) as total FROM user";

    sqlConnect(sql, null, result => {
        sqlConnect(countSql, null, countResult => {
            const total = countResult[0].total;
            const totalPages = Math.ceil(total / pageSize);

            res.send({
                status: 200,
                data: result,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    total: total,
                    totalPages: totalPages
                }
            });
        });
    });
});
/**
 * 后台管理系统 - 增加用户接口
 */
router.post("/backend/users/add", (req, res) => {
    const { username, password, phone, email, permission } = req.body;
    const sql = `INSERT INTO user (username, password, phone, email, permission) VALUES (?, ?, ?, ?, ?)`;
    const params = [username, password, phone, email, permission];
    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "用户添加成功"
            });
        }
        else {
            res.send({
                status: 500,
                msg: "用户添加失败"
            });
        }
    });
})
/**
 * 后台管理系统 - 删除用户接口
 */
router.post("/backend/users/delete", (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM user WHERE id = ?`;
    sqlConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "用户删除成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "用户删除失败"
            });
        }
    });
});
/**
 * 后台管理系统 - 修改用户信息接口
 */
router.post("/backend/users/update", (req, res) => {
    const { id, username, password, phone, email, permission } = req.body;
    let sql, params;
    // 如果密码为空，则不更新密码
    if (password && password.trim() !== '') {
        sql = `UPDATE user SET username = ?, password = ?, phone = ?, email = ?, permission = ? WHERE id = ?`;
        params = [username, password, phone, email, permission, id];
    } else {
        sql = `UPDATE user SET username = ?, phone = ?, email = ?, permission = ? WHERE id = ?`;
        params = [username, phone, email, permission, id];
    }

    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "用户信息修改成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "用户信息修改失败"
            });
        }
    });
});
/**
 * 后台管理系统 - 搜索用户信息
 */
router.get("/backend/users/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT id, username, phone, email, permission FROM user WHERE username LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 获取淡水生物
 */
router.get("/backend/goods/freshwaterfish", (req, res) => {
    // 分页处理
    const page = parseInt(req.query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量
    // 查询语句：每次获取10条数据
    const sql = `SELECT * FROM freshwaterfish ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    // 查询总记录数
    const countSql = "SELECT COUNT(*) as total FROM freshwaterfish";

    sqlConnect(sql, null, result => {
        sqlConnect(countSql, null, countResult => {
            const total = countResult[0].total;
            const totalPages = Math.ceil(total / pageSize);

            res.send({
                status: 200,
                data: result,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    total: total,
                    totalPages: totalPages
                }
            });
        });
    });
});
/**
 * 后台管理系统 - 商品管理接口 - 搜索淡水生物
 */
router.get("/backend/goods/freshwaterfish/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM freshwaterfish WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    })
});
/**
 * 后台管理系统 - 商品管理接口 - 删除淡水生物
 */
router.post("/backend/goods/freshwaterfish/delete", (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM freshwaterfish WHERE id = ?`;
    sqlConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 修改淡水生物
 */
router.post("/backend/goods/freshwaterfish/update", (req, res) => {
    const { id, name, price, image, introduce } = req.body;
    const sql = `UPDATE freshwaterfish SET name = ?, price = ?, image = ?, introduce = ? WHERE id = ?`;
    const params = [name, price, image, introduce, id];
    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 获取海洋生物
 */
router.get("/backend/goods/saltwaterfish", (req, res) => {
    // 分页处理
    const page = parseInt(req.query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量
    // 查询语句：每次获取10条数据
    const sql = `SELECT * FROM saltwaterfish ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    // 查询总记录数
    const countSql = "SELECT COUNT(*) as total FROM saltwaterfish";

    sqlConnect(sql, null, result => {
        sqlConnect(countSql, null, countResult => {
            const total = countResult[0].total;
            const totalPages = Math.ceil(total / pageSize);

            res.send({
                status: 200,
                data: result,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    total: total,
                    totalPages: totalPages
                }
            });
        });
    });
});
/**
 * 后台管理系统 - 商品管理接口 - 搜索海洋生物
 */
router.get("/backend/goods/saltwaterfish/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM saltwaterfish WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    })
});
/**
 * 后台管理系统 - 商品管理接口 - 删除海洋生物
 */
router.post("/backend/goods/saltwaterfish/delete", (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM saltwaterfish WHERE id = ?`;
    sqlConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 修改海洋生物
 */
router.post("/backend/goods/saltwaterfish/update", (req, res) => {
    const { id, name, price, image, introduce } = req.body;
    const sql = `UPDATE saltwaterfish SET name = ?, price = ?, image = ?, introduce = ? WHERE id = ?`;
    const params = [name, price, image, introduce, id];
    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 获取精选器械
 */
router.get("/backend/goods/fishtool", (req, res) => {
    // 分页处理
    const page = parseInt(req.query.page) || 1; // 获取当前页码，默认为1
    const pageSize = 10; // 每页显示的数据条数
    const offset = (page - 1) * pageSize; // 计算偏移量
    // 查询语句：每次获取10条数据
    const sql = `SELECT * FROM fishtool ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;

    // 查询总记录数
    const countSql = "SELECT COUNT(*) as total FROM fishtool";

    sqlConnect(sql, null, result => {
        sqlConnect(countSql, null, countResult => {
            const total = countResult[0].total;
            const totalPages = Math.ceil(total / pageSize);

            res.send({
                status: 200,
                data: result,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    total: total,
                    totalPages: totalPages
                }
            });
        });
    });
});
/**
 * 后台管理系统 - 商品管理接口 - 搜索精选器械
 */
router.get("/backend/goods/fishtool/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = `SELECT * FROM fishtool WHERE name LIKE '%${search}%'`;
    sqlConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            });
        }
    })
});
/**
 * 后台管理系统 - 商品管理接口 - 删除精选器械
 */
router.post("/backend/goods/fishtool/delete", (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM fishtool WHERE id = ?`;
    sqlConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            });
        }
    })
})
/**
 * 后台管理系统 - 商品管理接口 - 修改精选器械
 */
router.post("/backend/goods/fishtool/update", (req, res) => {
    const { id, name, price, image, introduce } = req.body;
    const sql = `UPDATE fishtool SET name = ?, price = ?, image = ?, introduce = ? WHERE id = ?`;
    const params = [name, price, image, introduce, id];
    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            });
        }
    })
})

/**
 * 后台管理系统 - 订单管理接口 - 获取订单列表
 */
router.get("/backend/orders", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const offset = (page - 1) * pageSize;

    // 构建搜索条件
    let searchCondition = '';
    let searchParams = [];
    if (keyword) {
        searchCondition = `AND (order_number LIKE ? OR name LIKE ? OR phone LIKE ?)`;
        searchParams = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`];
    }

    // 查询订单列表
    const sql = `SELECT 
                    id,
                    order_number as orderNumber,
                    name,
                    phone,
                    address,
                    remark,
                    items,
                    total_amount as totalAmount,
                    status,
                    DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as createTime
                FROM orders 
                WHERE 1=1
                    ${searchCondition}
                ORDER BY create_time DESC
                LIMIT ?, ?`;

    const params = [...searchParams, offset, pageSize];

    // 查询总记录数
    const countSql = `SELECT COUNT(*) as total FROM orders  WHERE 1=1 ${searchCondition}`;

    sqlConnect(sql, params, result => {
        sqlConnect(countSql, searchParams, countResult => {
            const total = countResult[0].total;
            res.send({
                status: 200,
                data: result,
                pagination: {
                    total,
                    currentPage: page,
                    pageSize
                }
            });
        });
    });
});

/**
 * 后台管理系统 - 订单管理接口 - 更新订单状态
 */
router.post("/backend/orders/updateStatus", (req, res) => {
    const { id, status } = req.body;
    const sql = `UPDATE orders SET status = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [status, id];

    sqlConnect(sql, params, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '订单状态更新成功'
            });
        } else {
            res.send({
                status: 500,
                msg: '订单状态更新失败'
            });
        }
    });
});
/**
 * 后台管理系统 - 订单管理接口 - 删除订单
 */
router.post("/backend/orders/delete", (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM orders WHERE id = ?`;
    sqlConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            });
        }
    })
})
module.exports = router;// 导出路由实例
