let myChart = null;
let currentTotal = 0;

const targetForm = document.getElementById('investment-form');

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (end > start) {
            obj.classList.add('result-plus');
            obj.classList.remove('result-minus');
        } else if (end < start) {
            obj.classList.add('result-minus');
            obj.classList.remove('result-plus');
        }

        const value = progress * (end - start) + start;
        obj.innerHTML = `€ ${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            setTimeout(() => {
                obj.classList.remove('result-plus');
                obj.classList.remove('result-minus');
            }, 500);
        }
    };
    window.requestAnimationFrame(step);
}

targetForm.addEventListener('input', function(e) {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    const monthlyStep = parseFloat(document.getElementById('monthly-step').value) || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;

    let total = initialInvestment;
    let totalInvested = initialInvestment;
    let yearlyData = [];
    let investedData = [];
    let labels = [];

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
    animateValue(resultDisplay, currentTotal, total, 400);
    currentTotal = total;

    const ctx = document.getElementById('investment-chart').getContext('2d');

    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = yearlyData;
        myChart.data.datasets[1].data = investedData;
        myChart.update(); 
    } else {
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
                        borderColor: '#2980b9',
                        backgroundColor: 'rgba(41, 128, 185, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});