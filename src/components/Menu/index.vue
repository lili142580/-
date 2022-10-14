<script lang="ts" setup>
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const selectedKeys = ref<string[]>(['/user'])
const clickKey = (value: string,) => {
    console.log(value, '===>')
    $router.push({ path: value })
}
</script>
<template>
    <div class="menu">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="/user" @click="clickKey('/user')">
                <user-outlined />
                <span>nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <video-camera-outlined />
                <span>nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <upload-outlined />
                <span>nav 3</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>
<style lang="less" scoped>
.menu {
    height: 100vh;
    overflow: hidden;
}
</style>