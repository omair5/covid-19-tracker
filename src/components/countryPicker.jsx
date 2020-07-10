import React, { useEffect, useState, useContext } from 'react';
import { NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import CountryList from '../apiCalls/countryList'
import { store } from './globalstate';


const CountryPicker = () => {
    // ----------LOGIC
    // getting HandleCountryChange from the context
    const { HandleCountryChange } = useContext(store)

    // local state
    const [country, setCountry] = useState([])

    // this will run after the first render
    useEffect(() => {
        async function ThisCountryPicker() {
            setCountry(await CountryList())
        }
        ThisCountryPicker()
    }, [])
    
    // UI
    return (
        <div>
            <FormControl >
                <NativeSelect onChange={(e) => (HandleCountryChange(e.target.value))}>
                    <option>Global</option>
                    {country === '' ? null
                        :
                        country.map((value, i) => (<option key={i} value={value}>{value}</option>))
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default CountryPicker;