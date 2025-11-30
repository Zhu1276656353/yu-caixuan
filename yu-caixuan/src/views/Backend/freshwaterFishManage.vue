<template>
    <div class="container">
        <div class="title">淡水生物管理</div>
        <div class="search">
            <div class="search-box">
                <div class="input-group">
                    <input required type="text" v-model="search" @keyup.enter="searchHandler" autocomplete="off"
                        placeholder=" " class="input">
                    <label class="user-label">请输入查询的商品名称</label>
                    <el-button @click="searchHandler" icon="Search" class="search-button" />
                </div>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" stripe height="700" style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="商品名称" width="180" />
                <el-table-column prop="price" label="价格" width="80" />
                <el-table-column prop="image" label="图片" width="200">
                    <template #default="scope">
                        <el-image :src="'http://localhost:3000' + scope.row.image" class="product-image" fit="cover"
                            lazy>
                            <template #error>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="introduce" label="介绍" width="550" />
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
            <el-pagination class="pagination" background layout="prev, pager, next" :total="total"
                :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
        </div>

        <!-- 编辑商品弹窗 -->
        <el-dialog v-model="dialogUpdateVisible" title="修改商品信息" width="30%" center>
            <el-form :model="goodsUpdateForm" status-icon label-width="120px" style="padding: 20px;">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="goodsUpdateForm.name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="goodsUpdateForm.price" type="number"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="image">
                    <!-- <el-input v-model="goodsUpdateForm.image" type="text" disabled></el-input> -->
                    <el-image :src="'http://localhost:3000' + goodsUpdateForm.image" class="form-product-image"
                        fit="cover" lazy>
                        <template #error>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                                <div>图片无法加载</div>
                            </div>
                        </template>
                    </el-image>
                </el-form-item>

                <el-form-item label="商品介绍" prop="introduce">
                    <el-input v-model="goodsUpdateForm.introduce" type="textarea" :rows="4"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogUpdateVisible = false">取消</el-button>
                <el-button type="primary" @click="sureUpdateGoodsHandler">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/index';

const search = ref('');
const tableData = ref([]);

/**
 * 分页
 */
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

/**
 * 商品信息
 */
onMounted(() => {
    http(1);
});
const http = (page = 1) => {
    api.getBackendGoodsFreshwaterfish({ params: { page } }).then(res => {
        if (res.data.status === 200) {
            tableData.value = res.data.data;
            // 正确访问分页信息
            if (res.data.pagination) {
                total.value = res.data.pagination.total;
                currentPage.value = res.data.pagination.currentPage;
                pageSize.value = res.data.pagination.pageSize;
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
const handlePageChange = (page) => {
    http(page);
}
/**
 * 删除商品
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm(`确定删除商品 ${row.name} 吗？`, '删除商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        api.getBackendGoodsFreshwaterfishDelete({ id: row.id }).then(res => {
            if (res.data.status === 200) {
                tableData.value.splice(index, 1);
                total.value -= 1;
                ElMessage.success('删除成功');
                // 如果当前页没有数据，且不是第一页，则跳转到前一页
                if (tableData.value.length === 0 && currentPage.value > 1) {
                    currentPage.value -= 1;
                    http(currentPage.value);
                }
            } else {
                ElMessage.error('删除失败');
            }
        }).catch(err => {
            console.log(err);
        })
    }).catch(() => {
        ElMessage.info('已取消删除');
    });
}
/**
 * 编辑商品
 */
const dialogUpdateVisible = ref(false);
const goodsUpdateForm = ref({
    id: '',
    name: '',
    price: '',
    image: '',
    introduce: ''
});

const handleEditor = (index, row) => {
    // 填充表单数据
    goodsUpdateForm.value = {
        id: row.id,
        name: row.name,
        price: row.price,
        image: row.image,
        introduce: row.introduce
    };
    dialogUpdateVisible.value = true;
}
// 确定修改
const sureUpdateGoodsHandler = () => {
    // 简单验证
    if (!goodsUpdateForm.value.name || !goodsUpdateForm.value.price) {
        ElMessage.error('商品名称和价格不能为空');
        return;
    }
    api.getBackendGoodsFreshwaterfishUpdate(goodsUpdateForm.value).then(res => {
        if (res.data.status === 200) {
            ElMessage.success(res.data.msg || '商品修改成功');
            dialogUpdateVisible.value = false;
            http(currentPage.value);
        } else {
            ElMessage.error(res.data.msg || '商品修改失败');
        }
    }).catch(error => {
        ElMessage.error('商品修改失败');
    });
}
/**
 * 模糊查询
 */
const searchHandler = () => {
    if (search.value.trim() === '') {
        http(1);
        ElMessage({
            message: `搜索内容不能为空`,
            type: 'warning'
        });
        return;
    }
    api.getBackendGoodsFreshwaterfishSearch({ search: search.value }).then(res => {
        if (res.data.status === 200) {
            tableData.value = res.data.data;
            total.value = res.data.data.length;
            currentPage.value = 1;
            pageSize.value = res.data.data.length;
            ElMessage.success('查询成功');
        }else {
            ElMessage({
                message: `未找到相关商品`,
                type: 'error'
            });
        }
    }).catch(err => {
        console.log(err);
    })
}
</script>
