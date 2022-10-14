<script lang="ts" setup>
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
type Props = {
    collapsed: boolean
}
const props = withDefaults(defineProps<Props>(), {
    collapsed: false
})
const emit = defineEmits<{
    (e: 'change', value: boolean): void
}>()
const CollapsedClick = () => {
    emit('change', props.collapsed = !props.collapsed)
}

</script>
<template>
    <div class="heard">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="CollapsedClick()" />
        <menu-fold-outlined v-else class="trigger" @click="CollapsedClick()" />
    </div>
</template>
<style lang="less" scoped>
.heard {
    display: flex;
    align-items: center;
    align-content: center;
    height: 100%;


}

:deep(.trigger) {
    margin-left: 14px;

    svg {
        height: 24px;
        width: 24px;
    }

}
</style>