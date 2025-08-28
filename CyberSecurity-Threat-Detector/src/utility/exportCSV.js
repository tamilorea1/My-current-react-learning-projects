
export const exportToCSV = (data, filename) => {
    // Check if data is valid
    //if data is null, undefined, or an empty array, return early
    if (!data || data.length === 0) {
        console.warn('No data available to export.');
        return;
    }

    //gets the headers (keys of the first object in the array)
    //example headers = ['CVE ID', 'VENDOR/PRODUCT', 'VULNERABILITY', 'DATE ADDED', 'DUE DATE', 'RANSOMEWARE']\
    const headers = Object.keys(data[0]);

    //Mke the rows of the CSV
    //these are the values of each key in the array
    //example rows = [['CVE-2023-1234', 'Microsoft/Windows', 'Buffer Overflow', '2023-10-01', '2023-11-01', 'Yes']]
    const rows = data.map(obj => headers.map(header => {
        //if a value is missing, replace it with an empty string
        let value = obj[header] || '';

        //edge case handling for commas and quotes in values
        //if a value is a string, replace any double quotes with two double quotes
        //example: He said "Hello" -> He said ""Hello""
        if (typeof value === 'string'){
            value = value.replace(/"/g, '""'); // Escape double quotes

            // If the value contains a comma, newline, or double quote, wrap it in double quotes
            if (value.includes(',') || value.includes('\n') || value.includes('"')) {
                value = `"${value}"`;
                
            }
        }
        return value;
    }))


    //combine headers and rows into csv text
    const csvContent = [
        headers.join(","), // Join headers with commas
        ...rows.map(row => row.join(",")) // Join each row with commas, added the spread operator to flatten the array & to avoid nested arrays as well as ensuring each array isn't on the same line 
    ].join("\n"); // Join rows with new line


    // Create a Blob from the CSV content
    // text/csv tells the browser that this is a CSV file
    // charset=utf-8 ensures that the file makes sure to handle special characters
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    //create a temporary link to download the blob
    const url = URL.createObjectURL(blob);


    //create a hideen <a> element to trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", url); //set the link href to the blob url
    link.setAttribute("download", filename); //set the download attribute with the filename, tells the user to download the file and save it as this name
    link.style.visibility = 'hidden';

    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // cleanup
}