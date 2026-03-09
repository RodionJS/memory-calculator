import { create, all } from "mathjs";

export const filterInput = (input: string): string => {
  let value = input;
  if (!value) return value;

  const lastChar = value[value.length - 1];
  const prevChar = value[value.length - 2];

  if (lastChar === "E") return value.slice(0, -1) + "e";
  if (lastChar === "*") return value.slice(0, -1) + "×";
  if (lastChar === ".") return value.slice(0, -1) + ",";
  if (lastChar === "/" || lastChar === ":") return value.slice(0, -1) + "÷";

  const allowedPattern = /^[0-9,+\-×÷e()]*$/i;
  if (!allowedPattern.test(value)) return value.slice(0, -1);

  // AUTO-INSERT MULTIPLICATION BEFORE "("
  if (lastChar === "(" && (/[0-9)]/.test(prevChar) || prevChar?.toLowerCase() === "e")) {
    value = value.slice(0, -1) + "×(";
  }

  // AUTO-INSERT MULTIPLICATION BEFORE DIGIT AFTER ")"
  if (/[0-9]/.test(lastChar) && prevChar === ")") {
    value = value.slice(0, -1) + "×" + lastChar;
  }

  const currentLastChar = value[value.length - 1];
  const currentPrevChar = value[value.length - 2];

  const lastNum: string = value.split(/(?<!e)[+\-×÷()]/i).pop() || "";

  if (
    value.length === 1 &&
    !(/[0-9(]/.test(currentLastChar))
  ) {
    return "";
  }

  const openCount = (value.match(/\(/g) ?? []).length;
  const closeCount = (value.match(/\)/g) ?? []).length;

  // DISALLOW EXTRA CLOSING PARENTHESIS
  if (currentLastChar === ")" && closeCount > openCount) {
    return value.slice(0, -1);
  }

  // DISALLOW EMPTY PARENTHESES
  if (currentLastChar === ")" && currentPrevChar === "(") {
    return value.slice(0, -1);
  }

  // "(" CAN ONLY BE AFTER OPERATOR OR ANOTHER "(" OR AT START
  if (currentLastChar === "(" && value.length > 1) {
    if (!/[+\-×÷(]/.test(currentPrevChar)) {
      return value.slice(0, -1);
    }
  }

  // ")" CAN ONLY BE AFTER DIGIT OR ")"
  if (currentLastChar === ")") {
    if (!/[0-9)]/.test(currentPrevChar)) {
      return value.slice(0, -1);
    }
  }

  if (currentLastChar.toLowerCase() === "e") {
    if (!/[0-9]/.test(currentPrevChar)) return value.slice(0, -1);
    if ((lastNum.match(/e/gi) ?? []).length > 1) return value.slice(0, -1);
  }

  if (currentPrevChar?.toLowerCase() === "e") {
    if (!(currentLastChar === "+" || currentLastChar === "-" || /[0-9]/.test(currentLastChar))) {
      return value.slice(0, -1);
    }
  }

  const isOpOrComma = /[+\-×÷,]/.test(currentLastChar);
  if (isOpOrComma) {
    const allowSignAfterE =
      (currentLastChar === "+" || currentLastChar === "-") &&
      currentPrevChar?.toLowerCase() === "e";

    if (!allowSignAfterE && !(/[0-9)]/.test(currentPrevChar))) {
      return value.slice(0, -1);
    }
  }

  if (currentLastChar === ",") {
    const commas = (lastNum.match(/,/g) ?? []).length;
    if (commas > 1) return value.slice(0, -1);
    if (lastNum.toLowerCase().includes("e")) return value.slice(0, -1);
    if (!/[0-9]/.test(currentPrevChar)) return value.slice(0, -1);
  }

  if (currentLastChar === "0") {
    if (/^0[0-9]/.test(lastNum)) return value.slice(0, -1);
  }

  return value;
};

const math = create(all, {
  number: "BigNumber",
  precision: 64,
});

export const evaluateExpression = (input: string): string => {
  try {
    const expr = input
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/,/g, ".");

    const result = math.evaluate(expr);
    const x = math.bignumber(result);

    let out = x.toString();

    if (out.length > 20) {
      out = math.format(x, { notation: "exponential", precision: 10 });
    }

    out = out.replace("e+", "e").replace(".", ",");

    return out;
  } catch {
    return "Error";
  }
};

// MAKE TEXT SMALLER TO FIT MORE SYMBOLS
export const adjustFontSize = (input: string): string => {
  if (input.length > 22) return "text-4xl h-4/5 pr-2";
  if (input.length > 18) return "text-4xl h-4/5 pr-3";
  if (input.length > 14) return "text-5xl h-5/6 pr-4";
  if (input.length > 10) return "text-6xl h-11/12 pr-5";
  return "text-7xl h-full pr-10";
};

//REDUCE MAX LENGTH FOR MULTIPLE OPERATORS INPUT, MAKE LENGTH 1 SYMBOL SHORTER FOR EVERY SECOND OPERATOR
/* export const adjustLength = (input: string): number => {
  let length = 23;
  let isSecondOperator: boolean = false;
  for (let i = 0; i < input.length; i++) {
    if (["+", "-", "×", "÷"].includes(input[i])) {
      if (isSecondOperator) {
        length -= 1;
        isSecondOperator = false;
      } else {
        isSecondOperator = true;
      }
    }
  }
  return length;
}; */
