
export default function fetchCountries(country) {
    return fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
        return response.json();
    })
        .catch(console.error);
}