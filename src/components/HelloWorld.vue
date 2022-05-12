<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="handleButton">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { useAppStore } from '/@/store/modules/app';

  defineProps<{ msg: string }>();

  const tabbars = ref([
    { title: '首页1', to: { path: '/home' }, icon: 'home-o' },
    { title: '关于我1', to: { path: '/about' }, icon: 'home-o' },
  ]);

  const handleButton = () => {
    const appStore = useAppStore();

    appStore.setTabbars(tabbars.value);
  };

  const count = ref(0);
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  p {
    font-size: 20px;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
