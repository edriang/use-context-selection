import React from 'react';

import './App.css';

import { RegularProvider, ImprovedProvider } from './context';

import RowWithRegularContext from './components/RowWithRegularContext';
import RowWithImprovedContext from './components/RowWithImprovedContext';

const NUM_ROWS = 300;

function simulateClicks(tableClassName, setButtonsDisabled) {
  const buttons = document.querySelectorAll(`.table.${tableClassName} .btn`);
  const startTime = Date.now();

  setButtonsDisabled(true);

  clickNextButton(buttons, 0, startTime, () => setButtonsDisabled(false));
}

function clickNextButton(buttons, index, startTime, onFinish) {
  if (index === buttons.length) {
    onFinish();
    alert(`Render finished: ${Date.now() - startTime}ms`)
    return;
  }
  buttons[index].click();

  window.requestAnimationFrame(() => {
    clickNextButton(buttons, index + 1, startTime, onFinish);
  });
}

function App() {
  const [numOfRows, setNumOfRows] = React.useState(NUM_ROWS);
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);

  return (
    <div className={`App container container-xl ${buttonsDisabled ? 'buttons-disabled' : ''}`}>
      <div className="pb-5">
        <h1>Performance comparison</h1>
        <p>Enter the number of rows you want to render</p>

        <div>
          <input type="number" className="form-control input-number" value={numOfRows} onChange={(e) => setNumOfRows(parseInt(e.target.value || 0))} />
        </div>

        <p>On the left side, each value is read directly from Context. On the right side, values are read from Context using use-context-selection.</p>
        <p>For each row we render we are displaying the rendered time and a the last time that cell was updated.</p>
        <p>When you click a button its updated-time value is updated and a re-render is triggered. Note that for regular Context that means re-rendering all the rows even though its cell-value didn't change.</p>
        <p>With use-context-selection you can retrieve chunks from your Context and your components will update only when that value is updated, which improves the performance significantly.</p>
        <br />
        <p className="alert alert-info">
          The "Simulate Click All" button will "click", one by one, on every row-button.
          <br />
          After clicking on every button an alert message will be displayed showing the amount of time it took to render every row.
          <br />
          <strong>To experience a real difference in performance enter more than 150 rows; on the left example the time complexity increases exponentially, while on the right example it increases linearly.</strong>
        </p>
      </div>
      <div className="row">
        <div className="col col-6">
          <h2>
            Regular Context
            <button disabled={buttonsDisabled} className="btn btn-success btn-sm float-right" onClick={() => simulateClicks('context', setButtonsDisabled)}>{ buttonsDisabled ? 'Processing...' : 'Simulate Click All' }</button>
          </h2>
          <RegularProvider numOfRows={numOfRows}>
            <table className="table context">
              <tbody>
                  {(new Array(numOfRows).fill(0).map((_, index) => (
                    <RowWithRegularContext key={`row-${index}`} name={`Row ${index + 1}A`} index={index} />
                  )))}
              </tbody>
            </table>
          </RegularProvider>
        </div>
        <div className="col col-6">
          <h2>
            useContextSelection
            <button disabled={buttonsDisabled} className="btn btn-success btn-sm float-right" onClick={() => simulateClicks('use-context-selection', setButtonsDisabled)}>{ buttonsDisabled ? 'Processing...' : 'Simulate Click All' }</button>
          </h2>
          <ImprovedProvider numOfRows={numOfRows}>
            {/* <ImprovedContext.Consumer selection={state => ({ length: state.rows.length })}>
              {({ length }) => String(length)}
            </ImprovedContext.Consumer> */}
            <table className="table use-context-selection">
                <tbody>
                  {(new Array(numOfRows).fill(0).map((_, index) => (
                    <RowWithImprovedContext key={`row-${index}`} name={`Row ${index + 1}B`} index={index} />
                  )))}
                </tbody>
            </table>
          </ImprovedProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
