import React from 'react';
import { createContext, useContextSelection } from 'use-context-selection';

function createContextProvider(Context) {
    return ({ children, numOfRows}) => {

        const [state, dispatch] = React.useReducer((state, { type, payload = {} }) => {
            switch (type) {
                case 'INCREMENT':
                    const rows = state.rows.slice(0);

                    rows[payload.index] = payload.value;

                    return { ...state, rows };

                case 'SET_ROW_NUMBER':
                    return {
                        ...state,
                        rows: new Array(payload.numOfRows).fill(0).map(() => Date.now()),
                    };
                default:
                    return state;
            }
        }, { rows: [] })

        const setRowValue = (index, value) => {
            dispatch({
                type: 'INCREMENT',
                payload: { index, value },
            })
        };

        React.useEffect(() => {
            dispatch({ type: 'SET_ROW_NUMBER', payload: { numOfRows }})
        }, [numOfRows]);
    
        const value = {
            rows: state.rows,
            setRowValue,
        };
    
        return <Context.Provider value={value}>{children}</Context.Provider>
    };
}

const RegularContext = React.createContext({});
const RegularProvider = createContextProvider(RegularContext);
const useRegularContext = () => React.useContext(RegularContext);


const ImprovedContext = createContext({});
const ImprovedProvider = createContextProvider(ImprovedContext);
const useImprovedContext = (getterFn) => useContextSelection(ImprovedContext, getterFn);

export {
    RegularProvider,
    useRegularContext,

    ImprovedContext,
    ImprovedProvider,
    useImprovedContext,
};
