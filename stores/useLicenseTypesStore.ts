// stores/useLicenseTypesStore.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface LicenseType {
    id: number;
    type: string;
}

export const useLicenseTypesStore = defineStore('licenseTypes', () => {
    const rows = ref<LicenseType[]>([
        {
            id: 1,
            type: 'Domain'
        },
        {
            id: 2,
            type: 'Warranty'
        }
    ]);

    const newLicenseType = ref<LicenseType>({
        id: 0,
        type: ''
    });

    const isEdit = ref<boolean>(false);
    const searchQuery = ref<string>('');

    const filteredRows = computed(() => {
        let result = rows.value;

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

    function addLicenseType(licenseType: LicenseType) {
        licenseType.id = rows.value.length ? Math.max(...rows.value.map(r => r.id ?? 0)) + 1 : 1;
        rows.value.push(licenseType);
    }

    function editLicenseType(index: number, updatedLicenseType: LicenseType) {
        rows.value[index] = updatedLicenseType;
    }

    function deleteLicenseType(index: number) {
        rows.value.splice(index, 1);
    }

    return {
        rows,
        newLicenseType,
        isEdit,
        searchQuery,
        filteredRows,
        addLicenseType,
        editLicenseType,
        deleteLicenseType
    };
});
