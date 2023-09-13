document.addEventListener("DOMContentLoaded", function () {

    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next-button");
    const prevButtons = document.querySelectorAll(".prev-button");
    let currentStep = 0;

    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", function () {
        document.getElementById('frontpage').style.display = "none";
        document.getElementById('about').style.display = "none";
        document.getElementById('content').style.display = "block";
    });

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.style.display = index === stepNumber ? "block" : "none";
        });
    }

    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            if (currentStep + 1 === steps.length - 1) {
                const totalFootprint = calculateCarbonFootprint();
                displayResult(totalFootprint);
            }
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

    nextButtons.forEach((button) => {
        button.addEventListener("click", goToNextStep);
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", goToPrevStep);
    });

    function calculateCarbonFootprint() {
        const travelMethod = parseFloat(document.getElementById("travelMethod").value);
        const meatConsumption = parseFloat(document.getElementById("meatConsumption").value);
        const homeConsumption = parseFloat(document.getElementById("m2Selection").value);
        const serviceConsumption = parseFloat(document.getElementById("serviceConsumption").value);
        const goodsConsumption = parseFloat(document.getElementById("goodsConsumption").value);
        return travelMethod + meatConsumption + homeConsumption + serviceConsumption + goodsConsumption;
    }

    function sendDataToGoogleSheet(data) {
        fetch('https://script.google.com/macros/s/AKfycbwu5V9efGLjmYjsuireMIPc2HfxF1IpZkrTL8O0RqBcjz6cjra0J_y0Xl7C-Rg0sozUaA/exec', {
            method: 'POST', mode: 'no-cors', cache: 'no-cache', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.error('Error:', e));
    }

    function displayResult(result) {
        const resultElement = document.getElementById("result");
        const recommendationsElement = document.getElementById("recommendations");
        const data = JSON.parse(localStorage.getItem('i18n'));
        resultElement.innerHTML = `${data.resultText.replace('{result}', result.toFixed(2))} <br> ${data.thanksMsg}`;

        let recommendationHtml = "";
        if (Array.isArray(data.recommendations)) {
            recommendationHtml = "<ul>";
            data.recommendations.forEach((recommendation) => {
                recommendationHtml += "<li>" + recommendation + "</li>";
            });
            recommendationHtml += "</ul>";
        }

        const data1 = {
            travelMethod: parseFloat(document.getElementById("travelMethod").value),
            meatConsumption: parseFloat(document.getElementById("meatConsumption").value),
            homeConsumption: parseFloat(document.getElementById("m2Selection").value),
            serviceConsumption: parseFloat(document.getElementById("serviceConsumption").value),
            goodsConsumption: parseFloat(document.getElementById("goodsConsumption").value)
        };

        sendDataToGoogleSheet(data1);

        recommendationsElement.innerHTML = recommendationHtml;
    }


    function i18nUpdate() {
        const data = JSON.parse(localStorage.getItem('i18n'));

        // Populate titles and other text elements
        document.getElementById('title').textContent = data.title;
        document.getElementById('main-title').textContent = data.mainTitle;
        document.getElementById('step1-title').textContent = data.step1Title;
        document.getElementById('step2-title').textContent = data.step2Title;
        document.getElementById('step3-title').textContent = data.step3Title;
        document.getElementById('step4-title').textContent = data.step4Title;
        document.getElementById('step5-title').textContent = data.step5Title;
        document.getElementById('step6-title').textContent = data.step6Title;
        document.getElementById('travel-label').textContent = data.travelLabel;
        document.getElementById('welcomeTitle').textContent = data.welcomeTitle;
        document.getElementById('welcomeMessage').textContent = data.welcomeMessage;
        document.getElementById('aboutTitle').textContent = data.aboutTitle;
        document.getElementById('aboutMessage').textContent = data.aboutMessage;
        document.getElementById('startButton').textContent = data.startButton;


        // Populate travelMethod options
        const travelMethodSelect = document.getElementById("travelMethod");
        travelMethodSelect.innerHTML = "";
        for (const key in data.travelOptions) {
            const option = document.createElement("option");
            option.text = data.travelOptions[key].text;
            option.value = data.travelOptions[key].value;
            travelMethodSelect.add(option);
        }

        // Populate meatConsumption options
        const meatConsumptionSelect = document.getElementById("meatConsumption");
        meatConsumptionSelect.innerHTML = "";
        for (const key in data.meatOptions) {
            const option = document.createElement("option");
            option.text = data.meatOptions[key].text;
            option.value = data.meatOptions[key].value;
            meatConsumptionSelect.add(option);
        }

        // Populate homestats options
        const homeTypeSelect = document.getElementById("homeType");
        homeTypeSelect.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.text = "Please select";
        defaultOption.value = "";
        homeTypeSelect.add(defaultOption);

        for (const homeType in data.homeOptions) {
            const option = document.createElement("option");
            option.text = homeType;  // use home type like apartment, house as the visible text
            option.value = homeType; // use home type as the value as well
            homeTypeSelect.add(option);
        }


        homeTypeSelect.addEventListener('change', function () {
            const m2SelectionSelect = document.getElementById("m2Selection");
            m2SelectionSelect.innerHTML = "";
            const selectedHomeType = this.value;
            const m2Options = data.homeOptions[selectedHomeType]; // Use this selected home type to lookup the m2 options.
            for (const key in m2Options) {
                const option = document.createElement("option");
                option.text = m2Options[key].text;
                option.value = m2Options[key].value;
                m2SelectionSelect.add(option);
            }
        });

        // Populate serviceConsumption options
        const serviceConsumptionSelect = document.getElementById("serviceConsumption");
        serviceConsumptionSelect.innerHTML = "";
        for (const key in data.serviceConsumptionOptions) {
            const option = document.createElement("option");
            option.text = data.serviceConsumptionOptions[key].text;
            option.value = data.serviceConsumptionOptions[key].value;
            serviceConsumptionSelect.add(option);
        }

        // Populate goodsConsumption options
        const goodsConsumptionSelect = document.getElementById("goodsConsumption");
        goodsConsumptionSelect.innerHTML = "";
        for (const key in data.goodsConsumptionOptions) {
            const option = document.createElement("option");
            option.text = data.goodsConsumptionOptions[key].text;
            option.value = data.goodsConsumptionOptions[key].value;
            goodsConsumptionSelect.add(option);
        }

        document.getElementById('travel-label').textContent = data.travelLabel;
        document.getElementById('meat-label').textContent = data.meatLabel;
        document.getElementById('homestats-label').textContent = data.homeLabel;
        document.getElementById('serviceConsumption-label').textContent = data.serviceConsumptionLabel;
        document.getElementById('goodsConsumption-label').textContent = data.goodsConsumptionLabel;

        nextButtons.forEach((button) => {
            button.textContent = data.nextButtonText;
        });

        prevButtons.forEach((button) => {
            button.textContent = data.prevButtonText;
        });

    }

    showStep(currentStep);

    document.getElementById('lang').addEventListener('change', function () {
        const lang = this.value;
        fetch(lang + '.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('i18n', JSON.stringify(data));
                i18nUpdate();
            });
    });

    const userLang = navigator.language || navigator.userLanguage;
    const langDropDown = document.getElementById('lang');

    if (userLang.includes('is')) {
        langDropDown.value = 'is';
    } else if (userLang.includes('da')) {
        langDropDown.value = 'da';
    } else {
        langDropDown.value = 'en';
    }

    langDropDown.dispatchEvent(new Event('change'));
});
