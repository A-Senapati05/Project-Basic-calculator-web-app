const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".allButtons button");

let expression = "";

// Map symbols to JS operators
function formatExpression(exp) {
    return exp
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/%/g, "/100");
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // AC → clear everything
        if (button.classList.contains("AC")) {
            expression = "";
            screen.textContent = "0";
            return;
        }

        // Backspace
        if (button.classList.contains("cut")) {
            expression = expression.slice(0, -1);
            screen.textContent = expression || "0";
            return;
        }

        // Equal
        if (button.classList.contains("equal")) {
            try {
                const result = eval(formatExpression(expression));
                expression = result.toString();
                screen.textContent = expression;
            } catch {
                screen.textContent = "Error";
                expression = "";
            }
            return;
        }

        // Append value
        expression += value;
        screen.textContent = expression;
    });
});

// Initial screen
screen.textContent = "0";
