let initialInvestment = 0;
let monthlyStep = 0;
let years = 0;
let rate = 0;

let myChart = null;

const targetForm = document.getElementById('investment-form');

targetForm.addEventListener('input', function(e) {
    e.preventDefault();

    initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    monthlyStep = parseFloat(document.getElementById('monthly-step').value) || 0;
    years = parseFloat(document.getElementById('years').value) || 0;
    rate = parseFloat(document.getElementById('rate').value) || 0;

    let total = initialInvestment;
    let yearlyData = [];
    let investedData = [];
    let labels = [];
    let totalInvested = initialInvestment;

    const monthlyRate = (rate / 100) / 12;

    for (let i = 0; i < years * 12; i++) {
        total += monthlyStep;
        totalInvested += monthlyStep;
        total *= (1 + monthlyRate);

        if ((i + 1) % 12 === 0) {
            yearlyData.push(total.toFixed(2));
            investedData.push(totalInvested.toFixed(2));
            labels.push(`Year ${(i + 1) / 12}`);
        }
    }

    const resultDisplay = document.getElementById('final-result');
    resultDisplay.innerText = `€ ${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const ctx = document.getElementById('investment-chart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Capital (with %)',
                    data: yearlyData,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Invested (Body)',
                    data: investedData,
                    borderColor: '#2980b9', // Синій колір для тіла
                    backgroundColor: 'rgba(41, 128, 185, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true, // Тепер легенда потрібна, щоб розрізняти графіки
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => '€' + value.toLocaleString()
                    }
                }
            }
        }
    });
});
