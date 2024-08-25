<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex align-items-start justify-content-center flex-column bg-primary h-40">
                <div class="text">
                    <h1>License YPT</h1>
                </div>
            </div>
            <div class="col d-flex align-items-start justify-content-start h-50">
                <div class="form-login text">
                    <h2 class="mb-4">Silahkan Login</h2>
                    <form @submit.prevent="handleLogin">
                        <div class="mb-3 border-bottom border-secondary">
                            <input type="text" class="form-control" id="nip-input" placeholder="Masukkan NIP"
                                v-model="authStore.nip" />
                        </div>
                        <div class="mb-4 border-bottom border-secondary">
                            <input type="password" class="form-control" id="password-input"
                                placeholder="Masukkan Password" v-model="authStore.password" />
                        </div>
                        <button type="submit" class="btn btn-login w-100"><font-awesome-icon
                                :icon="['fas', 'right-to-bracket']" /> Masuk</button>
                        <div v-if="authStore.errorMessage" class="alert alert-danger mt-3">{{ authStore.errorMessage }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
definePageMeta({
    layout: 'empty'
})

import { useRouter } from '#app';
import { useAuthStore } from '@/stores/authStore';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const handleLogin = () => {
            const success = authStore.login();
            if (success) {
                router.push('/dashboard');
            }
        }

        return {
            authStore,
            handleLogin
        }
    }
})
</script>

<style scooped>
.container-fluid {
    position: relative;
    width: 100vw;
}

.bg-primary {
    background-color: #D9D9D9 !important;
}

.form-login {
    width: 350px;
    outline: 0px;
    margin-left: 125px;
    padding: 20px;
    margin-top: 40px;
}

.form-control {
    border: none;
    outline: none;
}

.text {
    margin-left: 125px;
}

.row {
    height: 100vh;
}
</style>