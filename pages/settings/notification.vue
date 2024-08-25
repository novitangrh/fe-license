<template>
    <Table title="Waktu Notifikasi" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
        :showActionColumn="true" @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="time-type" class="col-form-label">Jenis Waktu</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <select class="form-select" id="time-license" v-model="newLicense.typeTime">
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                </select>
            </div>
            <div v-for="(time, index) in newLicense.times" :key="index" class="mb-3">
                <label :for="'delivery-time-' + index" class="col-form-label">Waktu Pengiriman {{ index + 1 }}</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" :id="'delivery-time-' + index"
                    placeholder="Masukkan Waktu Pengiriman..." v-model="newLicense.times[index]">
            </div>
            <div class="mb-3 text-center">
                <button type="button" class="btn btn-light" @click="addNewTime">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { useLicensesStore } from '@/stores/notificationStore'; // Import the Pinia store
import { computed, defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useLicensesStore();

        const columns = ref<string[]>(['JENIS WAKTU', 'WAKTU PENGIRIMAN']);

        const newLicense = reactive({
            id: 0,
            typeTime: '',
            times: [] as string[]
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "notificationModal";
        const labelId = "notificationModalLabel";

        const filteredRows = computed(() => store.filteredRows);

        const modalTitle = computed(() => isEdit.value ? 'Setting Waktu' : 'Tambah Waktu');

        function editItem(index: number) {
            const license = store.rows[index];
            Object.assign(newLicense, {
                ...license,
                times: [...license.times]
            });
            isEdit.value = true;
            showModal.value = true;
        }

        function saveItem() {
            if (isEdit.value) {
                store.updateLicense({
                    ...newLicense
                });
                isEdit.value = false;
            } else {
                store.addLicense({
                    ...newLicense,
                    id: store.rows.length ? Math.max(...store.rows.map(r => r.id ?? 0)) + 1 : 1
                });
            }

            Object.assign(newLicense, {
                id: 0,
                typeTime: '',
                times: ['']
            });

            showModal.value = false;
        }

        function deleteItem(index: number) {
            const confirmDelete = window.confirm("Apakah Anda yakin akan menghapus item ini?");
            if (confirmDelete) {
                store.deleteLicense(store.rows[index].id);
            }
        }

        function updateShowModal(value: boolean) {
            showModal.value = value;
        }

        function addNewTime() {
            newLicense.times.push('');
        }

        return {
            columns,
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
            addNewTime
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