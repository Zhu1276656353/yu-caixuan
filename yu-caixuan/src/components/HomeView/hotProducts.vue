<template>
    <div class="hotProducts">
        <div class="hotProducts-container">
            <div class="hotProducts-title">
                <p class="hotProducts-title-ch">热销推荐</p>
                <p class="hotProducts-title-en">HotProducts</p>
            </div>
            <div class="hotProducts-content">
                <div class="hotProducts-card" @click="toProductDetail(item)" v-for="item in hotProducts.list"
                    :key="item.id">
                    <div class="hotProducts-card-img">
                        <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                    </div>
                    <div class="hotProducts-card-text">
                        <div class="hotProducts-card-name">{{ item.name }}</div>
                        <div class="hotProducts-card-price">￥<span>{{ item.price }}</span></div>
                        <div class="hotProducts-card-sales">已售:<span>{{ item.sales }}</span></div>
                        <button class="hotProducts-card-btn" @click.stop="handleAddCartClick(item)">加入购物车</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import api from "@/api/index.js";
import { useCartStore } from "@/stores/cartStore.js";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();
const hotProducts = reactive({
    list: []
});
onMounted(() => {
    // 获取热销商品数据
    api.getHotProducts().then((res) => {
        hotProducts.list = res.data.data;
    });
});
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
/**热销推荐 */
.hotProducts {
    width: 100%;
    margin: 30px auto;
    background-color: white;
    padding: 20px 0;

    .hotProducts-container {
        width: 60%;
        margin: 30px auto;
    }

    /**热销推荐标题 */
    .hotProducts-title {
        position: relative;
        width: max-content;
        text-align: center;
        margin: 30px auto;
        letter-spacing: 5px;
        font-weight: bold;
        color: #333;
        text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        padding-bottom: 20px;

        .hotProducts-title-ch {
            font-size: 30px;
        }

        .hotProducts-title-en {
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

    /**热销推荐标题 */
    .hotProducts-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        margin: 0px auto;

        .hotProducts-card {
            width: 28%;
            height: 320px;
            background-image: linear-gradient(#fff1eb 55%, #ace0f9 100%);
            border-radius: 15px;
            overflow: hidden;
            box-sizing: border-box;
            cursor: pointer;
            transition: 0.2s;

            .hotProducts-card-img {
                width: 100%;
                height: 200px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    // 添加渐变遮罩
                    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                }
            }

            .hotProducts-card-text {
                padding: 0 20px;

                .hotProducts-card-name {
                    width: 100%;
                    font-size: 26px;
                    font-weight: bold;
                }

                .hotProducts-card-price {
                    font-size: 15px;
                    font-weight: bold;
                    float: left;

                    span {
                        font-size: 18px;
                        color: red;
                    }
                }

                .hotProducts-card-sales {
                    float: right;
                    font-size: 15px;

                    span {
                        color: red;
                    }
                }

                // 添加购物车按钮
                .hotProducts-card-btn {
                    width: 100%;
                    box-sizing: border-box;
                    cursor: pointer;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    margin: 10px auto;
                    border-radius: 10px;
                    padding: 10px 10px;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.8);
                    font-weight: bold;
                    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
                    transition: 0.2s ease-in;
                }

                .hotProducts-card-btn:hover {
                    box-shadow:
                        5px 5px 5px rgba(0, 0, 0, 0.2),
                        inset 5px 5px 5px rgba(0, 0, 0, 0.5);
                }
            }
        }

        .hotProducts-card:hover {
            transform: translate3d(0, -5px, 0);
            box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
        }
    }
}

// 平板设备响应式 (768px - 1024px)
@media screen and (max-width: 1024px) {
    .hotProducts {
        .hotProducts-container {
            width: 95%;
        }

        .hotProducts-content {
            .hotProducts-card {
                width: calc(33.33% - 20px);
                height: 300px;

                .hotProducts-card-name {
                    font-size: 22px;
                }

                .hotProducts-card-img {
                    height: 170px;
                }
            }
        }
    }
}

// 小型设备响应式 (481px - 767px)
@media screen and (max-width: 767px) {
    .hotProducts {
        padding: 10px 0;
        margin: 20px auto;

        .hotProducts-container {
            width: 95%;
            margin: 20px auto;
        }

        .hotProducts-title {
            margin: 20px auto;
            letter-spacing: 3px;
            padding-bottom: 15px;

            .hotProducts-title-ch {
                font-size: 24px;
            }

            .hotProducts-title-en {
                font-size: 12px;
            }
        }

        .hotProducts-content {
            gap: 20px;

            .hotProducts-card {
                width: calc(50% - 10px);
                height: 280px;

                .hotProducts-card-name {
                    font-size: 20px;
                }

                .hotProducts-card-price {
                    font-size: 13px;

                    span {
                        font-size: 16px;
                    }
                }

                .hotProducts-card-sales {
                    font-size: 13px;
                }

                .hotProducts-card-img {
                    height: 150px;
                }

                .hotProducts-card-btn {
                    padding: 8px 5px;
                    font-size: 11px;
                }
            }
        }
    }
}

// 超小设备响应式 (最大宽度 480px)
@media screen and (max-width: 480px) {
    .hotProducts {
        margin: 15px auto;
        padding: 10px 0;

        .hotProducts-container {
            width: 95%;
            margin: 15px auto;
        }

        .hotProducts-title {
            margin: 15px auto;
            letter-spacing: 2px;
            padding-bottom: 10px;

            .hotProducts-title-ch {
                font-size: 20px;
            }

            .hotProducts-title-en {
                font-size: 10px;
            }
        }

        .hotProducts-content {
            gap: 15px;

            .hotProducts-card {
                width: 100%;
                height: 300px;

                .hotProducts-card-name {
                    font-size: 22px;
                }

                .hotProducts-card-price {
                    font-size: 14px;

                    span {
                        font-size: 18px;
                    }
                }

                .hotProducts-card-sales {
                    font-size: 14px;
                }

                .hotProducts-card-img {
                    height: 170px;
                }

                .hotProducts-card-btn {
                    padding: 10px 5px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>