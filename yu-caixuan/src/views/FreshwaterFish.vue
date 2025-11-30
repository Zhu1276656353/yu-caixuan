<template>
    <div class="freshwater-fish">
        <div class="search">
            <div class="title">淡水生物</div>
            <div class="search-box">
                <div class="input-group">
                    <input required type="text" v-model="input" @keyup.enter="searchHandler" autocomplete="off"
                        placeholder=" " class="input">
                    <label class="user-label">请输入要查询的商品</label>
                    <el-button @click="searchHandler" icon="Search" class="search-button" />
                </div>
            </div>
        </div>
        <div class="freshwaterCard">
            <div class="freshwaterCard-box">
                <!-- 商品卡片 -->
                <div class="card-container" @click="toProductDetail(item)" v-for="item in freshwaterfish.list"
                    :key="item.id">
                    <div class="card">
                        <div class="front-content">
                            <div class="freshwaterCard-card">
                                <div class="freshwaterCard-card-img">
                                    <img :src="'http://localhost:3000' + item.image" :alt="item.name"></img>
                                </div>
                                <div class="freshwaterCard-card-content">
                                    <span class="freshwaterCard-card-content-title">
                                        {{ item.name }}
                                    </span>
                                    <span class="freshwaterCard-card-content-price">￥<span>{{ item.price
                                    }}</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <p class="heading">{{ item.name }}</p>
                            <p class="introduce">{{ item.introduce || '暂无商品介绍' }}</p>
                            <el-button class="button" round @click.stop="handleAddCartClick(item)">加入购物车</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="freshwaterfish.total" :page-size="10"
                    v-model:current-page="freshwaterfish.currentPage" @current-change="handlePageChange" class="mt-4" />
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/index.js";
import { ref, reactive, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
const router = useRouter();
const cartStore = useCartStore();
/**
 * 模糊查询
 */
// 添加一个状态来跟踪是否处于搜索模式
const isSearchMode = ref(false);
//搜索框内容
const input = ref('')
// 添加响应式数据用于存储所有搜索结果
const allSearchResults = ref([]);
/**
 * 模糊查询结束
 */
const freshwaterfish = reactive({
    list: [],
    currentPage: 1,
    total: 0 // 存储总记录数
});
onMounted(() => {
    fetchData(1);
});
// 模糊查询处理函数
const searchHandler = () => {
    if (!input.value.trim()) {
        // 如果搜索框为空，重置为普通模式
        isSearchMode.value = false;
        fetchData(1);
        ElMessage({
            message: `暂无数据，已显示全部商品`,
            type: 'warning'
        });
        return;
    }
    api.getFreshwaterfishSearch({
        search: input.value
    }).then(res => {
        if (res.data.status === 200) {
            // 保存所有搜索结果
            allSearchResults.value = res.data.data;
            // 设置为搜索模式
            isSearchMode.value = true;
            // 显示第一页数据
            showSearchResultsPage(1);
            ElMessage({
                message: `查询成功`,
                type: 'success'
            });
        } else {
            ElMessage({
                message: `未找到相关商品`,
                type: 'error'
            });
        }
    })
}
// 显示搜索结果的指定页
const showSearchResultsPage = (page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 更新当前页数据
    freshwaterfish.list = allSearchResults.value.slice(startIndex, endIndex);
    freshwaterfish.currentPage = page;
    // 更新总记录数
    freshwaterfish.total = allSearchResults.value.length;
}
//获取搜索或者当页数据
const fetchData = async (page) => {
    try {
        if (isSearchMode.value && input.value) {
            // 搜索模式:直接显示对应页面
            showSearchResultsPage(page);
        } else {
            // 普通模式：获取当前页数据
            const dataRes = await api.getFreshwaterfish({ page: page })
            if (dataRes.data.status === 200) {
                freshwaterfish.list = dataRes.data.data;
                freshwaterfish.currentPage = page;
            }

            // 获取总记录数
            const totalRes = await api.getFreshwaterfishtotal()
            if (totalRes.data.status === 200) {
                freshwaterfish.total = totalRes.data.data
            }

        }
    } catch (error) {
        console.error('获取数据失败:', error)
    }
}

// 处理页码变化
const handlePageChange = (page) => {
    fetchData(page)
}

// 加入购物车处理函数
const handleAddCartClick = (item) => {
    ElMessage({
        message: `商品添加成功`,
        type: 'success'
    });
    cartStore.addItem({
        id: `${item.id}`,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1  // 添加1个该商品
    })
};
// 跳转到商品详情页
const toProductDetail = (item) => {
    router.push({
        path: `/productDetails/${item.id}`,
        query: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            introduce: item.introduce
        }
    });
};
</script>

<style lang="scss" scoped>
.freshwater-fish {
    .search {
        width: 60%;
        margin: 30px auto;

        .title {
            margin-bottom: 20px;
            font-size: 40px;
            font-weight: bold;
        }

        .search-box {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            // 自定义搜索框样式
            .input-group {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;

                .input {
                    flex: 1;
                    border: solid 1.5px #9e9e9e;
                    border-radius: 1rem;
                    background: none;
                    padding: 1rem 3rem 1rem 1rem; // 右侧留出按钮空间
                    font-size: 1rem;
                    color: #333;
                    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

                    &::placeholder {
                        color: transparent;
                    }

                    &:focus {
                        outline: none;
                        border: 1.5px solid #1a73e8;
                    }

                    // 当有内容时保持标签在顶部
                    &:not(:placeholder-shown)~.user-label,
                    &:focus~.user-label {
                        transform: translateY(-130%) scale(0.8);
                        padding: 0 .2em;
                        color: #1a73e8;
                    }
                }

                .user-label {
                    position: absolute;
                    left: 15px;
                    color: #9e9e9e;
                    pointer-events: none;
                    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    padding: 0 2px;
                    transform-origin: left top;
                }

                .search-button {
                    position: absolute;
                    right: 5px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    padding: 5px;
                    min-width: auto;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    transition: background-color 0.3s;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                }
            }
        }
    }

    .freshwaterCard {
        width: 100%;
        // background-color: #F8F9FA;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 50px 0;

        .freshwaterCard-box {
            width: 60%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: space-between;
            align-items: center;

            // 悬停卡片容器
            .card-container {
                width: 30%;
                height: 300px;
                position: relative;
                border-radius: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);

                /**底部第一张和第二张图片宽度和图片高度不一致 */
                &:nth-child(5n+1),
                &:nth-child(5n+2) {
                    width: 48%;
                    height: 300px;
                }

                &:hover {
                    transform: translateY(-5px) scale(1.02) perspective(1000px) rotateY(5deg) rotateX(5deg);
                    box-shadow: 10px 15px 25px rgba(0, 0, 0, 0.8);
                }
            }

            .card {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                cursor: pointer;

                .front-content {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
                }

                .content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    gap: 10px;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
                    color: #e8e8e8;
                    line-height: 1.5;
                    border-radius: 5px;
                    pointer-events: none;
                    transform: translateX(100%);
                    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);

                    .heading {
                        font-size: 24px;
                        font-weight: 700;
                    }

                    .introduce {
                        padding: 0 20px;
                        display: -webkit-box;
                        line-clamp: 3;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .price {
                        font-size: 20px;
                        font-weight: 900;
                        color: white;
                    }

                    .button {
                        cursor: pointer;
                        position: relative;
                        margin-top: 10px;
                        padding: 10px 24px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.8);
                        //  background-image: linear-gradient(45deg, #ff6547 0%, #ffb144 51%, #ff7053 100%);
                        border: 2px solid #ff6547;
                        border-radius: 34px;
                        background-color: transparent;
                        font-weight: 600;
                        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
                        overflow: hidden;
                    }

                    .button::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        margin: auto;
                        width: 50px;
                        height: 50px;
                        border-radius: inherit;
                        scale: 0;
                        z-index: -1;
                        background-color: #ff6547;
                        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
                    }

                    .button:hover::before {
                        scale: 3;
                    }

                    .button:hover {
                        color: #212121;
                        scale: 1.1;
                        box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
                    }

                    .button:active {
                        scale: 1;
                    }



                }

                &:hover {
                    .content {
                        transform: translateX(0);
                        pointer-events: auto;
                    }

                    .front-content {
                        transform: translateX(0%);
                    }
                }
            }

            // 原有的商品卡片样式
            .freshwaterCard-card {
                width: 100%;
                height: 100%;
                border: 1px solid rgb(255, 255, 255);
                background-image: linear-gradient(#fddb92 70%, #d1fdff 100%);
                border-radius: 20px;
                overflow: hidden;
                transition: 0.2s ease-in;

                .freshwaterCard-card-img {
                    width: 100%;
                    height: 80%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        // 添加渐变遮罩
                        -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                        mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                    }
                }

                .freshwaterCard-card-content {
                    width: 100%;
                    height: 20%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    .freshwaterCard-card-content-title {
                        font-size: 20px;
                        font-weight: bold;
                    }

                    .freshwaterCard-card-content-price {
                        font-weight: bold;
                        font-size: 15px;

                        span {
                            font-size: 20px;
                            color: red;
                        }
                    }
                }
            }
        }

        .pagination {
            width: 60%;
            margin: 60px auto 30px auto;
        }

        // 或者直接设置分页组件居中
        :deep(.mt-4) {
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 0 auto;
        }
    }
}
</style>