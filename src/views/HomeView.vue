<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import SideBar from '@/components/Menu/SideBar.vue'
import Heard from '@/components/Heard/index.vue'
const $router = useRouter()
interface MenuItem {
  key: string;
  title: string;
  children?: MenuItem[];
  [x: string]: any;
}
const menuList = reactive<MenuItem[]>([
  {
    title: '首页',
    key: '/home',
    parentKey: 'home'
  },
  {
    title: '用户管理',
    key: 'user',
    parentKey: 'user',
    children: [
      {
        title: '用户列表',
        key: '/user',
        parentKey: 'user'
      },
      {
        title: '用户列表',
        key: '/list',
        parentKey: 'user'
      },
    ]
  },

]);
const openKeys = ref<any[]>([]);

const selectedKeys = ref<any[]>([]);

const title = ref<string>('');
const selectedKeysList = () => {
  console.log( selectedKeys.value.length==0 && localStorage.getItem('url')==null,'====>')
  selectedKeys.value.length==0 && localStorage.getItem('url')==null ? selectedKeys.value.push('/home') : selectedKeys.value.push(localStorage.getItem('url'))
}
const openKeysTree = (value: string | null, list: any) => {
  if (value == null) {
    openKeys.value = []
    return
  }
  list.forEach((item: MenuItem) => {
    if (item.key == value) {
      openKeys.value.push(item.parentKey)
    } else {
      if (item.children && item.children.length > 0) {
        openKeysTree(value, item.children)
      }
    }
  })
  console.log(openKeys.value)
}
console.log(typeof localStorage.getItem('url'))
const menuItemClick = (item: MenuItem) => {
  title.value = item.title;
  $router.push({ path: item.key })
};
const collapsed = ref<boolean>(false)
const changMenu = (value: boolean) => {
  collapsed.value = value
}
onMounted(() => {
  openKeysTree(localStorage.getItem('url'), menuList)
  selectedKeysList()
})


</script>

<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <side-bar :menuList="menuList" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
        @menuItemClick="menuItemClick"></side-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <Heard :collapsed="collapsed" @change="changMenu" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>
<style>

</style>
