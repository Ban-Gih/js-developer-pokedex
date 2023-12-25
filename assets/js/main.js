const pokemonList = document.getElementById('pokemonList');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

const maxRecords = 1302;
const limit = 1;
let offset = 1;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <h2 class="tipos">Type</h2>
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            <ol class="habilidade">
                                <h2 class="abilityTitle">Ability</h2>
                                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
                            </ol>
                </ol>
            </div>

            <div class="pokemonImage">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(pokemonId) {
    pokeApi.getPokemons(pokemonId).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    });
}

loadPokemonItems(offset, limit);

nextButton.addEventListener('click', () => {
    offset += limit;
    if (offset >= maxRecords) {
        offset = 0;
    }
    loadPokemonItems(offset, limit);
});

prevButton.addEventListener('click', () => {
    offset -= limit;
    if (offset < 0) {
        offset = Math.max(0, maxRecords - limit);
    }
    loadPokemonItems(offset, limit);
});
