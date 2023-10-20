import { useReducer } from "react";
import reducer from "./components/Reducer"
import { ACTIONS } from "./components/Actions";
import DigitButton from "./components/DigitButtons";
import OperationButton from "./components/OperationButtons";
import "./styles.css";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return 
  const[integer, decimal] = operand.split(".");
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{formatOperand(previousOperand)}{operation}</div>
        <div className='current-operand'>{formatOperand(currentOperand)}</div>
      </div>
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation= "/" dispatch={dispatch} />
      <DigitButton digit= "1" dispatch={dispatch} />
      <DigitButton digit= "2" dispatch={dispatch} />
      <DigitButton digit= "3" dispatch={dispatch} />
      <OperationButton operation= "*" dispatch={dispatch} />
      <DigitButton digit= "4" dispatch={dispatch} />
      <DigitButton digit= "5" dispatch={dispatch} />
      <DigitButton digit= "6" dispatch={dispatch} />
      <OperationButton operation= "+" dispatch={dispatch} />
      <DigitButton digit= "7" dispatch={dispatch} />
      <DigitButton digit= "8" dispatch={dispatch} />
      <DigitButton digit= "9" dispatch={dispatch} />
      <OperationButton operation= "-" dispatch={dispatch} />
      <DigitButton digit= "." dispatch={dispatch} />
      <DigitButton digit= "0" dispatch={dispatch} />
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
