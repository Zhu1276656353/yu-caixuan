import ProductDetails from "@/views/productDetails.vue"

//存放所有网络请求地址
const base = {
    baseUrl: "http://localhost:3000",//服务器地址
    upload: "/uploads",//文件上传接口
    login: "/login",//登录接口
    register: "/register",//注册接口
    logo:"/logo",//logo接口
    discount:"/discount",//优惠券接口
    category:"/category",//商品分类接口
    hotProducts:"/hotProducts",//热销商品接口
    newProducts:"/newProducts",//新品商品接口
    footer:"/footer",//页脚接口
    freshwaterfish:"/freshwaterfish",//淡水鱼接口
    freshwaterfishtotal:"/freshwaterfishtotal",//淡水鱼页码总数接口
    freshwaterfishSearch:"/freshwaterfish/search",//淡水鱼模糊搜索接口
    saltwaterfish:"/saltwaterfish",//海水鱼接口
    saltwaterfishtotal:"/saltwaterfishtotal",//海水鱼页码总数接口
    saltwaterfishSearch:"/saltwaterfish/search",//海水鱼模糊搜索接口
    fishtool:"/fishtool",//精选器械接口
    fishtooltotal:"/fishtooltotal",//精选器械页码总数接口
    fishtoolSearch:"/fishtool/search",//精选器械模糊搜索接口
    aboutintro:"/about/intro",//关于我们简介接口
    abouthistory:"/about/history",//关于我们历史接口
    aboutmission:"/about/mission",//关于我们使命接口
    userInfo:"/userInfo",//用户信息接口
    updateUserInfo:"/updateUserInfo",//更新用户信息接口
    ProductDetails:"/productDetails",//商品详情接口
}
export default base
