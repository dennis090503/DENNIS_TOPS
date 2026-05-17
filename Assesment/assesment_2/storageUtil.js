// LocalStorage abstract wrapper module
const STORAGE_KEY = 'swan_hotel_submissions';

export const storageUtil = {
    /**
     * Retrieves array list from storage
     */
    getItems() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return [];
        }
    },

    /**
     * Saves array list to storage
     */
    setItems(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            return true;
        } catch (error) {
            console.error("Error writing to localStorage", error);
            return false;
        }
    }
};