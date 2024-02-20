const MAX_DIGITS_IN_DECIMAL_NUMBER = 14; // Max string length (15) minus the decimal point

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
let inErrorState = false;

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
    if (inErrorState) {
        return;
    }
    
    if (resetScreenOnNextButtonPress) {
        divScreen.textContent = event.target.textContent;
        resetScreenOnNextButtonPress = false;
    } else {
        divScreen.textContent += event.target.textContent;
    }
}

function handleOperatorButtonPress(event) {
    if (inErrorState) {
        return;
    }
    
    if (operator !== undefined && operator !== null && operator !== "") {
        num2 = divScreen.textContent;
        num1 = roundNumberForDisplay(operate(+num1, +num2, operator));
        divScreen.textContent = num1;
        num2 = 0;
        setErrorState();
    } else {
        num1 = divScreen.textContent;
    }
    operator = event.target.textContent;
    resetScreenOnNextButtonPress = true;
}

function handleEqualsButtonPress(event) {
    if (inErrorState) {
        return;
    }

    num2 = divScreen.textContent;
    divScreen.textContent = roundNumberForDisplay(operate(+num1, +num2, operator));
    num1 = 0;
    num2 = 0;
    operator = "";
    resetScreenOnNextButtonPress = true;
    setErrorState();
}

function handleClearButtonPress(event) {
    num1 = 0;
    num2 = 0;
    operator = "";
    divScreen.textContent = "0";
    resetScreenOnNextButtonPress = true;
    setErrorState();
}

function setErrorState() {
    inErrorState = isNaN(divScreen.textContent);
}

function roundNumberForDisplay(number) {
    
    if (number > 999999999999999) {
        return "ERROR";
    }

    if (Number.isInteger(number)) {
        return number;
    }

    let numberWholeAndDecimalPieces = number.toString().split(".");
    let wholeNumberLength = numberWholeAndDecimalPieces[0].length;
    let decimalNumberLength = numberWholeAndDecimalPieces[1].length;

    if (wholeNumberLength + decimalNumberLength > MAX_DIGITS_IN_DECIMAL_NUMBER) {
        let decimalPlacesAllowed = MAX_DIGITS_IN_DECIMAL_NUMBER - wholeNumberLength;
        let multiplicationFactor = 1;
        for (let i = 0; i < decimalPlacesAllowed; i++) {
            multiplicationFactor *= 10;
        }
    
        return Math.round(number * multiplicationFactor) / multiplicationFactor
    }

    return number;
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