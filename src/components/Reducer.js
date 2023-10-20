import { ACTIONS } from "../components/Actions";

export default function reducer(state, { type, payload }){
    switch(type){
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            currentOperand:payload.digit,
            overwrite:false,
          }
        }
        if(payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if(payload.digit === "." && state.currentOperand == null) { 
            return state
        }
        if(payload.digit === "." && state.currentOperand.includes(".")) { 
          return state
        }
        return{
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }
  
      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand == null){
          return state
        }
  
        if(state.currentOperand == null){
          return{
            ...state,
            operation:payload.operation
          }
        }
  
        if(state.previousOperand == null){
          return{
            ...state,
            operation: payload.operation,
            previousOperand : state.currentOperand,
            currentOperand: null,
          }
        }
      return{
        ...state,
        previousOperand:evaluate(state),
        operation: payload.operation,
        currentOperand:null,
      }
  
      case ACTIONS.CLEAR:
        return {}
        
      case ACTIONS.EVALUATE:
        if(state.currentOperand == null || state.previousOperand == null || state.operation == null){
          return state
        }
        return {
          ...state,
          overwrite:true,
          previousOperand:null,
          operation:null,
          currentOperand:evaluate(state)
        }
  
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            overwrite:false,
            currentOperand:null
          }
        }
        if(state.currentOperand == null) return state
        if(state.currentOperand.length === 1){
          return {...state, currentOperand: null}
        }
  
        return{
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
  
      default:
        return null
    }
  }

  function evaluate({currentOperand, previousOperand, operation}){
    const previousNumber = parseFloat(previousOperand);
    const currentNumber = parseFloat(currentOperand);
  
    if(isNaN(previousNumber) || isNaN(currentNumber)){
      return ""
    }
    let computation = "";
    switch (operation) {
      case "+":
        computation = previousNumber+currentNumber;
        break;
      case "-":
        computation = previousNumber-currentNumber;
        break;
      case "*":
          computation = previousNumber*currentNumber;
          break;
      case "/":
          computation = previousNumber/currentNumber;
          break;
      default:
        break;
    }
  
    return computation.toString()
  }