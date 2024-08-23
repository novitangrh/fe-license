<template>
    <div class="container-fluid d-flex align-items-center justify-content-center">
        <div class="text">
            <h1>License YPT</h1>
            <button type="button" class="btn btn-login w-100 mt-3" @click="handleLogin"><font-awesome-icon
                    :icon="['fas', 'right-to-bracket']" /> Masuk</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'empty'
});

const router = useRouter();

const handleLogin = () => {
    router.push('/login');
};
</script>

<style scoped>
</style>
