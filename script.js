document.addEventListener("DOMContentLoaded", function () {
    const calculatorForm = document.getElementById("calculatorForm");
    const calculateButton = document.getElementById("calculateButton");
    const carbonFootprintSpan = document.getElementById("carbonFootprint");

    // Function to calculate carbon footprint
    function calculateCarbonFootprint() {
        // Step 1: Travel
        const carMiles = parseFloat(document.getElementById("carMiles").value);
        // Add more travel-related variables here

        // Step 2: Food
        const meatConsumption = parseFloat(document.getElementById("meatConsumption").value);
        // Add more food-related variables here

        // Step 3: Home
        const electricityUsage = parseFloat(document.getElementById("electricityUsage").value);
        // Add more home-related variables here

        // Step 4: Consumption
        const clothingSpending = parseFloat(document.getElementById("clothingSpending").value);
        // Add more consumption-related variables here

        // Calculate total carbon footprint (a simple sum for demonstration purposes)
        const totalFootprint = carMiles + meatConsumption * 10 + electricityUsage * 0.5 + clothingSpending * 0.02;

        carbonFootprintSpan.textContent = totalFootprint.toFixed(2) + " kg CO2e/year";
    }

    calculateButton.addEventListener("click", calculateCarbonFootprint);
});
