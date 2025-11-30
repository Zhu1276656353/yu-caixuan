<template>
    <div class="upload-view">
        <h1>文件上传</h1>
        <!-- 上传表单 -->
        <el-card class="upload-card">
            <el-form :model="uploadForm" label-width="120px">
                <!-- 添加产品类型选择 -->
                <el-form-item label="产品类型" prop="productType" :rules="[{ required: true, message: '请选择产品类型' }]">
                    <el-select v-model="uploadForm.productType" placeholder="请选择产品类型" style="width: 100%">
                        <el-option label="淡水生物" value="freshwaterfish"></el-option>
                        <el-option label="海水生物" value="saltwaterfish"></el-option>
                        <el-option label="精选器械" value="fishtool"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 产品信息 -->
                <el-form-item label="产品名称">
                    <el-input v-model="uploadForm.productName" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="uploadForm.price" placeholder="请输入价格" type="number"></el-input>
                </el-form-item>
                <el-form-item label="产品介绍">
                    <el-input v-model="uploadForm.introduce" placeholder="请输入产品介绍" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="产品ID(可选)">
                    <el-input v-model="uploadForm.productId" placeholder="更新现有产品时填写"></el-input>
                </el-form-item>
                <el-form-item label="选择图片">
                    <el-upload class="upload-demo" action="http://localhost:3000/uploads" :data="uploadForm"
                        :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload"
                        :auto-upload="false" :on-change="handleFileChange" ref="uploadRef" drag>
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            拖拽文件到此处或 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png 文件大小不超过 2MB
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <!-- 提交按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitUpload" :loading="uploading">
                        {{ uploading ? '上传中...' : '提交上传' }}
                    </el-button>
                    <el-button @click="clearForm" style="margin-left: 10px;">清空</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 上传结果展示 -->
        <el-card class="result-card" v-if="uploadResult">
            <h3>上传结果</h3>
            <p>状态: {{ uploadResult.message }}</p>
            <p>文件名: {{ uploadResult.data?.filename }}</p>
            <p>文件路径: {{ uploadResult.data?.path }}</p>
            <!-- 图片预览 -->
            <div v-if="uploadResult.data?.path" class="image-preview">
                <h4>图片预览:</h4>
                <img :src="'http://localhost:3000' + uploadResult.data.path" alt="上传的图片"
                    style="max-width: 300px; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"
                    @error="handleImageError">
                <p v-if="imageLoadError" style="color: red;">图片加载失败，请检查文件路径</p>
            </div>
            <div v-if="uploadResult.data?.productId">
                <p>产品ID: {{ uploadResult.data.productId }}</p>
            </div>
            <div v-if="uploadResult.data?.introduce">
                <p>产品介绍: {{ uploadResult.data.introduce }}</p>
            </div>
            <!-- 访问图片的链接 -->
            <el-button v-if="uploadResult.data?.path" @click="openImageInNewTab" type="primary" size="small"
                style="margin-top: 10px;">
                在新标签页中查看图片
            </el-button>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 上传表单数据
const uploadForm = reactive({
    productType: '', // 添加产品类型字段
    productName: '',
    price: '',
    introduce: '',
    productId: '' // 更新现有产品时使用
})

// 上传结果
const uploadResult = ref(null)
const imageLoadError = ref(false);
const uploading = ref(false)
const uploadRef = ref()
// 处理图片加载错误
const handleImageError = () => {
    imageLoadError.value = true;
    ElMessage.error('图片加载失败，请检查文件路径是否正确');
};
// 处理文件选择变化
const handleFileChange = (file, fileList) => {
    // 可以在这里处理文件选择后的逻辑
    console.log('文件已选择:', file)
}

// 在新标签页中打开图片
const openImageInNewTab = () => {
    if (uploadResult.value && uploadResult.value.data && uploadResult.value.data.path) {
        const fullUrl = `http://localhost:3000${uploadResult.value.data.path}`;
        window.open(fullUrl, '_blank');
    }
};
// 上传前检查
const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
}
// 提交上传
const submitUpload = () => {
    if (!uploadRef.value) {
        ElMessage.error('上传组件未初始化')
        return
    }

    // 验证必填字段
    if (!uploadForm.productType) {
        ElMessage.error('请选择产品类型')
        return
    }

    if (!uploadForm.productName) {
        ElMessage.error('请输入产品名称')
        return
    }

    if (!uploadForm.price) {
        ElMessage.error('请输入价格')
        return
    }

    uploading.value = true
    uploadRef.value.submit()
}
// 清空表单
const clearForm = () => {
    uploadForm.productType = ''
    uploadForm.productName = ''
    uploadForm.price = ''
    uploadForm.introduce = ''
    uploadForm.productId = ''
    uploadResult.value = null

    // 清空上传组件中的文件
    if (uploadRef.value) {
        uploadRef.value.clearFiles()
    }
}
// 上传成功处理
const handleUploadSuccess = (response, uploadFile) => {
    console.log('上传成功:', response);
    uploadResult.value = response;
    uploading.value = false; // 重置上传状态

    if (response.status === 200) {
        ElMessage.success(response.message || '上传成功');

        // 如果是更新产品图片，给出提示
        if (response.message.includes('更新产品图片')) {
            ElMessage.info('请刷新热销产品页面查看更新后的图片');
        }

        // 清空表单（但保留productId，如果需要继续更新同一产品）
        if (!uploadForm.productId) {
            uploadForm.productType = ''
            uploadForm.productName = '';
            uploadForm.price = '';
            uploadForm.introduce = '';
            uploadForm.cid = '';
        }
    } else {
        ElMessage.error(response.message || '上传失败');
    }
};
// 上传失败处理
const handleUploadError = (error) => {
    console.error('上传失败:', error)
    ElMessage.error('上传失败: ' + (error.message || '未知错误'))
    uploading.value = false; // 重置上传状态
}
</script>

<style scoped>
.upload-view {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.upload-card {
    margin-bottom: 20px;
}

.result-card {
    margin-top: 20px;
}

.upload-demo {
    width: 100%;
}
</style>