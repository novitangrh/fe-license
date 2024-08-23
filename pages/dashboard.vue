<template>
    <Table title="Lisensi-Lisensi di YPT" :columns="columns" :rows="filteredRows" modalId="licenseListModal" :showSearchBar="false" :showFilterButton="false" :showAddButton="false" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

interface License {
    id: number;
    allLicense: string;
    expLicense: string;
}

export default defineComponent({
    setup() {
        const columns = ref<string[]>(['JUMLAH LISENSI KESELURUHAN', 'JUMLAH LISENSI AKAN HABIS']);

        const rows = ref<License[]>([
            {
                id: 1,
                allLicense: '100',
                expLicense: '20'
            }
        ]);

        const filterType = ref<string | null>(null);

        const filteredRows = computed(() => {
            let result = rows.value;

            if (filterType.value) {
                result = result.filter(row => row.allLicense === filterType.value);
            }
            // Hapus kolom id dari hasil
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

.form-control, .form-select {
    border: 1px solid #ced4da !important;
}
</style>