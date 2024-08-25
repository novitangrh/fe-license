import { defineStore } from 'pinia';

export interface Contact {
    id: number;
    name: string;
    contact: string;
}

export const useContactStore = defineStore('contactStore', {
    state: () => ({
        contacts: [
            {
                id: 1,
                name: 'Aulia Arief',
                contact: '081234567890'
            }
        ] as Contact[],
        filterName: null as string | null,
        searchQuery: '',
    }),
    getters: {
        filteredContacts(state): Contact[] {
            let result = state.contacts;

            if (state.filterName) {
                result = result.filter(contact => contact.name === state.filterName);
            }

            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                result = result.filter(contact =>
                    Object.values(contact).some(val =>
                        typeof val === 'string' && val.toLowerCase().includes(query)
                    )
                );
            }
            return result;
        }
    },
    actions: {
        addContact(newContact: Contact) {
            newContact.id = this.contacts.length ? Math.max(...this.contacts.map(c => c.id ?? 0)) + 1 : 1;
            this.contacts.push({ ...newContact });
        },
        updateContact(updatedContact: Contact) {
            const index = this.contacts.findIndex(c => c.id === updatedContact.id);
            if (index !== -1) {
                this.contacts[index] = { ...updatedContact };
            }
        },
        deleteContact(id: number) {
            this.contacts = this.contacts.filter(contact => contact.id !== id);
        },
        setFilterName(name: string | null) {
            this.filterName = name;
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        }
    }
});
