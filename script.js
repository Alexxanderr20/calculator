const screen = document.querySelector('#screen');

// Obtain references to buttons/keys
const allClearKey = document.querySelector('.allClear');
const deleteKey = document.querySelector('.deleteKey');

const numberKey = document.querySelectorAll('.numberKey');
const operatorKey = document.querySelectorAll('.operatorKey');

const decimalKey = document.querySelector('.decimalKey');
const equalKey = document.querySelector('.equalKey');

let value;

let numberKeyPressed = false;
let operatorKeyPressed = false;
let equalKeyPressed;

let numString = '';
let num1;
let num2;

let currentOperator;

function getNumber() {
    for (let i = 0; i < numberKey.length; i++) {
        numberKey[i].addEventListener('click', (e) => {
            const maxStringLength = 13;
            // Get num1
            if (numString.length < maxStringLength && operatorKeyPressed === false) {
                numString += numberKey[i].textContent;
                screen.textContent = numString;
                num1 = numString;
                console.log(`num1 = ${num1}`);
            // Get num2
            } else if (numString.length < maxStringLength && operatorKeyPressed === true) {
                numString += numberKey[i].textContent;
                console.log(numString);
                screen.textContent = numString;
                num2 = numString;
                console.log(`num2 = ${num2}`);
            }
            // Get decimal
            if (numString === '.' || numString.includes('.')) {
                numberKey[10].disabled = true;
            } else {
                numberKey[10].disabled = false;
            }
            numberKeyPressed = true;
            equalKeyPressed = false;
        });
    }
}

function getOperator() {
    for (let i = 0; i < operatorKey.length; i++) {
        operatorKey[i].addEventListener('click', (e) => {
            // Get operator
            if (numberKeyPressed === true && num2 === undefined) {
                currentOperator = operatorKey[i].textContent;
                console.log(`Conditional 1: ${currentOperator}`);
                operatorKeyPressed = true;
                numberKeyPressed = false;
            }
            // Get operator if user strings together multiple values
            if (num1 !== undefined && num2 !== undefined && operatorKeyPressed === true) {
                const tempValue = operate(num1, num2, currentOperator);
                screen.textContent = "= " + tempValue.toString().slice(0, 13);
                currentOperator = operatorKey[i].textContent;
                console.log(`Conditional 2: ${currentOperator}`);
                // Store calculated value in num1
                num1 = tempValue;
                num2 = undefined;
            }
            numString = '';
        });
    }
}

function operate(x, y, opr) {
    if (opr == "/" && x == 0 || opr == "/" && y == 0) {
        clearCalculator();
        return "Error";
    }
    switch (opr) {
        case "/":
            return x / y;
            break;
        case "*":
            return x * y;
            break;
        case "+":
            return +x + +y;
            break;
        case "-":
            return x - y;
            break;
    }
}

function pressEqualKey() {
    // Perform calculation when "=" key is pressed
    equalKey.addEventListener('click', (e) => {
        // Key can only be pressed once after calculation
        if (operatorKeyPressed === true && equalKeyPressed === false && num1 !== undefined && num2 !== undefined) {
            value = operate(num1, num2, currentOperator);
            screen.textContent = "= " + value.toString().slice(0, 13);
            console.log(value);
            if (value > 100000000000) {
                return screen.textContent = "Value too large!";
            }
            equalKeyPressed = true; // disable "=" key
        }
        numString = '';
        numString = '';
    });
}

function clearCalculator() {
    numString = '';
    numString = '';
    numberKeyPressed = false;
    operatorKeyPressed = false;
    equalKeyPressed = undefined;
    num1 = undefined;
    num2 = undefined;
    screen.textContent = '';
}

function deleteChar() {
    deleteKey.addEventListener('click', (e) => {
        // Detele char for num1
        if (operatorKeyPressed === false) {
            numString = numString.replace(/.$/,"");
            screen.textContent = numString;
            num1 = numString;
        // Delete char for num2
        } else if (operatorKeyPressed === true) {
            numString = numString.replace(/.$/,"");
            screen.textContent = numString;
            num2 = numString;
        }
    });
}

function pressAllClearKey() {
    allClearKey.addEventListener('click', (e) => {
        console.log(`You cleared the calculator using the "All Clear" button!`);
        return clearCalculator();
    });
}

function performCalculation() {
    getNumber();
    getOperator();
    pressEqualKey();
    deleteChar();
    pressAllClearKey();
}

performCalculation();

// To do List:
// (1) Add decimal functionality
// (2) Add delete char functionality
// (3) Add responsive feedback when button pressed (button flash)