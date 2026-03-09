import { useEffect, useState } from "react";
import { wrapperStyle, inputStyle } from "./assets/styles";
import {
  buttonClassNames,
  yellowButtonClassNames,
  blueButtonClassNames,
  darkBlueButtonClassNames,
} from "./assets/classNames";
import {
  adjustFontSize,
  evaluateExpression,
  filterInput,
} from "./utils/handleInput.ts";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setInputValue(filterInput(inputValue));
  }, [inputValue]);

  return (
    <div className="bg-olive-400 h-screen w-screen pt-20">
      <div
        className="grid grid-cols-4 grid-rows-5 gap-5 p-6 items-center justify-items-center"
        style={wrapperStyle}
      >
        <input
          value={inputValue}
          type="text"
          className={`${adjustFontSize(inputValue)} col-span-4 opacity-60 focus:opacity-100`}
          style={inputStyle}
          placeholder="0"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInputValue(evaluateExpression(inputValue));
            }
          }}
          maxLength={25}
        />
        <button
          onClick={() => setInputValue(inputValue + "7")}
          className={`${buttonClassNames} row-start-2`}
        >
          7
        </button>
        <button
          onClick={() => setInputValue(inputValue + "8")}
          className={`${buttonClassNames} row-start-2`}
        >
          8
        </button>
        <button
          onClick={() => setInputValue(inputValue + "9")}
          className={`${buttonClassNames} row-start-2`}
        >
          9
        </button>
        <button
          onClick={() => setInputValue(inputValue + "4")}
          className={`${buttonClassNames} col-start-1 row-start-3`}
        >
          4
        </button>
        <button
          onClick={() => setInputValue(inputValue + "5")}
          className={`${buttonClassNames} col-start-2 row-start-3`}
        >
          5
        </button>
        <button
          onClick={() => setInputValue(inputValue + "6")}
          className={`${buttonClassNames} col-start-3 row-start-3`}
        >
          6
        </button>
        <button
          onClick={() => setInputValue(inputValue + "1")}
          className={`${buttonClassNames} col-start-1 row-start-4`}
        >
          1
        </button>
        <button
          onClick={() => setInputValue(inputValue + "2")}
          className={`${buttonClassNames} col-start-2 row-start-4`}
        >
          2
        </button>
        <button
          onClick={() => setInputValue(inputValue + "3")}
          className={`${buttonClassNames} col-start-3 row-start-4`}
        >
          3
        </button>
        <button
          onClick={() => setInputValue("")}
          className={`${yellowButtonClassNames} col-start-1 row-start-5`}
        >
          <img src="./public/icons/IcoC.svg" draggable="false" />
        </button>
        <div
          onClick={() => setInputValue(inputValue + "0")}
          className={`${buttonClassNames} col-start-2 row-start-5`}
        >
          0
        </div>
        <div
          onClick={() => setInputValue(evaluateExpression(inputValue))}
          className={`${darkBlueButtonClassNames} col-start-3 row-start-5`}
        >
          <img src="./public/icons/IcoEqual.svg" draggable="false" />
        </div>
        <div
          onClick={() => setInputValue(inputValue + "+")}
          className={`${blueButtonClassNames} col-start-4 row-start-2`}
        >
          <img src="./public/icons/IcoPlus.svg" draggable="false" />
        </div>
        <div
          onClick={() => setInputValue(inputValue + "-")}
          className={`${blueButtonClassNames} col-start-4 row-start-3`}
        >
          <img src="./public/icons/IcoMinus.svg" draggable="false" />
        </div>
        <div
          onClick={() => setInputValue(inputValue + "÷")}
          className={`${blueButtonClassNames} col-start-4 row-start-4`}
        >
          <img src="./public/icons/IcoDivide.svg" draggable="false" />
        </div>
        <div
          onClick={() => setInputValue(inputValue + "×")}
          className={`${blueButtonClassNames} row-start-5`}
        >
          <img
            src="./public/icons/IcoPlus.svg"
            draggable="false"
            className="rotate-45 scale-125"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
