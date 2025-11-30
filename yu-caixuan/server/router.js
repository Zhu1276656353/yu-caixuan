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
    const { productId, productName, price, introduce, cid } = req.body;
    console.log('解析参数:', { productId, productName, price, introduce, cid });

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
    /**
     * 
     * ！！！！创建产品
     * 
     */
    // 如果提供了产品名称和价格，则创建新产品
    else if (productName && price) {
        console.log('创建新产品:', { productName, price, introduce, cid });
        // 插入新产品记录，包含introduce和cid字段
        const sql = `INSERT INTO fishtool (name, price, image, introduce, cid) VALUES (?, ?, ?, ?, ?)`;
        const params = [productName, price, fileInfo.path, introduce || '', cid || null];
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
                        cid: cid || null
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
             */
            const token = jsonwebtoken.sign({
                id: result[0].id,
                username: result[0].username,
            }, jsonwebtokenSecret.secret); // 使用密钥加密生成 token

            // 登录成功，返回用户信息和 token
            res.send({
                status: 200,
                username: result[0].username,
                token
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
    const sql = `insert into user (username, password, phone, email) values (?, ?, ?, ?)`;
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
    const sql = `select * from hotproducts`;
    sqlConnect(sql, [], result => {
        res.send({
            status: 200,
            data: result
        });
    });
})
/**
 * 新品上市接口 - 分别获取第一条和其他四条数据
 */
router.get("/newProducts", (req, res) => {
    // 获取第一条数据
    const firstSql = `select * from newproducts limit 1`;
    // 获取其余五条数据
    const otherSql = `select * from newproducts limit 1, 5`;

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
module.exports = router;// 导出路由实例
