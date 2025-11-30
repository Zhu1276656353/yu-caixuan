import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cartStore", () => {
    // 购物车商品数据
    const cartItems = ref([]);
    // 优惠券数据
    const coupons = ref([]);
    // 当前激活的优惠券ID
    const activeCouponId = ref(null);

    // 计算购物车商品总数量
    const totalQuantity = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    });

    // 计算原始总价（无折扣）
    const originalTotalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    });

    // 计算应用优惠券后的总价
    const totalPrice = computed(() => {
        let total = originalTotalPrice.value;

        // 如果有激活的优惠券且满足使用条件，则应用折扣
        if (activeCouponId.value) {
            const activeCoupon = coupons.value.find(coupon => coupon.id === activeCouponId.value);
            if (activeCoupon && total >= activeCoupon.originalPrice) {
                total -= activeCoupon.discountedPrice;
            }
        }

        // 确保总价不低于0
        return Math.max(0, total);
    });

    // 增加商品数量
    const increaseQuantity = (id) => {
        const item = cartItems.value.find(item => item.id === id);
        if (item) {
            item.quantity++;
        }
    };

    // 减少商品数量
    const decreaseQuantity = (id) => {
        const item = cartItems.value.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
        }
    };

    // 删除商品
    const removeItem = (id) => {
        const index = cartItems.value.findIndex(item => item.id === id);
        if (index !== -1) {
            cartItems.value.splice(index, 1);
        }
    };

    // 添加商品到购物车
    const addItem = (item) => {
        const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            cartItems.value.push({ ...item, quantity: item.quantity || 1 });
        }
    };

    // 清空购物车
    const clearCart = () => {
        ElMessageBox.confirm('是否要清空购物车', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            cartItems.value = [];
            coupons.value = []; // 同时清空优惠券
            activeCouponId.value = null; // 清除激活的优惠券
            ElMessage({
                type: 'success',
                message: '已清除',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
    };

    // 添加优惠券
    const addCoupon = (coupon) => {
        // 检查是否已存在相同的优惠券
        const existingCoupon = coupons.value.find(c => c.id === coupon.id);
        if (!existingCoupon) {
            coupons.value.push(coupon);
        }
    };

    // 移除优惠券
    const removeCoupon = (id) => {
        const index = coupons.value.findIndex(coupon => coupon.id === id);
        if (index !== -1) {
            coupons.value.splice(index, 1);
            // 如果删除的是当前激活的优惠券，则清除激活状态
            if (activeCouponId.value === id) {
                activeCouponId.value = null;
            }
        }
    };

    // 设置激活的优惠券
    const setActiveCoupon = (couponId) => {
        activeCouponId.value = couponId;
    };

    return {
        cartItems,
        coupons,
        activeCouponId, // 导出激活的优惠券ID
        originalTotalPrice,
        totalQuantity,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        addItem,
        clearCart,
        addCoupon,
        removeCoupon,
        setActiveCoupon
    };
},
    {
        persist: true
    }
);