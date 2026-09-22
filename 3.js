const http = require("http");
const server = http.createServer((req, res) => {
 // Return status code 200 and custom headers
 res.writeHead(200, {
 "Content-Type": "text/plain",
 "X-Powered-By": "Node.js FSD Lab"
 })
 // Respond with "Hello World"
 res.end("Hello World");
});
server.listen(3000, () => {
 console.log("Server is listening on port 3000");
});