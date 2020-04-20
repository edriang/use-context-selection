import React from 'react';

import Row from './Row';
import { useRegularContext } from '../context';

const RowWithRegularContext = ({ name, index, buttonsDisabled }) => {
    const { rows, setRowValue } = useRegularContext();
    const setValue = (value) => setRowValue(index, value);

    return <Row value={rows[index]} setValue={setValue} name={name} buttonsDisabled={buttonsDisabled} />
}

export default RowWithRegularContext;
