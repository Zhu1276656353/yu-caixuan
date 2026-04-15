<template>
    <div class="checkout">
        <div class="checkout-container">
            <el-steps :active="activeStep" finish-status="success" align-center class="checkout-steps"
                :process-status="activeStep === 2 && !orderSubmitted ? 'process' : 'success'">
                <el-step title="订单确认" />
                <el-step title="填写收货信息" />
                <el-step title="提交订单" />
            </el-steps>

            <!-- 步骤1: 订单确认 -->
            <div v-if="activeStep === 0" class="step-content">
                <div class="section-title">订单商品信息</div>
                <div class="order-items">
                    <div class="order-item" v-for="item in orderItems" :key="item.id">
                        <div class="item-image">
                            <img :src="'http://localhost:3000' + item.image" :alt="item.name">
                        </div>
                        <div class="item-details">
                            <div class="item-name">{{ item.name }}</div>
                            <div class="item-price">¥{{ item.price }}</div>
                        </div>
                        <div class="item-quantity">数量: {{ item.quantity }}</div>
                        <div class="item-total">小计: ¥{{ (item.price * item.quantity).toFixed(2) }}</div>
                    </div>
                </div>
                <!-- 订单总价格 -->
                <div class="order-summary">
                    <div class="summary-item">
                        <span>商品总价:</span>
                        <span>¥{{ originalTotalPrice.toFixed(2) }}</span>
                    </div>
                    <div class="summary-item" v-if="activeCoupon">
                        <span>优惠券减免:</span>
                        <span>-¥{{ (originalTotalPrice - totalPrice).toFixed(2) }}</span>
                    </div>
                    <div class="summary-item total">
                        <span>应付总额:</span>
                        <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
                    </div>
                </div>

                <div class="checkout-actions">
                    <el-button @click="router.go(-1)">返回购物车</el-button>
                    <el-button type="primary" @click="nextStep">确认订单</el-button>
                </div>
            </div>

            <!-- 步骤2: 填写收货信息 -->
            <div v-if="activeStep === 1" class="step-content">
                <div class="section-title">收货信息</div>
                <el-form :model="deliveryForm" :rules="deliveryRules" ref="deliveryFormRef" label-width="100px">
                    <el-form-item label="收货人" prop="name">
                        <el-input v-model="deliveryForm.name" placeholder="请输入收货人姓名" />
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="deliveryForm.phone" placeholder="请输入联系电话" />
                    </el-form-item>
                    <el-form-item label="收货地址" prop="address">
                        <el-input v-model="deliveryForm.address" placeholder="请输入详细收货地址" type="textarea" />
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="deliveryForm.remark" placeholder="请输入订单备注（可选）" type="textarea" />
                    </el-form-item>
                </el-form>

                <div class="checkout-actions">
                    <el-button @click="prevStep">上一步</el-button>
                    <el-button type="primary" @click="submitOrder">提交订单</el-button>
                </div>
            </div>

            <!-- 步骤3: 提交订单 -->
            <div v-if="activeStep === 2" class="step-content">
                <div class="order-success" v-if="orderSubmitted">
                    <el-icon class="success-icon" color="#67C23A" size="60">
                        <Check />
                    </el-icon>
                    <div class="success-message">订单提交成功！</div>
                    <div class="order-number">订单编号: <span>{{ orderNumber }}</span></div>
                    <div class="order-amount">应付金额: <span>¥{{ Number(orderTotalAmount || 0).toFixed(2) }}</span></div>
                    <div class="order-warn">请添加微信: <span> 18226254503</span>付款并备注订单号</div>
                    <div class="success-actions">
                        <el-button @click="router.push('/')">继续购物</el-button>
                        <!-- <el-button type="primary" @click="router.push('/user/orders')">查看订单</el-button> -->
                        <el-button type="primary" @click="checkOrder">查看订单</el-button>
                    </div>
                </div>

                <div class="order-processing" v-else>
                    <el-skeleton :rows="5" animated />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore.js';
import { useRouter } from 'vue-router';
import { Check } from '@element-plus/icons-vue';
import api from '@/api/index.js';

const router = useRouter();
const cartStore = useCartStore();

// 步骤控制
const activeStep = ref(0);

// 订单商品信息
const orderItems = computed(() => cartStore.cartItems);

// 价格计算
const originalTotalPrice = computed(() => cartStore.originalTotalPrice);
const totalPrice = computed(() => cartStore.totalPrice);
const activeCoupon = computed(() => {
    if (cartStore.activeCouponId) {
        return cartStore.coupons.find(coupon => coupon.id === cartStore.activeCouponId);
    }
    return null;
});

// 收货信息表单
const deliveryForm = ref({
    name: '',
    phone: '',
    address: '',
    remark: ''
})
// 收货信息表单验证规则
const deliveryRules = {
    name: [
        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入收货地址', trigger: 'blur' }
    ]
}

const deliveryFormRef = ref(null);

// 订单提交状态
const orderSubmitted = ref(false);
const orderNumber = ref('');
const orderTotalAmount = ref(0);// 添加这一行用于保存订单金额

// 步骤控制方法
const nextStep = () => {
    if (orderItems.value.length === 0) {
        ElMessage.warning('购物车为空，请先添加商品');
        router.push('/');
        return;
    }
    activeStep.value++;
}

const prevStep = () => {
    activeStep.value--;
}
// 提交订单
const submitOrder = () => {
    deliveryFormRef.value.validate((valid) => {
        if (valid) {
            // 保存订单金额，防止购物车清空后金额变为0
            const orderAmount = cartStore.totalPrice;

            // 设置订单金额，确保在清空购物车前保存
            orderTotalAmount.value = orderAmount;

            // 准备订单数据
            const orderData = {
                name: deliveryForm.value.name,
                phone: deliveryForm.value.phone,
                address: deliveryForm.value.address,
                remark: deliveryForm.value.remark,
                items: cartStore.cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price),
                    image: item.image,
                    quantity: parseInt(item.quantity)
                })),
                totalAmount: parseFloat(cartStore.totalPrice),
            };
            // // 模拟提交订单
            orderSubmitted.value = false;
            // activeStep.value++;//？？？？？调整不好，使用下面的代码代替
            activeStep.value = 2;// 跳转到步骤3

            // 调用API提交订单
            api.getCheckout(orderData).then(res => {
                if (res.data.status === 200) {
                    // 提交时弹窗提醒加微信付款
                    ElMessageBox.confirm('提交订单后请添加微信:18226254503付款,并备注订单号', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        // 生成订单号
                        orderNumber.value = res.data.data.orderNumber;
                        orderSubmitted.value = true;
                        // 清空购物车
                        cartStore.clearCart();
                    }).catch(() => {
                        // 用户取消操作
                        orderNumber.value = res.data.data.orderNumber;
                        orderSubmitted.value = true;
                        // 清空购物车
                        cartStore.clearCart();
                    });
                } else {
                    ElMessage.error(res.data.msg || '订单提交失败')
                    // 如果提交失败，回退到上一步
                    activeStep.value--;
                }
            }).catch(error => {
                console.error('订单提交失败:', error)
                ElMessage.error('订单提交失败，请稍后重试');
                // 如果提交失败，回退到上一步
                activeStep.value--;
                orderSubmitted.value = false;
            })
        } else {
            ElMessage.error('请完善收货信息')
            return false;
        }
    })
}
// 查看订单详情
const checkOrder = () => {
    ElMessageBox.confirm('查询订单请添加微信:18226254503,并备注订单号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
}
// 页面加载时检查购物车
onMounted(() => {
    if (cartStore.cartItems.length === 0) {
        ElMessage.warning('购物车为空，请先添加商品');
        router.push('/');
    }
})
</script>

<style lang="scss" scoped>
.checkout {
    padding: 20px;
    min-height: calc(100vh - 350px);
    margin-bottom: 5vh;
}

.checkout-container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.step-content{
    background-color: rgba(0, 0, 0, 0.05);
    padding: 20px;
    border-radius: 5px;
}
.checkout-steps {
    margin-bottom: 30px;
}

.section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.order-items {
    margin-bottom: 20px;
}

.order-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    .item-image {
        width: 100px;
        height: 70px;
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
        width: 100px;
        text-align: center;
    }

    .item-total {
        width: 120px;
        text-align: right;
        font-weight: bold;
        color: #ff6600;
    }
}

.order-summary {
    background: rgba(255, 255, 255, 0.6);
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        &.total {
            font-size: 18px;
            font-weight: bold;
            border-top: 1px solid #eee;
            padding-top: 10px;
            margin-top: 10px;

            .total-price {
                color: #ff6600;
                font-size: 20px;
            }
        }
    }
}

.checkout-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.order-success {
    text-align: center;
    padding: 50px 0;

    .success-icon {
        margin-bottom: 20px;
    }

    .success-message {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .order-number,
    .order-amount,
    .order-warn {
        margin-bottom: 10px;
        font-size: 16px;

        span {
            font-weight: bold;
            color: orangered;
        }
    }

    .success-actions {
        margin-top: 30px;

        .el-button {
            margin: 0 10px;
        }
    }
}

.order-processing {
    padding: 50px 0;
}
</style>