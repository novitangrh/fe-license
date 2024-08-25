<template>
    <Table title="Daftar Kontak" :columns="columns" :rows="filteredContacts" modalId="licenseListModal"
        :showSearchBar="true" :showAddButton="true" :showActionColumn="true" @search="applySearch" @addItem="addItem"
        @edit="editItem" @delete="deleteItem" />
    <Modal :title="modalTitle" :modalId="modalId" :labelId="labelId" :showModal="showModal" @save="saveItem"
        @update:showModal="updateShowModal">
        <form>
            <div class="mb-3">
                <label for="name" class="col-form-label">Nama</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="name" placeholder="Masukkan Nama..."
                    v-model="newContact.name">
            </div>
            <div class="mb-3">
                <label for="contact" class="col-form-label">Nomor Kontak</label>
                <font-awesome-icon :icon="['fas', 'asterisk']" class="asterisk-icon" />
                <input type="text" class="form-control" id="contact" placeholder="Masukkan Nomor Kontak..."
                    v-model="newContact.contact">
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
import { useContactStore, type Contact } from '@/stores/contactStore';
import { computed, defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useContactStore();

        const columns = ref<string[]>(['NAMA', 'NOMOR KONTAK']);

        const newContact = reactive<Contact>({
            id: 0,
            name: '',
            contact: ''
        });

        const isEdit = ref<boolean>(false);
        const showModal = ref<boolean>(false);
        const modalId = "contactModal";
        const labelId = "contactModalLabel";

        const filteredContacts = computed(() => {
            return store.filteredContacts.map(({ id, ...rest }) => rest);
        });

        const modalTitle = computed(() => isEdit.value ? 'Edit Kontak' : 'Tambah Kontak');

        function editItem(index: number) {
            Object.assign(newContact, store.contacts[index]);
            isEdit.value = true;
            showModal.value = true;
        }

        function addItem() {
            Object.assign(newContact, {
                id: 0,
                name: '',
                contact: ''
            });
            isEdit.value = false;
            showModal.value = true;
        }

        function saveItem() {
            if (isEdit.value) {
                store.updateContact({ ...newContact });
                isEdit.value = false;
            } else {
                store.addContact({ ...newContact });
            }

            Object.assign(newContact, {
                id: 0,
                name: '',
                contact: ''
            });

            showModal.value = false;
        }

        function deleteItem(index: number) {
            const confirmDelete = window.confirm("Apakah Anda yakin akan menghapus item ini?");
            if (confirmDelete) {
                const contact = store.contacts[index];
                store.deleteContact(contact.id);
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
            newContact,
            isEdit,
            showModal,
            modalId,
            labelId,
            filteredContacts, modalTitle,
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