const MAX_NUM_DIGITS = 13;

function updateOutputDigits(text) {
    const output = document.getElementById("result");
    if (output.textContent === '0') {
        output.textContent = '';
    }
    if (output.textContent.length < MAX_NUM_DIGITS) {
        output.textContent += text;
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

}

function addModuloEvent() {
    document
        .getElementById("modulo")
        .addEventListener("click", moduloEventHandler);
}

function moduloEventHandler() {

}

function addDivisionEvent() {
    document
        .getElementById("division")
        .addEventListener("click", divisionEventHandler);
}

function divisionEventHandler() {

}

function addMultiplicationEvent() {
    document
        .getElementById("multiplication")
        .addEventListener("click", multiplicationEventHandler);
}

function multiplicationEventHandler() {

}

function addSubtractionEvent() {
    document
        .getElementById("subtraction")
        .addEventListener("click", subtractionEventHandler);
}

function subtractionEventHandler() {

}

function addAdditionEvent() {
    document
        .getElementById("addition")
        .addEventListener("click", additionEventHandler);

}

function additionEventHandler() {

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
}

function addCommaEvent() {
    document
        .getElementById("comma")
        .addEventListener("click", commaEventHandler);
}

function commaEventHandler() {
    const output = document.getElementById("result");
    if (output.textContent.length < 10 && output.textContent.search(',') === -1) {
        output.textContent += ',';
    }
}

function addBackspaceEvent() {
    document
        .getElementById("backspace")
        .addEventListener("click", backspaceEventHandler);
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
}

function addAllClearEvent() {
    document
        .getElementById("all-clear")
        .addEventListener("click", allClearEventHandler);
}

function allClearEventHandler() {
    const output = document.getElementById("result");
    output.textContent = '0';
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
