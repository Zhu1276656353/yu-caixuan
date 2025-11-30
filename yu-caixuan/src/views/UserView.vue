<template>
    <div class="userInfo">
        <!-- <div class="userInfo-card">
            <div class="userInfo-title">用户信息</div>
            <div class="userInfo-content">
                <p class="userInfo-content-item">用户名: <span>{{ userInfo.list.username }}</span></p>
                <p class="userInfo-content-item">密码: <span>{{ userInfo.list.password }}</span></p>
                <p class="userInfo-content-item">手机号: <span>{{ userInfo.list.phone }}</span></p>
                <p class="userInfo-content-item">邮箱: <span>{{ userInfo.list.email }}</span></p>
            </div>
            <div class="btn"><el-button round class="btn-btn" @click="dialogVisible = true">修改信息</el-button></div>
        </div> -->
        <div class="userInfo-card">
            <div class="userInfo-header">
                <div class="userInfo-title">用户信息</div>
            </div>

            <div class="userInfo-content">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="info-item">
                            <i class="el-icon-user"></i>
                            <span class="info-label">用户名:</span>
                            <span class="info-value">{{ userInfo.list.username }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="info-item">
                            <i class="el-icon-lock"></i>
                            <span class="info-label">密码:</span>
                            <span class="info-value">••••••••</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="info-item">
                            <i class="el-icon-phone"></i>
                            <span class="info-label">手机号:</span>
                            <span class="info-value">{{ userInfo.list.phone }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="info-item">
                            <i class="el-icon-message"></i>
                            <span class="info-label">邮箱:</span>
                            <span class="info-value">{{ userInfo.list.email }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="btn">
                <el-button round class="btn-btn" @click="dialogVisible = true">
                    <i class="el-icon-edit"></i> 修改信息
                </el-button>
            </div>
        </div>
        <!-- 修改信息 -->
        <div class="userInfo-update">
            <el-dialog v-model="dialogVisible" title="修改个人信息" width="40%" center>
                <el-form :label-position="labelPosition" label-width="100px" :model="updateUserInfo"
                    style="padding: 20px;">
                    <el-form-item label="用户名">
                        <el-input v-model="updateUserInfo.username" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="updateUserInfo.password" />
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="updateUserInfo.phone" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="updateUserInfo.email" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="updateUserInfoHandler">确定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/index.js"
import { ref, reactive, onMounted } from 'vue'
import { useLoginStore } from "../stores/login"
const loginStore = useLoginStore()
const dialogVisible = ref(false);//登录弹窗的显示隐藏
// 已存在用户信息
const userInfo = reactive({
    list: []
})
// 修改用户信息
const updateUserInfo = reactive({
    username: '',
    password: '',
    phone: '',
    email: '',
})
onMounted(() => {
    // 页面加载时获取用户信息
    refreshUserInfo();
})
const labelPosition = ref('right')

// 刷新用户信息函数，更新数据成功后调用该函数
const refreshUserInfo = () => {
    api.getUserInfo({ token: loginStore.token }).then(res => {
        if (res.data.status === 200) {
            userInfo.list = res.data.data;
            // 更新表单数据
            updateUserInfo.username = userInfo.list.username;
            updateUserInfo.password = userInfo.list.password || '';
            updateUserInfo.phone = userInfo.list.phone || '';
            updateUserInfo.email = userInfo.list.email || '';
        }
    }).catch(err => {
        console.error('刷新用户信息失败:', err);
        ElMessage.error('刷新用户信息失败')
    });
}
// 修改用户信息处理函数
const updateUserInfoHandler = () => {
    api.getUpdateUserInfo(updateUserInfo).then(res => {
        if (res.data.status === 200) {
            ElMessage({
                message: '更新用户信息成功',
                type: 'success',
            })
            // 刷新用户信息
            refreshUserInfo();
        } else {
            ElMessage.error('更新用户信息失败')
        }
    })
    dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
.userInfo {
    width: 100%;
    height: 69vh;

    .userInfo-card {
        width: 60%;
        margin: 20px auto;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 50px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;

        &:hover {
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
        }

        .userInfo-title {
            width: 100%;
            text-align: center;
            font-weight: bolder;
            font-size: 30px;
        }

        .userInfo-content {
            width: 100%;
            display: flex;
            flex-direction: column;  
            justify-content: space-around;

            .userInfo-content-item {
                font-size: 20px;
                font-weight: bolder;
                padding: 20px 0;
                border-bottom: 1px solid #eee;

                span {
                    font-size: 16px;
                    margin-left: 10px;
                    font-weight: normal;
                }
            }
        }

        .btn {
            margin-top: 50px;
            text-align: center;

            .btn-btn {
                width: 200px;
                height: 40px;
                background: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);
                color: white;
            }
        }

        // 新增的样式部分
        .userInfo-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
        }

        .info-item {
            display: flex;
            align-items: center;
            padding: 15px;
            margin-bottom: 10px;
            background-color: #fff0f0;
            border-radius: 4px;
            transition: background-color 0.3s;
            cursor: pointer;

            &:hover {
                outline: 1px solid red;
            }

            i {
                font-size: 18px;
                margin-right: 10px;
                color: #409eff;
            }

            .info-label {
                font-weight: bold;
                margin-right: 10px;
                min-width: 70px;
            }

            .info-value {
                flex: 1;
            }
        }
    }
}
</style>