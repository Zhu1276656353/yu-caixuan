<template>
    <div class="body">
        <div class="main-box">
            <!-- 注册：使用了表单聚焦波浪效果 -->
            <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
                <form>
                    <h2 class="title">注册</h2>
                    <div class="wave-group">
                        <input required class="input" v-model="registerForm.username" type="text"
                            autocomplete="username" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">用</span>
                            <span class="label-char" style="--index: 1">户</span>
                            <span class="label-char" style="--index: 2">名</span>
                        </label>
                    </div>

                    <div class="wave-group">
                        <input required class="input" v-model="registerForm.newPassword" type="password"
                            autocomplete="newPassword" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">密</span>
                            <span class="label-char" style="--index: 1">码</span>
                        </label>
                    </div>

                    <div class="wave-group">
                        <input required class="input" v-model="registerForm.email" type="text" autocomplete="email" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">邮</span>
                            <span class="label-char" style="--index: 1">箱</span>
                        </label>
                    </div>

                    <div class="wave-group">
                        <input required class="input" v-model="registerForm.phone" type="text" autocomplete="phone" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">手</span>
                            <span class="label-char" style="--index: 1">机</span>
                            <span class="label-char" style="--index: 2">号</span>
                        </label>
                    </div>
                    <!-- 按钮，使用了svg 矢量绘制 -->
                    <button class="button" type="button" @click="register">
                        <span>注册</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                            <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                            <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                            <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
            <!-- 登录 -->
            <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
                <form>
                    <h2 class="title">登录</h2>
                    <div class="wave-group">
                        <input required class="input" v-model="loginForm.username" type="text"
                            autocomplete="username" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">用</span>
                            <span class="label-char" style="--index: 1">户</span>
                            <span class="label-char" style="--index: 2">名</span>
                        </label>
                    </div>

                    <div class="wave-group">
                        <input required class="input" v-model="loginForm.currentPassword" type="password"
                            autocomplete="currentPassword" />
                        <span class="bar"></span>
                        <label class="label">
                            <span class="label-char" style="--index: 0">密</span>
                            <span class="label-char" style="--index: 1">码</span>
                        </label>
                    </div>
                    <!-- 按钮，使用了svg 矢量绘制 -->
                    <button class="button" type="button" @click="login">
                        <span>登录</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                            <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                            <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                            <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
            <!-- 登录注册切换 -->
            <div :class="['switch', { 'login': isLogin }]">
                <div class="switch__circle"></div>
                <div class="switch__circle switch__circle_top"></div>
                <div class="switch__container">
                    <h2>{{ isLogin ? '您好 !' : '欢迎回来 !' }}</h2>
                    <p>
                        {{
                            isLogin
                                ? '如果您还没有账号，请点击下方立即注册按钮进行账号注册'
                                : '如果您已经注册过账号，请点击下方立即登录按钮进行登录'
                        }}
                    </p>
                    <!-- 按钮，使用了svg 矢量绘制 -->
                    <button class="button" type="button" @click="isLogin = !isLogin">
                        <span> {{ isLogin ? '立即注册' : '立即登录' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                            <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                            <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                            <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'//引入登录状态管理
import api from '@/api/index.js'//引入api
const router = useRouter()

defineOptions({
    name: 'Login'
})

const isLogin = ref(true)

const loginForm = reactive({
    token: '',
    username: 'admin',
    currentPassword: '123456',
})

const registerForm = reactive({
    username: '',
    newPassword: '',
    email: '',
    phone: '',
})
/**
 * 登录逻辑
 */
const loginStore = useLoginStore();
const login = () => {
    api.getLogin({
        username: loginForm.username,
        password: loginForm.currentPassword
    }).then((res) => {
        // 添加检查确保 res 存在
        if (res && res.data && res.data.status == 200) {
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            // 如果后端返回了过期时间，则存储并格式化展示
            if (res.data.expiresAt) {
                loginStore.expiresAt = res.data.expiresAt;
                const expireDate = new Date(res.data.expiresAt);
                const formatted = `${expireDate.getFullYear()}-${String(expireDate.getMonth() + 1).padStart(2, '0')}-${String(expireDate.getDate()).padStart(2, '0')} ${String(expireDate.getHours()).padStart(2, '0')}:${String(expireDate.getMinutes()).padStart(2, '0')}:${String(expireDate.getSeconds()).padStart(2, '0')}`
                ElMessage.success(`登录成功，token 有效期为 7 天，将在 ${formatted} 失效`)
            } else {
                // 后端未返回过期时间时的兜底提示
                ElMessage.success('登录成功，当前会话 token 有效期为 7 天')
            }
            // 登录成功，跳转到首页
            router.push('/')
            loginStore.isLogin = true;
        } else {
            // 如果登录失败，使用 Element Plus 的 ElMessage 提示错误信息
            ElMessage.error(res && res.data && res.data.msg ? res.data.msg : '登录失败')
        }
    }).catch((error) => {
        // 更详细的错误处理
        if (error.response) {
            // 服务器返回了错误响应
            ElMessage.error(error.response.data.msg || '登录失败')
        } else if (error.request) {
            // 请求已发出但没有收到响应
            ElMessage.error('无法连接到服务器，请检查网络连接')
        } else {
            // 其他错误
            ElMessage.error('登录请求失败，请稍后重试')
        }
        console.error('登录错误:', error)
    })
}
/**
 * 注册逻辑
 */
const register = () => {
    if (registerForm.username == '' || registerForm.newPassword == '' || registerForm.phone == '' || registerForm.email == '') {
        ElMessage.error('请填写完整的注册信息')
    } else {
        if (registerForm.phone && !/^1[3-9]\d{9}$/.test(registerForm.phone)) {
            ElMessage.error('请输入正确的手机号格式')
            return;
        }
        api.getRegister({
            username: registerForm.username,
            password: registerForm.newPassword,
            phone: registerForm.phone,
            email: registerForm.email
        }).then((res) => {
            // 添加检查确保 res 存在
            if (res.data.status == 200) {
                ElMessage.success('注册成功')
            } else {
                ElMessage.error('注册请求失败，请稍后重试')
            }
        }).finally(() => {
            // 无论成功与否，都切换到登录界面
            isLogin.value = true;
        })
    }

}
</script>

<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    background-color: #ffffff;
    // 背景图案使用了内嵌的SVG矢量图案
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%234FE'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.main-box {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    border-radius: 12px;
    overflow: hidden;

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        width: 600px;
        height: 100%;
        padding: 25px;
        background-image: linear-gradient(135deg, #FFF6B7 15%, #F6416C 100%);
        transition: all 1.25s;

        form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;

            // 波浪输入框效果
            .wave-group {
                position: relative;
                margin: 15px 0;

                .input {
                    font-size: 16px;
                    padding: 10px 0px 10px 0px;
                    display: block;
                    width: 350px;
                    border: none;
                    border-bottom: 1px solid #a0a5a8;
                    background: transparent;
                    color: #181818;
                }

                .input:focus {
                    outline: none;
                }

                .label {
                    color: #a0a5a8;
                    font-size: 16px;
                    font-weight: normal;
                    position: absolute;
                    pointer-events: none;
                    left: 5px;
                    top: 10px;
                    display: flex;
                }

                .label-char {
                    transition: 0.2s ease all;
                    transition-delay: calc(var(--index) * .05s);
                }

                .input:focus~label .label-char,
                .input:valid~label .label-char {
                    transform: translateY(-20px);
                    font-size: 14px;
                    color: #181818;
                }

                .bar {
                    position: relative;
                    display: block;
                    width: 350px;
                }

                .bar:before,
                .bar:after {
                    content: '';
                    height: 2px;
                    width: 0;
                    bottom: 1px;
                    position: absolute;
                    background: #181818;
                    transition: 0.2s ease all;
                    -moz-transition: 0.2s ease all;
                    -webkit-transition: 0.2s ease all;
                }

                .bar:before {
                    left: 50%;
                }

                .bar:after {
                    right: 50%;
                }

                .input:focus~.bar:before,
                .input:focus~.bar:after {
                    width: 50%;
                }
            }

            .form__icon {
                object-fit: contain;
                width: 30px;
                margin: 0 5px;
                opacity: .5;
                transition: .15s;

                &:hover {
                    opacity: 1;
                    transition: .15s;
                    cursor: pointer;

                }
            }

            .title {
                font-size: 34px;
                font-weight: 700;
                line-height: 3;
                color: #181818;
            }

            .text {
                margin-top: 30px;
                margin-bottom: 12px;
            }

            .form__input {
                width: 350px;
                height: 40px;
                margin: 4px 0;
                padding-left: 25px;
                font-size: 13px;
                letter-spacing: 0.15px;
                border: none;
                outline: none;
                background-color: #ecf0f3;
                transition: 0.25s ease;
                border-radius: 8px;
                box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

                &::placeholder {
                    color: #a0a5a8;
                }
            }
        }
    }

    .container-register {
        z-index: 100;
        left: calc(100% - 600px);
    }

    .container-login {
        left: calc(100% - 600px);
        z-index: 0;
    }

    .is-txl {
        left: 0;
        transition: 1.25s;
        transform-origin: right;
    }

    .is-z200 {
        z-index: 200;
        transition: 1.25s;
    }

    // 切换面板样式
    .switch {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 400px;
        padding: 50px;
        z-index: 200;
        transition: 1.25s;
        background-image: linear-gradient(300deg, #FFF6B7 15%, #F6416C 100%);
        overflow: hidden;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.5);

        .switch__circle {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            bottom: -60%;
            left: -60%;
            transition: 1.25s;
        }

        .switch__circle_top {
            top: -30%;
            left: 40%;
            width: 300px;
            height: 300px;
        }

        .switch__container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            width: 400px;
            padding: 50px 55px;
            transition: 1.25s;

            h2 {
                font-size: 34px;
                font-weight: 700;
                line-height: 3;
                color: #181818;
            }

            p {
                font-size: 14px;
                letter-spacing: 0.25px;
                text-align: center;
                line-height: 1.6;
            }
        }
    }

    .login {
        left: calc(100% - 480px);

        .switch__circle {
            left: 0;
        }
    }

    // 按钮样式
    .button {
        --main-size: 1.2em;
        --color-text: #ffffff;
        --color-background: #ff135a;
        --color-background-hover: #ff1472;
        --color-outline: #ff145a40;
        --color-shadow: #00000040;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        border: none;
        border-radius: calc(var(--main-size) * 100);
        padding: 10px 30px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-size: var(--main-size);
        color: var(--color-text);
        background: var(--color-background);
        box-shadow: 0 0 0.2em 0 var(--color-background);
        transition: 1s;
        margin-top: 50px;

        &:active {
            transform: scale(0.95);

            span {
                text-shadow: none;
            }

            svg {
                filter: none;
            }
        }

        &:hover {
            outline: 0.1em solid transparent;
            outline-offset: 0.2em;
            box-shadow: 0 0 1em 0 var(--color-background);
            animation: ripple 1s linear infinite, colorize 1s infinite;
            transition: 0.5s;

            span {
                text-shadow: 5px 5px 5px var(--color-shadow);
            }

            svg {
                margin-right: 0.66em;
                transition: 0.5s;
                filter: drop-shadow(5px 5px 2.5px var(--color-shadow));

                polygon {
                    &:nth-child(1) {
                        transform: translateX(0%);
                        animation: opacity 1s infinite 0.6s;
                    }

                    &:nth-child(2) {
                        transform: translateX(0%);
                        animation: opacity 1s infinite 0.4s;
                    }

                    &:nth-child(3) {
                        animation: opacity 1s infinite 0.2s;
                    }
                }
            }
        }

        span {
            margin-right: 0.3em;
            transition: 0.5s;
        }

        svg {
            height: 0.8em;
            fill: var(--color-text);
            margin-right: -0.16em;
            position: relative;
            transition: 0.5s;

            polygon {
                &:nth-child(1) {
                    transition: 0.4s;
                    transform: translateX(-60%);
                }

                &:nth-child(2) {
                    transition: 0.5s;
                    transform: translateX(-30%);
                }
            }
        }

        @keyframes opacity {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @keyframes colorize {
            0% {
                background: var(--color-background);
            }

            50% {
                background: var(--color-background-hover);
            }

            100% {
                background: var(--color-background);
            }
        }

        @keyframes ripple {
            0% {
                outline: 0em solid transparent;
                outline-offset: -0.1em;
            }

            50% {
                outline: 0.2em solid var(--color-outline);
                outline-offset: 0.2em;
            }

            100% {
                outline: 0.4em solid transparent;
                outline-offset: 0.4em;
            }
        }
    }
}
</style>
