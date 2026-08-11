const display = document.getElementById("display");

function appendValue(value) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = display.value.slice(-1);

    // Prevent multiple decimals in the current number
    if (value === '.') {
        // find start of current number
        const parts = display.value.split(/[-+*/]/);
        const current = parts[parts.length - 1];
        if (current.includes('.')) return;
    }

    // If adding an operator after another operator, replace the last operator
    if (operators.includes(value) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value === "") {
            return;
        }

        let expression = display.value;

        // Convert percentage
        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        // Calculate result
        display.value = Function(
            '"use strict"; return (' + expression + ')'
        )();

    } catch (error) {
        display.value = "Error";

        setTimeout(() => {
            display.value = "";
        }, 1000);
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});

// Improved keyboard support: map common keys and prevent default when handled
document.addEventListener("keydown", function(event) {
    const key = event.key;

    // digits, operators, percent, decimal
    if ((key >= "0" && key <= "9") || key === "+" || key === "-" || key === "*" || key === "/" || key === "." || key === "%") {
        appendValue(key);
        event.preventDefault();
        return;
    }

    // map 'x' or 'X' to '*'
    if (key.toLowerCase() === 'x') {
        appendValue('*');
        event.preventDefault();
        return;
    }

    // '=' key or Numpad '='
    if (key === '=' ) {
        calculate();
        event.preventDefault();
        return;
    }

    if (key === 'Enter') {
        calculate();
        event.preventDefault();
        return;
    }

    if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
        return;
    }

    if (key === 'Delete') {
        clearDisplay();
        event.preventDefault();
        return;
    }

    if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
        return;
    }
});