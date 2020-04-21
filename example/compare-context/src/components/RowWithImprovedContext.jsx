import React from 'react';

import Row from './Row';
import { useImprovedContext } from '../context';

const RowWithImprovedContext = React.memo(({ name, index }) => {
    const { rowValue, setRowValue } = useImprovedContext(store => {
        // console.log('useImprovedContext', { store });
        return {
            rowValue: store.rows[index],
            setRowValue: store.setRowValue,
        };    
    });
    const setValue = React.useCallback((value) => setRowValue(index, value), [index]);

    return <Row value={rowValue} setValue={setValue} name={name} />
});

export default RowWithImprovedContext;
