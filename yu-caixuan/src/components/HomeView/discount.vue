<template>
    <div class="count">
        <div class="count-title">宠粉礼券·优惠多多</div>
        <div class="count-content">
            <div class="card" v-for="(item, index) in discount.list" :key="index"  @click="handleCouponClick(item)">
                <div class="card-left">{{ item.discountedPrice }}</div>
                <div class="card-right">
                    <p class="card-info">满{{ item.originalPrice }}元送{{ item.discountedPrice }}元优惠券</p>
                    <button class="card-btn">点击领取</button>
                </div>
            </div>
        </div>
        <div class="count-end">本店满500元享88折扣/默认使用顺丰发货</div>
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
    background-color: white;
    padding: 20px 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

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
            background-image: linear-gradient(80deg, #dfdae9 0%, #f9eeca 100%);
            border: 3px solid rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            mask-image: radial-gradient(circle at 88px 12px, transparent 12px, red 12.5px), radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
            mask-size: 100%, 7px 11px;
            mask-repeat: repeat, repeat-y;
            mask-position: 0 -12px, 84.5px;
            mask-composite: source-out;
            mask-composite: subtract;
            transition: 0.2s;
            cursor: pointer;

            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                transition: opacity 0.3s ease;
            }

            .card::before {
                // background-image: linear-gradient(90deg, #fff1eb 0%, #ace0f9 100%);
                background-image: linear-gradient(80deg, #dfdae9 0%, #f9eeca 100%);
                z-index: -1;
            }

            &::after {
                background-image: linear-gradient(-82deg, #dfdae9 50%, #f9eeca 100%);
                z-index: -2;
                opacity: 0;
            }

            &:hover::before {
                opacity: 0;
            }

            &:hover::after {
                opacity: 1;
            }

            &:hover {
                .card-btn {
                    color: rgba(0, 0, 0, 1);
                }

                transform: perspective(1000px) translate3d(0, -5px, 10px);
            }

            .card-left {
                width: 88px;
                text-align: center;
                font-size: 30px;
                color: #F22424;
            }

            .card-left span {
                font-size: 10px;
            }

            .card-right {
                padding: 16px 12px;
                display: flex;
                flex: 1;
                flex-direction: column;
            }

            .card-info {
                margin: 0;
                font-size: 14px;
                line-height: 20px;
                color: rgba(33, 32, 44, 0.9);
                margin-top: 20px;
            }

            .card-btn {
                width: max-content;
                margin: 0px auto;
                margin-top: 16px;
                box-sizing: border-box;
                border: 5px solid rgba(255, 255, 255, 0.8);
                border-radius: 15px;
                background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
                padding: 5px 10px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
            }
        }

    }

    .count-end {
        text-align: center;
        font-size: 10px;
        letter-spacing: 5px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        padding: 20px 0;

    }
}
// 超小设备响应式 (最大宽度 480px) - 手机竖屏
@media screen and (max-width: 480px) {
    .count {
        margin: 20px 0;
        padding: 15px 0;

        .count-title {
            font-size: 22px;
            letter-spacing: 3px;
            margin-bottom: 20px;
        }

        .count-content {
            width: 95%;
            height: auto;
            flex-direction: column;
            gap: 15px;

            .card {
                width: 100%;
                height: 100px;

                .card-left {
                    width: 70px;
                    font-size: 24px;
                }

                .card-right {
                    padding: 10px 8px;

                    .card-info {
                        font-size: 12px;
                        margin-top: 10px;
                        margin-left: 100px;
                        line-height: 16px;
                    }

                    .card-btn {
                        margin-top: 10px;
                        padding: 4px 8px;
                        font-size: 10px;
                        border: 3px solid rgba(255, 255, 255, 0.8);
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

// 小型设备响应式 (481px - 767px) - 手机横屏
@media screen and (min-width: 481px) and (max-width: 767px) {
    .count {
        margin: 25px 0;
        padding: 18px 0;

        .count-title {
            font-size: 26px;
            letter-spacing: 4px;
            margin-bottom: 25px;
        }

        .count-content {
            width: 90%;
            height: 130px;

            .card {
                height: calc(100% - 15px);

                .card-left {
                    width: 80px;
                    font-size: 28px;
                }

                .card-right {
                    padding: 12px 10px;

                    .card-info {
                        font-size: 13px;
                        margin-top: 15px;
                    }

                    .card-btn {
                        margin-top: 12px;
                        padding: 4px 8px;
                        font-size: 11px;
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

// 平板设备响应式 (768px - 1024px) - 平板
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .count {
        margin: 28px 0;
        padding: 19px 0;

        .count-title {
            font-size: 28px;
            letter-spacing: 4px;
            margin-bottom: 28px;
        }

        .count-content {
            width: 85%;
            height: 140px;

            .card {
                height: calc(100% - 18px);

                .card-left {
                    width: 85px;
                    font-size: 29px;
                }

                .card-right {
                    padding: 14px 11px;

                    .card-info {
                        font-size: 13px;
                        margin-top: 18px;
                    }

                    .card-btn {
                        margin-top: 14px;
                        padding: 5px 9px;
                        font-size: 11px;
                    }
                }
            }
        }

        .count-end {
            font-size: 9px;
            letter-spacing: 4px;
            padding: 19px 0;
        }
    }
}

// 桌面设备响应式 (1024px及以上) - 桌面
@media screen and (min-width: 1024px) and (max-width: 1440px) {
    .count {
        width: 100%;
        margin: 30px 0;
        padding: 20px 0;

        .count-title {
            font-size: 30px;
            letter-spacing: 5px;
            margin-bottom: 30px;
        }

        .count-content {
            width: 60%;
            height: 150px;
            margin-left: 100px;
            .card {
                height: calc(100% - 20px);
                margin-right: 10px;

                .card-left {
                    width: 88px;
                    font-size: 30px;
                }

                .card-right {
                    padding: 16px 12px;

                    .card-info {
                        font-size: 14px;
                        margin-top: 20px;
                    }

                    .card-btn {
                        margin-top: 16px;
                        padding: 5px 10px;
                        font-size: 12px;
                    }
                }
            }
        }

        .count-end {
            font-size: 10px;
            letter-spacing: 5px;
            padding: 20px 0;
        }
    }
}
</style>