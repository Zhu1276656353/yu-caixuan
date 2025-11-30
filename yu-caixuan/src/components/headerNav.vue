<template>
    <div class="header">
        <div class="header-content">
            <div class="logo" v-for="item in logo" :key="item.id">
                <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                <span>鱼彩轩</span>
            </div>
            <div class="nav">
                <router-link to="/" exact-active-class="active">首页</router-link>
                <router-link to="/freshwaterFish">淡水生物</router-link>
                <router-link to="/saltwaterFish">海水生物</router-link>
                <router-link to="/fishTool">精选器械</router-link>
                <router-link to="/about">关于我们</router-link>
            </div>
            <div class="userInfo">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{ loginStore.username }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="CircleCheck" @click="userHandler">个人中心</el-dropdown-item>
                            <el-dropdown-item :icon="CircleCheck" @click="logoutHandler">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';//引入路由
import { useLoginStore } from '../stores/login.js'
import { CircleCheck } from '@element-plus/icons-vue'
import api from "@/api/index.js"
import { reactive, onMounted } from 'vue'
const logo = reactive({
    list: []
})
const router = useRouter();//创建路由实例
const loginStore = useLoginStore();//创建登录仓库实例
/**
 * 退出登录: 清空token、username、isLogin
 */
const logoutHandler = () => {
    loginStore.token = '';
    loginStore.username = '';
    loginStore.isLogin = false;
    router.push('/login');
}
/**
 * 个人中心: 跳转到用户中心
 */
const userHandler = () => {
    router.push('/user');
}
onMounted(() => {
    api.getLogo().then(res => {
        logo.list = res.data.data;
    })
})
</script>
<style lang="scss" scoped>
.header {
    padding: 0 20px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header-content {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

/* logo设置 */
.logo {
    display: flex;
}

.logo img {
    width: 40px;
    height: 40px;
}

.logo span {
    margin-left: 5px;
    font-size: 26px;
    font-weight: bolder;
    font-family: "华文中宋";
    line-height: 40px;
    letter-spacing: 3px;
    color: transparent;
    background-image: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);
    background-clip: text;
    background-size: 200% 200%;
    animation: fontMove 5s ease infinite;
}

@keyframes fontMove {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/** 导航栏设置 */
.nav {
    display: flex;
    margin: 0 auto;
}

.nav a {
    display: block;
    width: max-content;
    padding: 0 20px;
    color: #333;
    text-decoration: none;
    text-align: center;
}

.nav a:hover {
    color: #42b983;
}

.nav a.active {
    color: #42b983;
    font-weight: bold;
}

.userInfo {
    margin-left: 20px;
    text-align: center;
    padding: 5px 10px;
    line-height: 20px;
    font-weight: bold;

    .el-dropdown-link {
        color: #42b983;
        cursor: pointer;
    }
}

// 超小设备响应式 (最大宽度 480px) - 手机竖屏
@media screen and (max-width: 480px) {
    .header {
        padding: 0 10px;
        height: 45px;
    }

    .header-content {
        width: 100%;
        justify-content: space-between;
    }

    .logo {
        margin-right: 10px;

        span {
            display: none;
        }

        img {
            width: 35px;
            height: 35px;
        }
    }

    .nav {
        margin: 0;

        a {
            padding: 0 10px;
            font-size: 14px;
        }
    }

    .userInfo {
        margin-left: 10px;
        padding: 3px 8px;
        font-size: 14px;
    }
}

// 小型设备响应式 (481px - 767px) - 手机横屏
@media screen and (min-width: 481px) and (max-width: 767px) {
    .header {
        padding: 0 15px;
        height: 48px;
    }

    .header-content {
        width: 95%;
    }

    .logo {
        span {
            display: none;
        }

        img {
            width: 38px;
            height: 38px;
        }
    }

    .nav {
        a {
            padding: 0 15px;
            font-size: 15px;
        }
    }

    .userInfo {
        margin-left: 15px;
        padding: 4px 9px;
        font-size: 15px;
    }
}

// 平板设备响应式 (768px - 1024px) - 平板
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .header {
        padding: 0 18px;
        height: 49px;
    }

    .header-content {
        width: 90%;
    }

    .logo {
        span {
            display: none;
        }

        img {
            width: 39px;
            height: 39px;
        }
    }

    .nav {
        a {
            padding: 0 18px;
            font-size: 16px;
        }
    }

    .userInfo {
        margin-left: 18px;
        padding: 4px 9px;
        font-size: 16px;
    }
}

// 桌面设备响应式 (1024px及以上) - 桌面
@media screen and (min-width: 1024px) {
    .header {
        padding: 0 20px;
        height: 50px;
    }

    .header-content {
        width: 70%;
    }

    .logo {
        span {
            display: block;
        }

        img {
            width: 40px;
            height: 40px;
        }
    }

    .nav {
        a {
            padding: 0 20px;
            font-size: 16px;
        }
    }

    .userInfo {
        margin-left: 20px;
        padding: 5px 10px;
        font-size: 16px;
    }
}
</style>