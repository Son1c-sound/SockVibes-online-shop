import { writable } from 'svelte/store';

// Safely get the initial value from localStorage or default to 0
const initialValue = (() => {
    try {
        const storedValue = localStorage.getItem('addnumber');
        return storedValue !== null ? JSON.parse(storedValue) : 0;
    } catch (error) {
        console.error('Error parsing localStorage value:', error);
        return 0;
    }
})();

export const addnumber = writable(initialValue);

export function increment() {
    addnumber.update(n => {
        const newValue = n + 1;
        try {
            // Save the updated value to localStorage
            localStorage.setItem('addnumber', JSON.stringify(newValue));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        return newValue;
    });
}

export function decrement() {
    addnumber.update(n => {
        const newValue = Math.max(n - 1, 0); // Ensure the value doesn't go below 0
        try {
            // Save the updated value to localStorage
            localStorage.setItem('addnumber', JSON.stringify(newValue));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        return newValue;
    });
}
