<template>
    <div class="body">
        <div class="main-box">
            <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
                <form>
                    <h2 class="title">注册</h2>
                    <input class="form__input" v-model="registerForm.username" type="text" placeholder="请输入用户名"
                        autocomplete="username" />
                    <input class="form__input" v-model="registerForm.newPassword" type="password" placeholder="请输入密码"
                        autocomplete="newPassword" />
                    <input class="form__input" v-model="registerForm.email" type="text" placeholder="请输入邮箱"
                        autocomplete="email" />
                    <input class="form__input" v-model="registerForm.phone" type="text" placeholder="请输入手机号"
                        autocomplete="phone" />
                    <div class="form__button" @click="register">立即注册</div>
                </form>
            </div>
            <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
                <form>
                    <h2 class="title">登录</h2>
                    <input class="form__input" v-model="loginForm.username" type="text" placeholder="请输入用户名"
                        autocomplete="username" />
                    <input class="form__input" v-model="loginForm.currentPassword" type="password" placeholder="请输入密码"
                        autocomplete="currentPassword" />
                    <div class="form__button" @click="login">立即登录</div>
                </form>
            </div>
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
                    <div class="form__button" @click="isLogin = !isLogin">
                        {{ isLogin ? '立即注册' : '立即登录' }}
                    </div>
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
    color: #a0a5a8;
    background-image: linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%);
    background-size: 300% 300%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
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
            color: #a0a5a8;

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

    .form__button {
        width: 180px;
        height: 50px;
        border-radius: 25px;
        margin-top: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        letter-spacing: 2px;
        background-color: #4b70e2;
        color: #f9f9f9;
        cursor: pointer;

        &:hover {
            box-shadow: 2px 2px 3px 0 rgba(255, 255, 255, 50%),
                -2px -2px 3px 0 rgba(116, 125, 136, 50%),
                inset -2px -2px 3px 0 rgba(255, 255, 255, 20%),
                inset 2px 2px 3px 0 rgba(0, 0, 0, 30%);
        }
    }
}
</style>
