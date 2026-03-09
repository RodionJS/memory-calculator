import { create, all } from "mathjs";

export const filterInput = (input: string): string => {
  let value = input;
  if (!value) return value;

  const lastChar = value[value.length - 1];
  const prevChar = value[value.length - 2];

  if (lastChar === "\n") return evaluateExpression(value.slice(0, -1));

  if (lastChar === "E") return value.slice(0, -1) + "e";

  const lastNum: string = value.split(/(?<!e)[+\-×÷]/i).pop() || "";

  if (lastChar === "*") return value.slice(0, -1) + "×";
  if (lastChar === ".") return value.slice(0, -1) + ",";
  if (lastChar === "/" || lastChar === ":") return value.slice(0, -1) + "÷";

  const allowedPattern = /^[0-9,+\-×÷e]*$/i;
  if (!allowedPattern.test(value)) return value.slice(0, -1);

  if (value.length === 1 && !/[0-9]/.test(lastChar)) return "";

  if (lastChar.toLowerCase() === "e") {
    if (!/[0-9]/.test(prevChar)) return value.slice(0, -1);
    if ((lastNum.match(/e/gi) ?? []).length > 1) return value.slice(0, -1);
  }

  if (prevChar?.toLowerCase() === "e") {
    if (!(lastChar === "+" || lastChar === "-" || /[0-9]/.test(lastChar))) {
      return value.slice(0, -1);
    }
  }

  const isOpOrComma = /[+\-×÷,]/.test(lastChar);
  if (isOpOrComma) {
    const allowSignAfterE =
      (lastChar === "+" || lastChar === "-") && prevChar?.toLowerCase() === "e";

    if (!allowSignAfterE && !/[0-9]/.test(prevChar)) {
      return value.slice(0, -1);
    }
  }

  if (lastChar === ",") {
    const commas = (lastNum.match(/,/g) ?? []).length;
    if (commas > 1) return value.slice(0, -1);
    if (lastNum.toLowerCase().includes("e")) return value.slice(0, -1);
  }

  if (lastChar === "0") {
    // DISALLOW LEADING ZEROES LIKE "00" OR "012" (BUT ALLOW SINGLE "0" OR "0,")
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
    const expr = input.replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, ".");

    const result = math.evaluate(expr);
    const x = math.bignumber(result);

    // NORMAL NUMBER REPRESENTATION
    let out = x.toString();

    // SWITCH TO SCIENTIFIC ONLY IF STRING TOO LONG
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
  if (input.length > 22) return "text-5xl h-4/5 pr-4";
  if (input.length > 19) return "text-5xl h-4/5 pr-6";
  if (input.length > 15) return "text-6xl h-5/6 pr-8";
  if (input.length > 10) return "text-7xl h-11/12 pr-10";
  return "text-8xl h-full pr-10";
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
