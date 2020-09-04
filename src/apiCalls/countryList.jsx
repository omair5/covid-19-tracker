async function CountryList() {
    const response = await fetch('https://covid19.mathdro.id/api/countries')
    const {countries} = await response.json()
    return countries.map((value) => {
        return value.name.toLowerCase()
    })
}

export default CountryList