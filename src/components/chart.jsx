import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import G_Daily_data from '../apiCalls/globalDailyData';
import { store } from './globalstate';

const Chart = () => {
    // LOCAL STATE FOR  LINE CHART DATA (GLOBAL)
    const [data, setdata] = useState([])

    // using context for specific country data of BAR CHART (SPECIFIC COUNTRY)
    const { state: { confirmed, recovered, deaths }, country } = useContext(store)
    if (country === '') {
        console.log("it is empty")
    }


    // IT FETCHES DATA AFTER UI RENDERS
    useEffect(() => {
        async function DailyData() {
            setdata(await G_Daily_data())


        }
        DailyData()
    }, [])

    // LINE CHART
    const lineChart = {
        labels: data.map((value) => (value.reportDate)),
        datasets: [
            {
                label: 'CONFIRMED',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((value) => (value.confirmed))
            },
            {
                label: 'DEATHS',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,92,92,0.4)',
                borderColor: 'rgba(75,92,92,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 10.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,92,92,1)',
                pointBackgroundColor: '#fgf',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,92,192,1)',
                pointHoverBorderColor: 'rgba(220,20,20,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((value) => (value.deaths))
            }
        ]
    };

    // BAR CHART
    const BarChart = {
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        datasets: [
            {
                label: "hello",
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [confirmed, recovered, deaths]
            }
        ]
    };

    // UI
    return (
        <div >
            {country === '' ? data === '' ? null : <Line data={lineChart} /> : <Bar data={BarChart} width={100} height={50} />}




        </div>
    );
}

export default Chart;