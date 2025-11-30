<template>
    <div class="group">
        <div class="group-title">
            <p class="group-title-ch">商品分类</p>
            <p class="group-title-en">category</p>
        </div>
        <div class="container">
            <div class="card" v-for="(item, index) in category.list" :key="index">
                <div class="face face1">
                    <div class="content">
                        <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                        <h3>{{ item.categoryName }}</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>{{ item.categoryContent }}</p>
                        <el-button @click="handleCategoryClick(item)" round>快速前往</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import api from "@/api/index.js";
import { reactive, onMounted } from "vue";
const router = useRouter()
const category = reactive({
    list: []
})
onMounted(() => {
    api.getCategory().then(res => {
        category.list = res.data.data
    })
})
/**
 * 根据分类名称跳转到商品列表页面
 */
const handleCategoryClick = (item) => {

    // 创建分类名称到路由的映射
    const categoryRoutes = {
        '淡水生物': '/freshwaterFish',
        '海洋生物': '/saltwaterFish',
        '精选器械': '/fishTool'
    }

    // 获取对应的路由路径
    const routePath = categoryRoutes[item.categoryName]

    if (routePath) {
        router.push(routePath)
    } else {
        console.warn('未找到对应的路由:', item.categoryName)
    }
}
</script>
<style lang="scss" scoped>
/**分类 */
.group {
    width: 60%;
    margin: 0 auto;

    /**分类标题 */
    .group-title {
        position: relative;
        width: max-content;
        text-align: center;
        margin: 30px auto;
        letter-spacing: 5px;
        font-weight: bold;
        color: #333;
        text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        padding-bottom: 20px;

        .group-title-ch {
            font-size: 30px;
        }

        .group-title-en {
            font-size: 15px;
        }

        &::after {
            content: "";
            width: 80%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-bottom: 5px solid #B22222;
        }
    }

    /**分类内容 */
    .container {
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: space-between;

        .card {
            position: relative;
            cursor: pointer;

            .face {
                width: 300px;
                height: 200px;
                transition: 0.5s;

                &.face1 {
                    position: relative;
                    background: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1;
                    transform: translateY(100px);

                    .content {
                        opacity: 0.2;
                        transition: 0.5s;

                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }

                        h3 {
                            margin: 10px 0 0;
                            padding: 0;
                            color: #fff;
                            text-align: center;
                            font-size: 1.5em;
                            position: absolute;
                            bottom: 15%;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }

                &.face2 {
                    position: relative;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                    transform: translateY(-100px);

                    .content {
                        p {
                            margin: 0;
                            padding: 0;
                            font-family: "华文中宋";
                            color: rgba(0, 0, 0, 0.6);
                        }

                        button {
                            margin: 15px 0 0;
                            display: inline-block;
                            text-decoration: none;
                            font-weight: 900;
                            color: #333;
                            padding: 5px;
                            border: 1px solid #333;

                            &:hover {
                                background: #333;
                                color: #fff;
                            }
                        }

                    }
                }
            }

            &:hover {
                .face {
                    &.face1 {
                        background: #ff0057;
                        transform: translateY(0);

                        .content {
                            opacity: 1;
                        }
                    }

                    &.face2 {
                        transform: translateY(0);
                    }
                }
            }
        }
    }
}

// 超小设备响应式 (最大宽度 480px) - 手机竖屏
@media screen and (max-width: 480px) {
    .group {
        width: 95%;
        margin: 0 auto;

        .group-title {
            margin: 20px auto;
            letter-spacing: 2px;
            padding-bottom: 15px;

            .group-title-ch {
                font-size: 24px;
            }

            .group-title-en {
                font-size: 12px;
            }
        }

        .container {
            flex-direction: column;
            align-items: center;
            gap: 30px;

            .card {
                .face {
                    width: 100%;
                    height: 180px;

                    &.face1 {
                        transform: translateY(80px);

                        .content {
                            h3 {
                                font-size: 1.3em;
                                bottom: 10%;
                            }
                        }
                    }

                    &.face2 {
                        transform: translateY(-80px);
                        padding: 15px;
                    }
                }

                &:hover {
                    .face {
                        &.face1 {
                            transform: translateY(0);
                        }

                        &.face2 {
                            transform: translateY(0);
                        }
                    }
                }
            }
        }
    }
}

// 小型设备响应式 (481px - 767px) - 手机横屏
@media screen and (min-width: 481px) and (max-width: 767px) {
    .group {
        width: 90%;
        margin: 0 auto;

        .group-title {
            margin: 25px auto;
            letter-spacing: 3px;
            padding-bottom: 18px;

            .group-title-ch {
                font-size: 26px;
            }

            .group-title-en {
                font-size: 13px;
            }
        }

        .container {
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;

            .card {
                .face {
                    width: 220px;
                    height: 160px;

                    &.face1 {
                        transform: translateY(70px);

                        .content {
                            h3 {
                                font-size: 1.2em;
                                bottom: 10%;
                            }
                        }
                    }

                    &.face2 {
                        transform: translateY(-70px);
                        padding: 15px;
                    }
                }

                &:hover {
                    .face {
                        &.face1 {
                            transform: translateY(0);
                        }

                        &.face2 {
                            transform: translateY(0);
                        }
                    }
                }
            }
        }
    }
}

// 平板设备响应式 (768px - 1024px) - 平板
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .group {
        width: 85%;
        margin: 0 auto;

        .group-title {
            margin: 25px auto;
            letter-spacing: 4px;
            padding-bottom: 18px;

            .group-title-ch {
                font-size: 28px;
            }

            .group-title-en {
                font-size: 14px;
            }
        }

        .container {
            .card {
                .face {
                    width: 240px;
                    height: 170px;

                    &.face1 {
                        transform: translateY(80px);

                        .content {
                            h3 {
                                font-size: 1.3em;
                            }
                        }
                    }

                    &.face2 {
                        transform: translateY(-80px);
                    }
                }
            }
        }
    }
}

// 桌面设备响应式 (1024px及以上) - 桌面
@media screen and (min-width: 1024px) and (max-width: 1440px) {
    .group {
        width: 60%;
        margin: 0 auto;

        .container {
            margin-left: -150px;
            .card {
                .face {
                    width: 300px;
                    height: 200px;

                    &.face1 {
                        transform: translateY(100px);
                    }

                    &.face2 {
                        transform: translateY(-100px);
                    }
                }
            }
        }
    }
}
</style>