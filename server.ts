import http from "node:http";
import https from "node:https";
import {randomInt} from "node:crypto";

const server = http.createServer()

server.on('request', async(req, res) => {
    let contentType = "text/plain";
    let response = null;

    if(req.method === "GET" && req.url === "/wild") {
        contentType = "application/json";
        await WildResponse.new().then((wildResponse) => {
            response = JSON.stringify(wildResponse);
        })
    }

    res.writeHead(200, {"Content-Type": contentType});
    res.end(response);
})
server.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});

class PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
}

class Pokemon {
    id: number;
    name: string;
    sprite: string;
    types: string[];
    stats: PokemonStats
}

class WildResponse {
    pokemon: Pokemon
    captureRate: number;
    static async new() {
        let wildResponse = new WildResponse();
        let id = randomInt(1, 1025);

        await PokeApi.getPokemon(id)
        .then(pokemon => {
            wildResponse.pokemon = pokemon;
        }).catch(err => {
            console.log(err);
        })

        return wildResponse;
    }
}

class PokeApi{
    static async getPokemon(id: number): Promise<Pokemon> {
        return new Promise((resolve, reject) => {
            https.get('https://pokeapi.co/api/v2/pokemon/'+id, (res) => {
                let pokemon = new Pokemon()
                let data = ''
                res.on('data', (chunk) => {
                    data += chunk;
                })
                res.on('end', () => {
                    let dataParsed = JSON.parse(data)
                    let pokemon = new Pokemon()
                    pokemon.id = dataParsed.id
                    resolve(pokemon)
                    console.log(dataParsed)
                })
            })
        })
    }
}
