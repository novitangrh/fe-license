<template>
    <div v-if="showModal" class="modal fade show" tabindex="-1" :aria-labelledby="labelId" aria-hidden="true"
        data-bs-backdrop="static" style="display: block;" id="licenseListModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </button>
                    <h1 class="modal-title fs-5" :id="labelId">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" @click="save">
                        <font-awesome-icon :icon="['fas', 'save']" class="me-2" /> Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal-backdrop show"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        modalId: {
            type: String,
            required: true,
        },
        labelId: {
            type: String,
            required: true,
        },
        showModal: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        save() {
            this.$emit('save');
            this.closeModal();  // Tutup modal setelah menyimpan
        },
        closeModal() {
            this.$emit('update:showModal', false);  // Emit event untuk menutup modal
        },
    },
});
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: center;
}

.btn-success {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    padding: 5px 15px;
    color: white;
    border-radius: 5px;
}

.btn-success .me-2 {
    margin-right: 8px;
}

.modal.fade.show {
    display: block;
    overflow: hidden;
}

.modal-dialog {
    transform: translateY(-50%);
}

.modal-backdrop {
    position: fixed;
    /* Mengatur posisi backdrop agar tetap di belakang */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1040;
    /* Menempatkan backdrop di bawah modal */
    background-color: rgba(0, 0, 0, 0.5);
    /* Warna latar belakang transparan */
}

.modal-content {
    max-height: 80vh; /* Maksimum tinggi modal, sehingga tidak melebihi jendela tampilan */
    overflow-y: auto; /* Enable vertical scrolling */
    position: relative;
}

.modal-content::-webkit-scrollbar {
    width: 12px;
}

.modal-content::-webkit-scrollbar-track {
    background: #f9f9f9;
}

.modal-content::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 6px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background: #afb5bd;
}
</style>