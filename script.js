document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const prevButtons = document.querySelectorAll(".prev-button");
    const nextButtons = document.querySelectorAll(".next-button");
    const calculatorForm = document.querySelector("form");

    let currentStep = 0;

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index === stepNumber) {
                step.style.display = "block";
            } else {
                step.style.display = "none";
            }
        });
    }

    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // Event listeners for next and previous buttons
    nextButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            goToNextStep();
        });
    });

    prevButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            goToPrevStep();
        });
    });

    // Function to calculate and display the estimated carbon footprint
    function calculateCarbonFootprint() {
        const carMiles = parseFloat(document.getElementById("carMiles").value);
        const meatConsumption = parseFloat(document.getElementById("meatConsumption").value);
        const electricityUsage = parseFloat(document.getElementById("electricityUsage").value);
        const clothingSpending = parseFloat(document.getElementById("clothingSpending").value);

        // Calculate total carbon footprint based on some arbitrary factors for demonstration purposes
        const carEmissionFactor = 2.5; // kg CO2e per mile
        const meatEmissionFactor = 20; // kg CO2e per kg of meat
        const electricityEmissionFactor = 0.5; // kg CO2e per kWh
        const clothingEmissionFactor = 0.02; // kg CO2e per dollar spent on clothing

        const totalFootprint = (carMiles * carEmissionFactor) +
                              (meatConsumption * meatEmissionFactor) +
                              (electricityUsage * electricityEmissionFactor) +
                              (clothingSpending * clothingEmissionFactor);

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
            <p>Your estimated carbon footprint is: <strong>${result.toFixed(2)} kg CO2e/year</strong></p>
            <p>Thank you for calculating your carbon footprint!</p>
        `;
    }

    // Show the initial step
    showStep(currentStep);
});
