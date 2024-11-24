let displayValue = [];
const displayDiv = document.querySelector(".display");


const updateDisplay = function() {
    displayDiv.textContent = displayValue.join("");
};

const addDisplay = function(input) {
    // console.log(input);
    displayValue.push(input);
    updateDisplay();
}

function main () {
    const inputs = Array.from(document.querySelectorAll(".input"));

    inputs.forEach(input => {
        input.addEventListener("click", () => addDisplay(input.textContent));
    })
        
    return 0;
};

main();
