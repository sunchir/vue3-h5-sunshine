<template>
  <van-tabbar fixed route v-model="defaultActive">
    <van-tabbar-item
      v-for="item in tabbars"
      replace
      :to="item.to"
      :key="item.title"
      :icon="item.icon"
      >{{ item.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script lang="ts" setup name="TabBar">
  import { toRefs } from 'vue';

  export interface STabList {
    title: string; // 标题
    to: { path: string }; // url 路径
    icon: string; //图标
  }

  export interface TabList {
    defaultActive: number; //
    tabbars: STabList[];
  }

  const props = defineProps<TabList>();
  const { tabbars, defaultActive } = toRefs(props);
</script>

<style lang="less" scoped></style>
