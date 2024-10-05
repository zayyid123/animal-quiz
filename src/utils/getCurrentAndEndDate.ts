function getCurrentAndEndDate() {
    const today = new Date();

    // Start date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    const startDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // End date (10 minutes later)
    const endDateObj = new Date(today.getTime() + 10 * 60000); // Add 10 minutes in milliseconds
    const endYear = endDateObj.getFullYear();
    const endMonth = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDateObj.getDate()).padStart(2, '0');
    const endHours = String(endDateObj.getHours()).padStart(2, '0');
    const endMinutes = String(endDateObj.getMinutes()).padStart(2, '0');
    const endSeconds = String(endDateObj.getSeconds()).padStart(2, '0');

    const endDate = `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}:${endSeconds}`;

    return { startDate, endDate };
}

export default getCurrentAndEndDate