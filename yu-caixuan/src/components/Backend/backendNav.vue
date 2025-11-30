<template>
    <div class="backend-nav">
        <p>后台管理</p>
        <el-menu active-text-color="orangered" style="border:none" class="el-menu-vertical-demo"
            :default-active="activeIndex">
            <!-- <el-menu-item index="1">
                <span><router-link to="/backend/backendHome">首页</router-link></span>
            </el-menu-item> -->
            <el-menu-item index="2">
                <el-icon>
                    <user />
                </el-icon>
                <span><router-link to="/backend/usersManage">用户管理</router-link></span>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon><shopping-bag /></el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1"><router-link
                            to="/backend/goodsManage/freshwaterFishManage">淡水生物</router-link></el-menu-item>
                    <el-menu-item index="3-2"><router-link
                            to="/backend/goodsManage/saltwaterFishManage">海洋生物</router-link></el-menu-item>
                    <el-menu-item index="3-3"><router-link
                            to="/backend/goodsManage/fishToolManage">精选器械</router-link></el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="4">
                <el-icon><shopping-cart /></el-icon>
                <span><router-link to="/backend/backendOrder">订单管理</router-link></span>
            </el-menu-item>
            <el-menu-item index="5">
                <el-icon>
                    <upload />
                </el-icon>
                <span><router-link to="/backend/upload">商品上传</router-link></span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const activeIndex = ref('2');
// 监听路由变化，更新 activeIndex
const setActiveIndex = () => {
    const path = route.path;
    if (path === '/backend/backendHome') {
        activeIndex.value = '1';
    } else if (path === '/backend/usersManage') {
        activeIndex.value = '2';
    } else if (path.includes('/backend/goodsManage/freshwaterFishManage')) {
        activeIndex.value = '3-1';
    } else if (path.includes('/backend/goodsManage/saltwaterFishManage')) {
        activeIndex.value = '3-2';
    } else if (path.includes('/backend/goodsManage/fishToolManage')) {
        activeIndex.value = '3-3';
    } else if (path === '/backend/backendOrder') {
        activeIndex.value = '4';
    } else if (path === '/backend/upload') {
        activeIndex.value = '5';
    } else {
        // 默认激活首页
        activeIndex.value = '2';
    }
};
// 监听路由变化
watch(() => route.path, () => {
    setActiveIndex();
}, { immediate: true });
</script>
<style lang="scss" scoped>
.backend-nav {
    width: 250px;
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    border-radius: 0 20px 20px 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='824' height='137.3' viewBox='0 0 600 100'%3E%3Cg stroke='%23FFF' stroke-width='0' stroke-miterlimit='10' %3E%3Ccircle fill='%23037B79' cx='0' cy='0' r='50'/%3E%3Ccircle fill='%2392DEBA' cx='100' cy='0' r='50'/%3E%3Ccircle fill='%23FFFFD8' cx='200' cy='0' r='50'/%3E%3Ccircle fill='%23CAF2FF' cx='300' cy='0' r='50'/%3E%3Ccircle fill='%236FCCFF' cx='400' cy='0' r='50'/%3E%3Ccircle fill='%23006EB4' cx='500' cy='0' r='50'/%3E%3Ccircle fill='%23037B79' cx='600' cy='0' r='50'/%3E%3Ccircle cx='-50' cy='50' r='50'/%3E%3Ccircle fill='%2353ac9a' cx='50' cy='50' r='50'/%3E%3Ccircle fill='%23ceefc1' cx='150' cy='50' r='50'/%3E%3Ccircle fill='%23ffffff' cx='250' cy='50' r='50'/%3E%3Ccircle fill='%239de0fe' cx='350' cy='50' r='50'/%3E%3Ccircle fill='%233e9cda' cx='450' cy='50' r='50'/%3E%3Ccircle fill='%2300789c' cx='550' cy='50' r='50'/%3E%3Ccircle cx='650' cy='50' r='50'/%3E%3Ccircle fill='%23037B79' cx='0' cy='100' r='50'/%3E%3Ccircle fill='%2392DEBA' cx='100' cy='100' r='50'/%3E%3Ccircle fill='%23FFFFD8' cx='200' cy='100' r='50'/%3E%3Ccircle fill='%23CAF2FF' cx='300' cy='100' r='50'/%3E%3Ccircle fill='%236FCCFF' cx='400' cy='100' r='50'/%3E%3Ccircle fill='%23006EB4' cx='500' cy='100' r='50'/%3E%3Ccircle fill='%23037B79' cx='600' cy='100' r='50'/%3E%3Ccircle cx='50' cy='150' r='50'/%3E%3Ccircle cx='150' cy='150' r='50'/%3E%3Ccircle cx='250' cy='150' r='50'/%3E%3Ccircle cx='350' cy='150' r='50'/%3E%3Ccircle cx='450' cy='150' r='50'/%3E%3Ccircle cx='550' cy='150' r='50'/%3E%3C/g%3E%3C/svg%3E");
    color: white;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.5);

    p {
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        text-align: center;
        font-weight: bolder;
    }

    .el-menu {
        border-right: none;
        background-color: rgba(255, 255, 255, 0.3);


        .el-menu-item,
        .el-sub-menu__title {
            &:hover {
                background-color: rgba(0, 0, 0, 0.2) !important;
            }
        }

        .el-menu-item.is-active {
            background-color: rgba(0, 0, 0, 0.2) !important;
        }

        .el-sub-menu {
            &:deep(.el-sub-menu__title):hover {
                background-color: rgba(0, 0, 0, 0.2) !important;
            }

            &:deep(.el-menu) {
                background-color: transparent !important;
            }

            .el-menu-item-group {
                &:deep(.el-menu-item) {
                    background-color: rgba(255, 255, 255, 0.3) !important;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.5) !important;
                    }
                }
            }

            .el-menu-item-group__title {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.2);
                padding-left: 40px;
            }

            .el-menu-item {
                padding-left: 60px !important;
                height: 40px;
                line-height: 40px;
            }
        }
    }

    // 覆盖 Element Plus 图标样式
    .el-icon {
        vertical-align: middle;
        margin-right: 8px;
    }

    // 路由链接样式
    .el-menu-item,
    .el-menu-item-group {
        a {
            color: inherit;
            text-decoration: none;
            display: block;
            width: 100%;
            height: 100%;

            &:hover {
                color: inherit;
            }
        }
    }
}
</style>