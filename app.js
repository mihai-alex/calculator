const MAX_NUM_DIGITS = 13;
const MAX_SCIENTIFIC_NOTATION = 6

let currentExpression = {
    previousOperand: 0,
    operator: null,
    currentOperand: 0,
    existingEquals: false,
    resetOutput: false
};

function resetCurrentExpression() {
    currentExpression.previousOperand = 0;
    currentExpression.operator = null;
    currentExpression.currentOperand = 0;
    currentExpression.existingEquals = false;
    currentExpression.resetOutput = false;
}

function updateOutputDigits(text) {
    const output = document.getElementById("result");
    if (output.textContent === '0' || currentExpression.resetOutput !== false) {
        currentExpression.resetOutput = false;
        output.textContent = '';
    }

    if (output.textContent.length < MAX_NUM_DIGITS) {
        output.textContent += text;
    }
    const operand = parseFloat(output.textContent);

    if (currentExpression.operator === null) {
        currentExpression.previousOperand = operand;
    }
    else if (currentExpression.existingEquals === true) {
        currentExpression.previousOperand = operand;
        currentExpression.operator = null;
        currentExpression.currentOperand = 0;
        currentExpression.existingEquals = false;
    }
    else {
        currentExpression.currentOperand = operand;
    }
}

function addAllEvents() {
    window.addEventListener('keydown', keyEventHandler);
    addOperandEvents();
    addEqualsEvent();
    addModuloEvent();
    addDivisionEvent();
    addMultiplicationEvent();
    addSubtractionEvent();
    addAdditionEvent();
    addPlusMinusEvent();
    addCommaEvent();
    addBackspaceEvent();
    addAllClearEvent();
}

function addOperandEvents() {
    const operands = document.querySelectorAll(".operand");
    operands.forEach(operand => operand.addEventListener("click", operandEventsHandler));
}

function operandEventsHandler(event) {
    updateOutputDigits(event.target.id);
}

function addEqualsEvent() {
    document
        .getElementById("equals")
        .addEventListener("click", equalsEventHandler);
}

function equalsEventHandler() {
    let result = NaN;
    if (currentExpression.operator) {
        let previousOperand = currentExpression.previousOperand;
        let currentOperand = currentExpression.currentOperand;
        if (isInScientificNotation(previousOperand) === true) {
            previousOperand = convertFromScientificNotation(previousOperand);
        }
        if (isInScientificNotation(currentOperand) === true) {
            currentOperand = convertFromScientificNotation(currentOperand);
        }
        previousOperand = parseFloat(previousOperand);
        currentOperand = parseFloat(currentOperand);
        switch (currentExpression.operator) {
            case "%":
                // TODO: implement modulo functionality
                break;
            case '/':
                if (currentOperand === 0) {
                    // TODO: display error - division by 0!
                    alert("Division by 0!");
                }
                result = previousOperand / currentOperand;
                break;
            case '*':
                result = previousOperand * currentOperand;
                break;
            case '-':
                result = previousOperand - currentOperand;
                break;
            case '+':
                result = previousOperand + currentOperand;
                break;
            case null:
                return;
            default:
                break;
        }
    }
    currentExpression.existingEquals = true;
    if (result.toString().length > MAX_NUM_DIGITS) {
        if (Math.floor(result) != result) {
            result = result.toString().substring(0, MAX_NUM_DIGITS);
        }
        else {
            result = result.toExponential(MAX_SCIENTIFIC_NOTATION);
        }
    }
    updateOutputDigits(result);
}

function isInScientificNotation(number) {
    return number.toString().includes('e');
}

function convertFromScientificNotation(number) {
    return number.toLocaleString("fullwide", { useGrouping: false });
}

function addModuloEvent() {
    document
        .getElementById("modulo")
        .addEventListener("click", moduloEventHandler);
}

function moduloEventHandler() {
    currentExpression.operator = '%';
}

function addDivisionEvent() {
    document
        .getElementById("division")
        .addEventListener("click", divisionEventHandler);
}

function divisionEventHandler() {
    currentExpression.operator = '/';
}

function addMultiplicationEvent() {
    document
        .getElementById("multiplication")
        .addEventListener("click", multiplicationEventHandler);
}

function multiplicationEventHandler() {
    currentExpression.operator = '*';
}

function addSubtractionEvent() {
    document
        .getElementById("subtraction")
        .addEventListener("click", subtractionEventHandler);
}

function subtractionEventHandler() {
    currentExpression.operator = '-';
}

function addAdditionEvent() {
    document
        .getElementById("addition")
        .addEventListener("click", additionEventHandler);

}

function additionEventHandler() {
    currentExpression.operator = '+';
}

function addPlusMinusEvent() {
    document
        .getElementById("plus-minus")
        .addEventListener("click", plusMinusEventHandler);
}

function plusMinusEventHandler() {
    const output = document.getElementById("result");
    if (output.textContent[0] === '-') {
        output.textContent = output.textContent.slice(1);
    } else if (output.textContent[0] !== '0' || output.textContent.length >= 2) {
        output.textContent = '-' + output.textContent;
    }

    if (currentExpression.currentOperand !== 0) {
        currentExpression.currentOperand = -currentExpression.currentOperand;
    }
    else if (currentExpression.previousOperand !== 0) {
        currentExpression.previousOperand = -currentExpression.previousOperand;
    }
}

function addCommaEvent() {
    document
        .getElementById("comma")
        .addEventListener("click", commaEventHandler);
}

function commaEventHandler() {
    const output = document.getElementById("result");
    if (output.textContent.length < MAX_NUM_DIGITS && output.textContent.search(/\./) === -1) {
        output.textContent += '.';
    }
}

function addBackspaceEvent() {
    document
        .getElementById("backspace")
        .addEventListener("click", backspaceEventHandler);
}

function removeLastDigitAfterComma(number) {
    number = parseFloat(number.toString().slice(0, -1));
    return number;
}

function removeLastDigit(number) {
    if (Math.floor(number) !== number) {
        number = removeLastDigitAfterComma(number);
    }
    else {
        number /= 10;
    }
    return number;
}

function backspaceEventHandler() {
    const output = document.getElementById("result");
    output.textContent = output.textContent.slice(0, -1);
    if (output.textContent.length === 2 && output.textContent === "-0") {
        output.textContent = '0';
    } else if (output.textContent.length === 1 && output.textContent === "-") {
        output.textContent = '0';
    } else if (output.textContent.length === 0) {
        output.textContent = '0';
    }

    if (currentExpression.currentOperand) {
        currentExpression.currentOperand = removeLastDigit(currentExpression.currentOperand);
    }
    else if (currentExpression.previousOperand) {
        currentExpression.previousOperand = removeLastDigit(currentExpression.previousOperand);
    }
}

function addAllClearEvent() {
    document
        .getElementById("all-clear")
        .addEventListener("click", allClearEventHandler);
}

function allClearEventHandler() {
    const output = document.getElementById("result");
    output.textContent = '0';
    resetCurrentExpression();
}

function keyEventClick(key) {
    const button = document.getElementById(key);
    button.click();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 90);
}

function compoundOperatorEquals() {
    if (currentExpression.operator && currentExpression.previousOperand) {
        currentExpression.resetOutput = true;
        document.getElementById("equals").click();
    }
}

function keyEventHandler(event) {
    const key = event.key;
    switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            keyEventClick(key);
            break;
        case '=':
            currentExpression.resetOutput = true;
            keyEventClick("equals");
            break;
        case '%':
            compoundOperatorEquals();
            currentExpression.resetOutput = true;
            keyEventClick("modulo");
            break;
        case '/':
            compoundOperatorEquals();
            currentExpression.resetOutput = true;
            keyEventClick("division");
            break;
        case '*':
            compoundOperatorEquals();
            currentExpression.resetOutput = true;
            keyEventClick("multiplication");
            break;
        case '-':
            compoundOperatorEquals();
            currentExpression.resetOutput = true;
            keyEventClick("subtraction");
            break;
        case '+':
            compoundOperatorEquals();
            currentExpression.resetOutput = true;
            keyEventClick("addition");
            break;
        case 'n':
            keyEventClick("plus-minus");
            break;
        case ',':
        case '.':
            keyEventClick("comma");
            break;
        case "Backspace":
            keyEventClick("backspace");
            break;
        case "Delete":
        case "Escape":
            keyEventClick("all-clear");
            break;
        default:
            break;
    }
}

function run() {
    addAllEvents();
}

window.onload = run;
