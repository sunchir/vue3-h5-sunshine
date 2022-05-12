<template>
  <div class="layout-container">
    <div class="layout-container-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </div>
  </div>
  <div class="layout-container-footer">
    <TabBar :tabbars="tabbars" :defaultActive="defaultActive" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
  import TabBar, { STabList } from '/@/components/TabBar/index.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore } from '/@/store/modules/app';
  import { storeToRefs } from 'pinia';

  const appStore = useAppStore();

  appStore.setTabbars([
    { title: '首页', to: { path: '/home' }, icon: 'home-o' },
    { title: '关于我', to: { path: '/about' }, icon: 'user-o' },
  ]);

  const route = useRoute();

  const { tabbars } = storeToRefs(appStore);

  const defaultActive = computed(() => {
    return tabbars.value.findIndex((item: STabList) => {
      return item.to.path === route.path;
    });
  });

  const handleChange = (payload: Event) => {
    console.log('tab value:', payload, defaultActive.value, tabbars.value);
  };
</script>

<style lang="less" scoped></style>
