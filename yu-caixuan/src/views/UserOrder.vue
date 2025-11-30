<template>
  <div class="user-orders">
    <h1>我的订单</h1>
    <!-- 
      ！！！！！！！！！！！！！！
        功能没完善
    
    -->
    <!-- 订单列表 -->
    <div class="orders-container" v-if="orders.length > 0">
      <div 
        class="order-item" 
        v-for="order in orders" 
        :key="order.id"
        @click="viewOrderDetails(order.id)"
      >
        <div class="order-header">
          <span class="order-id">订单号: {{ order.id }}</span>
          <span class="order-status" :class="order.status">{{ getOrderStatusText(order.status) }}</span>
        </div>
        <div class="order-content">
          <div class="order-products">
            <div 
              class="product-item" 
              v-for="product in order.products.slice(0, 3)" 
              :key="product.id"
            >
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-info">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-price">¥{{ product.price }}</div>
              </div>
              <div class="product-quantity">x{{ product.quantity }}</div>
            </div>
            <div class="more-products" v-if="order.products.length > 3">
              ...还有{{ order.products.length - 3 }}件商品
            </div>
          </div>
          <div class="order-summary">
            <div class="total-amount">总计: ¥{{ order.totalAmount }}</div>
            <div class="order-date">{{ formatDate(order.date) }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空订单提示 -->
    <div class="empty-orders" v-else>
      <p>您还没有订单</p>
      <router-link to="/" class="go-shopping">去购物</router-link>
    </div>
    
    <!-- 订单详情模态框 -->
    <div class="modal" v-if="showDetailModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>订单详情</h2>
        <div class="order-detail" v-if="currentOrder">
          <div class="detail-header">
            <div>订单号: {{ currentOrder.id }}</div>
            <div class="order-status" :class="currentOrder.status">{{ getOrderStatusText(currentOrder.status) }}</div>
          </div>
          <div class="detail-products">
            <div 
              class="detail-product-item" 
              v-for="product in currentOrder.products" 
              :key="product.id"
            >
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-info">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-spec">{{ product.spec }}</div>
              </div>
              <div class="product-price-quantity">
                <div>¥{{ product.price }}</div>
                <div>x{{ product.quantity }}</div>
              </div>
              <div class="product-total">¥{{ (product.price * product.quantity).toFixed(2) }}</div>
            </div>
          </div>
          <div class="detail-summary">
            <div class="summary-item">
              <span>商品总额:</span>
              <span>¥{{ currentOrder.subtotal }}</span>
            </div>
            <div class="summary-item">
              <span>运费:</span>
              <span>¥{{ currentOrder.shippingFee }}</span>
            </div>
            <div class="summary-item total">
              <span>总计:</span>
              <span>¥{{ currentOrder.totalAmount }}</span>
            </div>
          </div>
          <div class="detail-info">
            <div class="info-section">
              <h3>收货信息</h3>
              <p>收货人: {{ currentOrder.shippingInfo.name }}</p>
              <p>联系电话: {{ currentOrder.shippingInfo.phone }}</p>
              <p>收货地址: {{ currentOrder.shippingInfo.address }}</p>
            </div>
            <div class="info-section">
              <h3>订单信息</h3>
              <p>下单时间: {{ formatDate(currentOrder.date) }}</p>
              <p>支付方式: {{ currentOrder.paymentMethod }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 模拟订单数据
const orders = ref([])
const showDetailModal = ref(false)
const currentOrder = ref(null)

// 获取订单数据
const fetchOrders = () => {
  // 模拟API调用
  setTimeout(() => {
    orders.value = [
      {
        id: '20230615001',
        status: 'completed',
        date: '2023-06-15T14:30:00',
        totalAmount: 298.50,
        subtotal: 288.50,
        shippingFee: 10.00,
        paymentMethod: '支付宝',
        shippingInfo: {
          name: '张三',
          phone: '138****8888',
          address: '广东省深圳市南山区科技园南区XX栋XX室'
        },
        products: [
          {
            id: 1,
            name: '热带观赏鱼A',
            spec: '尺寸: 10cm 颜色: 红色',
            price: 88.00,
            quantity: 1,
            image: 'https://via.placeholder.com/80x80?text=鱼1'
          },
          {
            id: 2,
            name: '水草套装',
            spec: '品种: 水榕+莫斯',
            price: 68.50,
            quantity: 2,
            image: 'https://via.placeholder.com/80x80?text=水草'
          },
          {
            id: 3,
            name: '鱼缸过滤器',
            spec: '型号: F-200',
            price: 132.00,
            quantity: 1,
            image: 'https://via.placeholder.com/80x80?text=过滤器'
          }
        ]
      },
      {
        id: '20230610002',
        status: 'shipped',
        date: '2023-06-10T09:15:00',
        totalAmount: 156.00,
        subtotal: 146.00,
        shippingFee: 10.00,
        paymentMethod: '微信支付',
        shippingInfo: {
          name: '张三',
          phone: '138****8888',
          address: '广东省深圳市南山区科技园南区XX栋XX室'
        },
        products: [
          {
            id: 4,
            name: '海水鱼食',
            spec: '规格: 200g',
            price: 56.00,
            quantity: 1,
            image: 'https://via.placeholder.com/80x80?text=鱼食'
          },
          {
            id: 5,
            name: '水质测试剂',
            spec: '型号: T-100',
            price: 100.00,
            quantity: 1,
            image: 'https://via.placeholder.com/80x80?text=测试剂'
          }
        ]
      },
      {
        id: '20230605003',
        status: 'pending',
        date: '2023-06-05T16:45:00',
        totalAmount: 88.00,
        subtotal: 78.00,
        shippingFee: 10.00,
        paymentMethod: '未支付',
        shippingInfo: {
          name: '张三',
          phone: '138****8888',
          address: '广东省深圳市南山区科技园南区XX栋XX室'
        },
        products: [
          {
            id: 6,
            name: '观赏鱼B',
            spec: '尺寸: 8cm 颜色: 蓝色',
            price: 88.00,
            quantity: 1,
            image: 'https://via.placeholder.com/80x80?text=鱼2'
          }
        ]
      }
    ]
  }, 500)
}

// 查看订单详情
const viewOrderDetails = (orderId) => {
  currentOrder.value = orders.value.find(order => order.id === orderId)
  showDetailModal.value = true
}

// 关闭模态框
const closeModal = () => {
  showDetailModal.value = false
  currentOrder.value = null
}

// 获取订单状态文本
const getOrderStatusText = (status) => {
  const statusMap = {
    pending: '待付款',
    paid: '已付款',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知状态'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 组件挂载时获取订单数据
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.user-orders {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.user-orders h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.order-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.order-id {
  font-weight: bold;
  color: #666;
}

.order-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.order-status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.order-status.paid {
  background-color: #d1ecf1;
  color: #0c5460;
}

.order-status.shipped {
  background-color: #cce5ff;
  color: #004085;
}

.order-status.completed {
  background-color: #d4edda;
  color: #155724;
}

.order-status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-content {
  display: flex;
  justify-content: space-between;
}

.order-products {
  flex: 1;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.product-price {
  color: #e74c3c;
  font-weight: bold;
}

.product-quantity {
  font-weight: bold;
}

.more-products {
  color: #999;
  font-size: 14px;
}

.order-summary {
  text-align: right;
}

.total-amount {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 5px;
}

.order-date {
  color: #999;
  font-size: 14px;
}

.empty-orders {
  text-align: center;
  padding: 50px 0;
  color: #999;
}

.go-shopping {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.go-shopping:hover {
  background-color: #2980b9;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 20px;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: #999;
}

.close:hover {
  color: #333;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-products {
  margin-bottom: 20px;
}

.detail-product-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-product-item .product-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}

.product-info {
  flex: 1;
}

.product-spec {
  color: #999;
  font-size: 14px;
  margin-top: 5px;
}

.product-price-quantity {
  width: 100px;
  text-align: center;
  color: #666;
}

.product-total {
  width: 100px;
  text-align: right;
  font-weight: bold;
  color: #e74c3c;
}

.detail-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.info-section {
  margin-bottom: 20px;
}

.info-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.info-section p {
  margin-bottom: 8px;
  color: #666;
}

@media (max-width: 768px) {
  .order-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .order-summary {
    text-align: left;
  }
  
  .detail-product-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .product-price-quantity,
  .product-total {
    width: auto;
    text-align: left;
  }
}
</style>