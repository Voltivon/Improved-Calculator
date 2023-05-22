import { useReducer } from 'react';
import DigitButton from './DigitButton';
import './index.css'
import OperationButton from './OperationButton';
import CalcHeader from './CalcHeader';


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  CLEAR_ALL: "clear-all",
  EVAULATE: "evaluate",
  PERCENTAGE: "percentage",
  SQUARED: "squared",
  NEGATE: "negate"
}


function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite: false,
          currentOperand: payload.digit
        }
      } 
      if(payload.digit === "0" && state.currentOperand === "0") return state;
      if( payload.digit === "." && state.currentOperand && state.currentOperand.includes(".")) return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`, 
      }

      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null) return state;  
      
      return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: ""
        }

      case ACTIONS.CLEAR_ALL:
        return {
          previousOperand: "",
          currentOperand: "",
          operation: ""
        }

      case ACTIONS.EVAULATE:
        if(state.previousOperand == null || state.currentOperand == null|| state.operation == null) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }

        case ACTIONS.DELETE_DIGIT:
          
          
          return {
            ...state,
            currentOperand: state.currentOperand.slice(0, -1)
          }

        case ACTIONS.PERCENTAGE:
          if(state.currentOperand === "0") return state;
          const percentageValue = parseFloat(state.currentOperand) / 100;
          return {
            ...state,
            currentOperand: percentageValue
            
          }

        case ACTIONS.SQUARED:
          if(state.currentOperand === "") return state;
          const squaredValue = parseFloat(state.currentOperand) * parseFloat(state.currentOperand)
          return {
            ...state,
            currentOperand: squaredValue
          }

        case ACTIONS.NEGATE:
          if(state.currentOperand === "") return state;
          if(state.currentOperand.includes("-")) {
            return {
              ...state,
              currentOperand: (state.currentOperand * -1).toString()
            }
          }
          const negatedValue = `-${state.currentOperand}`

        return {
          ...state,
          currentOperand: negatedValue
        }


        
       // no default
  }
 
}

function evaluate({currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  let computation;
  switch(operation){
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "*":
      computation = prev * curr;
    // no default
  }

  return computation.toString();

}


function App() {
  const [state, dispatch] = useReducer(reducer, {});
  console.log(state);

  return (   
    <>
   
    <CalcHeader />
    <div className='calculator'>
      
      <div className="output">
        <div className="prev-operand">{state.previousOperand} {state.operation}</div>
        <div className="curr-operand">{state.currentOperand}</div>
      </div>
      <button className='CLEAR-ALL' onClick={() => dispatch({type: ACTIONS.CLEAR_ALL})}>AC</button>
      <button className='DELETE' onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <button onClick={() => dispatch({type: ACTIONS.PERCENTAGE})}>%</button>
      <button onClick={() => dispatch({type: ACTIONS.SQUARED})}>x²</button>
      <button onClick={() => dispatch({type: ACTIONS.NEGATE})}>+/-</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button className="equals" onClick={() => dispatch({type: ACTIONS.EVAULATE})}>=</button>
    </div>
    </>
  )
}

export default App;
