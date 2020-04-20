import React from 'react';

import Row from './Row';
import { useImprovedContext } from '../context';

const RowWithImprovedContext = ({ name, index, buttonsDisabled }) => {
    const { rowValue, setRowValue } = useImprovedContext(store => {
        // console.log('useImprovedContext', { store });
        return {
            rowValue: store.rows[index],
            setRowValue: store.setRowValue,
        };    
    });
    const setValue = (value) => setRowValue(index, value);

    return <Row value={rowValue} setValue={setValue} name={name} buttonsDisabled={buttonsDisabled} />
}

export default RowWithImprovedContext;
