import { defineStore } from 'pinia';

interface License {
    id: number;
    typeTime: string;
    times: string[];
}

export const useLicensesStore = defineStore('licenses', {
    state: () => ({
        rows: [
            { id: 1, typeTime: 'Bulanan', times: ['H-7'] },
            { id: 2, typeTime: 'Tahunan', times: ['H-7', 'H-30'] }
        ] as License[],
        filterType: null as string | null,
    }),
    getters: {
        filteredRows(state) {
            let result = state.rows;

            if (state.filterType) {
                result = result.filter(row => row.typeTime === state.filterType);
            }

            return result.map(({ id, times, ...rest }) => ({
                ...rest,
                times: times.join(', ')
            }));
        },
    },
    actions: {
        addLicense(newLicense: License) {
            newLicense.id = this.rows.length ? Math.max(...this.rows.map(r => r.id ?? 0)) + 1 : 1;
            this.rows.push(newLicense);
        },
        updateLicense(updatedLicense: License) {
            const index = this.rows.findIndex(lic => lic.id === updatedLicense.id);
            if (index !== -1) {
                this.rows[index] = updatedLicense;
            }
        },
        deleteLicense(id: number) {
            this.rows = this.rows.filter(lic => lic.id !== id);
        },
        setFilterType(typeTime: string | null) {
            this.filterType = typeTime;
        }
    }
});
