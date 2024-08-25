// stores/useAuthStore.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        nip: "",
        password: "",
        errorMessage: "",
    }),
    actions: {
        login() {
            const validNip = "123";
            const validPass = "123";

            if (this.nip === validNip && this.password === validPass) {
                // Pengalihan halaman dilakukan di komponen Vue
                return true;
            } else {
                this.errorMessage = "NIP atau Password salah";
                return false;
            }
        },
    },
});
