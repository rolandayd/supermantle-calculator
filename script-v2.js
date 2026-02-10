let currentStep = 1;
let inputs = { cap: 5000, goal: null, style: null, risk: 2 };
let chartInstance = null;

const STRATEGIES = {
    high: {
        name: "Aggressive Alpha",
        alloc: [60, 30, 10],
        labels: ["mETH-MNT LP", "Agni Finance", "Lendle"],
        risk: "High",
        analysis: "Maximum capital efficiency utilizing Mantle's liquid staking ecosystem. High yield potential with active price exposure.",
        steps: ["Stake MNT for mETH", "Pair mETH/MNT in Agni LP", "Deposit remaining MNT in Lendle"]
    },
    bal: {
        name: "Balanced Ecosystem",
        alloc: [40, 40, 20],
        labels: ["Byreal Stable", "Mantle Stake", "Reserve"],
        risk: "Moderate",
        analysis: "A diversified approach split between stablecoin pairings and native network staking.",
        steps: ["Bridge to Mantle via Portal", "Add liquidity to MNT/USDC on Byreal", "Native stake MNT for network rewards"]
    },
    safe: {
        name: "Principal Guardian",
        alloc: [80, 20],
        labels: ["Mantle LSP", "Gas Reserve"],
        risk: "Low",
        analysis: "Focuses purely on liquid staking with minimal protocol risk. Highest security rating.",
        steps: ["Convert MNT to mETH via Mantle LSP", "Hold mETH to accrue value", "Maintain reserve for gas fees"]
    }
};

// Handle Step Transitions
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentStep < 4) {
        if (currentStep === 2 && !inputs.goal) return alert("Select a goal");
        if (currentStep === 3 && !inputs.style) return alert("Select a style");
        
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep++;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        updateUI();
    } else {
        showResults();
    }
});

// Capital Slider
const capSlider = document.getElementById('capSlider');
const capDisplay = document.getElementById('capDisplay');
capSlider.oninput = function() {
    capDisplay.value = Number(this.value).toLocaleString();
    inputs.cap = Number(this.value);
};

// Selection Logic
document.querySelectorAll('.apple-card').forEach(card => {
    card.onclick = function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.apple-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        
        const step = this.closest('.step').dataset.step;
        if (step == 2) inputs.goal = this.dataset.val;
        if (step == 3) inputs.style = this.dataset.val;
    };
});

function updateUI() {
    document.getElementById('progressBar').style.width = (currentStep / 4) * 100 + "%";
    document.getElementById('backBtn').style.opacity = currentStep > 1 ? "1" : "0";
}

function showResults() {
    document.getElementById('calculator-ui').style.display = "none";
    document.getElementById('results-ui').style.display = "block";

    // Select Strategy
    let strat = STRATEGIES.bal;
    if (inputs.goal === 'max' || inputs.risk == 3) strat = STRATEGIES.high;
    if (inputs.goal === 'safe') strat = STRATEGIES.safe;

    document.getElementById('resName').innerText = strat.name;
    document.getElementById('resAnalysis').innerText = strat.analysis;
    document.getElementById('resRisk').innerText = strat.risk;
    
    const stepsList = document.getElementById('resSteps');
    stepsList.innerHTML = strat.steps.map(s => `<li>${s}</li>`).join('');

    // Load Chart
    const ctx = document.getElementById('yieldChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: strat.labels,
            datasets: [{
                data: strat.alloc,
                backgroundColor: ['#00D4AA', '#ffffff', '#333333'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            cutout: '80%'
        }
    });
}
