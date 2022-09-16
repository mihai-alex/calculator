function addKeyEvents(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
        case '1':
            break;
        case '2':
            break;
        case '3':
            break;
        case '4':
            break;
        case '5':
            break;
        case '6':
            break;
        case '7':
            break;
        case '8':
            break;
        case '9':
            break;
        case '0':
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
    window.addEventListener('keydown', event => addKeyEvents(event));
}

window.onload = run;
