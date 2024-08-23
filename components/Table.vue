<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="flex-container mb-3">
                <h3 class="flex-item">{{ title }}</h3>
                <div class="flex-item flex-end">
                    <div v-if="showSearchBar" class="input-group search-bar">
                        <div class="input-group-text">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                        </div>
                        <input type="text" class="form-control" placeholder="Cari" v-model="searchQuery"
                            @input="applySearch" />
                    </div>
                    <div v-if="showFilterButton" class="btn-group" ref="dropdownRef">
                        <button type="button" class="btn btn-secondary dropdown-toggle" @click="toggleDropdown">
                            <font-awesome-icon :icon="['fas', 'filter']" /> Filter
                        </button>
                        <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
                            <li><a class="dropdown-item" @click="applyFilter('Domain')">Domain</a></li>
                            <li><a class="dropdown-item" @click="applyFilter('Service')">Service</a></li>
                            <li><a class="dropdown-item" @click="applyFilter('Warranty')">Warranty</a></li>
                            <li><a class="dropdown-item" @click="clearFilter">Clear Filter</a></li>
                        </ul>
                    </div>
                    <div v-if="showAddButton">
                        <button type="button" class="btn btn-success btn-add ml-3" @click="addItem">
                            <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> Tambah
                        </button>
                    </div>
                </div>
            </div>
            <hr class="custom-line" />
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="index" scope="col">{{ column }}</th>
                        <th v-if="showActionColumn" scope="col">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <td v-for="(value, key) in row" :key="key">
                            <span v-html="highlightSearch(value)"></span>
                        </td>
                        <td v-if="showActionColumn">
                            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"
                                :data-bs-target="modalId" @click="editItem(index)">
                                <font-awesome-icon :icon="['fas', 'pen']" />
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteItem(index)">
                                <font-awesome-icon :icon="['fas', 'trash-can']" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        modalId: {
            type: String,
            required: true,
        },
        showFilterButton: {
            type: Boolean,
            default: false,
        },
        showAddButton: {
            type: Boolean,
            default: false,
        },
        showSearchBar: {
            type: Boolean,
            default: false,
        },
        showActionColumn: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const dropdownOpen = ref(false);
        const dropdownRef = ref<HTMLElement | null>(null);
        const searchQuery = ref('');

        function addItem() {
            emit('addItem');
        }

        function editItem(index: number) {
            emit('edit', index);
        }

        function deleteItem(index: number) {
            emit('delete', index);
        }

        function applySearch() {
            // Force the parent component to recompute filteredRows based on searchQuery
            emit('search', searchQuery.value);
        }

        function highlightSearch(text: string): string {
            if (!searchQuery.value) {
                return text;
            }
            const query = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        function toggleDropdown() {
            dropdownOpen.value = !dropdownOpen.value;
        }

        function applyFilter(type: string) {
            emit('filter', type);
            dropdownOpen.value = false; // Close the dropdown after selecting an option
        }

        function clearFilter() {
            emit('filter', null);
            dropdownOpen.value = false; // Close the dropdown after clearing filter
        }

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
                dropdownOpen.value = false;
            }
        }

        onMounted(() => {
            document.addEventListener('mousedown', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('mousedown', handleClickOutside);
        });

        return {
            addItem,
            editItem,
            deleteItem,
            applySearch,
            searchQuery,
            highlightSearch,
            dropdownOpen,
            toggleDropdown,
            dropdownRef,
            applyFilter,
            clearFilter,
        };
    },
});
</script>

<style scoped>
.btn-add {
    white-space: nowrap;
}

.btn-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
}

.btn-sm {
    margin: 3px;
}

.btn-sm .fa-pen,
.btn-sm .fa-trash-can {
    font-size: 16px;
}

.btn-success {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    padding: 5px 15px;
    color: white;
    border-radius: 5px;
}

.btn-success .me-2 {
    margin-right: 8px;
    color: white;
}

.custom-line {
    border: 1px solid;
}

.card {
    border: 1px solid #ced4da;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.flex-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flex-item {
    margin-right: 10px;
}

.flex-end {
    display: flex;
    align-items: center;
    gap: 10px;
}

.input-group-text {
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 5px 0 0 5px;
}

.input-group .form-control {
    border-radius: 0 5px 5px 0;
}

.search-bar {
    max-width: 300px;
    margin-right: 10px;
}

.table-bordered {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
    text-align: center;
    vertical-align: middle;
    padding: 10px;
}

.table-bordered thead th {
    background-color: #f9f9f9;
}

.search-bar .form-control {
    border: 1px solid #ced4da !important;
}

.table-bordered thead th:first-child {
    border-top-left-radius: 10px;
}

.table-bordered thead th:last-child {
    border-top-right-radius: 10px;
}

.table-bordered tbody tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
}

.table-bordered tbody tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
</style>
