<template>
    <headerNav></headerNav>
    <router-view></router-view>
    <!-- 回到顶部按钮在cart里 -->
    <fishHandbook></fishHandbook>
    <cart></cart>
    <footerComponent></footerComponent>
</template>
<script setup>
import headerNav from '@/components/headerNav.vue'
import fishHandbook from '@/components/fishHandbook.vue';
import cart from '@/components/cart.vue';
import footerComponent from '@/components/footer.vue';
</script>
<style lang="scss" scoped></style>