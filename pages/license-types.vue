<template>
    <Table title="Jenis Lisensi Tersedia" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
        :showSearchBar="true" :showAddButton="true" :showActionColumn="true" @search="applySearch" @addItem="addItem"
        @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="license-type" class="col-form-label">Jenis Lisensi</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="license-type" placeholder="Masukkan Jenis Lisensi..."
                    v-model="newLicense.type">
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';

interface License {
    id: number;
    type: string;
}

export default defineComponent({
    setup() {
        const columns = ref<string[]>(['NAMA']);

        const rows = ref<License[]>([
            {
                id: 1,
                type: 'Domain'
            },
            {
                id: 2,
                type: 'Warranty'
            }
        ]);

        const newLicense = reactive<License>({
            id: 0,
            type: ''
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
            return result.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Edit Jenis Lisensi' : 'Tambah Jenis Lisensi');

        function editItem(index: number) {
            Object.assign(newLicense, rows.value[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newLicense, {
                id: null,
                type: ''
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
            applySearch
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

.form-control {
    border: 1px solid #ced4da !important;
}
</style>