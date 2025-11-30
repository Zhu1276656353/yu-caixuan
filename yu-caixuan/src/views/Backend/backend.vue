<template>
    <headerNav></headerNav>
    <backendNav></backendNav>
    <router-view></router-view>
</template>
<script setup>
import headerNav from '@/components/headerNav.vue';
import backendNav from '@/components/Backend/backendNav.vue'
</script>
<style lang="scss">
.container {
    width: calc(100% - 250px);
    margin-left: 250px;
    box-sizing: border-box;
    padding: 20px;

    .title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
        color: rgba(0, 0, 0, 0.7);
    }

    .search {
        width: 100%;
        margin: 30px 0;

        .search-box {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 15px;

            // 自定义搜索框样式
            .input-group {
                position: relative;
                width: 100%;
                max-width: 400px;
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

            .add-button {
                height: 3.5rem;
                border-radius: 1rem;
                background: linear-gradient(135deg, #409eff, #1a73e8);
                border: none;
                color: white;
                font-weight: bold;
                transition: all 0.3s;
                box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(64, 158, 255, 0.4);
                }
            }
        }
    }

    .table {
        margin-top: 20px;
    }

    .pagination {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
}
</style>