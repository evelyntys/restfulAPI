const API_KEY = "6015c583";
const BASE_API_URL = 'https://www.omdbapi.com/'

async function run (){
    let url = BASE_API_URL+"?apikey="+API_KEY+"&s=the lord of the rings";
    console.log(url)
    let response = await axios.get(url);
    console.log(response.data)
}

run()