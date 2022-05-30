const API_KEY = "6015c583";
const BASE_API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=6015c583'

async function run (){
    //first argument is the endpoint URL
    let url = BASE_API_URL + "pokemon/pikachu";
    console.log(url)
    axios.get(url)
    //response is all the information that the server sends back
    let response = await axios.get(url);
    console.log(response.data);
    console.log(response.data.base_experience)
}

run()