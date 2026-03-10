<template>
    <div class="count">
        <div class="count-title">宠粉礼券·优惠多多</div>
        <div class="count-content">
            <div class="card" v-for="(item, index) in discount.list" :key="index" @click="handleCouponClick(item)">
                <div class="card-left">{{ item.discountedPrice }}</div>
                <div class="card-right">
                    <p class="card-info">满{{ item.originalPrice }}元送{{ item.discountedPrice }}元优惠券</p>
                    <button class="card-btn" alt="点击领取">
                        <i>点</i>
                        <i>击</i>
                        <i>领</i>
                        <i>取</i>
                    </button>
                </div>
            </div>
        </div>
        <div class="count-end">本店默认使用顺丰发货</div>
    </div>
</template>
<script setup>
import api from "../../api/index.js";
import { ref, reactive, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore.js";
const cartStore = useCartStore();
const discount = reactive({
    list: []
})
onMounted(() => {
    // 获取优惠券数据
    api.getDiscount().then(res => {
        discount.list = res.data.data
    })
})
// 处理优惠券点击事件
const handleCouponClick = (coupon) => {
    // 检查购物车金额是否满足优惠券使用条件
    //这里coupon是item传来的discount.list中数据
    if (cartStore.originalTotalPrice >= coupon.originalPrice) {
        // 添加优惠券到购物车
        cartStore.addCoupon({
            id: coupon.id || Date.now(), // 如果没有ID，使用时间戳作为唯一ID
            originalPrice: coupon.originalPrice,
            discountedPrice: coupon.discountedPrice
        });
        ElMessage({
            message: `成功领取${coupon.discountedPrice}元优惠券！`,
            type: 'success'
        });
    } else {
        ElMessage({
            message: `购物车金额未满${coupon.originalPrice}元，无法领取此优惠券`,
            type: 'warning'
        });
    }
};
</script>
<style lang="scss" scoped>
/**优惠券 */
.count {
    width: 100%;
    margin: 30px 0;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 20px 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    .count-title {
        font-size: 30px;
        letter-spacing: 5px;
        font-weight: bold;
        color: #333;
        text-align: center;
        margin-bottom: 30px;
        text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    }

    .count-content {
        display: flex;
        width: 60%;
        height: 150px;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;

        .card {
            display: flex;
            align-items: center;
            height: calc(100% - 20px);
            font-weight: bolder;
            background: linear-gradient(90deg, #FFF8DC 30%, #F93B00 100%);
            border: 1px solid #ddd;
            border-radius: 8px;
            mask-image: radial-gradient(circle at 88px 12px, transparent 12px, red 12.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
            mask-size: 100%, 7px 11px;
            mask-repeat: repeat, repeat-y;
            mask-position: 0 -12px, 84.5px;
            mask-composite: source-out;
            mask-composite: subtract;
            transition: 0.2s;
            cursor: pointer;
            position: relative;
            z-index: 1;

            &:hover {
                .card-btn {
                    color: rgba(0, 0, 0, 1);
                }

                transform: perspective(1000px) translate3d(0, -5px, 10px);
                transition: 0.2s;
            }

            //卡片左侧
            .card-left {
                width: 88px;
                text-align: center;
                font-size: 30px;
                color: #F22424;
            }

            .card-left span {
                font-size: 10px;
            }

            //卡片右侧
            .card-right {
                padding: 16px 12px;
                display: flex;
                flex: 1;
                flex-direction: column;
            }

            .card-info {
                box-sizing: border-box;
                margin: 0;
                font-size: 14px;
                line-height: 20px;
                color: rgba(33, 32, 44, 0.9);
                padding-bottom: 15px;
            }

            .card-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 30px;
                position: relative;
                padding: 0 20px;
                font-size: 18px;
                text-transform: uppercase;
                border: 0;
                box-shadow: #fbebae 0px 5px 0px 0px;
                background-color: #FFF8DC;
                border-radius: 12px;
                overflow: hidden;
                transition: 31ms cubic-bezier(.5, .7, .4, 1);
                cursor: pointer;

                &:before {
                    content: attr(alt);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    inset: 0;
                    font-size: 15px;
                    font-weight: bold;
                    color: #F93B00;
                    letter-spacing: 4px;
                    opacity: 1;
                }

                &:active {
                    box-shadow: none;
                    transform: translateY(7px);
                    transition: 35ms cubic-bezier(.5, .7, .4, 1);
                }

                &:hover:before {
                    transition: all .0s;
                    transform: translateY(100%);
                    opacity: 0;
                }

                i {
                    color: #F93B00;
                    font-size: 15px;
                    font-weight: bold;
                    letter-spacing: 4px;
                    font-style: normal;
                    transition: all 2s ease;
                    transform: translateY(-20px);
                    opacity: 0;
                }

                &:hover i {
                    transition: all .2s ease;
                    transform: translateY(0px);
                    opacity: 1;
                }

                &:hover i:nth-child(1) {
                    transition-delay: 0.045s;
                }

                &:hover i:nth-child(2) {
                    transition-delay: calc(0.045s * 3);
                }

                &:hover i:nth-child(3) {
                    transition-delay: calc(0.045s * 4);
                }

                &:hover i:nth-child(4) {
                    transition-delay: calc(0.045s * 5);
                }
            }
        }

    }

    .count-end {
        text-align: center;
        font-size: 10px;
        letter-spacing: 5px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
        padding: 20px 0;
    }
}

/* 响应式：平板横屏 */
@media (max-width: 1200px) {
    .count {
        .count-content {
            width: 80%;
        }

        .count-title {
            font-size: 26px;
            letter-spacing: 4px;
        }
    }
}

/* 响应式：平板竖屏 */
@media (max-width: 992px) {
    .count {
        margin: 25px 0;
        padding: 18px 0;

        .count-title {
            font-size: 24px;
            letter-spacing: 3px;
            margin-bottom: 25px;
        }

        .count-content {
            width: 90%;
            height: 140px;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;

            .card {
                flex: 1 1 calc(50% - 15px);
                min-width: 280px;
                height: 130px;
                mask-image: radial-gradient(circle at 70px 12px, transparent 12px, red 12.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
                mask-position: 0 -12px, 66.5px;

                .card-left {
                    width: 70px;
                    font-size: 26px;
                }

                .card-right {
                    padding: 12px 10px;
                }

                .card-info {
                    font-size: 13px;
                    line-height: 18px;
                    padding-bottom: 10px;
                }

                .card-btn {
                    height: 26px;
                    padding: 0 16px;
                    font-size: 14px;

                    &:before {
                        font-size: 13px;
                        letter-spacing: 3px;
                    }

                    i {
                        font-size: 13px;
                        letter-spacing: 3px;
                    }
                }
            }
        }

        .count-end {
            font-size: 9px;
            letter-spacing: 4px;
            padding: 18px 0;
        }
    }
}

/* 响应式：手机横屏 / 小屏 */
@media (max-width: 768px) {
    .count {
        margin: 20px 0;
        padding: 15px 0;

        .count-title {
            font-size: 22px;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }

        .count-content {
            width: 95%;
            height: auto;
            flex-direction: column;
            gap: 15px;
            align-items: stretch;

            .card {
                flex: none;
                width: 100%;
                min-width: unset;
                height: 110px;
                mask-image: radial-gradient(circle at 60px 12px, transparent 12px, red 12.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
                mask-position: 0 -12px, 56.5px;

                .card-left {
                    width: 60px;
                    font-size: 22px;
                }

                .card-right {
                    padding: 10px 8px;
                }

                .card-info {
                    font-size: 12px;
                    line-height: 16px;
                    padding-bottom: 8px;
                }

                .card-btn {
                    height: 24px;
                    padding: 0 12px;
                    font-size: 12px;

                    &:before {
                        font-size: 12px;
                        letter-spacing: 2px;
                    }

                    i {
                        font-size: 12px;
                        letter-spacing: 2px;
                    }
                }
            }
        }

        .count-end {
            font-size: 8px;
            letter-spacing: 3px;
            padding: 15px 0;
        }
    }
}

/* 响应式：手机竖屏 */
@media (max-width: 576px) {
    .count {
        margin: 15px 0;
        padding: 15px 10px;

        .count-title {
            font-size: 20px;
            letter-spacing: 2px;
            margin-bottom: 15px;
        }

        .count-content {
            width: 100%;
            gap: 12px;

            .card {
                height: 100px;
                mask-image: radial-gradient(circle at 55px 12px, transparent 10px, red 10.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
                mask-position: 0 -12px, 51.5px;

                .card-left {
                    width: 55px;
                    font-size: 20px;
                }

                .card-right {
                    padding: 8px 6px;
                }

                .card-info {
                    font-size: 11px;
                    line-height: 15px;
                    padding-bottom: 6px;
                }

                .card-btn {
                    height: 22px;
                    padding: 0 10px;
                    font-size: 11px;

                    &:before {
                        font-size: 11px;
                        letter-spacing: 1px;
                    }

                    i {
                        font-size: 11px;
                        letter-spacing: 1px;
                    }
                }
            }
        }

        .count-end {
            font-size: 7px;
            letter-spacing: 2px;
            padding: 12px 0;
        }
    }
}

/* 响应式：超小屏手机 */
@media (max-width: 380px) {
    .count {
        .count-content .card {
            height: 90px;
            mask-image: radial-gradient(circle at 50px 12px, transparent 10px, red 10.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
            mask-position: 0 -12px, 46.5px;

            .card-left {
                width: 50px;
                font-size: 18px;
            }

            .card-info {
                font-size: 10px;
            }

            .card-btn {
                height: 20px;
                font-size: 10px;
            }
        }
    }
}
</style>