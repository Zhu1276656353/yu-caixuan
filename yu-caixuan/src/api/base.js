//存放所有网络请求地址
const base = {
    baseUrl: "http://localhost:3000",//服务器地址
    upload: "/uploads",//文件上传接口
    login: "/login",//登录接口
    register: "/register",//注册接口
    logo: "/logo",//logo接口
    discount: "/discount",//优惠券接口
    category: "/category",//商品分类接口
    hotProducts: "/hotProducts",//热销商品接口
    newProducts: "/newProducts",//新品商品接口
    footer: "/footer",//页脚接口
    freshwaterfish: "/freshwaterfish",//淡水鱼接口
    freshwaterfishtotal: "/freshwaterfishtotal",//淡水鱼页码总数接口
    freshwaterfishSearch: "/freshwaterfish/search",//淡水鱼模糊搜索接口
    saltwaterfish: "/saltwaterfish",//海水鱼接口
    saltwaterfishtotal: "/saltwaterfishtotal",//海水鱼页码总数接口
    saltwaterfishSearch: "/saltwaterfish/search",//海水鱼模糊搜索接口
    fishtool: "/fishtool",//精选器械接口
    fishtooltotal: "/fishtooltotal",//精选器械页码总数接口
    fishtoolSearch: "/fishtool/search",//精选器械模糊搜索接口
    aboutintro: "/about/intro",//关于我们简介接口
    abouthistory: "/about/history",//关于我们历史接口
    aboutmission: "/about/mission",//关于我们使命接口
    userInfo: "/userInfo",//用户信息接口
    updateUserInfo: "/updateUserInfo",//更新用户信息接口
    ProductDetails: "/productDetails",//商品详情接口
    checkout: "/checkout",//结算接口
    /**
     * 后台管理接口
     */
    backendUsers: "/backend/users",//所有用户接口
    backendUsersAdd: "/backend/users/add",//添加用户接口
    backendUsersDelete: "/backend/users/delete",//删除用户接口
    backendUsersUpdate: "/backend/users/update",//更新用户接口
    backendUsersSearch: "/backend/users/search",//搜索用户接口

    backendGoodsFreshwaterfish: "/backend/goods/freshwaterfish",//后台淡水鱼接口
    backendGoodsFreshwaterfishSearch: "/backend/goods/freshwaterfish/search",//后台淡水鱼模糊查询接口
    backendGoodsFreshwaterfishDelete: "/backend/goods/freshwaterfish/delete",//后台删除淡水鱼接口
    backendGoodsFreshwaterfishUpdate: "/backend/goods/freshwaterfish/update",//后台更新淡水鱼接口

    backendGoodsSaltwaterfish: "/backend/goods/saltwaterfish",//后台海洋鱼接口
    backendGoodsSaltwaterfishSearch: "/backend/goods/saltwaterfish/search",//后台海洋鱼模糊查询接口
    backendGoodsSaltwaterfishDelete: "/backend/goods/saltwaterfish/delete",//后台删除海洋鱼接口
    backendGoodsSaltwaterfishUpdate: "/backend/goods/saltwaterfish/update",//后台更新海洋鱼接口

    backendGoodsFishtool: "/backend/goods/fishtool",//后台精选器械接口
    backendGoodsFishtoolSearch: "/backend/goods/fishtool/search",//后台精选器械模糊查询接口
    backendGoodsFishtoolDelete: "/backend/goods/fishtool/delete",//后台删除精选器械接口
    backendGoodsFishtoolUpdate: "/backend/goods/fishtool/update",//后台更新精选器械接口

    backendOrders: "/backend/orders",//后台订单接口
    backendOrdersUpdateStatus: "/backend/orders/updateStatus",//后台更新订单状态接口
    backendOrdersDelete: "/backend/orders/delete",//后台删除订单接口
}
export default base
