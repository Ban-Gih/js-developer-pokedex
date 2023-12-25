
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const [ability] = abilities;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.abilities = abilities;
    pokemon.ability = ability;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemons = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(pokemon => [convertPokeApiDetailToPokemon(pokemon)])
        .catch((error) => {
            console.error("Error fetching Pokemon:", error);
        });
};