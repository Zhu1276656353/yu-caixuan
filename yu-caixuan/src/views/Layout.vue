<template>
    <headerNav></headerNav>
    <router-view></router-view>
    <!-- 回到顶部按钮在cart里 -->
    <cart></cart>
    <footerComponent></footerComponent>
</template>
<script setup>
import headerNav from '@/components/headerNav.vue'
import cart from '@/components/cart.vue';
import footerComponent from '@/components/footer.vue';
</script>
<style lang="scss" scoped>
</style>