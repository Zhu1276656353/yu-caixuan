<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-concat">
                <div class="footer-concat-box" v-for="item in footer.list" :key="item.id">
                    <div class="footer-concat-box-left">
                        <component :is="item.icon" class="footer-icon" color="orangered" />
                    </div>
                    <div class="footer-concat-box-right">
                        <div class="footer-concat-box-right-title">{{ item.name }}</div>
                        <div class="footer-concat-box-right-content">{{ item.content }}</div>
                    </div>
                </div>
            </div>
            <p class="footer-line">备案方</p>
        </div>

    </div>
</template>
<script setup>
import api from "@/api/index.js"
import { onMounted, reactive } from "vue"
const footer = reactive({
    list: []
})
onMounted(() => {
    api.getFooter().then(res => {
        footer.list = res.data.data
    })
})
</script>
<style lang="scss" scoped>
.footer {
    width: 100%;
    background-image: linear-gradient(135deg, #facfc3, #ff9a9e 100%);
    padding-bottom: 30px;

    .footer-content {
        width: 60%;
        height: 100%;
        margin: 0 auto;

        .footer-concat {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0 50px 0;
            border-bottom: 2px solid rgba(0, 0, 0, 0.5);

            .footer-concat-box {
                width: 33.33%;
                display: flex;
                align-items: center;
                justify-content: center;

                .footer-concat-box-left {
                    width: 20%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    // 通过 CSS 控制图标大小
                    .footer-icon {
                        width: 50px;
                        height: 50px;
                    }
                }

                .footer-concat-box-right {
                    width: 80%;
                    height: 90px;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.5);
                    padding-left: 10px;
                    padding-top: 10px;

                    .footer-concat-box-right-title {
                        font-size: 30px;
                        color: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
    }

    .footer-line {
        font-weight: bold;
        text-align: center;
        margin-top: 30px;
    }
}
</style>