<template>
    <div class="about-container">
        <div class="header">
            <h1>关于我们</h1>
            <p class="subtitle">了解鱼彩轩的故事</p>
        </div>

        <div class="content-section">
            <div class="intro-card">
                <h2>{{ aboutintro.title }}</h2>
                <p>{{ aboutintro.content }}</p>
            </div>

            <div class="history-section">
                <h2>我们的历史</h2>
                <div class="timeline">
                    <div class="timeline-item" v-for="item in abouthistory.list" :key="item.id">
                        <div class="year">{{ item.year }}</div>
                        <div class="description">{{ item.content }}</div>
                    </div>
                </div>
            </div>

            <div class="mission-section">
                <h2>我们的使命</h2>
                <div class="mission-content">
                    <div class="mission-item" v-for="item in aboutmission.list" :key="item.id">
                        <h3>{{item.title}}</h3>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import api from "@/api/index.js"
import { onMounted, ref, reactive } from "vue"
//关于我们简介数据
const aboutintro = ref([])
//关于我们历史数据
const abouthistory = reactive({
    list: []
})
//关于我们使命数据
const aboutmission = reactive({
    list: []
})
onMounted(() => {
    api.getAboutintro().then(res => {
        if (res.data.status === 200) {
            aboutintro.value = res.data.data
        }
    })
    api.getAbouthistory().then(res => {
        if (res.data.status === 200) {
            abouthistory.list = res.data.data
        }
    })
    api.getAboutmission().then(res => {
        if (res.data.status === 200) {
            aboutmission.list = res.data.data
        }
    })
})
</script>

<style lang="scss" scoped>
.about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    .header {
        text-align: center;
        margin-bottom: 40px;

        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 1.2rem;
            color: #7f8c8d;
        }
    }

    .content-section {
        .intro-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 40px;

            h2 {
                margin-top: 0;
            }

            p {
                font-size: 1.1rem;
                line-height: 1.6;
            }
        }

        .history-section {
            margin-bottom: 40px;

            h2 {
                text-align: center;
                color: #2c3e50;
                margin-bottom: 30px;
            }

            .timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background: #3498db;
                    left: 50%;
                    margin-left: -2px;
                }

                .timeline-item {
                    margin-bottom: 40px;
                    position: relative;

                    &:nth-child(odd) {
                        padding-right: calc(50% + 30px);
                        text-align: right;
                    }

                    &:nth-child(even) {
                        padding-left: calc(50% + 30px);
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: #3498db;
                        border-radius: 50%;
                        top: 0;
                        left: 50%;
                        margin-left: -10px;
                    }

                    .year {
                        font-weight: bold;
                        color: #3498db;
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                    }

                    .description {
                        background: #ecf0f1;
                        padding: 15px;
                        border-radius: 5px;
                        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
                    }
                }
            }
        }

        .mission-section {
            margin-bottom: 40px;

            h2 {
                text-align: center;
                color: #2c3e50;
                margin-bottom: 30px;
            }

            .mission-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;

                .mission-item {
                    background: #f8f9fa;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: translateY(-5px);
                    }

                    h3 {
                        color: #3498db;
                        margin-top: 0;
                    }

                    p {
                        color: #7f8c8d;
                        line-height: 1.6;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .about-container {
        padding: 10px;

        .header {
            h1 {
                font-size: 2rem;
            }
        }

        .content-section {
            .history-section {
                .timeline {
                    &::before {
                        left: 30px;
                    }

                    .timeline-item {
                        padding-left: 70px !important;
                        padding-right: 0 !important;
                        text-align: left !important;

                        &::after {
                            left: 30px;
                        }
                    }
                }
            }
        }
    }
}
</style>