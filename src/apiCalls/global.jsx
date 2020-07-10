async function Global(countryName) {
    let apiUrl = "https://covid19.mathdro.id/api"
    let modifiedUrl = apiUrl
    console.log(countryName)
    if (countryName && countryName!=='Global') {
        modifiedUrl = `${apiUrl}/countries/${countryName}`
    }
    const fetching = await fetch(modifiedUrl)
    if (fetching.status && fetching.ok) {
        const { confirmed, recovered, deaths, lastUpdate } = await fetching.json()
        return {
            confirmed: confirmed.value,
            recovered: recovered.value,
            deaths: deaths.value,
            country:countryName,
            lastUpdate
        }

    }
    else {
        console.log("SOMETHING WENT WRONG")
    }
}

export default Global
