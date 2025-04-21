const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");

let currentInput = "0";
let previousInput = "";
let operator = "";
let justEvaluated =false;

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];

  button.addEventListener("click", function () {
    const value = button.textContent;

    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (currentInput ==="0" || justEvaluated) {
          currentInput = value;
          justEvaluated = false;
        } else {
          currentInput = `${currentInput}${value}`;
        }
        updateDisplay();
        break;
      case ".":
        if (!currentInput.includes(".")) {
          currentInput += value;
          updateDisplay();
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        calculateOrReAssign(value);
        break;

      case "%":
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay();
        break;
      case "+/-":
        currentInput = (-parseFloat(currentInput)).toString();
        updateDisplay();
        break;

      case "AC":
        operator = "";
        previousInput = "";
        currentInput = "0";
        updateDisplay();
        break;

      case "=":
        if (!currentInput || !operator){
          return;
        }
        calculate();
        updateDisplay();
        previousInput = "";
        operator = "";
        break;
    }
  });
}
function calculateOrReAssign(value) {
  if (operator && previousInput) {
    calculate();
  }
  operator = value === "x" ? "*" : value;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  try {
    const result = eval(
      `${parseFloat(previousInput)}${operator}${parseFloat(currentInput)}`
    );
    currentInput = String(Math.round(result * 1e10) / 1e10);
  } catch (e) {
    currentInput = "Error";
  }
}

function updateDisplay() {
  display.value = currentInput;
}
