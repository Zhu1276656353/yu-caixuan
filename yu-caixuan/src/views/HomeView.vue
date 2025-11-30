<template>
    <div class="home">
        <div class="topSwiper">
            <el-carousel trigger="click" height="600px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="@/assets/海洋.png" alt="">
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
import { useRouter } from "vue-router";
// 引入优惠券组件
import discountComponent from "@/components/HomeView/discount.vue"
import goodsGroupComponent from "@/components/HomeView/goodsGroup.vue"
import hotProductsComponent from "@/components/HomeView/hotProducts.vue";
import newProductsComponent from "@/components/HomeView/newProducts.vue";
const router = useRouter()
</script>
<style lang="scss" scoped>
.home {
    width: 100%;

    /**轮播图 */
    .topSwiper {
        width: 100%;
        height: 600px;

        .demonstration {
            color: var(--el-text-color-secondary);
        }

        .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
            text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>