<template>
    <div class="hotProducts">
        <div class="hotProducts-container">
            <div class="hotProducts-title">
                <p class="hotProducts-title-ch">热销推荐</p>
                <p class="hotProducts-title-en">HotProducts</p>
            </div>
            <div class="hotProducts-content">
                <!-- 热销卡片布局 -->
                <div class="parent" v-for="item in hotProducts.list" :key="item.id" @click="toProductDetail(item)">
                    <div class="card">
                        <!-- 卡片内容 -->
                        <div class="content-box">
                            <!-- 图片 -->
                            <div class="card-image">
                                <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                            </div>
                            <!-- 标题和价格 -->
                            <div class="title-price-row">
                                <span class="card-title">{{ item.name }}</span>
                            </div>
                            <span class="add-card" @click.stop="handleAddCartClick(item)">加入购物车</span>
                        </div>
                        <div class="price-box">
                            <span class="price-font">价格</span>
                            <span class="price-number">{{ item.price }}</span>
                        </div>
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
        hotProducts.list = [...res.data.data.freshwaterfish, ...res.data.data.saltwaterfish];
    });
});
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
/**热销推荐 */
.hotProducts {
    width: 100%;
    margin: 30px auto;
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
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

    .hotProducts-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        margin: 0px auto;

        // 热销卡片
        .parent {
            width: 300px;
            perspective: 1000px;
            cursor: pointer;

            .card {
                padding-top: 50px;
                border: 3px solid rgb(255, 255, 255);
                transform-style: preserve-3d;
                background:
                    linear-gradient(135deg, #0000 18.75%, #f3f3f3 0 31.25%, #0000 0),
                    repeating-linear-gradient(45deg, #f3f3f3 -6.25% 6.25%, #ffffff 0 18.75%);
                background-size: 60px 60px;
                background-position: 0 0, 0 0;
                background-color: #f0f0f0;
                width: 100%;
                box-shadow: rgba(142, 142, 142, 0.5) 0px 30px 30px -10px;
                transition: all 0.5s ease-in-out;

                &:hover {
                    background-position: -100px 100px, -100px 100px;
                    transform: rotate3d(0.5, 1, 0, 30deg);
                }

                .content-box {
                    background: linear-gradient(135deg, #ff6b35 30%, #ff9e6d);
                    transition: all 0.5s ease-in-out;
                    padding: 60px 25px 25px 25px;
                    transform-style: preserve-3d;

                    .card-image {
                        width: 100%;
                        height: 150px;
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        img {
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: cover;
                            border-radius: 5px;
                        }
                    }

                    .title-price-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    .card-title {
                        display: inline-block;
                        color: white;
                        font-size: 25px;
                        font-weight: 900;
                        transition: all 0.5s ease-in-out;
                        transform: translate3d(0px, 0px, 50px);

                        &:hover {
                            transform: translate3d(0px, 0px, 60px);
                        }
                    }

                    .card-content {
                        margin-top: 10px;
                        font-size: 12px;
                        font-weight: 700;
                        color: #f2f2f2;
                        transition: all 0.5s ease-in-out;
                        transform: translate3d(0px, 0px, 30px);

                        &:hover {
                            transform: translate3d(0px, 0px, 60px);
                        }
                    }

                    .add-card {
                        cursor: pointer;
                        margin-top: 1rem;
                        display: inline-block;
                        font-weight: 900;
                        font-size: 12px;
                        text-transform: uppercase;
                        // color: rgb(7, 185, 255);
                        color: orangered;
                        background: white;
                        padding: 0.5rem 0.7rem;
                        transition: all 0.5s ease-in-out;
                        transform: translate3d(0px, 0px, 20px);

                        &:hover {
                            transform: translate3d(0px, 0px, 60px);
                        }
                    }
                }

                .price-box {
                    position: absolute;
                    top: 30px;
                    right: 30px;
                    height: 60px;
                    width: 60px;
                    background: white;
                    // border: 1px solid rgb(7, 185, 255);
                    border: 1px solid #ff6b35;
                    padding: 10px;
                    transform: translate3d(0px, 0px, 80px);
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;

                    span {
                        display: block;
                        text-align: center;
                    }

                    .price-font {
                        color: orangered;
                        font-size: 9px;
                        font-weight: 700;
                    }

                    .price-number {
                        font-size: 20px;
                        font-weight: 900;
                        color: orangered;
                    }
                }
            }
        }
    }
}
</style>