let currentStep = 1;
let inputs = { cap: 5000, goal: null, style: null, risk: 2 };

const stepTitles = [
    "Deployment Capital",
    "Primary Objective",
    "Strategy Style",
    "Risk Profile"
];

const DB = {
    'max': {
        name: "Mantle High-Velocity Alpha",
        apr: "28.4%",
        comp: "Advanced",
        alloc: [50, 30, 20],
        labels: ["mETH/MNT LP", "Merchant Moe", "Incentive Reserves"],
        steps: [
            {t: "Stake MNT to mETH", d: "Go to Mantle LSP and stake your MNT for liquid mETH."},
            {t: "Merchant Moe LP", d: "Add mETH/WETH to liquidity pools for $MOE rewards."},
            {t: "Agni Concentrated", d: "Deploy 20% to Agni MNT/mETH pools for swap fees."}
        ],
        pills: ["Mantle LSP", "Merchant Moe", "Agni Finance"]
    },
    'bal': {
        name: "Ecosystem Growth Core",
        apr: "14.2%",
        comp: "Intermediate",
        alloc: [70, 30],
        labels: ["mETH Staking", "Stablecoin LP"],
        steps: [
            {t: "Liquid Staking", d: "Convert 70% of capital to mETH for native network yield."},
            {t: "Hedging", d: "Pair 30% with USDT in a stable pool to minimize volatility."}
        ],
        pills: ["Mantle LSP", "Initia", "Byreal"]
    }
};

// Handle Selections (The Toggle Fix)
document.querySelectorAll('.select-card').forEach(card => {
    card.addEventListener('click', function() {
        const cat = this.dataset.cat;
        const val = this.dataset.val;
        
        // Remove 'selected' from siblings
        this.parentElement.querySelectorAll('.select-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        
        // Save to state
        inputs[cat] = val;
    });
});

// Navigation Logic
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');

nextBtn.addEventListener('click', () => {
    if (currentStep < 4) {
        if (currentStep === 2 && !inputs.goal) return alert("Please select a goal");
        if (currentStep === 3 && !inputs.style) return alert("Please select a style");
        
        currentStep++;
        updateWizard();
    } else {
        renderResults();
    }
});

backBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateWizard();
    }
});

function updateWizard() {
    document.querySelectorAll('.view').forEach((v, i) => {
        v.classList.toggle('active', (i + 1) === currentStep);
    });
    
    document.getElementById('step-indicator').innerText = `Step ${currentStep} of 4`;
    document.getElementById('step-title').innerText = stepTitles[currentStep - 1];
    
    backBtn.disabled = currentStep === 1;
    nextBtn.innerText = currentStep === 4 ? "Build My Strategy" : "Continue";
}

// Slider Logic
const slider = document.getElementById('capSlider');
const display = document.getElementById('capDisplay');
slider.oninput = function() {
    display.value = parseInt(this.value).toLocaleString();
    inputs.cap = parseInt(this.value);
};

// Results Engine
function renderResults() {
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    const data = (inputs.goal === 'safe') ? DB['bal'] : DB['max'];

    document.getElementById('resStratName').innerText = data.name;
    document.getElementById('resAPR').innerText = data.apr;
    document.getElementById('resComp').innerText = data.comp;

    // Roadmap
    document.getElementById('roadmapSteps').innerHTML = data.steps.map(s => 
        `<div><b>${s.t}</b>${s.d}</div>`
    ).join('');

    // Pills
    document.getElementById('protocolPills').innerHTML = data.pills.map(p => 
        `<span>${p}</span>`
    ).join('');

    // Chart
    const ctx = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.alloc,
                backgroundColor: ['#00D4AA', '#FFFFFF', '#333333'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            plugins: { legend: { display: false } },
            maintainAspectRatio: false
        }
    });
}
