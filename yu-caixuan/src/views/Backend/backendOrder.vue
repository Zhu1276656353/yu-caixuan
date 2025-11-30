<template>
    <div class="container">
        <div class="title">订单管理</div>
        <!-- 订单搜索 -->
        <div class="search">
            <div class="search-box">
                <div class="input-group">
                    <input required type="text" v-model="searchKeyword" @keyup.enter="searchOrders" autocomplete="off"
                        placeholder=" " class="input">
                    <label class="user-label">请输入订单号/收货人/联系电话</label>
                    <el-button @click="searchOrders" icon="Search" class="search-button" />
                </div>
            </div>
        </div>

        <!-- 订单表格 -->
        <div class="table">
            <el-table :data="orderList" stripe height="600" style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="订单ID" width="80" />
                <el-table-column prop="orderNumber" label="订单号" width="180" />
                <el-table-column prop="name" label="收货人" width="120" />
                <el-table-column prop="phone" label="联系电话" width="120" />
                <el-table-column prop="address" label="收货地址" width="250" />
                <el-table-column prop="totalAmount" label="订单金额" width="100">
                    <template #default="scope">
                        ¥{{ (parseFloat(scope.row.totalAmount) || 0).toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="订单状态" width="120">
                    <template #default="scope">
                        <el-tag :type="getOrderStatusType(scope.row.status)">
                            {{ getOrderStatusText(scope.row.status) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="下单时间" width="180" />
                <el-table-column label="操作" width="300">
                    <template #default="scope">
                        <el-button size="small" @click="viewOrderDetails(scope.row)">查看详情</el-button>
                        <el-button size="small" type="primary" @click="updateOrderStatus(scope.row)"
                            v-if="scope.row.status !== 3">
                            修改状态
                        </el-button>
                        <el-button size="small" type="danger" @click="deleteOrder(scope.row)"
                            v-if="scope.row.status === 4">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination class="pagination" background layout="prev, pager, next, jumper, total" :total="total"
                :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange" />
        </div>

        <!-- 订单详情弹窗 -->
        <el-dialog v-model="detailDialogVisible" title="订单详情" width="60%" center>
            <div v-if="currentOrder" class="order-detail">
                <el-descriptions title="订单信息" :column="2" border>
                    <el-descriptions-item label="订单号">{{ currentOrder.orderNumber }}</el-descriptions-item>
                    <el-descriptions-item label="下单时间">{{ currentOrder.createTime }}</el-descriptions-item>
                    <el-descriptions-item label="订单状态">
                        <el-tag :type="getOrderStatusType(currentOrder.status)">
                            {{ getOrderStatusText(currentOrder.status) }}
                        </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="订单金额">¥{{ (parseFloat(currentOrder.totalAmount) || 0).toFixed(2)
                    }}</el-descriptions-item>
                    <el-descriptions-item label="收货人">{{ currentOrder.name }}</el-descriptions-item>
                    <el-descriptions-item label="联系电话">{{ currentOrder.phone }}</el-descriptions-item>
                    <el-descriptions-item label="收货地址" :span="2">{{ currentOrder.address }}</el-descriptions-item>
                    <el-descriptions-item label="备注信息" :span="2">{{ currentOrder.remark || '无' }}</el-descriptions-item>
                </el-descriptions>

                <el-divider />

                <div class="order-items">
                    <div class="section-title">商品信息</div>
                    <el-table :data="currentOrder.items" style="width: 100%">
                        <el-table-column prop="name" label="商品名称" />
                        <el-table-column prop="price" label="单价" width="100">
                            <template #default="scope">
                                ¥{{ (parseFloat(scope.row.price) || 0).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="quantity" label="数量" width="80" />
                        <el-table-column label="小计" width="120">
                            <template #default="scope">
                                ¥{{ ((parseFloat(scope.row.price) || 0) * (parseInt(scope.row.quantity) ||
                                    0)).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="图片" width="100">
                            <template #default="scope">
                                <el-image style="width: 60px; height: 60px"
                                    :src="scope.row.image ? 'http://localhost:3000' + scope.row.image : ''" fit="cover"
                                    :preview-src-list="[scope.row.image ? 'http://localhost:3000' + scope.row.image : '']"
                                    lazy />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <template #footer>
                <el-button @click="detailDialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>

        <!-- 修改订单状态弹窗 -->
        <el-dialog v-model="statusDialogVisible" title="修改订单状态" width="30%" center>
            <el-form :model="statusForm" label-width="100px">
                <el-form-item label="当前状态">
                    <el-tag :type="getOrderStatusType(currentOrder?.status)">
                        {{ getOrderStatusText(currentOrder?.status) }}
                    </el-tag>
                </el-form-item>
                <el-form-item label="修改为">
                    <el-select v-model="statusForm.newStatus" placeholder="请选择新状态">
                        <el-option v-for="status in availableStatus" :key="status.value" :label="status.label"
                            :value="status.value" :disabled="status.value === currentOrder?.status" />
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="statusDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmUpdateStatus">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/index'

// 订单列表相关
const orderList = ref([])
const loading = ref(false)
const searchKeyword = ref('')

// 分页相关
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 弹窗相关
const detailDialogVisible = ref(false)
const statusDialogVisible = ref(false)

// 当前选中订单
const currentOrder = ref(null)

// 状态表单
const statusForm = ref({
    newStatus: ''
})

// 订单状态映射
const orderStatusMap = {
    0: { text: '待付款', type: 'info' },
    1: { text: '待发货', type: 'warning' },
    2: { text: '已发货', type: 'primary' },
    3: { text: '已完成', type: 'success' },
    4: { text: '已取消', type: 'danger' }
}

// 可选状态
const availableStatus = [
    { value: 1, label: '待发货' },
    { value: 2, label: '已发货' },
    { value: 3, label: '已完成' },
    { value: 4, label: '已取消' }
]

// 获取订单状态文本
const getOrderStatusText = (status) => {
    return orderStatusMap[status]?.text || '未知状态'
}

// 获取订单状态类型（用于标签颜色）
const getOrderStatusType = (status) => {
    return orderStatusMap[status]?.type || 'info'
}
// 安全地解析订单项
const parseItemsSafely = (items) => {
    // 如果 items 不存在或者为空，返回空数组
    if (!items) return []

    // 如果 items 已经是数组，直接返回
    if (Array.isArray(items)) {
        return items
    }

    // 如果 items 是字符串，尝试解析为 JSON
    if (typeof items === 'string') {
        try {
            const parsed = JSON.parse(items)
            return Array.isArray(parsed) ? parsed : []
        } catch (e) {
            console.error('解析订单项失败:', e)
            return []
        }
    }

    // 其他情况返回空数组
    return []

}
/**
 * 获取订单列表
*/
const fetchOrders = (page = 1, keyword = '') => {
    loading.value = true
    api.getBackendOrders({
        params: {
            page,
            pageSize: pageSize.value,
            keyword
        }
    }).then(res => {
        if (res.data.status === 200) {
            orderList.value = res.data.data.map(order => ({
                ...order,
                // 安全地解析items数组
                items: parseItemsSafely(order.items),
                // 确保数值字段是数字类型
                totalAmount: parseFloat(order.totalAmount) || 0
            }))
            total.value = res.data.pagination.total
            currentPage.value = res.data.pagination.currentPage
        }
    }).catch(err => {
        console.error('获取订单列表失败:', err)
        ElMessage.error('获取订单列表失败')
    }).finally(() => {
        loading.value = false
    })
}

// 处理分页变化
const handlePageChange = (page) => {
    currentPage.value = page
    fetchOrders(page, searchKeyword.value)
}

// 搜索订单
const searchOrders = () => {
    if (!searchKeyword.value.trim()) {
        ElMessage({
            message: `搜索内容不能为空`,
            type: 'warning'
        });
        return;
    }
    currentPage.value = 1
    fetchOrders(1, searchKeyword.value)
}

// 查看订单详情
const viewOrderDetails = (order) => {
    currentOrder.value = {
        ...order,
        // 安全地解析items数组
        items: parseItemsSafely(order.items),
        // 确保数值字段是数字类型
        totalAmount: parseFloat(order.totalAmount) || 0
    };
    detailDialogVisible.value = true
}

/**
 * 更新订单状态
 */
const updateOrderStatus = (order) => {
    currentOrder.value = order
    statusForm.value.newStatus = ''
    statusDialogVisible.value = true
}

// 确认更新订单状态
const confirmUpdateStatus = () => {
    if (!statusForm.value.newStatus) {
        ElMessage.warning('请选择新的订单状态')
        return
    }
    api.getBackendOrdersUpdateStatus({
        id: currentOrder.value.id,
        status: statusForm.value.newStatus
    }).then(res => {
        if (res.data.status === 200) {
            ElMessage.success('订单状态更新成功')
            // 更新本地数据
            const orderIndex = orderList.value.findIndex(order => order.id === currentOrder.value.id)
            if (orderIndex !== -1) {
                orderList.value[orderIndex].status = statusForm.value.newStatus
            }
            statusDialogVisible.value = false
            // 如果在详情弹窗中也打开了该订单，则更新详情中的状态
            if (currentOrder.value) {
                currentOrder.value.status = statusForm.value.newStatus
            }
        } else {
            ElMessage.error(res.data.msg || '订单状态更新失败')
        }
    }).catch(err => {
        console.error('更新订单状态失败:', err)
        ElMessage.error('订单状态更新失败')
    })
}
/**
 * 删除订单：删除按钮只对状态为"已取消"(status=4)的订单显示，避免误删正常状态的订单
 */
const deleteOrder = (order) => {
    ElMessageBox.confirm(
        `确定要删除订单号为 ${order.orderNumber} 的订单吗？此操作不可恢复！`,
        '删除确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 调用API删除订单
        api.getBackendOrdersDelete({
            id: order.id
        }).then(res => {
            if (res.data.status === 200) {
                ElMessage.success('订单删除成功');
                // 重新获取订单列表
                fetchOrders(currentPage.value, searchKeyword.value);
            } else {
                ElMessage.error(res.data.msg || '订单删除失败');
            }
        }).catch(err => {
            console.error('删除订单失败:', err);
            ElMessage.error('订单删除失败');
        });
    }).catch(() => {
        // 用户取消删除
        ElMessage.info('已取消删除');
    });
}
// 组件挂载时获取订单列表
onMounted(() => {
    fetchOrders()
})
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.search {
    margin-bottom: 20px;

    .input {
        width: 400px;
    }
}

.table {
    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}

.order-detail {
    .section-title {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0 10px;
    }
}

.order-items {
    margin-top: 20px;
}
</style>