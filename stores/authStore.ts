// stores/useAuthStore.ts
import { getProfile, login } from "@/services/authService";
import { defineStore } from "pinia";

export interface User {
    fullname: string;
    numberid: string;
    numberid_tg: string | null;
    unit: string | null;
    photo: string | null;
    workplace: string | null;
    workplaceid: string | null;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        nip: "",
        password: "",
        token: null as string | null,
        user: null as User | null,
        errorMessage: null as string | null,
        loading: false,
    }),
    actions: {
        async login() {
            this.loading = true;
            this.errorMessage = null;
            try {
                const response = await login({ username: this.nip, password: this.password });
                this.token = response.data.token;
                localStorage.setItem('token', response.data.token);
                return true;
            } catch (error) {
                this.errorMessage = "NIP atau Password salah";
                console.error(error);
                return false;
            } finally {
                this.loading = false;
            }
        },
        async fetchProfile() {
            if (!this.token) return;
            try {
                const response = await getProfile(this.token);
                this.user = response.data;
            } catch (error) {
                this.errorMessage = "Gagal mengambil profil pengguna.";
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        }
    
    },
});


// // stores/useAuthStore.ts
// import { defineStore } from "pinia";

// export const useAuthStore = defineStore("auth", {
//     state: () => ({
//         nip: "",
//         password: "",
//         errorMessage: "",
//     }),
//     actions: {
//         login() {
//             const validNip = "123";
//             const validPass = "123";

//             if (this.nip === validNip && this.password === validPass) {
//                 // Pengalihan halaman dilakukan di komponen Vue
//                 return true;
//             } else {
//                 this.errorMessage = "NIP atau Password salah";
//                 return false;
//             }
//         },
//     },
// });
