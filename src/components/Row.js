import React from 'react';
import moment from 'moment';

const Component = ({ value, setValue, name, buttonsDisabled }) => {
    const updateValue = () => {
        setValue(Date.now());
    }

    return (
        <tr>
            <td>
                <strong style={{whiteSpace: 'nowrap'}}>{name}</strong>
            </td>
            <td>
                <strong>Rendered:</strong>
                <p>{moment().format('hh:mm:ss.SSS')}</p>
            </td>
            <td>
                <strong>Updated:</strong>
                <p>{moment(value).format('hh:mm:ss.SSS')}</p>
            </td>
            <td>
                <button style={{whiteSpace: 'nowrap'}} className={`btn btn-primary btn-sm ${buttonsDisabled ? 'disabled' : ''}`} onClick={updateValue}>Update value</button>
            </td>
        </tr>
        
    )
}

export default Component;
