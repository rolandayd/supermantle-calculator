// State Management
let step = 1;
let userInputs = {
    cap: 5000,
    goal: null,
    style: null,
    risk: 2
};

const headings = [
    "Deployment Capital",
    "Primary Objective",
    "Management Style",
    "Risk Profile"
];

// Strategy Data (Actionable & Detailed)
const DATABASE = {
    'yield': {
        name: "Mantle Alpha Maximizer",
        yield: "24.5%",
        complexity: "Professional",
        desc: "Designed for active farmers looking to leverage mETH and high-velocity liquidity pools on Merchant Moe.",
        protocols: ["Mantle LSP", "Merchant Moe", "Agni Finance"],
        alloc: [50, 30, 20],
        labels: ["mETH/WETH LP", "MNT/mETH LP", "Incentive Reserves"],
        steps: [
            { t: "Convert MNT to mETH", d: "Use Mantle LSP to mint mETH. This earns the base staking yield (~4%)." },
            { t: "Seed Merchant Moe LP", d: "Deposit 50% into the mETH/WETH pool to earn $MOE rewards." },
            { t: "Leverage Agni", d: "Stake the remaining 30% in Agni's concentrated liquidity MNT/mETH pool." }
        ]
    },
    'balanced': {
        name: "Ecosystem Core Builder",
        yield: "12.8%",
        complexity: "Intermediate",
        desc: "A stable approach utilizing blue-chip Mantle protocols with lower risk of impermanent loss.",
        protocols: ["Mantle LSP", "Initia", "Mantle Rewards"],
        alloc: [70, 30],
        labels: ["Liquid Staked MNT", "Stable/MNT LP"],
        steps: [
            { t: "Liquid Staking", d: "Convert 70% of capital to mETH via Mantle LSP for 1:1 exposure." },
            { t: "Stable Yield", d: "Provide liquidity to a Stablecoin/MNT pair to hedge against volatility." }
        ]
    }
};

// Toggle logic (Selecting cards)
document.querySelectorAll('.selection-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.type;
        const val = card.dataset.val;
        
        // UI Selection
        card.parentElement.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Update State
        userInputs[category] = val;
    });
});

// Navigation Logic
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');

nextBtn.addEventListener('click', () => {
    if (step < 4) {
        if (step === 2 && !userInputs.goal) return alert("Please select an objective.");
        if (step === 3 && !userInputs.style) return alert("Please select a style.");
        
        step++;
        updateWizard();
    } else {
        calculateResults();
    }
});

backBtn.addEventListener('click', () => {
    if (step > 1) {
        step--;
        updateWizard();
    }
});

function updateWizard() {
    // Update active view
    document.querySelectorAll('.step-view').forEach((view, idx) => {
        view.classList.toggle('active', (idx + 1) === step);
    });
    
    // Update text
    document.getElementById('step-counter').innerText = `Step ${step} of 4`;
    document.getElementById('main-heading').innerText = headings[step - 1];
    
    // Update buttons
    backBtn.disabled = step === 1;
    nextBtn.innerText = step === 4 ? "Generate Strategy" : "Continue";
}

// Capital Slider sync
const slider = document.getElementById('capSlider');
const display = document.getElementById('capDisplay');
slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    display.value = val.toLocaleString();
    userInputs.cap = val;
});

// Final Result Rendering
function calculateResults() {
    document.getElementById('setup-wizard').style.display = 'none';
    document.getElementById('results-ui').style.display = 'block';

    const data = userInputs.goal === 'safety' ? DATABASE['balanced'] : DATABASE['yield'];
    
    document.getElementById('stratName').innerText = data.name;
    document.getElementById('stratDesc').innerText = data.desc;
    document.getElementById('estYield').innerText = data.yield;
    document.getElementById('compValue').innerText = data.complexity;

    // Build Roadmap
    const roadmap = document.getElementById('actionSteps');
    roadmap.innerHTML = data.steps.map(s => `<div><b>${s.t}</b>${s.d}</div>`).join('');

    // Load Chart
    const ctx = document.getElementById('allocationChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.alloc,
                backgroundColor: ['#00D4AA', '#FFFFFF', '#3A3A3C'],
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
