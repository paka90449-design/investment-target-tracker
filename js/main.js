let initialInvestment = 0;
let monthlyStep = 0;
let years = 0;
let rate = 0;

const targetForm = document.getElementById('investment-form');

targetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    monthlyStep = parseFloat(document.getElementById('monthly-step').value) || 0;
    years = parseFloat(document.getElementById('years').value) || 0;
    rate = parseFloat(document.getElementById('rate').value) || 0;

    let total = initialInvestment;
    const months = years * 12;
    const monthlyRate = (rate / 100) / 12;
    for (let i = 0; i < years * 12; i++) {
        total += monthlyStep;
        total *= (1 + rate / 100 / 12);
    }

    const resultDisplay = document.getElementById('final-result');
    resultDisplay.innerText = `€ ${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});