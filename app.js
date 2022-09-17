function updateOutput(text) {
    const output = document.getElementById("result");
    if (output.textContent === '0') {
        output.textContent = '';
    }
    if (output.textContent.length < 10) {
        output.textContent += text;
    }
}

function addAllEvents() {
    window.addEventListener('keydown', keyEventHandler);
    addOperandEvents();
}

function addOperandEvents() {
    for (let digit = 0; digit <= 9; digit++) {
        document
            .getElementById(digit)
            .addEventListener("click", operandEventsHandler);
    }
}

function operandEventsHandler(event) {
    updateOutput(event.target.id);
}

function highlighClickedButton(key) {
    const button = document.getElementById(key);
    button.click();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 90);
}

function operandEvents(key) {
    highlighClickedButton(key);
}

function equalsEvent(key) {
    highlighClickedButton(key);
}

function moduloEvent(key) {
    highlighClickedButton(key);
}

function divisionEvent(key) {
    highlighClickedButton(key);
}

function multiplicationEvent(key) {
    highlighClickedButton(key);
}

function subtractionEvent(key) {
    highlighClickedButton(key);
}

function additionEvent(key) {
    highlighClickedButton(key);
}

function commaEvent(key) {
    highlighClickedButton(key);
}

function backspaceEvent(key) {
    highlighClickedButton(key);
}

function allClearEvent(key) {
    highlighClickedButton(key);
}

function keyEventHandler(event) {
    switch (event.key) {
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
            operandEvents(event.key);
            break;
        case '=':
            equalsEvent("equals");
            break;
        case '%':
            moduloEvent("modulo");
            break;
        case '/':
            divisionEvent("division");
            break;
        case '*':
        case 'x':
            multiplicationEvent("multiplication");
            break;
        case '-':
            subtractionEvent("subtraction");
            break;
        case '+':
            additionEvent("addition");
            break;
        case ',':
        case '.':
            commaEvent("comma");
            break;
        case "Backspace":
            backspaceEvent("backspace");
            break;
        case "Delete":
        case "Escape":
            allClearEvent("all-clear");
            break;
        default:
            break;
    }
}

function run() {
    addAllEvents();
}

window.onload = run;
