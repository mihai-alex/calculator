const MAX_NUM_DIGITS = 13;
const MAX_SCIENTIFIC_NOTATION = 6
const ERROR_DIVISION_BY_ZERO = "Can't divide by 0!";

let currentExpression = {
    firstOperand: 0,
    operator: null,
    secondOperand: null,
    emptyDisplayFlag: false,
    previouslyPressedEquals: false,
    lastOperator: null,
    lastSecondOperand: null,
};

function resetCurrentExpression() {
    currentExpression.firstOperand = null;
    currentExpression.operator = null;
    currentExpression.secondOperand = null;
    currentExpression.emptyDisplayFlag = false;
    currentExpression.previouslyPressedEquals = false;
    currentExpression.lastOperator = null;
    currentExpression.lastSecondOperand = null;
}

function updateHistory() {
    let expression = "";
    if (currentExpression.firstOperand !== null) {
        expression += currentExpression.firstOperand + ' ';
        if (currentExpression.operator !== null) {
            expression += currentExpression.operator + ' ';
            if (currentExpression.secondOperand !== null) {
                expression += currentExpression.secondOperand + ' ';
                if (currentExpression.previouslyPressedEquals !== null) {
                    expression += '= ';
                }
            }
        }
    }
    const history = document.getElementById("history");
    history.textContent = expression;
}

function updateOutputDigits(text) {
    if (currentExpression.firstOperand === null) {
        updateHistory();
    }
    const output = document.getElementById("result");
    if (output.textContent === '0' ||
        currentExpression.emptyDisplayFlag ||
        currentExpression.previouslyPressedEquals) {
        output.textContent = '';
        currentExpression.emptyDisplayFlag = false;
        currentExpression.previouslyPressedEquals = false;
    }

    if (output.textContent.length < MAX_NUM_DIGITS) {
        output.textContent += text;
    }
    const operand = parseFloat(output.textContent);

    if (currentExpression.operator === null) {
        currentExpression.firstOperand = operand;
    }
    else {
        currentExpression.secondOperand = operand;
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

function compoundEqualsUtility() {
    // compound equals operation
    if (currentExpression.previouslyPressedEquals === true) {
        currentExpression.firstOperand =
            parseFloat(document.getElementById("result").textContent);
        currentExpression.secondOperand = currentExpression.lastSecondOperand;
        currentExpression.operator = currentExpression.lastOperator;
    }
}

function truncateResult(result) {
    if (Math.floor(result) != result) {
        result = result.toString().substring(0, MAX_NUM_DIGITS);
        result = parseFloat(result).toString();  // remove trailing zeros
    }
    else {
        result = result.toExponential(MAX_SCIENTIFIC_NOTATION);
    }
    return result;
}

function updateExpressionResult(result) {
    currentExpression.firstOperand = parseFloat(result);
    currentExpression.lastSecondOperand = currentExpression.secondOperand;
    currentExpression.secondOperand = null;
    currentExpression.operator = null;
    const output = document.getElementById("result");
    output.textContent = result;
    currentExpression.previouslyPressedEquals = true;
}

function equalsEventHandler() {
    compoundEqualsUtility();
    if (currentExpression.operator === null ||
        currentExpression.firstOperand === null ||
        currentExpression.secondOperand === null) {
        return;
    }
    let result = null;
    let previousOperand = currentExpression.firstOperand;
    let currentOperand = currentExpression.secondOperand;
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
            /*
            Operation adapted from "The JavaScript Modulo Bug - How to Fix It." article:
            https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
            */
            currentExpression.lastOperator = '%';
            if (currentOperand === 0) {
                const output = document.getElementById("result");
                output.textContent = ERROR_DIVISION_BY_ZERO;
                resetCurrentExpression();
                currentExpression.emptyDisplayFlag = true;
                document.getElementById("history").textContent =
                    'Press "AC", ">" or any digit to continue.';
                return;
            }
            result = ((previousOperand % currentOperand) + currentOperand) % currentOperand;
            break;
        case '/':
            currentExpression.lastOperator = '/';
            if (currentOperand === 0) {
                const output = document.getElementById("result");
                output.textContent = ERROR_DIVISION_BY_ZERO;
                resetCurrentExpression();
                currentExpression.emptyDisplayFlag = true;
                document.getElementById("history").textContent =
                    'Press "AC", \'>\' or any digit to continue.';
                return;
            }
            result = previousOperand / currentOperand;
            break;
        case '*':
            currentExpression.lastOperator = '*';
            result = previousOperand * currentOperand;
            break;
        case '-':
            currentExpression.lastOperator = '-';
            result = previousOperand - currentOperand;
            break;
        case '+':
            currentExpression.lastOperator = '+';
            result = previousOperand + currentOperand;
            break;
        case null:
            return;
        default:
            break;
    }

    if (result.toString().length > MAX_NUM_DIGITS) {
        result = truncateResult(result);
    }
    updateHistory();
    updateExpressionResult(result);
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
    // compound operators
    if (currentExpression.firstOperand !== null &&
        currentExpression.operator &&
        currentExpression.secondOperand !== null) {
        equalsEventHandler();
    }
    currentExpression.emptyDisplayFlag = true;
    if (currentExpression.firstOperand !== null) {
        currentExpression.operator = '%';
    }
    if (currentExpression.firstOperand !== null) {
        updateHistory();
    }
}

function addDivisionEvent() {
    document
        .getElementById("division")
        .addEventListener("click", divisionEventHandler);
}

function divisionEventHandler() {
    // compound operators
    if (currentExpression.firstOperand !== null &&
        currentExpression.operator &&
        currentExpression.secondOperand !== null) {
        equalsEventHandler();
    }
    currentExpression.emptyDisplayFlag = true;
    if (currentExpression.firstOperand !== null) {
        currentExpression.operator = '/';
    }
    if (currentExpression.firstOperand !== null) {
        updateHistory();
    }
}

function addMultiplicationEvent() {
    document
        .getElementById("multiplication")
        .addEventListener("click", multiplicationEventHandler);
}

function multiplicationEventHandler() {
    // compound operators
    if (currentExpression.firstOperand !== null &&
        currentExpression.operator &&
        currentExpression.secondOperand != null) {
        equalsEventHandler();
    }
    currentExpression.emptyDisplayFlag = true;
    if (currentExpression.firstOperand !== null) {
        currentExpression.operator = '*';
    }
    if (currentExpression.firstOperand !== null) {
        updateHistory();
    }
}

function addSubtractionEvent() {
    document
        .getElementById("subtraction")
        .addEventListener("click", subtractionEventHandler);
}

function subtractionEventHandler() {
    // compound operators
    if (currentExpression.firstOperand !== null &&
        currentExpression.operator &&
        currentExpression.secondOperand != null) {
        equalsEventHandler();
    }
    currentExpression.emptyDisplayFlag = true;
    if (currentExpression.firstOperand !== null) {
        currentExpression.operator = '-';
    }
    if (currentExpression.firstOperand !== null) {
        updateHistory();
    }
}

function addAdditionEvent() {
    document
        .getElementById("addition")
        .addEventListener("click", additionEventHandler);
}

function additionEventHandler() {
    // compound operators
    if (currentExpression.firstOperand !== null &&
        currentExpression.operator &&
        currentExpression.secondOperand != null) {
        equalsEventHandler();
    }
    currentExpression.emptyDisplayFlag = true;
    if (currentExpression.firstOperand !== null) {
        currentExpression.operator = '+';
    }
    if (currentExpression.firstOperand !== null) {
        updateHistory();
    }
}

function addPlusMinusEvent() {
    document
        .getElementById("plus-minus")
        .addEventListener("click", plusMinusEventHandler);
}

function plusMinusEventHandler() {
    const output = document.getElementById("result");
    if (output.textContent == ERROR_DIVISION_BY_ZERO) {
        return;
    }
    if (output.textContent[0] === '-') {
        output.textContent = output.textContent.slice(1);
    } else if (output.textContent[0] !== '0' || output.textContent.length >= 2) {
        output.textContent = '-' + output.textContent;
    }

    if (currentExpression.secondOperand !== null) {
        currentExpression.secondOperand = -currentExpression.secondOperand;
    }
    else if (currentExpression.firstOperand !== null) {
        currentExpression.firstOperand = -currentExpression.firstOperand;
    }
}

function addCommaEvent() {
    document
        .getElementById("comma")
        .addEventListener("click", commaEventHandler);
}

function commaEventHandler() {
    const output = document.getElementById("result");
    if (currentExpression.previouslyPressedEquals === true) {
        allClearEventHandler();
        output.textContent = '0';
    }
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
    if (output.textContent === ERROR_DIVISION_BY_ZERO) {
        allClearEventHandler();
    }

    if (currentExpression.previouslyPressedEquals === true) {
        document.getElementById("history").textContent = '';
        return;
    }

    // case: if expression has operator, but the second operand is null, SHOULD NOT remove ANY digits:
    if (currentExpression.operator && currentExpression.secondOperand === null) {
        return;
    }

    // check if there is nothing after '.' or just trailing zeros
    const indexOfComma = output.textContent.indexOf('.');
    if (indexOfComma !== -1 && /^0*$/.test(output.textContent.slice(indexOfComma + 1))) {
        output.textContent = output.textContent.slice(0, -1);
        return;
    }

    output.textContent = output.textContent.slice(0, -1);
    if (output.textContent.length === 2 && output.textContent === "-0") {
        output.textContent = '0';
    } else if (output.textContent.length === 1 && output.textContent === "-") {
        output.textContent = '0';
    } else if (output.textContent.length === 0) {
        output.textContent = '0';
    }

    if (currentExpression.secondOperand) {
        currentExpression.secondOperand = removeLastDigit(currentExpression.secondOperand);
    }
    else if (currentExpression.firstOperand) {
        currentExpression.firstOperand = removeLastDigit(currentExpression.firstOperand);
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
    updateHistory();
    currentExpression.firstOperand = 0;
}

function keyEventClick(key) {
    const button = document.getElementById(key);
    button.click();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 90);
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
            keyEventClick("equals");
            break;
        case '%':
            keyEventClick("modulo");
            break;
        case '/':
            keyEventClick("division");
            break;
        case '*':
            keyEventClick("multiplication");
            break;
        case '-':
            keyEventClick("subtraction");
            break;
        case '+':
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
