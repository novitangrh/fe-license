// stores/useLicenseListStore.ts
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

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

export const useLicenseListStore = defineStore('licenseList', () => {
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
        },
        {
            id: 2,
            type: 'Service',
            name: 'Service Web',
            time: 'Bulanan',
            startDate: '1 Agustus 2024',
            endDate: '1 September 2024',
            provider: 'Telkom Indonesia',
            amount: 'Rp. 250.000'
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

    const modalTitle = computed(() => isEdit.value ? 'Edit Lisensi' : 'Tambah Lisensi');

    function editItem(index: number) {
        console.log("Editing item at index:", index);
        Object.assign(newLicense, rows.value[index]);
        isEdit.value = true;
        showModal.value = true;
        console.log("showModal", showModal.value);
    }

    function addItem() {
        console.log("Adding new item");
        Object.assign(newLicense, {
            id: 0,
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
        console.log("showModal", showModal.value);
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
            id: 0,
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
        console.log("Deleting item at index:", index);
        const confirmDelete = window.confirm("Apakah Anda yakin akan menghapus item ini?");
        if (confirmDelete) {
            rows.value.splice(index, 1);
        }
        console.log("rows after delete", rows.value);
    }

    function applySearch(query: string) {
        searchQuery.value = query;
    }

    function applyFilter(type: string | null) {
        filterType.value = type;
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
        filteredRows,
        modalTitle,
        editItem,
        addItem,
        saveItem,
        deleteItem,
        applySearch,
        applyFilter,
        updateShowModal
    };
});
