<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="page-content">
        <nuxt-page />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Header,
    Sidebar
  }
});

</script>

<style>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 6.25rem;;
}

.page-content {
  padding: 1.25rem;;
  flex: 1;
  overflow-y: auto;
}
</style>
