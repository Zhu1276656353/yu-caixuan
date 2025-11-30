<template>
    <div class="freshwater-fish">
        <div class="search">
            <div class="title">精选器械</div>
            <div class="search-box">
                <el-input class="search-input" @keydown.enter="searchHandler" size="large" v-model="input"
                    placeholder="请输入要查询的商品" clearable>
                    <template #append>
                        <el-button @click="searchHandler" icon="Search" />
                    </template>
                </el-input>
            </div>
        </div>
        <div class="fishtoolCard">
            <div class="fishtoolCard-box">
                <div class="fishtoolCard-card" @click="toProductDetail(item)" v-for="item in fishtool.list" :key="item.id">
                    <div class="fishtoolCard-card-img">
                        <img :src="'http://localhost:3000' + item.image" :alt="item.name"></img>
                    </div>
                    <div class="fishtoolCard-card-content">
                        <span class="fishtoolCard-card-content-title">
                            {{ item.name }}
                            <span class="fishtoolCard-card-content-price">￥<span>{{ item.price }}</span></span>
                        </span>
                        <el-button round @click.stop="handleAddCartClick(item)">加入购物车</el-button>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="fishtool.total" :page-size="10"
                    v-model:current-page="fishtool.currentPage" @current-change="handlePageChange" class="mt-4" />
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
const fishtool = reactive({
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
        return;
    }
    api.getFishtoolSearch({
        search: input.value
    }).then(res => {
        if (res.data.status === 200) {
            // 保存所有搜索结果
            allSearchResults.value = res.data.data;
            // 设置为搜索模式
            isSearchMode.value = true;
            // 显示第一页数据
            showSearchResultsPage(1);
        }
    })
}
// 显示搜索结果的指定页
const showSearchResultsPage = (page) => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 更新当前页数据
    fishtool.list = allSearchResults.value.slice(startIndex, endIndex);
    fishtool.currentPage = page;
    // 更新总记录数
    fishtool.total = allSearchResults.value.length;
}
const fetchData = async (page) => {
    try {
        if (isSearchMode.value && input.value) {
            // 搜索模式:直接显示对应页面
            showSearchResultsPage(page);
        } else {
            // 普通模式：获取当前页数据
            const dataRes = await api.getFishtool({ page: page })
            if (dataRes.data.status === 200) {
                fishtool.list = dataRes.data.data
                fishtool.currentPage = page
            }

            // 获取总记录数
            const totalRes = await api.getFishtooltotal()
            if (totalRes.data.status === 200) {
                fishtool.total = totalRes.data.data
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
    cartStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1  // 添加1个该商品
    })
};
// 跳转到商品详情页
const toProductDetail = (item) => {
    router.push({
        path: `/productDetails/${item.cid}`,
        query: {
            id: item.id,
            cid: item.cid,
            name: item.name,
            price: item.price,
            image: item.image,
            introduce: item.introduce
        }
    });
};
</script>

<style lang="scss" scoped>
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
    }

}

.fishtoolCard {
    width: 100%;
    background-color: white;
    padding: 50px 0;

    .fishtoolCard-box {
        width: 60%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: space-between;
        align-items: center;

        .fishtoolCard-card {
            width: 30%;
            height: 450px;
            border: 1px solid rgb(255, 255, 255);
            background-image: linear-gradient(#fddb92 70%, #d1fdff 100%);
            border-radius: 20px;
            overflow: hidden;
            transition: 0.2s ease-in;

            /**底部第一张和第二张图片宽度和图片高度不一致 */
            &:nth-child(5n+1),
            &:nth-child(5n+2) {
                width: 48%;
                height: 450px;
            }

            &:hover {
                transform: translate3d(0, -5px, 0);
                box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
            }

            .fishtoolCard-card-img {
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

            .fishtoolCard-card-content {
                width: 100%;
                height: 20%;
                display: flex;
                align-items: center;
                justify-content: space-around;

                .fishtoolCard-card-content-title {
                    font-size: 20px;
                    font-weight: bold;
                }

                .fishtoolCard-card-content-price {
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
// 小型设备响应式 (481px - 767px) - 手机横屏
@media screen and (min-width: 481px) and (max-width: 767px) {
    .search {
        width: 90%;
        margin: 25px auto;

        .title {
            margin-bottom: 18px;
            font-size: 32px;
            text-align: center;
        }

        .search-box {
            width: 80%;
        }
    }

    .fishtoolCard {
        padding: 40px 0;

        .fishtoolCard-box {
            width: 90%;
            gap: 20px;

            .fishtoolCard-card {
                width: 48%;
                height: 270px;

                &:nth-child(5n+1),
                &:nth-child(5n+2) {
                    width: 48%;
                    height: 270px;
                }

                .fishtoolCard-card-content {
                    .fishtoolCard-card-content-title {
                        font-size: 18px;
                    }

                    .fishtoolCard-card-content-price {
                        font-size: 14px;

                        span {
                            font-size: 18px;
                        }
                    }
                    
                    :deep(.el-button) {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
                }
            }
        }

        .pagination {
            width: 90%;
            margin: 40px auto 25px auto;
        }
    }
}

// 平板设备响应式 (768px - 1024px) - 平板
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .search {
        width: 85%;
        margin: 28px auto;

        .title {
            margin-bottom: 19px;
            font-size: 36px;
        }

        .search-box {
            width: 60%;
        }
    }

    .fishtoolCard {
        padding: 45px 0;

        .fishtoolCard-box {
            width: 85%;
            gap: 25px;

            .fishtoolCard-card {
                width: 46%;
                height: 280px;

                &:nth-child(5n+1),
                &:nth-child(5n+2) {
                    width: 46%;
                    height: 280px;
                }

                .fishtoolCard-card-content {
                    .fishtoolCard-card-content-title {
                        font-size: 18px;
                    }

                    .fishtoolCard-card-content-price {
                        font-size: 15px;

                        span {
                            font-size: 19px;
                        }
                    }
                    
                    :deep(.el-button) {
                        padding: 9px 18px;
                        font-size: 15px;
                    }
                }
            }
        }

        .pagination {
            width: 85%;
            margin: 50px auto 28px auto;
        }
    }
}

// 桌面设备响应式 (1024px及以上) - 桌面
@media screen and (min-width: 1024px) and (max-width: 1440px) {
    .search {
        width: 60%;
        margin: 30px auto;

        .title {
            margin-bottom: 20px;
            font-size: 40px;
        }

        .search-box {
            width: 50%;
        }
    }

    .fishtoolCard {
        padding: 50px 0;

        .fishtoolCard-box {
            width: 60%;
            gap: 30px;

            .fishtoolCard-card {
                width: 46%;
                height: 300px;

                &:nth-child(5n+1),
                &:nth-child(5n+2) {
                    width: 46%;
                    height: 300px;
                }

                .fishtoolCard-card-content {
                    .fishtoolCard-card-content-title {
                        font-size: 20px;
                    }

                    .fishtoolCard-card-content-price {
                        font-size: 15px;

                        span {
                            font-size: 20px;
                        }
                    }
                    
                    :deep(.el-button) {
                        padding: 10px 20px;
                        font-size: 16px;
                    }
                }
            }
        }

        .pagination {
            width: 60%;
            margin: 60px auto 30px auto;
        }
    }
}
</style>