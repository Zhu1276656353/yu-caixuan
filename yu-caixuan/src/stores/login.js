import { defineStore } from "pinia";
export const useLoginStore = defineStore("login", {
    state: () => ({
        token: "",
        username: "",
        password: "",
        permission: ""
    }),
    persist: {
        enabled: true,
        key: 'loginStore', // 存储名称
        storage: localStorage, // 存储方式
    }
})