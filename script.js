document.addEventListener("DOMContentLoaded", function () {
    const calculatorForm = document.getElementById("co2Calculator");
    const calculateButton = document.getElementById("calculateButton");
    const resultDiv = document.getElementById("result");
    const co2EmissionSpan = document.getElementById("co2Emission");

    calculateButton.addEventListener("click", function () {
        const activity = document.getElementById("activity").value;
        const distance = parseFloat(document.getElementById("distance").value);

        let emission = 0;

        switch (activity) {
            case "car":
                emission = distance * 0.45;
                break;
            case "bike":
                emission = 0;
                break;
            case "bus":
                emission = distance * 0.03;
                break;
            default:
                emission = 0;
        }

        resultDiv.classList.remove("hidden");
        co2EmissionSpan.textContent = emission.toFixed(2);
    });
});
