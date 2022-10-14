<template>
    <div class="menu">
        <a-menu :selectedKeys="selectedKeys" @update:selectedKeys="updateSelectedKeys" theme="dark" mode="inline"
            :openKeys="openKeys" @update:openKeys="updateOpenKeys">
            <template v-for="item in menuList" :key="item.key">
                <template v-if="!item.children">
                    <a-menu-item :key="item.key" @click="menuItemClick(item)">
                        <template #icon>
                            <SettingOutlined />
                        </template>
                        {{ item.title }}
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu :key="item.key" :menu-info="item" @menuItemClick="menuItemClick"></sub-menu>
                </template>
            </template>
        </a-menu>
    </div>
</template>
  
<script lang="ts" setup>
import SubMenu from './SubMenu.vue';

import { SettingOutlined } from '@ant-design/icons-vue';

export interface MenuItem {
    key: string;
    title: string;
    path?: string;
    icon?: string;
    children?: MenuItem[];
}

export interface Props {
    menuList: Array<MenuItem>;  //菜单列表
    selectedKeys: string[];  //当前选中的
    openKeys: string[];  //当前展开的
}

withDefaults(defineProps<Props>(), {

});

const emit = defineEmits([
    'menuItemClick',
    'update:selectedKeys',
    'update:openKeys'
]);

const updateSelectedKeys = (...res: string[][]) => {
    emit('update:selectedKeys', ...res);
};

const updateOpenKeys = (...res: string[][]) => {
    emit('update:openKeys', ...res);
};

const menuItemClick = (item: MenuItem) => {
    localStorage.setItem('url', item.key)
    emit('menuItemClick', item);
};
</script>
<style lang="less" scoped>
.menu {
    height: 100vh;
    overflow: hidden;
}
</style>
  
  