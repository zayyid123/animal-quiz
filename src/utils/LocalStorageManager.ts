class LocalStorageManager {
    addToLocalStorage(key: string, value: object) {
        if (typeof Storage !== "undefined") {
            // Local Storage is supported
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            // Local Storage is not supported
            console.error("Local Storage is not supported in this browser");
        }
    }

    getFromLocalStorage(key: string) {
        if (typeof Storage !== "undefined") {
            // Local Storage is supported
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } else {
            // Local Storage is not supported
            console.error("Local Storage is not supported in this browser");
            return null;
        }
    }

    editLocalStorage(key: string, updatedValue: object) {
        const existingData = this.getFromLocalStorage(key);

        if (existingData) {
            const mergedData = { ...existingData, ...updatedValue };
            this.addToLocalStorage(key, mergedData);
            return mergedData;
        } else {
            console.error(`No data found in local storage for key: ${key}`);
            return null;
        }
    }

    removeFromLocalStorage(key: string) {
        if (typeof Storage !== "undefined") {
            // Local Storage is supported
            localStorage.removeItem(key);
        } else {
            // Local Storage is not supported
            console.error("Local Storage is not supported in this browser");
        }
    }
}

export default LocalStorageManager