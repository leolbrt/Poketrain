import http from "node:http";
import https from "node:https";
import {randomInt} from "node:crypto";

const server = http.createServer((req, res) => {
    if(req.method === "GET" && req.url === "/wild") {
        let id = randomInt(1, 1025);
        https.get('https://pokeapi.co/api/v2/pokemon/'+id, (res) => {
            console.log(res)
        })
    }
    if(req.method === "POST"){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("World Hello");
    }
})
server.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
