import React, { useContext } from 'react';
import popup from '../images/popup.jpg'
import CancelIcon from '@material-ui/icons/Cancel';
import { store } from './globalstate';

const PopUp = () => {
    const { banner, closeBanner } = useContext(store)
    return (
        <div>
            {banner ?
                <div className='main-div' >
                    <span className='child-span'>
                        <img src={popup} alt="popup banner" />
                        <CancelIcon className='iconStyle' fontSize="large" onClick={closeBanner} />
                    </span>
                </div > : null
            }

        </div>


    );
}

export default PopUp;