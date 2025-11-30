<template>
    <div class="cart">
        <div class="btn">
            <!-- 购物车按钮 -->
            <el-button class="cartBtn" round @click="drawer = true">
                <el-badge :value="cartStore.totalQuantity" :max="99" class="item">
                    <div class="cart-content">
                        <el-icon class="icon" size="30" color="orange"><shopping-cart /></el-icon>
                        <p>购物车</p>
                    </div>
                </el-badge>
            </el-button>
            <!-- 回到顶部 -->
            <el-button v-show="showBackTop" class="cartBtn" @click="backToTop">
                <div class="cart-content">
                    <el-icon class="icon" size="30" color="orange">
                        <top />
                    </el-icon>
                    <p>回到顶部</p>
                </div>
            </el-button>
        </div>
        <el-drawer v-model="drawer" title="购物车" :direction="direction" size="40%">
            <div class="cart-drawer-content">
                <!-- 购物车列表 -->
                <div class="cart-items" v-if="cartStore.cartItems.length > 0">
                    <!-- 单个商品列表项 -->
                    <div class="cart-item" v-for="item in cartStore.cartItems" :key="item.id">
                        <div class="item-image">
                            <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                        </div>
                        <!-- 商品名称和价格 -->
                        <div class="item-details">
                            <div class="item-name">{{ item.name }}</div>
                            <div class="item-price">¥{{ item.price }}</div>
                        </div>
                        <!-- 数量控制 -->
                        <div class="item-quantity">
                            <el-button size="small" @click="cartStore.decreaseQuantity(item.id)">-</el-button>
                            <span class="quantity">{{ item.quantity }}</span>
                            <el-button size="small" @click="cartStore.increaseQuantity(item.id)">+</el-button>
                        </div>
                        <!-- 小计金额 -->
                        <div class="item-total">
                            ¥{{ (item.price * item.quantity).toFixed(2) }}
                        </div>
                        <!-- 删除按钮 -->
                        <div class="item-action">
                            <el-button type="danger" size="small" @click="cartStore.removeItem(item.id)">删除</el-button>
                        </div>
                    </div>
                </div>
                <!-- 购物车为空提示 -->
                <div class="empty-cart" v-else>
                    <p>购物车为空</p>
                </div>
                <!-- 优惠券区域 -->
                <div class="coupons-section" v-if="cartStore.coupons.length > 0 && cartStore.cartItems.length > 0">
                    <div class="coupons-title">优惠券 (只能选择一张使用)</div>
                    <el-radio-group v-model="activeCouponId" @change="handleCouponChange">
                        <div class="coupon-item" v-for="coupon in cartStore.coupons" :key="coupon.id">
                            <el-radio :label="coupon.id">
                                满{{ coupon.originalPrice }}减{{ coupon.discountedPrice }}
                            </el-radio>
                        </div>
                    </el-radio-group>
                    <div class="coupon-actions" v-if="activeCouponId">
                        <el-button type="primary" link @click="clearActiveCoupon">取消使用优惠券</el-button>
                    </div>
                </div>
                <!-- 购物车底部总结和计算 -->
                <div class="cart-footer" v-if="cartStore.cartItems.length > 0">
                    <div class="price-details">
                        <div class="original-price" v-if="cartStore.originalTotalPrice !== cartStore.totalPrice">
                            原价: <span class="price">¥{{ cartStore.originalTotalPrice.toFixed(2) }}</span>
                        </div>
                        <div class="total-amount">
                            总计: <span class="total-price">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="cart-actions">
                        <el-button type="danger" size="large" @click="clearCartHandler">清空购物车</el-button>
                        <el-button type="primary" size="large">去结算</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'

// 购物车抽屉组件
const drawer = ref(false)
const direction = ref('rtl');
// 使用购物车 store
const cartStore = useCartStore(); 

// 当前激活的优惠券ID
const activeCouponId = computed({
    get: () => cartStore.activeCouponId || null,
    set: (value) => cartStore.setActiveCoupon(value)
});

// 处理优惠券选择变化
const handleCouponChange = (couponId) => {
    cartStore.setActiveCoupon(couponId || null);
};

// 清除激活的优惠券
const clearActiveCoupon = () => {
    cartStore.setActiveCoupon(null);
};

// 清空购物车
const clearCartHandler = () => {
    cartStore.clearCart();
};


/**
 * 回到顶部开始
 */
// 控制回到顶部按钮的显示
const showBackTop = ref(false);
// 监听滚动事件
const handleScroll = () => {
    showBackTop.value = window.scrollY > 800;
}
// 回到顶部函数
const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
    })
}
// 组件挂载时添加滚动监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
// 组件卸载前移除滚动监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
/**
 * 回到顶部结束
 */
</script>

<style lang="scss" scoped>
.btn {

    // 购物车按钮样式
    .cartBtn {
        display: block;
        position: fixed;
        bottom: 100px;
        right: 50px;
        font-weight: bolder;
        width: 65px;
        height: max-content;
        padding: 10px; // 增加一些内边距使内容居中

        //回到顶部样式
        &:nth-child(2) {
            bottom: 31.5px;
            border-radius: 20px;

            p {
                margin: 0;
                font-size: 12px;
            }
        }

        .cart-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .icon {
                margin-left: -5px;
            }

            p {
                text-align: center;
                margin: 5px 0 0 0;
                color: orangered;
            }
        }
    }
}


//商品信息
.cart-drawer-content {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.cart-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    .item-image {
        width: 120px;
        height: 80px;
        margin-right: 15px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .item-details {
        flex: 1;

        .item-name {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .item-price {
            color: #ff6600;
            font-weight: bold;
        }
    }

    .item-quantity {
        display: flex;
        align-items: center;
        margin: 0 15px;

        .quantity {
            margin: 0 10px;
            min-width: 30px;
            text-align: center;
        }

        .el-button {
            padding: 5px 10px;
        }
    }

    .item-total {
        width: 80px;
        text-align: right;
        font-weight: bold;
        color: #ff6600;
        margin-right: 15px;
    }

    .item-action {
        .el-button {
            padding: 5px 10px;
        }
    }
}

.empty-cart {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #999;
}

// 优惠券区域样式
.coupons-section {
    padding: 15px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .coupons-title {
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }

    .coupon-item {
        margin-bottom: 8px;

        .el-radio {
            font-size: 14px;
            width: 100%;
            margin-left: 10px;
        }
    }

    .coupon-actions {
        margin-top: 10px;
        text-align: right;
    }
}


.cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #eee;

    .total-amount {
        font-size: 18px;
        font-weight: bold;

        .total-price {
            color: #ff6600;
            font-size: 20px;
        }
    }

    .el-button {
        padding: 10px 30px;
    }
}
</style>