import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [input, setInput] = useState("0");
  const [prestate, setPrestate] = useState("");
  const [curstate, setCurstate] = useState("");
  const [operator, setOperator] = useState("null");
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    // This conditon does not allow contiouse input of "."
    if(curstate.includes(".") && e.target.innerText === ".") return;

    // If there is already a total set prestate to empty
    if(total){
      setPrestate("");
    }
    curstate? setCurstate((pre) => pre + e.target.innerText)
    : setCurstate(e.target.innerText);

    setTotal(false);
  };
  
  useEffect(() => {
    setInput(curstate);
  },[curstate]);

  useEffect(() =>{
    setInput("0");
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curstate === "") return;
    if (prestate !== ""){
      equals();
    } else {
      setPrestate(curstate);
      setCurstate("");
    }
  };

  const equals = (e) => {
    if(e?.target.innerText === "=") {
      setTotal(true);
    }

    let calculation;
    let div;
    let mul;
    switch(operator) {
      case "/":
        div = parseFloat(prestate) / parseFloat(curstate);
        if (div % 1 !== 0) {
          calculation = div.toFixed(6);

        }
        else{
          calculation = String(div);
        }
        break;
      case "x":
          mul = parseFloat(prestate) * parseFloat(curstate);
          if (mul % 1 !== 0) {
            calculation = mul.toFixed(6);
  
          }
          else{
            calculation = String(mul);
          }
          break;
      case "+":
        calculation = String(parseFloat(prestate) + parseFloat(curstate));
        break;
      case "-":
          calculation = String(parseFloat(prestate) - parseFloat(curstate));
          break;
      default:
        return;
    }
    setInput("");
    setPrestate(calculation);
    setCurstate("");
  };

  const reset = () => {
    setPrestate("");
    setCurstate("");
    setInput("0");
  };

  return (
    <div> 
            <div className="calculator card">
            {/* <input type="text" className="calculator-screen z-depth-1" value="" />{input} */}
            <div  className="calculator-screen z-depth-1">{input !== "" || input === 0 ? (
              <NumberFormat 
                value={input}
                displayType={"text"}
                thousandSeparator={true}
              />  
            ) : (
              <NumberFormat
                value={prestate}
                displayType={"text"}
                thousandSeparator={true}
              />
            )}</div>

            <div className="calculator-keys">
                <button type="button" className="operator btn btn-info" onClick={operatorType}>+</button>
                <button type="button" className="operator btn btn-info" onClick={operatorType}>-</button>
                <button type="button" className="operator btn btn-info" onClick={operatorType}>x</button>
                <button type="button" className="operator btn btn-info" onClick={operatorType}>/</button>

                <button type="button" value="7" className="btn btn-lihght waves-effect" onClick={inputNum}>7</button>
                <button type="button" value="8" className="btn btn-lihght waves-effect" onClick={inputNum}>8</button>
                <button type="button" value="9" className="btn btn-lihght waves-effect" onClick={inputNum}>9</button>

                <button type="button" value="4" className="btn btn-light waves-effect" onClick={inputNum}>4</button>
                <button type="button" value="5" className="btn btn-light waves-effect" onClick={inputNum}>5</button>
                <button type="button" value="6" className="btn btn-light waves-effect" onClick={inputNum}>6</button>

                <button type="button" value="1" class="btn btn-light waves-effect" onClick={inputNum}>1</button>
                <button type="button" value="2" class="btn btn-light waves-effect" onClick={inputNum}>2</button>
                <button type="button" value="3" class="btn btn-light waves-effect" onClick={inputNum}>3</button>

                <button type="button" value="0" className="btn btn-light waves-effect" onClick={inputNum}>0</button>
                <button type="button" className="devimal function btn btn-secondary" onClick={inputNum}>.</button>
                <button type="button" className="all-clear function btn btn-danger btn-sm" onClick={reset}>AC</button>

                <button type="button" className="equal-sign operator btn btn-default" onClick={equals}>=</button>

            </div>
        </div>
    </div>  

  );
}

export default App;
