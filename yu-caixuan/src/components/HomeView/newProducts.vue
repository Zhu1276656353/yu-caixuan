<template>
    <div class="newProducts">
        <div class="newProducts-title">
            <p class="newProducts-title-ch">新品上市</p>
            <p class="newProducts-title-en">NewProducts</p>
        </div>
        <div class="newProducts-content">
            <div class="card" v-for="item in newProducts.otherProducts" :key="item.id" @click="toProductDetail(item)">
                <div class="top-card">
                    <img :src="'http://localhost:3000' + item.image" :alt="item.name" class="card-img">
                </div>
                <div class="bottom-card">
                    <div class="card-content">
                        <div class="card-info">
                            <span class="card-title">{{ item.name }}</span>
                            <p class="card-price">￥<span>{{ item.price }}</span></p>
                        </div>
                        <el-button round class="card-btn" @click.stop="handleAddCartClick(item)">
                            <span>加入购物车</span>
                        </el-button>
                    </div>
                </div>
                <span class="card-badge"></span>
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
    /**
     * 后续代码修改，未使用到firstProduct，只使用otherProducts
     */
    api.getNewProducts().then(res => {
        // newProducts.firstProduct = res.data.data.firstProduct
        newProducts.otherProducts = res.data.data.otherProducts
    })
})
//点击按钮加入购物车
const handleAddCartClick = (item) => {
    ElMessage({
        message: `商品添加成功`,
        type: 'success'
    });
    cartStore.addItem({
        id: `${item.id}`,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1  // 添加1个该商品
    })
}
// 跳转到商品详情页
const toProductDetail = (item) => {
    router.push({
        path: `/productDetails/${item.id}`,
        query: {
            id: item.id,
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
    padding: 30px 0 50px 0;

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

    .newProducts-content {
        width: 60%;
        margin: 30px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 50px;

        .card {
            position: relative;
            width: 30%;
            height: 254px;
            background-color: #fff;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            box-sizing: border-box;

            &:nth-child(1),
            &:nth-child(2) {
                width: 45%;
                height: 300px;

                .card-btn {
                    width: 80%;
                }
            }

            // 添加角标样式
            .card-badge {
                position: absolute;
                overflow: hidden;
                width: 120px;
                height: 120px;
                top: -10px;
                left: -10px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3;

                &::before {
                    content: '新品上市';
                    position: absolute;
                    width: 150%;
                    height: 40px;
                    background-image: linear-gradient(45deg, #ff6547 0%, #ffb144 51%, #ff7053 100%);
                    transform: rotate(-45deg) translateY(-20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
                }

                &::after {
                    content: '';
                    position: absolute;
                    width: 10px;
                    bottom: 0;
                    left: 0;
                    height: 10px;
                    z-index: -1;
                    box-shadow: 140px -140px #cc3f47;
                    background-image: linear-gradient(45deg, #FF512F 0%, #F09819 51%, #FF512F 100%);
                }
            }

            // 卡片上半部分
            .top-card {
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                height: 77.5%;
                transition: height 0.3s ease;
                background-color: #fff;

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            // 卡片下半部分
            .bottom-card {
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
                height: 22.5%;
                transition: height 0.3s ease;
                background: linear-gradient(135deg, #ff6f61 30%, #ff9e7d);

                &::before {
                    content: "";
                    position: absolute;
                    background-color: transparent;
                    bottom: 22.5%;
                    height: 50px;
                    width: 100%;
                    transition: bottom 0.3s ease;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    box-shadow: 0 17px 0 0 #ff6f61;
                }
            }

            // 下半卡片内容
            .card-content {
                padding-top: 6%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;

                .card-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 80%;
                    padding: 0px 10px;
                    margin-bottom: 10px;

                    .card-title {
                        font-weight: 700;
                        font-size: 18px;
                    }

                    .card-price {
                        font-size: 14px;
                        white-space: nowrap;

                        span {
                            font-weight: bolder;
                            color: orangered;
                            font-size: 22px;
                            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                        }
                    }
                }

                .card-btn {
                    width: 60%;
                    margin-top: 0.5%;
                    font-size: 13px;
                    text-decoration: none;
                    color: #ff4500;
                    background-color: #fff;
                    border: solid 2px #fff;
                    border-radius: 15px;
                    padding: 3%;
                    font-weight: bolder;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease-in-out;
                    z-index: 1;

                    &::after {
                        content: " ";
                        width: 0%;
                        height: 100%;
                        background: #ff4500;
                        position: absolute;
                        transition: all 0.4s ease-in-out;
                        right: 0;
                        top: 0;
                        z-index: -1;
                    }

                    &:hover::after {
                        right: auto;
                        left: 0;
                        width: 100%;
                    }

                    &:hover {
                        color: #ff4500;
                        background-color: #fff;
                        transition: background-color 0.4s ease;
                        border-color: #ff4500;

                        span {
                            color: #fff;
                            animation: scaleUp 0.3s ease-in-out;
                        }
                    }
                }
            }

            // 卡片hover样式
            &:hover {
                box-shadow: 2px 2px 2px rgba(255, 69, 0, 0.6);
                border: 2px solid #ff4500;

                .top-card {
                    height: 60%;
                    transition: height 0.3s ease;
                }

                .bottom-card {
                    height: 40%;
                    transition: height 0.3s ease;

                    &::before {
                        bottom: 40%;
                        transition: bottom 0.3s ease;
                    }
                }
            }

            @keyframes scaleUp {
                0% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(0.95);
                }

                100% {
                    transform: scale(1);
                }
            }
        }
    }
}

/* 响应式：平板横屏 */
@media (max-width: 1200px) {
    .newProducts {
        .newProducts-content {
            width: 80%;
            gap: 30px;
        }

        .newProducts-title-ch {
            font-size: 26px;
        }

        .newProducts-title-en {
            font-size: 14px;
        }
    }
}

/* 响应式：平板竖屏 */
@media (max-width: 992px) {
    .newProducts {
        padding: 20px 0 40px 0;

        .newProducts-title {
            margin: 20px auto;
            letter-spacing: 3px;

            .newProducts-title-ch {
                font-size: 24px;
            }

            .newProducts-title-en {
                font-size: 13px;
            }
        }

        .newProducts-content {
            width: 90%;
            margin: 20px auto;
            gap: 25px;
            justify-content: center;

            .card {
                width: 48%;
                height: 240px;

                &:nth-child(1),
                &:nth-child(2) {
                    width: 48%;
                    height: 260px;
                }

                .card-content .card-title {
                    font-size: 16px;
                }

                .card-content .card-price span {
                    font-size: 18px;
                }

                .card-btn {
                    font-size: 12px;
                }
            }
        }
    }
}

/* 响应式：手机横屏 / 小屏 */
@media (max-width: 768px) {
    .newProducts {
        padding: 15px 0 30px 0;

        .newProducts-title {
            margin: 15px auto;
            padding-bottom: 15px;

            .newProducts-title-ch {
                font-size: 22px;
            }

            .newProducts-title-en {
                font-size: 12px;
            }
        }

        .newProducts-content {
            width: 95%;
            margin: 15px auto;
            gap: 20px;

            .card {
                width: 48%;
                height: 220px;
                border-radius: 16px;

                &:nth-child(1),
                &:nth-child(2) {
                    width: 48%;
                    height: 240px;

                    .card-btn {
                        width: 80%;
                    }
                }

                .card-badge {
                    width: 90px;
                    height: 90px;

                    &::before {
                        font-size: 12px;
                        height: 32px;
                        width: 130%;
                    }
                }

                .top-card {
                    border-top-left-radius: 16px;
                    border-top-right-radius: 16px;
                }

                .bottom-card {
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 16px;
                }

                .card-content {
                    .card-info {
                        width: 90%;
                        margin-bottom: 6px;
                    }

                    .card-title {
                        font-size: 14px;
                    }

                    .card-price span {
                        font-size: 16px;
                    }

                    .card-btn {
                        width: 70%;
                        font-size: 11px;
                        padding: 6px 12px;
                    }
                }
            }
        }
    }
}

/* 响应式：手机竖屏 */
@media (max-width: 576px) {
    .newProducts {
        padding: 20px 15px 30px 15px;

        .newProducts-title {
            margin: 20px auto;
            letter-spacing: 2px;

            .newProducts-title-ch {
                font-size: 20px;
            }

            .newProducts-title-en {
                font-size: 11px;
            }
        }

        .newProducts-content {
            width: 100%;
            margin: 15px auto;
            gap: 20px;
            flex-direction: column;
            align-items: center;

            .card {
                width: 100%;
                max-width: 360px;
                height: 280px;

                &:nth-child(1),
                &:nth-child(2) {
                    width: 100%;
                    max-width: 360px;
                    height: 300px;

                    .card-btn {
                        width: 80%;
                    }
                }

                .card-badge {
                    width: 80px;
                    height: 80px;

                    &::before {
                        font-size: 11px;
                        height: 28px;
                        letter-spacing: 0.05em;
                    }
                }

                .card-content {
                    .card-info {
                        width: 85%;
                    }

                    .card-title {
                        font-size: 16px;
                    }

                    .card-price span {
                        font-size: 18px;
                    }

                    .card-btn {
                        width: 75%;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}

/* 响应式：超小屏手机 */
@media (max-width: 380px) {
    .newProducts {
        .newProducts-content .card {
            height: 250px;

            &:nth-child(1),
            &:nth-child(2) {
                height: 270px;
            }

            .card-content .card-title {
                font-size: 14px;
            }

            .card-content .card-price span {
                font-size: 16px;
            }
        }
    }
}
</style>