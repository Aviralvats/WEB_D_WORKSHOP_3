const fs = require("fs");
// 1. Create (Write file)
fs.writeFileSync("test.txt", "Hello, Aviral! This is initial data.");
console.log("File created and written successfully.");
// 2. Read (Read file)
const data = fs.readFileSync("test.txt", "utf8");
console.log("Read File Content:", data);
// 3. Update (Append to file)
fs.appendFileSync("test.txt", "\nAppending new text for update operation.");
console.log("File updated successfully.");
const updatedData = fs.readFileSync("test.txt", "utf8");
console.log("Updated File Content:", updatedData);
// 4. Delete (Unlink/Delete file)
fs.unlinkSync("test.txt");
console.log("File deleted successfully.");