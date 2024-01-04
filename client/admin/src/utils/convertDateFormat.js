export const convertDateFormatFromInput = (inputDate) => {
    // Split the input date into an array of day, month, and year
    let dateParts = inputDate.split("/");

    // Rearrange the date parts in the desired format
    let formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;

    return formattedDate;
};

export const convertDateFormatFromISODate = (date) => {

    // Extract the day, month, and year
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    let year = date.getFullYear();
  
    // Combine the date parts in the desired format
    let formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
};