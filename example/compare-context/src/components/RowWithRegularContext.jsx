import React from 'react';

import Row from './Row';
import { useRegularContext } from '../context';

const RowWithRegularContext = React.memo(({ name, index }) => {
    const { rows, setRowValue } = useRegularContext();

    const setValue = React.useCallback((value) => setRowValue(index, value), [index]);

    return <Row value={rows[index]} setValue={setValue} name={name} />
});

export default RowWithRegularContext;
