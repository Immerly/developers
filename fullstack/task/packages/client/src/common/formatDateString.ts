export default function formatDateString(input: string) {
    const inputDate = new Date(input);
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString().slice(-2);
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
}
