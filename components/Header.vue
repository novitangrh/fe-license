<template>
    <div class="d-flex align-items-center p-3 border-bottom">
        <div class="d-flex align-items-center">
            <h1 class="h1 me-3">License YPT</h1>
            <template v-if="isSettingsPage">
                <nuxt-link to="/settings/notification" class="page-title"
                    :class="{ 'active-link': isNotificationPage }">
                    Notifikasi
                </nuxt-link>
                <nuxt-link to="/settings/contact" class="page-title ms-3" :class="{ 'active-link': isContactPage }">
                    Kontak
                </nuxt-link>
            </template>
            <template v-else>
                <span class="page-title">{{ pageTitle }}</span>
            </template>
        </div>
        <div class="d-flex align-items-center ms-auto">
            <span class="text me-2">Aulia Arief</span>
            <div class="profile text-center">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'Header',
    setup() {
        const route = useRoute();
        const isSettingsPage = computed(() => route.path.startsWith('/settings'));
        const isNotificationPage = computed(() => route.path === '/settings/notification');
        const isContactPage = computed(() => route.path === '/settings/contact');

        const pageTitle = computed(() => {
            switch (route.path) {
                case '/':
                    return 'Index';
                case '/dashboard':
                    return 'Beranda';
                case '/license-types':
                    return 'Jenis Lisensi';
                case '/license-list':
                    return 'Daftar Lisensi';
                case '/settings':
                    return '';
                default:
                    return '';
            }
        });

        return { isSettingsPage, isNotificationPage, isContactPage, pageTitle };
    }
});
</script>

<style scoped>
.active-link {
    background-color: #7239ea !important;
    color: white !important;
}

.page-title {
    color: #7239ea;
    background-color: #f9f9f9;
    border-radius: 0.3125rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    text-decoration: none;
}

.page-title:hover {
    background-color: white;
}

.text {
    font-weight: 500;
}

.profile {
    width: 2rem;
    height: 2rem;
    color: #7239ea;
}

/* .initial {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 2rem;
    color: #7239ea;
    background-color: #eee5ff;
    font-weight: bold;
    border-radius: 0.3125rem;
} */

.border-bottom {
    border-bottom: 0.1875rem solid black !important;
}
</style>