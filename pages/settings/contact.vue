<template>
    <Table title="Daftar Kontak" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
        :showSearchBar="true" :showAddButton="true" :showActionColumn="true" @search="applySearch" @addItem="addItem"
        @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="name" class="col-form-label">Nama</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="name" placeholder="Masukkan Nama..."
                    v-model="newLicense.name">
            </div>
            <div class="mb-3">
                <label for="contact" class="col-form-label">Nomor Kontak</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="contact" placeholder="Masukkan Nomor Kontak..."
                    v-model="newLicense.contact">
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';

interface License {
    id: number;
    name: string;
    contact: string;
}

export default defineComponent({
    setup() {
        const columns = ref<string[]>(['NAMA', 'NOMOR KONTAK']);

        const rows = ref<License[]>([
            {
                id: 1,
                name: 'Aulia Arief',
                contact: '081234567890'
            }
        ]);

        const newLicense = reactive<License>({
            id: 0,
            name: '',
            contact: ''
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
                result = result.filter(row => row.name === filterType.value);
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

        const modalTitle = computed(() => isEdit.value ? 'Edit Kontak' : 'Tambah Kontak');

        function editItem(index: number) {
            Object.assign(newLicense, rows.value[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newLicense, {
                id: null,
                name: '',
                contact: ''
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
                name: '',
                contact: ''
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
            applySearch,
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