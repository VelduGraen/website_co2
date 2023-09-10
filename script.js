document.addEventListener("DOMContentLoaded", function () {
    const calculatorForm = document.getElementById("calculatorForm");
    const steps = document.querySelectorAll(".step");
    const prevButtons = document.querySelectorAll(".prev-button");
    const nextButtons = document.querySelectorAll(".next-button");
    const carbonFootprintSpan = document.getElementById("carbonFootprint");

    let currentStep = 0;

    // Function to navigate to the next step
    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            steps[currentStep].style.display = "none";
            currentStep++;
            steps[currentStep].style.display = "block";
        }
    }

    // Function to navigate to the previous step
    function goToPrevStep() {
        if (currentStep > 0) {
            steps[currentStep].style.display = "none";
            currentStep--;
            steps[currentStep].style.display = "block";
        }
    }

    // Event listeners for next and previous buttons
    nextButtons.forEach((button) => {
        button.addEventListener("click", goToNextStep);
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", goToPrevStep);
    });

    // Function to calculate carbon footprint
    function calculateCarbonFootprint(e) {
        e.preventDefault();

        // Collect and calculate the data from each step here
        const carMiles = parseFloat(document.getElementById("carMiles").value);
        const meatConsumption = parseFloat(document.getElementById("meatConsumption").value);
        const electricityUsage = parseFloat(document.getElementById("electricityUsage").value);
        const clothingSpending = parseFloat(document.getElementById("clothingSpending").value);

        // Calculate total carbon footprint (a simple sum for demonstration purposes)
        const totalFootprint = carMiles + meatConsumption * 10 + electricityUsage * 0.5 + clothingSpending * 0.02;

        carbonFootprintSpan.textContent = totalFootprint.toFixed(2) + " kg CO2e/year";
    }

    calculatorForm.addEventListener("submit", calculateCarbonFootprint);
});
