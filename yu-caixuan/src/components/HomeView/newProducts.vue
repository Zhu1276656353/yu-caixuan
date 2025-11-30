<template>
    <div class="newProducts">
        <div class="newProducts-title">
            <p class="newProducts-title-ch">新品上市</p>
            <p class="newProducts-title-en">NewProducts</p>
        </div>
        <div class="newProducts-content">
            <div class="newProducts-top" @click="toProductDetail(newProducts.firstProduct)"
                v-if="newProducts.firstProduct">
                <div class="newProducts-top-img">
                    <img :src="'http://localhost:3000' + newProducts.firstProduct.image" alt="">
                </div>
                <div class="newProducts-top-content">
                    <p class="newProducts-top-content-title">{{ newProducts.firstProduct.name }}</p>
                    <el-button round class="newProducts-btn"
                        @click="handleAddCartClick(newProducts.firstProduct)">加入购物车</el-button>
                </div>
            </div>
            <div class="newProducts-bottom">
                <div class="newProducts-bottom-card" @click="toProductDetail(item)"
                    v-for="item in newProducts.otherProducts" :key="item.id">
                    <div class="newProducts-bottom-card-img">
                        <img :src="'http://localhost:3000' + item.image" :alt="item.name"></img>
                    </div>
                    <div class="newProducts-bottom-card-content">
                        <span class="newProducts-bottom-card-content-title">
                            {{ item.name }}
                            <span class="newProducts-bottom-card-content-price">￥<span>{{ item.price }}</span></span>
                        </span>
                        <el-button round @click.stop="handleAddCartClick(item)">加入购物车</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/index.js"
import { onMounted, reactive } from "vue"
import { useRouter } from "vue-router";
//引入购物车store
import { useCartStore } from "@/stores/cartStore"
const cartStore = useCartStore()
const router = useRouter();
//新品推荐
const newProducts = reactive({
    firstProduct: null,
    otherProducts: []
})
onMounted(() => {
    api.getNewProducts().then(res => {
        newProducts.firstProduct = res.data.data.firstProduct
        newProducts.otherProducts = res.data.data.otherProducts
    })
})
//点击按钮加入购物车
const handleAddCartClick = (item) => {
    cartStore.addItem({
        id: `${item.cid}`,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1  // 添加1个该商品
    })
}
// 跳转到商品详情页
const toProductDetail = (item) => {
    router.push({
        path: `/productDetails/${item.cid}`,
        query: {
            id: item.id,
            cid: item.cid,
            name: item.name,
            price: item.price,
            image: item.image,
            introduce: item.introduce
        }
    });
};
</script>
<style lang="scss" scoped>
.newProducts {
    width: 100%;
    background-color: white;
    padding: 30px 0;

    /**新品推荐标题 */
    .newProducts-title {
        position: relative;
        width: max-content;
        text-align: center;
        margin: 30px auto;
        letter-spacing: 5px;
        font-weight: bold;
        color: #333;
        text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        padding-bottom: 20px;

        .newProducts-title-ch {
            font-size: 30px;
        }

        .newProducts-title-en {
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

    /**新品推荐内容 */
    .newProducts-content {
        width: 60%;
        margin: 30px auto;

        //顶部内容
        .newProducts-top {
            width: 100%;
            height: 500px;
            position: relative;
            top: 50px;

            .newProducts-top-img {
                width: 98%;
                height: 90%;
                position: absolute;
                top: -10%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2;
                border-radius: 20px 20px 0 0;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    // 添加渐变遮罩
                    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
                }
            }

            .newProducts-top-content {
                width: 100%;
                height: 60%;
                background-image: linear-gradient(#ff8788 0%, #ffecd1 100%);
                position: absolute;
                bottom: 0;
                z-index: 1;
                border-radius: 0 0 20px 20px;

                .newProducts-top-content-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                    position: absolute;
                    bottom: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .newProducts-btn {
                    position: absolute;
                    bottom: 5%;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }

        /**新品推荐底部 */
        .newProducts-bottom {
            width: 100%;
            margin: 100px auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 30px;
            align-items: center;

            .newProducts-bottom-card {
                width: 30%;
                height: 300px;
                border: 1px solid rgb(255, 255, 255);
                background-image: linear-gradient(#fddb92 70%, #d1fdff 100%);
                border-radius: 20px;
                overflow: hidden;
                transition: 0.2s ease-in;

                /**底部第一张和第二张图片宽度和图片高度不一致 */
                &:nth-child(1),
                &:nth-child(2) {
                    width: 48%;
                    height: 350px;
                }

                &:hover {
                    transform: translate3d(0, -5px, 0);
                    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
                }

                .newProducts-bottom-card-img {
                    width: 100%;
                    height: 80%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        // 添加渐变遮罩
                        -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                        mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                    }
                }

                .newProducts-bottom-card-content {
                    width: 100%;
                    height: 20%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    .newProducts-bottom-card-content-title {
                        font-size: 20px;
                        font-weight: bold;
                    }

                    .newProducts-bottom-card-content-price {
                        font-weight: bold;
                        font-size: 15px;

                        span {
                            font-size: 20px;
                            color: red;
                        }
                    }
                }
            }
        }
    }
}

// 超小设备响应式 (最大宽度 480px)
@media screen and (max-width: 480px) {
    .newProducts {
        padding: 15px 0;

        .newProducts-title {
            margin: 15px auto;
            letter-spacing: 2px;
            padding-bottom: 10px;

            .newProducts-title-ch {
                font-size: 20px;
            }

            .newProducts-title-en {
                font-size: 10px;
            }
        }

        .newProducts-content {
            width: 95%;
            margin: 20px auto;

            .newProducts-top {
                height: 350px;
                top: 30px;

                .newProducts-top-img {
                    width: 95%;
                    height: 85%;

                    img {
                        object-fit: cover;
                    }
                }

                .newProducts-top-content {
                    height: 50%;
                    border-radius: 0 0 15px 15px;

                    .newProducts-top-content-title {
                        font-size: 16px;
                        bottom: 25%;
                    }

                    :deep(.el-button) {
                        padding: 8px 15px;
                        font-size: 12px;
                        bottom: 8%;
                    }
                }
            }

            .newProducts-bottom {
                margin: 70px auto 20px;
                gap: 15px;

                .newProducts-bottom-card {
                    width: 100%;
                    height: 250px;

                    &:nth-child(1),
                    &:nth-child(2) {
                        width: 100%;
                        height: 250px;
                    }

                    .newProducts-bottom-card-img {
                        height: 70%;
                    }

                    .newProducts-bottom-card-content {
                        height: 30%;
                        flex-direction: column;
                        justify-content: center;
                        gap: 5px;

                        .newProducts-bottom-card-content-title {
                            font-size: 16px;
                            padding: 0 10px;
                        }

                        .newProducts-bottom-card-content-price {
                            font-size: 12px;

                            span {
                                font-size: 16px;
                            }
                        }

                        :deep(.el-button) {
                            padding: 6px 12px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}

// 小型设备响应式 (481px - 767px)
@media screen and (min-width: 481px) and (max-width: 767px) {
    .newProducts {
        padding: 20px 0;

        .newProducts-title {
            margin: 20px auto;
            letter-spacing: 3px;
            padding-bottom: 15px;

            .newProducts-title-ch {
                font-size: 24px;
            }

            .newProducts-title-en {
                font-size: 12px;
            }
        }

        .newProducts-content {
            width: 90%;
            margin: 25px auto;

            .newProducts-top {
                height: 400px;
                top: 35px;

                .newProducts-top-img {
                    width: 96%;
                    height: 87%;
                }

                .newProducts-top-content {
                    height: 55%;

                    .newProducts-top-content-title {
                        font-size: 18px;
                        bottom: 25%;
                    }

                    :deep(.el-button) {
                        padding: 10px 20px;
                        font-size: 14px;
                    }
                }
            }

            .newProducts-bottom {
                margin: 80px auto 30px;
                gap: 20px;

                .newProducts-bottom-card {
                    width: 48%;
                    height: 270px;

                    &:nth-child(1),
                    &:nth-child(2) {
                        width: 48%;
                        height: 270px;
                    }

                    .newProducts-bottom-card-content {
                        .newProducts-bottom-card-content-title {
                            font-size: 18px;
                        }

                        .newProducts-bottom-card-content-price {
                            font-size: 14px;

                            span {
                                font-size: 18px;
                            }
                        }

                        :deep(.el-button) {
                            padding: 8px 16px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}

// 平板设备响应式 (768px - 1024px)
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .newProducts {
        padding: 25px 0;

        .newProducts-title {
            margin: 25px auto;
            letter-spacing: 4px;
            padding-bottom: 18px;

            .newProducts-title-ch {
                font-size: 28px;
            }

            .newProducts-title-en {
                font-size: 14px;
            }
        }

        .newProducts-content {
            width: 85%;

            .newProducts-top {
                height: 450px;
                top: 40px;

                .newProducts-top-img {
                    width: 97%;
                    height: 88%;
                }

                .newProducts-top-content-title {
                    font-size: 20px;
                }

                :deep(.el-button) {
                    padding: 10px 22px;
                    font-size: 15px;
                }
            }

            .newProducts-bottom {
                gap: 25px;
                margin: 90px auto 40px;

                .newProducts-bottom-card {
                    width: 46%;
                    height: 280px;

                    &:nth-child(1),
                    &:nth-child(2) {
                        width: 46%;
                        height: 300px;
                    }

                    .newProducts-bottom-card-content-title {
                        font-size: 18px;
                        padding-left: 10px;
                    }

                    .newProducts-bottom-card-content-price {
                        font-size: 15px;

                        span {
                            font-size: 20px;
                        }
                    }

                    :deep(.el-button) {
                        padding: 10px 20px;
                        font-size: 15px;
                    }
                }
            }
        }
    }
}

// 桌面设备响应式 (1024px及以上)
@media screen and (min-width: 1024px) {
    .newProducts-content {
        width: 60%;

        .newProducts-top {
            height: 500px;
            top: 50px;

            .newProducts-top-img {
                width: 98%;
                height: 90%;
            }

            .newProducts-top-content-title {
                font-size: 22px;
            }

            :deep(.el-button) {
                padding: 12px 30px;
                font-size: 16px;
            }
        }

        .newProducts-bottom {
            margin: 100px auto 50px;
            gap: 30px;

            .newProducts-bottom-card {
                width: 30%;
                height: 300px;

                &:nth-child(1),
                &:nth-child(2) {
                    width: 48%;
                    height: 350px;
                }

                .newProducts-bottom-card-content-title {
                    font-size: 20px;
                }

                .newProducts-bottom-card-content-price {
                    font-size: 15px;

                    span {
                        font-size: 20px;
                    }
                }

                :deep(.el-button) {
                    padding: 12px 30px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>