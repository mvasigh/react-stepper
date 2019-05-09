import React, { useReducer, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

// useStepper hook that takes a number of states
// and steps through them
function useStepper(steps, reducer, initialState = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(0);

  const next = useCallback(() => {
    const nextStep = step + 1;
    setStep(nextStep);
    dispatch(nextStep);
  }, [step]);

  return [
    state,
    {
      next
    }
  ];
}

function reducer(state, action) {
  switch (action) {
    case 0:
      return { ...state, active: 0 };
    case 1:
      return { ...state, active: 1 };
    case 2:
      return { ...state, active: 2 };
  }
}

function App() {
  const [{ active }, { next }] = useStepper(3, reducer, { active: 0 });

  return (
    <div className="App">
      {active && (
        <div className="Row">
          {active === 1 && <span>1</span>}
          {active === 2 && <span>2</span>}
          {active === 3 && <span>3</span>}
        </div>
      )}
      <button>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
