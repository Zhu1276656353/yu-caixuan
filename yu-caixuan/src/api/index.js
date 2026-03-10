import base from './base.js'
// import axios from '@/utils/request.js'
import request from '@/utils/request.js' // 改为 request(若错误的话再将request改为axios)
const api = {
    //文件上传接口
    getUploadFile(params) {
        return request.post(base.baseUrl + base.upload, params)
    },
    //登录接口
    getLogin(params) {
        return request.post(base.baseUrl + base.login, params)
    },
    //注册接口
    getRegister(params) {
        return request.post(base.baseUrl + base.register, params)
    },
    //获取logo接口
    getLogo() {
        return request.get(base.baseUrl + base.logo)
    },
    //获取优惠券接口
    getDiscount() {
        return request.get(base.baseUrl + base.discount)
    },
    //获取分类接口
    getCategory() {
        return request.get(base.baseUrl + base.category)
    },
    //获取热销推荐接口
    getHotProducts() {
        return request.get(base.baseUrl + base.hotProducts)
    },
    //获取新品推荐接口
    getNewProducts() {
        return request.get(base.baseUrl + base.newProducts)
    },
    //获取页脚接口
    getFooter() {
        return request.get(base.baseUrl + base.footer)
    },
    //淡水生物接口
    getFreshwaterfish(params) {
        return request.get(base.baseUrl + base.freshwaterfish, { params })
    },
    //获取淡水生物页码总数接口
    getFreshwaterfishtotal() {
        return request.get(base.baseUrl + base.freshwaterfishtotal)
    },
    //淡水生物模糊查询
    getFreshwaterfishSearch(params) {
        return request.get(base.baseUrl + base.freshwaterfishSearch, { params })
    },
    //海水生物接口
    getSaltwaterfish(params) {
        return request.get(base.baseUrl + base.saltwaterfish, { params })
    },
    //获取海水生物页码总数接口
    getSaltwaterfishtotal() {
        return request.get(base.baseUrl + base.saltwaterfishtotal)
    },
    //海水生物模糊查询
    getSaltwaterfishSearch(params) {
        return request.get(base.baseUrl + base.saltwaterfishSearch, { params })
    },
    //精选器械接口
    getFishtool(params) {
        return request.get(base.baseUrl + base.fishtool, { params })
    },
    //获取精选器械页码总数接口
    getFishtooltotal() {
        return request.get(base.baseUrl + base.fishtooltotal)
    },
    //精选器械模糊查询
    getFishtoolSearch(params) {
        return request.get(base.baseUrl + base.fishtoolSearch, { params })
    },
    //关于我们介绍的接口
    getAboutintro() {
        return request.get(base.baseUrl + base.aboutintro)
    },
    //关于我们历史的接口
    getAbouthistory() {
        return request.get(base.baseUrl + base.abouthistory)
    },
    //关于我们使命的接口
    getAboutmission() {
        return request.get(base.baseUrl + base.aboutmission)
    },
    //获取用户信息接口
    getUserInfo(params) {
        return request.get(base.baseUrl + base.userInfo, { params })
    },
    //更新用户信息接口
    getUpdateUserInfo(params) {
        return request.post(base.baseUrl + base.updateUserInfo, params)
    },
    // 添加获取商品详情的方法
    getProductDetail(params) {
        return request.get(base.baseUrl + base.freshwaterfish, params.id)
    },
    // 获取商品详情接口
    getProductDetails(params) {
        return request.get(base.baseUrl + base.ProductDetails, { params })
    },
    // 结算接口
    getCheckout(orderData) {
        return request.post(base.baseUrl + base.checkout, orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    /**
     * 后台管理接口
     */
    //获取所有用户接口（支持分页）
    getBackendUsers(params) {
        // params 期望形如：{ params: { page: 1 } }
        return request.get(base.baseUrl + base.backendUsers, params)
    },
    //添加用户接口
    getBackendUsersAdd(params) {
        return request.post(base.baseUrl + base.backendUsersAdd, params)
    },
    //删除用户接口
    getBackendUsersDelete(params) {
        return request.post(base.baseUrl + base.backendUsersDelete, params)
    },
    //更新用户接口
    getBackendUsersUpdate(params) {
        return request.post(base.baseUrl + base.backendUsersUpdate, params)
    },
    //模糊查询用户接口
    getBackendUsersSearch(params) {
        return request.get(base.baseUrl + base.backendUsersSearch, { params })
    },
    //获取后台淡水鱼接口
    getBackendGoodsFreshwaterfish(params) {
        return request.get(base.baseUrl + base.backendGoodsFreshwaterfish, params)
    },
    //后台淡水鱼模糊查询接口
    getBackendGoodsFreshwaterfishSearch(params) {
        return request.get(base.baseUrl + base.backendGoodsFreshwaterfishSearch, { params })
    },
    //后台删除淡水鱼接口
    getBackendGoodsFreshwaterfishDelete(params) {
        return request.post(base.baseUrl + base.backendGoodsFreshwaterfishDelete, params)
    },
    //后台更新淡水鱼接口
    getBackendGoodsFreshwaterfishUpdate(params) {
        return request.post(base.baseUrl + base.backendGoodsFreshwaterfishUpdate, params)
    },
    //获取后台海洋鱼接口
    getBackendGoodsSaltwaterfish(params) {
        return request.get(base.baseUrl + base.backendGoodsSaltwaterfish, params)
    },
    //后台海洋鱼模糊查询接口
    getBackendGoodsSaltwaterfishSearch(params) {
        return request.get(base.baseUrl + base.backendGoodsSaltwaterfishSearch, { params })
    },
    //后台删除海洋鱼接口
    getBackendGoodsSaltwaterfishDelete(params) {
        return request.post(base.baseUrl + base.backendGoodsSaltwaterfishDelete, params)
    },
    //后台更新海洋鱼接口
    getBackendGoodsSaltwaterfishUpdate(params) {
        return request.post(base.baseUrl + base.backendGoodsSaltwaterfishUpdate, params)
    },

    //获取后台精选器械接口
    getBackendGoodsFishtool(params) {
        return request.get(base.baseUrl + base.backendGoodsFishtool, params)
    },
    //后台精选器械模糊查询接口
    getBackendGoodsFishtoolSearch(params) {
        return request.get(base.baseUrl + base.backendGoodsFishtoolSearch, { params })
    },
    //后台删除精选器械接口
    getBackendGoodsFishtoolDelete(params) {
        return request.post(base.baseUrl + base.backendGoodsFishtoolDelete, params)
    },
    //后台更新精选器械接口
    getBackendGoodsFishtoolUpdate(params) {
        return request.post(base.baseUrl + base.backendGoodsFishtoolUpdate, params)
    },
    //获取后台订单接口
    getBackendOrders(params) {
        return request.get(base.baseUrl + base.backendOrders, params)
    },
    //后台订单更新接口
    getBackendOrdersUpdateStatus(params) {
        return request.post(base.baseUrl + base.backendOrdersUpdateStatus, params)
    },
    //后台订单删除接口
    getBackendOrdersDelete(params) {
        return request.post(base.baseUrl + base.backendOrdersDelete, params)
    },
}
export default api