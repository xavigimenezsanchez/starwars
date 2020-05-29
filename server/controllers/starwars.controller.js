const axios = require('axios');
class Response {
    constructor(convert) {
        this.convert = convert?convert:d=>d;
    }
    success(data) {
        return {
            "success": true,
				"message": "",
				"data": this.convert(data)
        }
    }
    error(e) {
        return {
            "success": false,
			"message": e
        }
    }
}

exports.films = (req, res) => {
    const response = new Response(data=>data.map(film=> {return { "id": film.episode_id, "titulo": film.title}}))
    axios.get('https://swapi.dev/api/films')
        .then(r=>{
            try {
                res.status(200).json(response.success(r.data.results));
            } catch {
                res.status(500).json(response.error('serialize films data error!'));
            }
        })
        .catch(error => res.status(500).send(response.error(error.message))); 
}

exports.characters = async (req, res) => {
    const response = new Response(data=>data.map(character=> {return { "nombre": character.name, "sexo": character.gender, "origen": character.homeworld, "especie": character.especie}}))

    const getCharacters = async (characters) => {
        const promise = characters.map(async character => {
            const result = await axios.get(character);
            return result.data;
        });

        return await Promise.all(promise);
    }

    const getOrigen = async (characters) => {
        const promise = characters.map(async character => {
            const result = await axios.get(character.homeworld);
            return { ...character, "homeworld": result.data.name}
        });

        return await Promise.all(promise);
    } 

    const getEspecie = async (characters) => {
        const promise = characters.map(async character => {
            let especie = 'human';
            if (character.species.length > 0) {
                const result = await axios.get(character.species[0]);
                console.log(result.data.name)
                especie = result.data.name;
            }
            return { ...character, "especie": especie}
            
        });

        return await Promise.all(promise);
    } 
    try {
        const film = await axios.get('https://swapi.dev/api/films/' + req.params.filmId);
        console.log(film.data.characters)
        const characterStage1 = await getCharacters(film.data.characters)
        const characterStage2 = await getOrigen(characterStage1);
        const characterStage3 = await getEspecie(characterStage2);
        res.status(200).json(response.success(characterStage3));
    } catch(error) {
        res.status(500).json(response.error(error));
    }
}