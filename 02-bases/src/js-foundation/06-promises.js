

const getPokemonById = (id, callback) => {
    // return new Promise((resolve, reject) => {
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //         .then(response => response.json())
    //         .then(data => resolve(data))
    //         .catch(error => reject(error));
    // });

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    // Way 3
    return fetch(url)
        .then((response) => response.json())
        .then(() => { throw new Error('Pokemon not exists!') })
        .then((pokemon) => pokemon.name);

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

module.exports = getPokemonById;