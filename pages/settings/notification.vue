<template>
    <Table title="Waktu Notifikasi" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
        :showActionColumn="true" @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="time-type" class="col-form-label">Jenis Waktu</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <select class="form-select" id="license-type" v-model="newLicense.type">
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="delivery-time" class="col-form-label">Waktu Pengiriman</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="delivery-time" placeholder="Masukkan Waktu Pengiriman..."
                    v-model="newLicense.time">
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
// import Modal from '@/components/Modal.vue';
// import Table from '@/components/Table.vue';
import { computed, defineComponent, reactive, ref } from 'vue';

interface License {
    id: number;
    type: string;
    time: string;
}

export default defineComponent({
    // components: {
    //     Table,
    //     Modal,
    // },
    setup() {
        const columns = ref<string[]>(['JENIS WAKTU', 'WAKTU PENGIRIMAN']);

        const rows = ref<License[]>([
            {
                id: 1,
                type: 'Bulanan',
                time: 'H-7'
            }
        ]);

        const newLicense = reactive<License>({
            id: 0,
            type: '',
            time: ''
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "licenseListModal";
        const labelId = "licenseListModalLabel";
        const filterType = ref<string | null>(null);

        const filteredRows = computed(() => {
            let result = rows.value;

            if (filterType.value) {
                result = result.filter(row => row.type === filterType.value);
            }

            return result.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Setting Waktu' : 'Tambah Waktu');

        function editItem(index: number) {
            Object.assign(newLicense, rows.value[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function saveItem() {
            if (isEdit.value) {
                const index = rows.value.findIndex(lic => lic.id === newLicense.id);
                if (index !== -1) {
                    rows.value[index] = { ...newLicense };
                }
                isEdit.value = false;
            } else {
                newLicense.id = rows.value.length ? Math.max(...rows.value.map(r => r.id ?? 0)) + 1 : 1;
                rows.value.push({ ...newLicense });
            }

            Object.assign(newLicense, {
                id: null,
                type: '',
                time: ''
            });

            showModal.value = false;
        }

        function deleteItem(index: number) {
            const confirmDelete = window.confirm("Apakah Anda yakin akan menghapus item ini?");
            if (confirmDelete) {
                rows.value.splice(index, 1);
            }
        }

        function updateShowModal(value: boolean) {
            showModal.value = value;
        }

        return {
            columns,
            rows,
            newLicense,
            isEdit,
            showModal,
            modalId,
            labelId,
            filteredRows,
            modalTitle,
            editItem,
            saveItem,
            deleteItem,
            updateShowModal,
        };
    }
});
</script>

<style scoped>
.asterisk-icon {
    color: red;
    font-size: 8px;
    vertical-align: super;
    margin-left: 4px;
}

.form-control,
.form-select {
    border: 1px solid #ced4da !important;
}
</style>