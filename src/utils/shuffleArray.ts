function shuffleArray<T>(arr: T[]): T[] {
    // Looping dari belakang ke depan
    for (let i = arr.length - 1; i > 0; i--) {
        // Pilih indeks acak dari 0 hingga i
        const randomIndex = Math.floor(Math.random() * (i + 1));
        // Tukar elemen saat ini dengan elemen acak
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

export default shuffleArray