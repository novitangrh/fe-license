<template>
    <Table title="Daftar Lisensi" :columns="columns" :rows="filteredLicenses" modalId="licenseListModal"
        :showSearchBar="true" :showFilterButton="true" :showAddButton="true" :showActionColumn="true"
        @search="applySearch" @filter="applyFilter" @addItem="addItem" @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="license-type" class="col-form-label">Jenis Lisensi</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <select class="form-select" id="license-type" v-model="newLicense.type">
                    <option value="Domain">Domain</option>
                    <option value="Service">Service</option>
                    <option value="Warranty">Warranty</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="name" class="col-form-label">Nama</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="name" placeholder="Masukkan Nama Lisensi..."
                    v-model="newLicense.name">
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="col-form-label">Waktu</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="monthly" value="Bulanan"
                            v-model="newLicense.typeTime" />
                        <label class="form-check-label" for="monthly">Bulanan</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="yearly" value="Tahunan"
                            v-model="newLicense.typeTime" />
                        <label class="form-check-label" for="yearly">Tahunan</label>
                    </div>
                </div>
                <div v-if="newLicense.typeTime === 'Tahunan'" class="col-md-6">
                    <label for="years" class="col-form-label">Berapa Tahun</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <input type="text" class="form-control" id="years" placeholder="Masukkan Jumlah Tahun..."
                        v-model="newLicense.years">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="start-date" class="col-form-label">Tanggal Mulai</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <input type="date" class="form-control" id="start-date" placeholder="Masukkan Tanggal Mulai..."
                        v-model="newLicense.startDate">
                </div>
                <div class="col-md-6">
                    <label for="end-date" class="col-form-label">Tanggal Selesai</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <input type="date" class="form-control" id="end-date" placeholder="Masukkan Tanggal Selesai..."
                        v-model="newLicense.endDate">
                </div>
            </div>
            <div class="mb-3">
                <label for="provider" class="col-form-label">Penyedia</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="provider" placeholder="Masukkan Penyedia..."
                    v-model="newLicense.provider">
            </div>
            <div class="mb-3">
                <label for="amount" class="col-form-label">Nominal</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="amount" placeholder="Masukkan Nominal..."
                    v-model="newLicense.amount">
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { useLicenseStore } from '@/stores/licenseListStore';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useLicenseStore();

        const columns = ref<string[]>(['JENIS', 'NAMA', 'WAKTU', 'LAMA WAKTU', 'TANGGAL MULAI', 'TANGGAL SELESAI', 'PENYEDIA', 'NOMINAL']);

        const newLicense = reactive({
            id: 0,
            type: '',
            name: '',
            typeTime: '',
            years: 0,
            startDate: '',
            endDate: '',
            provider: '',
            amount: '',
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "licenseListModal";
        const labelId = "licenseListModalLabel";

        const filteredLicenses = computed(() => {
            return store.filteredLicenses.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Edit Lisensi' : 'Tambah Lisensi');

        function editItem(index: number) {
            Object.assign(newLicense, store.licenses[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newLicense, {
                id: null,
                type: '',
                name: '',
                typeTime: '',
                years: null,
                startDate: '',
                endDate: '',
                provider: '',
                amount: '',
            });
            isEdit.value = false;
            showModal.value = true;
        }

        function saveItem() {
            if (isEdit.value) {
                store.updateLicense({
                    ...newLicense,
                    years: newLicense.typeTime === 'Tahunan' ? newLicense.years : undefined
                });
                isEdit.value = false;
            } else {
                store.addLicense({
                    ...newLicense,
                    years: newLicense.typeTime === 'Tahunan' ? newLicense.years : undefined
                });
            }

            Object.assign(newLicense, {
                id: null,
                type: '',
                name: '',
                typeTime: '',
                years: null,
                startDate: '',
                endDate: '',
                provider: '',
                amount: '',
            });

            showModal.value = false;
        }

        function deleteItem(index: number) {
            const confirmDelete = window.confirm("Apakah Anda yakin akan menghapus item ini?");
            if (confirmDelete) {
                const license = store.licenses[index];
                store.deleteLicense(license.id);
            }
        }

        function updateShowModal(value: boolean) {
            showModal.value = value;
        }

        function applySearch(query: string) {
            store.setSearchQuery(query);
        }

        function applyFilter(type: string | null) {
            store.setFilterType(type);
        }

        return {
            columns,
            newLicense,
            isEdit,
            showModal,
            modalId,
            labelId,
            filteredLicenses,
            modalTitle,
            editItem,
            addItem,
            saveItem,
            deleteItem,
            updateShowModal,
            applySearch,
            applyFilter
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