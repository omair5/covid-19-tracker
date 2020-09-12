import React, { useContext } from 'react';
import { NativeSelect } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { store } from './globalstate';

const CountryPicker = () => {
    // ----------LOGIC
    // getting HandleCountryChange from the context
    const { HandleCountryChange, countryPicker } = useContext(store)

    // UI
    return (
        <div style={{margin:'20px 10px'}}>
            <FormControl >
                <NativeSelect onChange={(e) => (HandleCountryChange(e.target.value))}>
                    <option>Global</option>
                    {countryPicker === '' ? null
                        :
                        countryPicker.map((value, i) => (<option key={i} value={value}>{value}</option>))
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default CountryPicker;