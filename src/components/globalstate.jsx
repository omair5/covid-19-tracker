import React, { createContext, useState, useEffect } from 'react';
import Global from '../apiCalls/global';
import CountryList from '../apiCalls/countryList'


// CREATING CONTEXT
export const store = createContext()

// CREATING PROVIDER
export const Myprovider = ({ children }) => {
    // STATE FOR CARDS
    const [state, setState] = useState({ confirmed: 0, recovered: 0, deaths: 0, lastUpdate: "" })
    // STATE FOR COUNTRY
    const [country, setCountry] = useState('')
    // STATE FOR COUNTRY PICKER
    const [countryPicker, setCountryPIcker] = useState([])


    // FOR GLOBAL DATA
    useEffect(() => {
        async function callingData() {
            const data = await Global()
            setState(data)
        }
        callingData()

    }, [])

    // FOR COUNTRY PICKER
    useEffect(() => {
        async function ThisCountryPicker() {
            setCountryPIcker(await CountryList())
        }
        ThisCountryPicker()
    }, [])

    const HandleCountryChange = (countryName) => {
        async function callingData() {
            const countryData = await Global(countryName)
            setState(countryData)
            setCountry(countryName)
        }
        callingData()

    }


    return (
        <store.Provider value={{ state, setState, HandleCountryChange, country, countryPicker }}>
            {children}
        </store.Provider>
    );
}

export default Myprovider;