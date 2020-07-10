import React, { createContext, useState, useEffect } from 'react';
import Global from '../apiCalls/global';


// CREATING CONTEXT
export const store = createContext()

// CREATING PROVIDER
export const Myprovider = ({ children }) => {
    const [state, setState] = useState({ confirmed: 0, recovered: 0, deaths: 0, lastUpdate: "" })
    // state for country
    const [country, setCountry]=useState('')


    useEffect(() => {
        async function callingData() {
            const data = await Global()
            setState(data)
        }
        callingData()

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
        <store.Provider value={{ state, setState, HandleCountryChange,country }}>
            {children}
        </store.Provider>
    );
}

export default Myprovider;