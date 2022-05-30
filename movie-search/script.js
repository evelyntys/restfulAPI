const API_KEY = "6015c583";
const BASE_API_URL = 'https://www.omdbapi.com/'

// async function run (){
//     let url = BASE_API_URL+"?apikey="+API_KEY+"&s=the lord of the rings";
//     console.log(url)
//     let response = await axios.get(url);
//     console.log(response.data)
// }

// run()

// document.querySelector('#btnSearch').addEventListener('click', async function(){
//     let title = document.querySelector('#txtTitle').value;
//     let url = `${BASE_API_URL}?apikey=${API_KEY}&s=${title}&type=movie`;
//     let response = await axios.get(url);
//     for (let movie of response.data.Search){
//         document.querySelector('#results').innerHTML += `
//         <img src="${movie.Poster}">
//         <li>Title: ${movie.Title}</li>
//         <li>Year: ${movie.Year}</li>
//         `
//     }
// })

document.querySelector('#btnSearch').addEventListener('click', async function(){
    document.querySelector('#results').innerHTML = "";
    let title = document.querySelector('#txtTitle').value;
    //the second arg to axios.get is an options object
    let response = await axios.get(BASE_API_URL, {
        'params': {
            'apikey': API_KEY,
            's':title,
            'type':'movie'
        }
    });
    for (let movie of response.data.Search){
                document.querySelector('#results').innerHTML += `
                <img src="${movie.Poster}">
                <li>Title: ${movie.Title}</li>
                <li>Year: ${movie.Year}</li>
                `
            }
})