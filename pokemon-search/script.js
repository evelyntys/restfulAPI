//whats the difference between const and let? --> const cannot be reassigned to 
const BASE_API_URL = "https://pokeapi.co/api/v2/";

document.querySelector('#btnSearch').
    addEventListener('click', async function(){
        let pokemon = document.querySelector("#txtPokemon").value
        let url = `${BASE_API_URL}pokemon/${pokemon}`;
        let response = await axios.get(url);
        console.log(response.data)
        document.querySelector('#result').innerHTML = 
        `<h1>${response.data.name}</h1>
        <img src="${response.data.sprites.other["official-artwork"]["front_default"]}">
        <ul>
        <li>base experience: ${response.data.base_experience}</li>
        <li>weight: ${response.data.weight}</li>
        </ul>
        `
    })