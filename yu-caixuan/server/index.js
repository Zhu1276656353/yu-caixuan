const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');//获取post请求
const cors = require('cors');//解决跨域
/**文件上传 */
const path = require('path');//文件路径
const fs = require('fs');//文件操作
//解决跨域
app.use(cors());
//获取post请求
app.use(bodyParser.urlencoded({
    extended: true
}))
// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
/**
 * 静态文件上传开始
 */
// 添加静态文件服务前的中间件，用于调试
app.use('/uploads', (req, res, next) => {
    console.log('请求静态文件:', req.url);
    console.log('完整路径:', path.join(__dirname, 'uploads', req.url));
    // 检查文件是否存在
    const filePath = path.join(__dirname, 'uploads', req.url);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('文件不存在:', filePath);
        } else {
            console.log('文件存在:', filePath);
        }
    });

    next();
});

// 静态文件服务 - 确保使用绝对路径
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// 确保 uploads 目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log('创建 uploads 目录');
    fs.mkdirSync(uploadsDir, { recursive: true });
}
// 404 处理
app.use((req, res) => {
    console.log(`404 - 未找到资源: ${req.url}`);
    res.status(404).send('资源未找到');
});
/**
 * 静态文件服务结束
 */


app.listen(3000, () => {
    console.log('服务器在3000端口上运行')
});