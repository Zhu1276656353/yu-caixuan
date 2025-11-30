import base from './base.js'
import axios from '@/utils/request.js'
const api = {
    //文件上传接口
    getUploadFile(params) {
        return axios.post(base.baseUrl + base.upload, params)
    },
    //登录接口
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    //注册接口
    getRegister(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    //获取logo接口
    getLogo() {
        return axios.get(base.baseUrl + base.logo)
    },
    //获取优惠券接口
    getDiscount() {
        return axios.get(base.baseUrl + base.discount)
    },
    //获取分类接口
    getCategory() {
        return axios.get(base.baseUrl + base.category)
    },
    //获取热销推荐接口
    getHotProducts() {
        return axios.get(base.baseUrl + base.hotProducts)
    },
    //获取新品推荐接口
    getNewProducts() {
        return axios.get(base.baseUrl + base.newProducts)
    },
    //获取页脚接口
    getFooter() {
        return axios.get(base.baseUrl + base.footer)
    },
    //淡水生物接口
    getFreshwaterfish(params) {
        return axios.get(base.baseUrl + base.freshwaterfish, { params })
    },
    //获取淡水生物页码总数接口
    getFreshwaterfishtotal() {
        return axios.get(base.baseUrl + base.freshwaterfishtotal)
    },
    //淡水生物模糊查询
    getFreshwaterfishSearch(params) {
        return axios.get(base.baseUrl + base.freshwaterfishSearch, { params })
    },
    //海水生物接口
    getSaltwaterfish(params) {
        return axios.get(base.baseUrl + base.saltwaterfish, { params })
    },
    //获取海水生物页码总数接口
    getSaltwaterfishtotal() {
        return axios.get(base.baseUrl + base.saltwaterfishtotal)
    },
    //海水生物模糊查询
    getSaltwaterfishSearch(params) {
        return axios.get(base.baseUrl + base.saltwaterfishSearch, { params })
    },
    //精选器械接口t
    getFishtool(params) {
        return axios.get(base.baseUrl + base.fishtool, { params })
    },
    //获取精选器械页码总数接口
    getFishtooltotal() {
        return axios.get(base.baseUrl + base.fishtooltotal)
    },
    //精选器械模糊查询
    getFishtoolSearch(params) {
        return axios.get(base.baseUrl + base.fishtoolSearch, { params })
    },
    //关于我们介绍的接口
    getAboutintro() {
        return axios.get(base.baseUrl + base.aboutintro)
    },
    //关于我们历史的接口
    getAbouthistory() {
        return axios.get(base.baseUrl + base.abouthistory)
    },
    //关于我们使命的接口
    getAboutmission() {
        return axios.get(base.baseUrl + base.aboutmission)
    },
    //获取用户信息接口
    getUserInfo(params) {
        return axios.get(base.baseUrl + base.userInfo, { params })
    },
    //更新用户信息接口
    getUpdateUserInfo(params) {
        return axios.post(base.baseUrl + base.updateUserInfo, params)
    },
    // 添加获取商品详情的方法
    getProductDetail(params){
        return axios.get(base.baseUrl + base.freshwaterfish,params.id)
    },
    // 获取商品详情接口
    getProductDetails(params) {
        return axios.get(base.baseUrl + base.ProductDetails, { params })
    },
}
export default api