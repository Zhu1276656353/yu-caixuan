<template>
    <div class="container">
        <div class="title">用户管理</div>
        <div class="search">
            <div class="search-box">
                <div class="input-group">
                    <input required type="text" v-model="search" @keyup.enter="searchHandler" autocomplete="off"
                        placeholder=" " class="input">
                    <label class="user-label">请输入查询的用户名称</label>
                    <el-button @click="searchHandler" icon="Search" class="search-button" />
                </div>
                <el-button class="add-button" type="primary" @click="addHandler">
                    添加用户
                </el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" stripe height="500" style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="phone" label="电话" width="180" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="permission" label="权限" width="100" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEditor(scope.$index, scope.row)"
                            :disabled="scope.row.id === 1">
                            编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                            :disabled="scope.row.id === 1">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加用户视图 -->
        <el-dialog v-model="dialogAddVisible" title="添加用户" Width="25%" center>
            <el-form :model="userForm" status-icon stripe label-width="120px" style="padding: 50px!important;">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="userForm.permission" size="large">
                        <el-radio-button label="admin">管理员</el-radio-button>
                        <el-radio-button label="vip">普通用户</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email" type="text"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="userForm.phone" type="text"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="sureAddUserHandler">确定</el-button>
            </template>
        </el-dialog>

        <!-- 更新数据模态框 -->
        <el-dialog v-model="dialogUpdateVisible" title="修改用户" width="25%" center>
            <el-form :model="userUpdateForm" status-icon label-width="120px" style="padding: 20px;">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userUpdateForm.username" type="text" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userUpdateForm.password" type="password" show-password
                        placeholder="留空则不修改密码"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permission">
                    <el-radio-group v-model="userUpdateForm.permission" size="large">
                        <el-radio-button label="admin">管理员</el-radio-button>
                        <el-radio-button label="vip">普通用户</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="userUpdateForm.phone" type="text"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userUpdateForm.email" type="text"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogUpdateVisible = false">取消</el-button>
                <el-button type="primary" @click="sureUpdateUserHandler">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/index.js';
//搜索内容
const tableData = ref([]);

onMounted(() => {
    http();
})
/**
 * 查询用户数据
 */
const http = () => {
    api.getBackendUsers().then(res => {
        // 确保将数组数据赋值给 tableData
        if (Array.isArray(res.data.data)) {
            tableData.value = res.data.data;
        } else {
            tableData.value = [];
        }
    }).catch(error => {
        console.error('获取用户数据失败:', error);
        tableData.value = [];
    });
}
/**
 * 添加用户信息
 */
const dialogAddVisible = ref(false);
const userForm = ref({
    username: '',
    password: '',
    phone: '',
    email: '',
    permission: 'vip'
});
const addHandler = () => {
    userForm.value = {
        username: '',
        password: '',
        phone: '',
        email: '',
        permission: 'vip'
    };
    dialogAddVisible.value = true;
}
//确认添加用户
const sureAddUserHandler = () => {
    if (!userForm.value.username || !userForm.value.password) {
        ElMessage.error('用户名和密码不能为空');
        return;
    }
    // 验证手机号格式
    if (userForm.value.phone && !/^1[3-9]\d{9}$/.test(userForm.value.phone)) {
        ElMessage.error('请输入正确的手机号格式');
        return;
    }
    api.getBackendUsersAdd(userForm.value).then(res => {
        if (res.data.status === 200) {
            ElMessage.success(res.data.msg || '用户添加成功');
            dialogAddVisible.value = false;
            http();
        } else {
            ElMessage.error(res.data.msg || '用户添加失败');
        }
    }).catch(error => {
        ElMessage.error('用户添加失败');
    });
}
/**
 * 删除用户信息
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm(`确定删除用户 ${row.username} 吗？`, '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // 调用删除接口
        api.getBackendUsersDelete({ id: row.id }).then(res => {
            if (res.data.status === 200) {
                ElMessage.success(res.data.msg || '用户删除成功');
                // 重新加载用户数据
                http();
            } else {
                ElMessage.error(res.data.msg || '用户删除失败');
            }
        }).catch(error => {
            ElMessage.error('用户删除失败');
        });
    }).catch(() => {
        // 用户取消删除
        ElMessage.info('已取消删除');
    });
}
/**
 * 修改用户信息
 */
const dialogUpdateVisible = ref(false);
const userUpdateForm = ref({
    id: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    permission: 'vip'
});
const handleEditor = (index, row) => {
    // 填充表单数据
    userUpdateForm.value = {
        id: row.id,
        username: row.username,
        password: '', // 密码留空，表示不修改
        phone: row.phone,
        email: row.email,
        permission: row.permission
    };
    dialogUpdateVisible.value = true;
}
//确定修改用户信息
const sureUpdateUserHandler = () => {
    // 验证手机号格式
    if (userUpdateForm.value.phone && !/^1[3-9]\d{9}$/.test(userUpdateForm.value.phone)) {
        ElMessage.error('请输入正确的手机号格式');
        return;
    }
    api.getBackendUsersUpdate(userUpdateForm.value).then(res => {
        if (res.data.status === 200) {
            ElMessage.success(res.data.msg || '用户信息更新成功');
            dialogUpdateVisible.value = false;
            // 重新加载用户数据
            http();
        } else {
            ElMessage.error(res.data.msg || '用户信息更新失败');
        }
    }).catch(error => {
        ElMessage.error('用户信息更新失败');
    });
}

/**
 * 搜索用户信息
 */
const search = ref('');
const searchHandler = () => {
    if (!search.value.trim()) {
        http();
        ElMessage({
            message: `搜索内容不能为空`,
            type: 'warning'
        });
        return;
    }
    api.getBackendUsersSearch({ search: search.value.trim() }).then(res => {
        if (res.data.status === 200) {
            tableData.value = res.data.data || [];
            if (tableData.value.length === 0) {
                ElMessage.info('未找到匹配的用户');
            }
        } else {
            ElMessage.error(res.data.msg || '搜索用户失败');
        }
    }).catch(error => {
        ElMessage.error('搜索用户失败');
    });
}
</script>
<style lang="scss" scoped></style>