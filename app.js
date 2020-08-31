const display = document.querySelector(".input-display");
let operatorInUse, op1, op2, previousString
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2) {
    return num1 / num2;
  } else {
    return `ERROR`;
  }
}
function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case "+": result = add(num1, num2); break;
    case "-": result = subtract(num1, num2); break;
    case "x": result = multiply(num1, num2); break;
    case "÷": result = divide(num1, num2); break;
  }
  op1 = result;
  return result === Math.floor(result) ? result : result.toFixed(2)
}
function numberPressed() {
  const button = document.querySelectorAll(".button");
  button.forEach((button) => {
    button.addEventListener("click", function () {
      if (display.textContent === "0") display.textContent = "";
      display.textContent += button.textContent;
    });
  });
}
function operatorPressed() {
  const operator = document.querySelectorAll(".operator");
  operator.forEach((operator) => {
    operator.addEventListener("click", function (e) {
      if (typeof (op1) !== 'number') {
        display.textContent += e.target.textContent
        operatorInUse = e.target.textContent
        op1 = +display.textContent.slice(0, display.textContent.indexOf(operatorInUse))
      }
      if (typeof (op1) === 'number' && display.textContent.slice(display.textContent.indexOf(operatorInUse) + 1).length > 0) {
        op2 = +display.textContent.slice(display.textContent.indexOf(operatorInUse) + 1)
      } else {
        operatorInUse = e.target.textContent
        display.textContent = `${op1}${operatorInUse}`
      }
      if (typeof (op1) === 'number' && typeof (op2) === 'number') {
        updateHistory()
        display.textContent = `${op1.toFixed(2)}`
        operatorInUse = e.target.textContent
        display.textContent += e.target.textContent
        op2 = ''
      }
    });
  });
};
function updateHistory(e) {
  previousString = `${op1} ${operatorInUse} ${op2} = ${operate(operatorInUse, op1, op2)}`
  const history = document.querySelector(".history");
  const newP = document.createElement("p");
  newP.style.cssText = "padding: 0.1em 0.2em";
  newP.textContent = `${previousString}`;
  history.appendChild(newP);
}
numberPressed();
operatorPressed();
