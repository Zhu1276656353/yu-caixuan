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
                            <el-dropdown-item :icon="User" @click="userHandler">个人中心</el-dropdown-item>
                            <el-dropdown-item v-if="loginStore.permission === 'admin'" :icon="Setting"
                                @click="managementHandler">管理中心</el-dropdown-item>
                            <el-dropdown-item :icon="Refresh" @click="logoutHandler">退出登录</el-dropdown-item>
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
import { useCartStore } from '@/stores/cartStore.js';
import { User, Setting, Refresh } from '@element-plus/icons-vue'
import api from "@/api/index.js"
import { reactive, onMounted } from 'vue'
const logo = reactive({
    list: []
})
const router = useRouter();//创建路由实例
const loginStore = useLoginStore();//创建登录仓库实例
const cartStore = useCartStore();//创建购物车仓库实例
/**
 * 退出登录: 清空token、username、isLogin
 */
const logoutHandler = () => {
    loginStore.token = '';
    loginStore.username = '';
    loginStore.isLogin = false;
    cartStore.cartItems = [];//清空购物车
    // router.push('/login');
    router.replace('/login').then(() => {
        window.location.reload();
    });
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
/**
 * 管理中心: 跳转到管理中心
 */
const managementHandler = () => {
    router.push('/backend/usersManage');
}
/**
 * 查看订单: 跳转到用户订单页面
 */
// const orderHandler = () => {
//     router.push('/user/orders');
// }
</script>
<style lang="scss" scoped>
.header {
    padding: 0 20px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    .header-content {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;

        /* logo设置 */
        .logo {
            display: flex;

            img {
                width: 40px;
                height: 40px;
            }

            span {
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
        }
    }
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

.nav {
    display: flex;
    margin: 0 auto;
    position: relative;

    // 底部滑动指示器
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #42b983, #00c9ff);
        transition: all 0.3s ease;
        border-radius: 3px;
    }

    a {
        display: block;
        width: max-content;
        padding: 0 20px;
        color: #333;
        text-decoration: none;
        text-align: center;
        position: relative;
        transition: all 0.3s ease;
        line-height: 50px;
        z-index: 1;

        // 为每个链接添加滑动效果
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #42b983, #00c9ff);
            transition: all 0.3s ease;
            border-radius: 3px;
            transform: translateX(-50%);
        }

        &:hover {
            color: #42b983;
            transform: translateY(-2px);

            &::after {
                width: 70%;
            }
        }

        &.active {
            color: #42b983;
            font-weight: bold;

            &::after {
                width: 70%;
                background: linear-gradient(90deg, #42b983, #00c9ff);
            }
        }
    }
}
.userInfo { 
    .el-dropdown-link{
        cursor: pointer;
        color: #42b983;
        font-weight: bolder;
        line-height: 50px;
    }
}
</style>