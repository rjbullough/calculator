const display = document.querySelector(".input-display");
const numberButton = document.querySelectorAll(".button");
const operatorButton = document.querySelectorAll(".operator");
let operationMemory = [];
let regex = /[\+\-\*\÷]/g;
function calc(num1, num2, operator) {
  num1 = Number.parseFloat(num1);
  num2 = Number.parseFloat(num2);
  const calculations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "÷": (a, b) => (b ? a / b : "ERROR"),
  };
  operationMemory[0] = calculations[operator](num1, num2);
  operationMemory[2] = undefined;
  return operationMemory[0] === "ERROR"
    ? "ERROR"
    : Math.floor(operationMemory[0])
      ? operationMemory[0]
      : operationMemory[0].toFixed(2);
}
function updateDisplay(e) {
  if (display.textContent === "0") display.textContent = "";
  display.textContent += `${e.target.textContent}`;
  if (!operationMemory[1]) operationMemory[0] = display.textContent;
  if ((typeof operationMemory[0] === "number" || typeof operationMemory[0] === "string") && operationMemory[1]) {
    operationMemory[2] = display.textContent.slice(display.textContent.indexOf(operationMemory[1]) + 2);
  }
}
function operatorPressed(f) {
  if (typeof operationMemory[2] === "string") {
    updateHistory()
    calc(operationMemory[0], operationMemory[2], operationMemory[1]);
    addResultToHistory()
  }
  operationMemory[1] = f.target.textContent;
  operationMemory[1] === "="
    ? (display.textContent = `${operationMemory[0]} `)
    : (display.textContent = `${operationMemory[0]} ${operationMemory[1]} `);
}
function updateHistory() {
  const history = document.querySelector(".history");
  const newP = document.createElement("p");
  newP.style.cssText = "padding: 0.1em 0.2em";
  newP.textContent = display.textContent;
  history.appendChild(newP);
}
function addResultToHistory() {
  const history = document.querySelector(".history");
  history.lastChild.textContent += ` = ${operationMemory[0]}`
}
numberButton.forEach((button) => {
  button.addEventListener("click", updateDisplay);
});
operatorButton.forEach((operator) => {
  operator.addEventListener("click", operatorPressed);
});
