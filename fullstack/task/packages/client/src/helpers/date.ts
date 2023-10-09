export const formatDate = (isoDate: Date) => {
    const date = new Date(isoDate);

    // Format date as "Month Day, Year"
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format time as "HH:MM AM/PM"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
};