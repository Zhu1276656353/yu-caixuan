<template>
    <!-- 养鱼宝典按钮 -->
    <div class="fishHandbook">
        <el-button class="fishHandbookBtn" round @click="showHandbook = true">
            <div class="fishHandbook-content">
                <el-icon class="icon" size="30" color="orange"><reading /></el-icon>
                <p>养鱼宝典</p>
            </div>
        </el-button>
    </div>

    <!-- 自定义弹窗 -->
    <div v-if="showHandbook" class="custom-modal-overlay" @click="closeModal">
        <div class="custom-modal" @click.stop>
            <div class="modal-header">
                <h2 class="modal-title">养鱼宝典</h2>
                <button class="close-btn" @click="closeModal">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="book-wrapper">
                    <!-- 封面 -->
                    <div v-if="!bookOpened" class="book-cover-page" @click="openBook">
                        <div class="cover-inner">
                            <h1 class="book-title">养鱼宝典</h1>
                            <p class="book-subtitle">新手养育小贴士</p>
                            <div class="fish-icon">🐟</div>
                            <p class="click-hint">点击翻开</p>
                        </div>
                    </div>

                    <!-- 翻书区域 -->
                    <div v-else class="flipbook-container">
                        <div class="flipbook">
                            <!-- 左页（上一页内容） -->
                            <div class="page left-page" v-if="currentPage > 0">
                                <div class="page-inner">
                                    <div class="page-number-left">{{ currentPage }}</div>
                                    <h2 class="page-title">{{ pages[currentPage - 1].title }}</h2>
                                    <div class="page-tips">
                                        <div class="tip-item" v-for="(tip, tipIndex) in pages[currentPage - 1].tips" :key="tipIndex">
                                            <div class="tip-icon">{{ tip.icon }}</div>
                                            <div class="tip-text">{{ tip.text }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 左页空白（第一页时） -->
                            <div class="page left-page blank" v-else>
                                <div class="page-inner blank-content">
                                    <div class="blank-text">目录</div>
                                    <div class="toc-list">
                                        <div class="toc-item" v-for="(page, idx) in pages" :key="idx" @click="goToPage(idx)">
                                            <span class="toc-num">{{ idx + 1 }}</span>
                                            <span class="toc-title">{{ page.title }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 右页（当前页内容） -->
                            <div class="page right-page">
                                <div class="page-inner">
                                    <div class="page-number-right">{{ currentPage + 1 }}</div>
                                    <h2 class="page-title">{{ pages[currentPage].title }}</h2>
                                    <div class="page-tips">
                                        <div class="tip-item" v-for="(tip, tipIndex) in pages[currentPage].tips" :key="tipIndex">
                                            <div class="tip-icon">{{ tip.icon }}</div>
                                            <div class="tip-text">{{ tip.text }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 翻页控制区 -->
                        <div class="page-controls">
                            <el-button 
                                class="flip-btn" 
                                @click="prevPage" 
                                :disabled="currentPage === 0"
                                circle
                            >
                                <el-icon><arrow-left /></el-icon>
                            </el-button>
                            
                            <div class="page-info">
                                <span class="current">{{ currentPage + 1 }}</span>
                                <span class="separator">/</span>
                                <span class="total">{{ pages.length }}</span>
                            </div>
                            
                            <el-button 
                                class="flip-btn" 
                                @click="nextPage" 
                                :disabled="currentPage === pages.length - 1"
                                circle
                            >
                                <el-icon><arrow-right /></el-icon>
                            </el-button>
                        </div>

                        <!-- 关闭按钮 -->
                        <el-button class="close-book-btn" @click="closeBook" type="danger" plain>
                            合上书本
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showHandbook = ref(false)
const bookOpened = ref(false)
const currentPage = ref(0)

const pages = ref([
  {
    title: '新手入门',
    tips: [
      { icon: '🏠', text: '选择合适大小的鱼缸，新手建议从60cm以上开始' },
      { icon: '💧', text: '提前养水1-2周，建立硝化系统' },
      { icon: '🌡️', text: '保持水温稳定，热带鱼适宜24-28℃' },
      { icon: '🔍', text: '购买前了解鱼的习性和混养要求' }
    ]
  },
  {
    title: '水质管理',
    tips: [
      { icon: '🧪', text: '定期检测水质，pH值6.5-7.5为宜' },
      { icon: '🔄', text: '每周换水1/3，保持水质清洁' },
      { icon: '💨', text: '保证充足氧气，安装增氧设备' },
      { icon: '🌿', text: '适量种植水草，净化水质' }
    ]
  },
  {
    title: '鱼类选择',
    tips: [
      { icon: '🐠', text: '新手推荐：孔雀鱼、金鱼、斗鱼' },
      { icon: '📏', text: '考虑鱼缸大小，避免过度拥挤' },
      { icon: '🤝', text: '选择性情温和、可以混养的品种' },
      { icon: '🎨', text: '搭配不同颜色的鱼，增加观赏性' }
    ]
  },
  {
    title: '日常养护',
    tips: [
      { icon: '🍽️', text: '定时定量喂食，每天1-2次，5分钟内吃完' },
      { icon: '🧹', text: '定期清理鱼缸，清除残饵和粪便' },
      { icon: '⚡', text: '检查设备运行，确保过滤和加热正常' },
      { icon: '👀', text: '观察鱼类状态，及时发现异常' }
    ]
  },
  {
    title: '疾病预防',
    tips: [
      { icon: '🛡️', text: '新鱼入缸前隔离观察2周' },
      { icon: '🧫', text: '保持水质稳定，避免温度和pH剧烈变化' },
      { icon: '🍎', text: '提供营养均衡的饲料，增强抵抗力' },
      { icon: '🚑', text: '发现病鱼及时隔离，对症治疗' }
    ]
  }
])

const openBook = () => {
  bookOpened.value = true
  currentPage.value = 0
}

const closeBook = () => {
  bookOpened.value = false
  currentPage.value = 0
}

const nextPage = () => {
  if (currentPage.value < pages.value.length - 1) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const goToPage = (index) => {
  currentPage.value = index
}

const closeModal = () => {
  showHandbook.value = false
  bookOpened.value = false
  currentPage.value = 0
}
</script>

<style lang="scss" scoped>
.fishHandbook {
    // 按钮样式，与 cart.vue 中的 cartBtn 保持一致
    .fishHandbookBtn {
        display: block;
        position: fixed;
        bottom: 172px;
        right: 50px;
        font-weight: bolder;
        width: 65px;
        height: max-content;
        padding: 10px;
        z-index: 999;

        .fishHandbook-content {
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
                font-size: 12px;
            }
        }
    }
}

// 自定义弹窗样式
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    animation: fadeIn 0.3s ease;
}

.custom-modal {
    background: white;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 1000px;
    height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s ease;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom: 1px solid #e0e0e0;

    .modal-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }

    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
    }
}

.modal-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.drawer-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
    background: transparent !important;
}

.book-wrapper {
    width: 100%;
    max-width: 800px;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent !important;
}

// 封面样式
.book-cover-page {
    width: 350px;
    height: 500px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px 20px 20px 10px;
    box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.3),
        inset 0 0 60px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.4),
            inset 0 0 60px rgba(0, 0, 0, 0.2);
    }

    &::before {
        content: '';
        position: absolute;
        left: 15px;
        top: 0;
        bottom: 0;
        width: 20px;
        background: linear-gradient(to right, rgba(0,0,0,0.3), transparent);
        border-radius: 10px 0 0 10px;
    }

    .cover-inner {
        text-align: center;
        color: white;
        padding: 40px;

        .book-title {
            font-size: 42px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: 4px;
        }

        .book-subtitle {
            font-size: 18px;
            margin-bottom: 30px;
            opacity: 0.9;
        }

        .fish-icon {
            font-size: 80px;
            margin: 30px 0;
            animation: swim 3s ease-in-out infinite;
        }

        .click-hint {
            font-size: 14px;
            opacity: 0.8;
            margin-top: 20px;
            animation: pulse 2s ease-in-out infinite;
        }
    }
}

// 翻书容器
.flipbook-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

// 书本主体
.flipbook {
    width: 100%;
    max-width: 800px;
    height: 500px;
    display: flex;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;

    // 书脊效果
    &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 40px;
        background: linear-gradient(to right, 
            transparent, 
            rgba(0,0,0,0.1) 20%, 
            rgba(0,0,0,0.15) 50%, 
            rgba(0,0,0,0.1) 80%, 
            transparent
        );
        transform: translateX(-50%);
        z-index: 10;
        pointer-events: none;
    }
}

// 页面样式
.page {
    flex: 1;
    height: 100%;
    background: linear-gradient(to right, #fafafa 0%, #fff 5%, #fff 95%, #f5f5f5 100%);
    padding: 30px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    &.left-page {
        border-right: 1px solid #e0e0e0;
        background: linear-gradient(to right, #f5f5f5 0%, #fff 10%);
    }

    &.right-page {
        background: linear-gradient(to left, #f5f5f5 0%, #fff 10%);
    }

    &.blank {
        background: linear-gradient(to right, #f8f9fa 0%, #fff 10%);
    }

    .page-inner {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .page-number-left,
    .page-number-right {
        position: absolute;
        bottom: 10px;
        font-size: 12px;
        color: #999;
    }

    .page-number-left {
        left: 10px;
    }

    .page-number-right {
        right: 10px;
    }

    .page-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 3px solid #667eea;
        text-align: center;
    }

    .page-tips {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
        overflow-y: auto;

        .tip-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 15px;
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
            border-radius: 8px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;

            &:hover {
                transform: translateX(3px);
                background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
            }

            .tip-icon {
                font-size: 22px;
                flex-shrink: 0;
            }

            .tip-text {
                font-size: 14px;
                line-height: 1.5;
                color: #555;
                flex: 1;
            }
        }
    }
}

// 空白页目录样式
.blank-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20px;

    .blank-text {
        font-size: 28px;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 30px;
        letter-spacing: 8px;
    }

    .toc-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .toc-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px 15px;
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
                transform: translateX(5px);
            }

            .toc-num {
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                flex-shrink: 0;
            }

            .toc-title {
                font-size: 15px;
                color: #555;
                font-weight: 500;
            }
        }
    }
}

// 翻页控制区
.page-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 15px 30px;
    background: white;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    .flip-btn {
        width: 45px;
        height: 45px;
        font-size: 20px;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            transform: scale(1.1);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        &:disabled {
            opacity: 0.4;
        }
    }

    .page-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;

        .current {
            color: #667eea;
            font-size: 24px;
            font-weight: bold;
        }

        .separator {
            color: #ccc;
        }

        .total {
            color: #999;
        }
    }
}

// 关闭书本按钮
.close-book-btn {
    padding: 12px 30px;
    font-size: 14px;
    border-radius: 25px;
}

// 动画效果
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes swim {
    0%, 100% {
        transform: translateX(0) rotate(0deg);
    }
    25% {
        transform: translateX(10px) rotate(5deg);
    }
    75% {
        transform: translateX(-10px) rotate(-5deg);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.8;
    }
    50% {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .fishHandbook {
        .fishHandbookBtn {
            right: 20px;
            bottom: 150px;
        }
    }

    .custom-modal {
        width: 95%;
        max-height: 95vh;
    }

    .modal-header {
        padding: 15px 20px;

        .modal-title {
            font-size: 20px;
        }
    }

    .modal-body {
        padding: 10px;
    }

    .drawer-content {
        padding: 20px;
    }

    .book-wrapper {
        height: auto;
    }

    .book-cover-page {
        width: 280px;
        height: 400px;

        .cover-inner {
            .book-title {
                font-size: 32px;
            }

            .fish-icon {
                font-size: 60px;
            }
        }
    }

    .flipbook {
        flex-direction: column;
        height: auto;
        max-height: 70vh;

        &::before {
            display: none;
        }
    }

    .page {
        &.left-page {
            display: none;
        }

        &.right-page {
            min-height: 400px;
        }
    }

    .page-controls {
        gap: 20px;
        padding: 10px 20px;
    }
}
</style>
