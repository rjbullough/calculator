const display = document.querySelector(".input-display");
const history = document.querySelector(".history");
const numberButton = document.querySelectorAll(".button");
const operatorButton = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear")
const negPos = document.querySelector('#negative-positive')
const backspace = document.querySelector("#backspace")
let operationMemory = [0];
let enableDecimal = true;
function calc(num1, num2, operator) {
  num1 = Number.parseFloat(num1);
  num2 = Number.parseFloat(num2);
  const calculations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "÷": (a, b) => (b ? a / b : "ERROR"), // divide by zero logic
  };
  operationMemory[0] = calculations[operator](num1, num2);
  // trim to 2 decimal places
  if (operationMemory[0] >= Math.floor(operationMemory[0])) {
    operationMemory[0] = operationMemory[0].toFixed(2)
  }
  operationMemory[2] = undefined;
  enableDecimal = false;
}
function updateDisplay(e) {
  // prevent a leading 0 
  if (display.textContent === '0') display.textContent = ''
  // prevent additional decimals after a calculation
  if (e.target.textContent !== '.' && operationMemory[1] !== '=') display.textContent += `${e.target.textContent}`;
  // allow a single decimal for the current input
  if (e.target.textContent === '.' && enableDecimal) {
    display.textContent += `${e.target.textContent}`;
    enableDecimal = false;
  } else if (e.target.textContent === '.' && !enableDecimal) {
    display.textContent
  }
  // store as first operand if we haven't used an operator 
  if (!operationMemory[1]) {
    operationMemory[0] = display.textContent;
  }
  // store as second operand if we have used an operator
  if ((typeof operationMemory[0] === "number" || typeof operationMemory[0] === "string") && (operationMemory[1] && operationMemory[1] !== '=')) {
    operationMemory[2] = display.textContent.slice(display.textContent.indexOf(operationMemory[0]) + operationMemory[0].length + 3)
  }
}
function operatorPressed(f) {
  // run a calculation if we have 2 operands
  if (typeof operationMemory[2] === "string" && operationMemory[2] !== '.') {
    updateHistory()
    calc(operationMemory[0], operationMemory[2], operationMemory[1]);
    addResultToHistory()
  }
  operationMemory[1] = f.target.textContent;
  // allow changing operators using current input
  if (operationMemory[1] === "=") {
    display.textContent = `${operationMemory[0]} `
  } else {
    display.textContent = `${operationMemory[0]} ${operationMemory[1]} `;
    enableDecimal = true;
  }
}
function updateHistory() {
  // add current string to history panel
  const newP = document.createElement("p");
  newP.style.cssText = "padding: 0.1em 0.2em";
  newP.textContent = display.textContent;
  history.appendChild(newP);
}
function addResultToHistory() {
  // appends last history string with the result of the equation
  history.lastChild.textContent += ` = ${operationMemory[0]}`
}
function clearAll() {
  history.innerHTML = '';
  operationMemory = [0];
  enableDecimal = true;
  display.textContent = '0'
}
function negativePositive() {
  let operator
  let str = display.textContent
  // allow changing from negative to positive when operand 1 is already negative
  if (operationMemory[1]) operator = str.slice(str.indexOf(operationMemory[0]) + operationMemory[0].length + 3)
  // logic for changing operand 2
  if (operationMemory[2] && operator.charAt(0) === '-') {
    operator = operator.slice(1)
    operationMemory[2] = operator
    display.textContent = `${operationMemory[0]} ${operationMemory[1]} ${operationMemory[2]}`
  } else if (operationMemory[2] && operator.charAt(0) !== '-') {
    operator = `-${operator}`
    operationMemory[2] = operator
    display.textContent = `${operationMemory[0]} ${operationMemory[1]} ${operationMemory[2]}`
  }
  // logic for changing operand 1
  if (str.charAt(0) === '-' && !operationMemory[2] && !operationMemory[1]) {
    str = str.slice(1)
    operationMemory[0] = str
  } else if (str.charAt(0) !== '-' && !operationMemory[2] && !operationMemory[1]) {
    str = `-${str}`
    display.textContent = str
    operationMemory[0] = str
  }
}
numberButton.forEach((button) => {
  button.addEventListener("click", updateDisplay);
});
operatorButton.forEach((operator) => {
  operator.addEventListener("click", operatorPressed);
});
clearButton.addEventListener("click", clearAll)
negPos.addEventListener("click", negativePositive)