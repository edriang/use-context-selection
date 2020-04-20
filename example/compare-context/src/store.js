import createContextProvider, { connectContextFactory } from 'react-connect-context-hooks';

import { rows } from './constants';

const initialState = {
    rows,
};

const actions = {
    setRowValue: (dispatch, getState) => (index, value) => {
        const { rows } = getState();
        
        rows[index] = value;

        dispatch({ rows: rows.slice(0) });
    },
};

const [StoreProvider, Context] = createContextProvider(initialState, actions);
const withStore = connectContextFactory(Context);

export default StoreProvider;
export {
    withStore,
};
