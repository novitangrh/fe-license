<template>
    <Table title="Daftar Lisensi" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
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
            <div class="mb-3">
                <label class="col-form-label">Waktu</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="monthly" value="Bulanan"
                        v-model="newLicense.time" />
                    <label class="form-check-label" for="monthly">Bulanan</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="yearly" value="Tahunan"
                        v-model="newLicense.time" />
                    <label class="form-check-label" for="yearly">Tahunan</label>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="start-date" class="col-form-label">Tanggal Mulai</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <input type="text" class="form-control" id="start-date" placeholder="Masukkan Tanggal Mulai..."
                        v-model="newLicense.startDate">
                </div>
                <div class="col-md-6">
                    <label for="end-date" class="col-form-label">Tanggal Selesai</label>
                    <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                    <input type="text" class="form-control" id="end-date" placeholder="Masukkan Tanggal Selesai..."
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
import { computed, defineComponent, reactive, ref } from 'vue';

// Define types for better type checking
interface License {
    id: number;
    type: string;
    name: string;
    time: string;
    startDate: string;
    endDate: string;
    provider: string;
    amount: string;
}

export default defineComponent({
    setup() {
        const columns = ref<string[]>(['JENIS', 'NAMA', 'WAKTU', 'TANGGAL MULAI', 'TANGGAL SELESAI', 'PENYEDIA', 'NOMINAL']);

        const rows = ref<License[]>([
            {
                id: 1,
                type: 'Domain',
                name: 'TK Telkom',
                time: 'Tahunan',
                startDate: '1 Juli 2024',
                endDate: '1 Juli 2025',
                provider: 'Telkom',
                amount: 'Rp. 1.500.000'
            }
        ]);

        const newLicense = reactive<License>({
            id: 0,
            type: '',
            name: '',
            time: '',
            startDate: '',
            endDate: '',
            provider: '',
            amount: ''
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "licenseListModal";
        const labelId = "licenseListModalLabel";
        const filterType = ref<string | null>(null);
        const searchQuery = ref<string>('');

        const filteredRows = computed(() => {
            let result = rows.value;

            if (filterType.value) {
                result = result.filter(row => row.type === filterType.value);
            }

            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(row =>
                    Object.values(row).some(val =>
                        typeof val === 'string' && val.toLowerCase().includes(query)
                    )
                );
            }
            // Hapus kolom id dari hasil
            return result.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Edit Lisensi' : 'Tambah Lisensi');

        function editItem(index: number) {
            Object.assign(newLicense, rows.value[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newLicense, {
                id: null,
                type: '',
                name: '',
                time: '',
                startDate: '',
                endDate: '',
                provider: '',
                amount: ''
            });
            isEdit.value = false;
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
                name: '',
                time: '',
                startDate: '',
                endDate: '',
                provider: '',
                amount: ''
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

        function applySearch(query: string) {
            searchQuery.value = query;
        }

        function applyFilter(type: string | null) {
            filterType.value = type;
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


<!-- <script lang="ts">
import { useLicenseListStore } from '@/stores/useLicenseListStore';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const store = useLicenseListStore();

        return {
            ...store,
            modalId: "licenseListModal",
            labelId: "licenseListModalLabel"
        };
    }
});
</script> -->

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