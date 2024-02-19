const btn0 = document.querySelector("#btn0");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
const btnDecimal = document.querySelector("#btnDecimal");
const btnAdd = document.querySelector("#btnAdd");
const btnSubtract = document.querySelector("#btnSubtract");
const btnMultiply = document.querySelector("#btnMultiply");
const btnDivide = document.querySelector("#btnDivide");
const btnClear = document.querySelector("#btnClear");
const btnEquals = document.querySelector("#btnEquals");

const divScreen = document.querySelector("#divScreen");

let resetScreenOnNextButtonPress = true;

let num1 = 0;
let num2 = 0;
let operator = "";

addEventHandlers();

function addEventHandlers() {
    btn0.addEventListener("click", handleNumberButtonPress);
    btn1.addEventListener("click", handleNumberButtonPress);
    btn2.addEventListener("click", handleNumberButtonPress);
    btn3.addEventListener("click", handleNumberButtonPress);
    btn4.addEventListener("click", handleNumberButtonPress);
    btn5.addEventListener("click", handleNumberButtonPress);
    btn6.addEventListener("click", handleNumberButtonPress);
    btn7.addEventListener("click", handleNumberButtonPress);
    btn8.addEventListener("click", handleNumberButtonPress);
    btn9.addEventListener("click", handleNumberButtonPress);
    btnDecimal.addEventListener("click", handleNumberButtonPress);

    btnAdd.addEventListener("click", handleOperatorButtonPress);
    btnSubtract.addEventListener("click", handleOperatorButtonPress);
    btnMultiply.addEventListener("click", handleOperatorButtonPress);
    btnDivide.addEventListener("click", handleOperatorButtonPress);

    btnEquals.addEventListener("click", handleEqualsButtonPress);

    btnClear.addEventListener("click", handleClearButtonPress);
}

function handleNumberButtonPress(event) {
    if (resetScreenOnNextButtonPress) {
        divScreen.textContent = event.target.textContent;
        resetScreenOnNextButtonPress = false;
    } else {
        divScreen.textContent += event.target.textContent;
    }
}

function handleOperatorButtonPress(event) {
    num1 = divScreen.textContent;
    operator = event.target.textContent;
    resetScreenOnNextButtonPress = true;
}

function handleEqualsButtonPress(event) {
    num2 = divScreen.textContent;
    divScreen.textContent = operate(+num1, +num2, operator);
    resetScreenOnNextButtonPress = true;
}

function handleClearButtonPress(event) {
    num1 = 0;
    num2 = 0;
    operator = "";
    divScreen.textContent = "0";
    resetScreenOnNextButtonPress = true;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        default:
            return divide(num1, num2);
            break;
    }
}

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
    return num1 / num2;
}