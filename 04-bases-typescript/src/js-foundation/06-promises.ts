import { http } from '../plugins'; // pass for index and there is http exported 

export const getPokemonById = async (id: string | number): Promise<string> => {
    // return new Promise((resolve, reject) => {
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //         .then(response => response.json())
    //         .then(data => resolve(data))
    //         .catch(error => reject(error));
    // });

    try {

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        // const response = await fetch(url);
        // const pokemon = await response.json();
        const pokemon = await http.get(url);
        return pokemon.name;
    }
    catch (error) {
        // way 1
        throw (`Pokemon not found with id ${id}`);
        // way 2
        // throw new Error(`Pokemon not found with id ${id}`);
    }
    // // Way 3
    // return fetch(url)
    //     .then((response) => response.json())
    //     // .then(() => { throw new Error('Pokemon not exists!') })
    //     .then((pokemon) => pokemon.name);

    // // Way 2
    // fetch(url)
    //     .then((response) => response.json())
    //     .then((pokemon) => callback(pokemon.name));

    // // Way 1
    // fetch(url).then((response) => {
    //     response.json().then((pokemon) => {
    //         callback(pokemon.name);
    //     });
    // });
}