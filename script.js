document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next-button");
    const prevButtons = document.querySelectorAll(".prev-button");
    const calculatorForm = document.querySelector("form");

    let currentStep = 0;

    // Function to show a specific step
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index === stepNumber) {
                step.style.display = "block";
            } else {
                step.style.display = "none";
            }
        });
    }

    // Function to navigate to the next step
    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    // Function to navigate to the previous step
    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // Event listeners for the "Next" buttons
    nextButtons.forEach((button) => {
        button.addEventListener("click", goToNextStep);
    });

    // Event listeners for the "Previous" buttons
    prevButtons.forEach((button) => {
        button.addEventListener("click", goToPrevStep);
    });

    // Function to calculate and display the estimated carbon footprint
    function calculateCarbonFootprint() {
        const travelMethod = parseFloat(document.getElementById("travelMethod").value);
        const meatConsumption = parseFloat(document.getElementById("meatConsumption").value);

        // Calculate total carbon footprint based on selected options
        const totalFootprint = travelMethod + meatConsumption;

        return totalFootprint;
    }

    // Event listener for form submission
    calculatorForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Calculate the carbon footprint
        const totalFootprint = calculateCarbonFootprint();

        // Display the result in the "Result" step
        displayResult(totalFootprint);

        // Move to the "Result" step
        currentStep = steps.length - 1;
        showStep(currentStep);
    });

    // Function to display the calculated result
    function displayResult(result) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `
            <p>Your estimated carbon footprint is: <strong>${result.toFixed(2)} tons CO2 per year</strong></p>
            <p>Thank you for calculating your carbon footprint!</p>
        `;
    }

    // Show the initial step
    showStep(currentStep);
});
