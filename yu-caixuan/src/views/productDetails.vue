<template>
  <div class="product-details" v-if="productData">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span @click="goBack">返回</span> >
      <span>商品详情</span>
    </div>

    <!-- 商品信息区域 -->
    <div class="product-container">
      <!-- 商品图片展示区 -->
      <div class="product-images">
        <div class="main-image">
          <img :src="'http://localhost:3000' + productData.image" :alt="productData.name" />
        </div>
      </div>

      <!-- 商品信息详情区 -->
      <div class="product-info">
        <h1 class="product-title">{{ productData.name }}</h1>
        <div class="product-price">
          <span class="current-price">¥{{ productData.price }}</span>
        </div>

        <div class="product-description">
          <p>{{ productData.introduce || '暂无商品描述' }}</p>
        </div>

        <div class="action-buttons">
          <button class="add-cart-btn" @click="handleAddCartClick">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    正在加载商品信息...
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cartStore"

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// 商品数据
const productData = ref({
  id: '',
  cid: '',
  name: '',
  price: '',
  image: ''
})
// 加入购物车
const handleAddCartClick = () => {
  if (productData.value) {
    cartStore.addItem({
      id: productData.value.cid,
      name: productData.value.name,
      price: productData.value.price,
      image: productData.value.image,
      quantity: 1
    })
    ElMessage({
      message: '成功加入购物车',
      type: 'success',
    })
  }
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 更新商品数据的函数
const updateProductData = () => {
  // 从路由参数中获取数据
  const productId = route.params.id;  // 从路径参数获取商品ID
  const cid = route.query.cid;
  const name = route.query.name;
  const price = route.query.price;
  const image = route.query.image;
  const introduce = route.query.introduce;

  // 如果有查询参数，直接使用查询参数中的数据
  if (name) {
    productData.value = {
      id: productId || '',
      cid: cid || '',
      name: name || '',
      price: price || '',
      image: image || '',
      introduce: introduce || ''
    };
  }
}
// 监听路由变化
watch(
  () => route.fullPath,  // 监听路由完整路径变化
  () => {
    updateProductData()
  }
)

// 组件挂载时初始化数据
onMounted(() => {
  updateProductData()
})
</script>

<style lang="scss" scoped>
.product-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  margin-bottom: 20vh;
}

.breadcrumb {
  margin-bottom: 20px;
  color: #999;
  font-size: 14px;

  span {
    cursor: pointer;
    color: #409eff;
  }

  span:last-child {
    color: #333;
    cursor: default;
  }
}

.product-container {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.product-images {
  flex: 1;

  .main-image {
    img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border: 1px solid #eee;
      border-radius: 20px;
    }
  }
}

.product-info {
  flex: 1;

  .product-title {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }

  .product-price {
    margin-bottom: 20px;

    .current-price {
      font-size: 28px;
      color: #ff6b35;
      font-weight: bold;
    }
  }

  .product-description {
    margin-bottom: 30px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;

    p {
      line-height: 1.6;
      color: #666;
    }
  }

  .action-buttons {

    .add-cart-btn,
    .buy-now-btn {
      padding: 12px 30px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 15px;
    }

    .add-cart-btn {
      background: #ff6b35;
      color: white;
    }

    .buy-now-btn {
      background: #ff8c00;
      color: white;
    }
  }
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
}
</style>