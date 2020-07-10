async function G_Daily_data() {
    const globalDailyData = await fetch("https://covid19.mathdro.id/api/daily")
    const data = await globalDailyData.json()
    return data.map((value) => (
        {
            confirmed: value.confirmed.total,
            deaths: value.deaths.total,
            reportDate: value.reportDate

        }
    ))
}

export default G_Daily_data