import http from "node:http";

const server = http.createServer((req, res) => {
    if(req.method === "GET"){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Hello World!");
    }
    if(req.method === "POST"){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("World Hello");
    }
})
server.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
