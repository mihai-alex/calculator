function updateOutput(text) {
    const output = document.getElementById("result");
    if (output.textContent === '0') {
        output.textContent = '';
    }
    if (output.textContent.length < 10) {
        output.textContent += text;
    }
}

function operandEventsHandler(event) {
    updateOutput(event.target.id);
}

function addOperandEvents() {
    for (let digit = 0; digit <= 9; digit++) {
        document
            .getElementById(digit)
            .addEventListener("click", operandEventsHandler);
    }
}

function operandEvents(key) {
    const button = document.getElementById(key);
    button.click();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 90);
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
            break;
        case '%':
            break;
        case '/':
            break;
        case '*':
        case 'x':
            break;
        case '-':
            break;
        case '+':
            break;
        case ',':
        case '.':
            break;
        case "Backspace":
            break;
        case "Delete":
        case "Escape":
            break;
        default:
            break;
    }
}

function run() {
    addOperandEvents();
    window.addEventListener('keydown', keyEventHandler);
}

window.onload = run;
