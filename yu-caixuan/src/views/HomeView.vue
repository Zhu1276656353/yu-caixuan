<template>
    <div class="home">
        <div class="topSwiper">
            <el-carousel :interval="3000" type="card" height="400px">
                <el-carousel-item v-for="(item, index) in sliderArr" :key="index">
                    <div class="carousel-item-wrapper">
                        <img :src="item.image" :alt="item.title">
                        <div class="carousel-content">
                            <div class="card-content">
                                <h2 class="card-title">{{ item.title }}</h2>
                                <p class="card-desc">{{ item.desc }}</p>
                                <el-button class="explore-btn" @click="exploreMore(index)">立即探索</el-button>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <discountComponent></discountComponent>
        <goodsGroupComponent></goodsGroupComponent>
        <hotProductsComponent></hotProductsComponent>
        <newProductsComponent></newProductsComponent>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
// 引入Element Plus按钮组件
import { ElButton } from "element-plus"
// 引入优惠券组件
import discountComponent from "@/components/HomeView/discount.vue"
import goodsGroupComponent from "@/components/HomeView/goodsGroup.vue"
import hotProductsComponent from "@/components/HomeView/hotProducts.vue";
import newProductsComponent from "@/components/HomeView/newProducts.vue";

const router = useRouter()

//幻灯片数据
const sliderArr = ref([
    {
        title: "海洋奇观",
        desc: "探索神秘的海底世界，感受海洋的无限魅力。与五彩斑斓的海洋生物共舞，体验大自然的神奇造化。",
        image: new URL('@/assets/海洋.png', import.meta.url).href
    },
    {
        title: "珊瑚花园",
        desc: "欣赏绚烂多彩的珊瑚世界，打造您的海底花园。每一株珊瑚都是大自然的艺术品，为您的水族箱增添生机。",
        image: new URL('@/assets/珊瑚.jpg', import.meta.url).href
    },
    {
        title: "海底鱼群",
        desc: "与五彩斑斓的海底鱼群共舞，感受生命的活力。从热带鱼到珍稀品种，为您带来视觉盛宴。",
        image: new URL('@/assets/海底鱼.jpg', import.meta.url).href
    },
    {
        title: "宝石花海",
        desc: "观赏珍贵的宝石花，体验海洋生物的奇妙之美。这些美丽的生物将为您的水族世界增添独特的魅力。",
        image: new URL('@/assets/宝石花.jpg', import.meta.url).href
    }
]);

const exploreMore = (index) => {
    // 根据不同的幻灯片跳转到相应页面
    switch (index) {
        case 0:
            window.open('https://zhuanlan.zhihu.com/p/271654074', '_blank')
            break
        case 1:
            window.open('https://www.hellodive.com/dive/pointlist/21.html', '_blank')
            break
        case 2:
            window.open('https://www.sohu.com/a/432302071_363919', '_blank')
            break
        case 3:
            window.open('https://www.cmfish.com/kinds/fishdetail.php?id=651&fanwei=39', '_blank')
            break
        default:
            router.push('/')
    }
}
</script>
<style lang="scss" scoped>
.home {
    width: 100%;

    .topSwiper {
        margin: 50px 0;

        .el-carousel__item {
            border-radius: 10px;
            overflow: hidden;

            .carousel-item-wrapper {
                position: relative;
                width: 100%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .carousel-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);

                    .card-content {
                        padding: 30px;
                        color: white;
                        max-width: 50%;

                        .card-title {
                            font-size: 28px;
                            font-weight: bold;
                            margin-bottom: 15px;
                            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                        }

                        .card-desc {
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 20px;
                            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                        }

                        .explore-btn {
                            background-color: #ff6b35;
                            border-color: #ff6b35;
                            color: white;
                            font-weight: bold;
                            padding: 12px 24px;
                            border-radius: 25px;
                            transition: all 0.3s ease;

                            &:hover {
                                background-color: #e55a2b;
                                transform: translateY(-2px);
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                            }
                        }
                    }
                }
            }
        }

        /* 卡片类型轮播图的背景色 */
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }
    }
}
</style>