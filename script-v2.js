let userInputs = { capital: 5000, goal: null, time: null, risk: 3 };
let currentQuestion = 1;

const STRATEGIES = {
    minnow: {
        name: "Mantle Starter Deck",
        alloc: [70, 20, 10],
        labels: ["Byreal LP", "mETH Staking", "Gas"],
        analysis: "Focuses on minimizing gas costs while earning the 'Mantle Creator' incentives. Ideal for users starting their journey.",
        risk: "Low-Medium: Exposure to MNT/USDC price fluctuations.",
        whatIf: "If MNT price drops 20%, the LP position helps buffer the loss compared to holding raw MNT."
    },
    growth: {
        name: "Ecosystem Growth Engine",
        alloc: [50, 30, 20],
        labels: ["mETH/MNT LP", "Agni Finance", "Lendle"],
        analysis: "A high-efficiency strategy using Liquid Staking Tokens (LSTs) to stack yields. This is what Mantle Power Users prefer.",
        risk: "Medium: Smart contract risk across 3 protocols.",
        whatIf: "If a protocol is paused, your capital is diversified, protecting 70% of the principal."
    }
};

// ... (Logic for switching questions - same as before but updated IDs)

function nextQuestion() {
    if (currentQuestion < 4) {
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
        currentQuestion++;
        document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
        updateProgress();
    } else {
        renderResults();
    }
}

function renderResults() {
    const strategy = userInputs.capital > 5000 ? STRATEGIES.growth : STRATEGIES.minnow;
    document.getElementById('calculator').style.display = 'none';
    const res = document.getElementById('resultsSection');
    res.style.display = 'block';

    res.innerHTML = `
        <div class="full-card">
            <span class="step-indicator">RECOMMENDED STRATEGY</span>
            <h1>${strategy.name}</h1>
            <div class="results-grid">
                <div class="chart-container">
                    <canvas id="yieldChart"></canvas>
                </div>
                <div>
                    <p>${strategy.analysis}</p>
                    <div class="risk-tag">RISK: ${strategy.risk}</div>
                </div>
            </div>
        </div>
        <div class="full-card">
            <h3>Strategic Scenarios (What-Ifs)</h3>
            <p style="color: var(--text-dim)">${strategy.whatIf}</p>
            <hr style="border: 0; border-top: 1px solid var(--border); margin: 20px 0;">
            <h3>Mantle Protocol Safety</h3>
            <p style="color: var(--text-dim)">All protocols suggested are Mantle-native and have undergone security audits. We recommend checking the <strong>Mantle LSP</strong> security docs for LST-specific risks.</p>
        </div>
        <button class="btn-apple" onclick="location.reload()">Reset Calculator</button>
    `;

    // Initialize the Pie Chart
    const ctx = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: strategy.labels,
            datasets: [{
                data: strategy.alloc,
                backgroundColor: ['#00D4AA', '#6366F1', '#3A3A3C'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            plugins: { legend: { display: false } }
        }
    });
}

// Attach listeners to nextBtn, prevBtn, and list-items
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', () => {
        item.parentElement.querySelectorAll('.list-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        userInputs[item.closest('.question-card').dataset.question] = item.dataset.value;
    });
});
