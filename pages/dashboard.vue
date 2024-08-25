<template>
    <Table title="Lisensi-Lisensi di YPT" :columns="columns" :rows="filteredRows" modalId="licenseListModal"
        :showSearchBar="false" :showFilterButton="false" :showAddButton="false" />
</template>

<script lang="ts">
import { useLicenseStore } from '@/stores/licenseListStore';
import { computed, defineComponent, ref } from 'vue';

interface License {
    id: number;
    allLicense: string;
    expLicense: string;
}

export default defineComponent({
    setup() {
        const licenseStore = useLicenseStore();

        const columns = ref<string[]>(['JUMLAH LISENSI KESELURUHAN', 'JUMLAH LISENSI AKAN HABIS']);

        const rows = ref([
            {
                id: 1,
                allLicense: licenseStore.totalLicenses.toString(),
                expLicense: '20'
            }
        ]);

        const filterType = ref<string | null>(null);

        const filteredRows = computed(() => {
            let result = rows.value;

            if (filterType.value) {
                result = result.filter(row => row.allLicense === filterType.value);
            }
            return result.map(({ id, ...rest }) => rest);
        });

        return {
            columns,
            rows,
            filteredRows
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