import { defineStore } from 'pinia';

export interface License {
    id: number;
    type: string;
}

export const useLicenseTypesStore = defineStore('licenseTypesStore', {
    state: () => ({
        licenses: [
            { id: 1, type: 'Domain' },
            { id: 2, type: 'Service' },
            { id: 3, type: 'Warranty' }
        ] as License[],
        filterType: null as string | null,
        searchQuery: '',
    }),
    getters: {  
        filteredLicenses(state): License[] {
            let result = state.licenses;

            if (state.filterType) {
                result = result.filter(license => license.type === state.filterType);
            }

            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                result = result.filter(license =>
                    Object.values(license).some(val =>
                        typeof val === 'string' && val.toLowerCase().includes(query)
                    )
                );
            }
            return result;
        }
    },
    actions: {
        addLicense(newLicense: License) {
            newLicense.id = this.licenses.length ? Math.max(...this.licenses.map(r => r.id ?? 0)) + 1 : 1;
            this.licenses.push({ ...newLicense });
        },
        updateLicense(updatedLicense: License) {
            const index = this.licenses.findIndex(lic => lic.id === updatedLicense.id);
            if (index !== -1) {
                this.licenses[index] = { ...updatedLicense };
            }
        },
        deleteLicense(id: number) {
            this.licenses = this.licenses.filter(license => license.id !== id);
        },
        setFilterType(type: string | null) {
            this.filterType = type;
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        }
    }
});
