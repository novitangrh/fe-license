<template>
    <Table title="Jenis Lisensi Tersedia" :columns="columns" :rows="filteredLicenses" modalId="licenseListModal"
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
import { useLicenseTypesStore, type License } from '@/stores/licenseTypesStore';
import { computed, defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useLicenseTypesStore();

        const columns = ref<string[]>(['JENIS LISENSI']);

        const newLicense = reactive<License>({
            id: 0,
            type: ''
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "licenseListModal";
        const labelId = "licenseListModalLabel";

        const filteredLicenses = computed(() => {
            return store.filteredLicenses.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Edit Jenis Lisensi' : 'Tambah Jenis Lisensi');

        function editItem(index: number) {
            Object.assign(newLicense, store.licenses[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newLicense, {
                id: 0,
                type: ''
            });
            isEdit.value = false;
            showModal.value = true;
        }

        function saveItem() {
            if (isEdit.value) {
                store.updateLicense({ ...newLicense });
                isEdit.value = false;
            } else {
                store.addLicense({ ...newLicense });
            }

            Object.assign(newLicense, {
                id: 0,
                type: ''
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