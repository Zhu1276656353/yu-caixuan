<template>
    <div class="not-found-container">
        <div class="not-found-content">
            <div class="error-code">404</div>
            <div class="error-message">页面找不到了</div>
            <p class="error-description">您访问的页面不存在或已被移除</p>
            <router-link to="/" class="home-button">
                <span class="button-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </span>
                <span class="button-text">返回首页</span>
            </router-link>
        </div>
        <div class="floating-elements">
            <div class="bubble bubble-1"></div>
            <div class="bubble bubble-2"></div>
            <div class="bubble bubble-3"></div>
            <div class="fish fish-1"></div>
            <div class="fish fish-2"></div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.not-found-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #7f97fa 0%, #83a6f8 100%);
    position: relative;
    overflow: hidden;
}

.not-found-content {
    text-align: center;
    z-index: 10;
    animation: fadeInUp 0.8s ease-out;
}

.error-code {
    font-size: 120px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    animation: pulse 2s ease-in-out infinite;
}

.error-message {
    font-size: 32px;
    font-weight: 600;
    color: white;
    margin-bottom: 12px;
}

.error-description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 30px;
}

.home-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: white;
    color: #667eea;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: #f8f9fa;
}

.home-button:active {
    transform: translateY(-1px);
}

.button-icon svg {
    width: 20px;
    height: 20px;
}

.button-text {
    letter-spacing: 0.5px;
}

.floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.bubble {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: floatBubble 4s ease-in-out infinite;
}

.bubble-1 {
    width: 60px;
    height: 60px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.bubble-2 {
    width: 40px;
    height: 40px;
    top: 60%;
    right: 15%;
    animation-delay: 1.5s;
}

.bubble-3 {
    width: 80px;
    height: 80px;
    bottom: 25%;
    left: 20%;
    animation-delay: 3s;
}

.fish {
    position: absolute;
    font-size: 40px;
    animation: swim 6s ease-in-out infinite;
}

.fish-1 {
    top: 30%;
    right: 20%;
    animation-delay: 0s;
}

.fish-2 {
    bottom: 35%;
    left: 30%;
    animation-delay: 2s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes floatBubble {
    0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.6;
    }
}

@keyframes swim {
    0%, 100% {
        transform: translateX(0) rotate(0deg);
    }
    25% {
        transform: translateX(30px) rotate(5deg);
    }
    50% {
        transform: translateX(0) rotate(0deg);
    }
    75% {
        transform: translateX(-30px) rotate(-5deg);
    }
}

@media (max-width: 768px) {
    .error-code {
        font-size: 80px;
    }
    
    .error-message {
        font-size: 24px;
    }
    
    .error-description {
        font-size: 14px;
    }
    
    .home-button {
        padding: 12px 24px;
        font-size: 14px;
    }
}
</style>
