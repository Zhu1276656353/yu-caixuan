import { defineStore } from "pinia";
export const useLoginStore = defineStore("login", {
    state: () => ({
        token: "",
        username: "",
        password: "",
        permission: "",
        // token 过期时间（毫秒时间戳）
        expiresAt: null,
        // 登录状态标记
        isLogin: false
    }),
    persist: {
        enabled: true,
        key: 'loginStore', // 存储名称
        storage: localStorage, // 存储方式
    }
})