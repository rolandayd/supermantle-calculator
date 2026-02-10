// ===================================
// SUPERMANTLE V2 - SMART CALCULATOR
// ===================================

let userInputs = {
    capital: 5000,
    goal: null,
    time: null,
    experience: null,
    risk: 3
};

let currentQuestion = 1;
const totalQuestions = 5;

const STRATEGIES = {
    minnowMaximizer: {
        name: "The Minnow Maximizer",
        description: "Optimized for small capital deployment with minimal gas friction. Perfect for learning the ropes without significant capital at risk.",
        minCapital: 100,
        maxCapital: 2000,
        allocation: {
            "Byreal MNT-USDC LP": 70,
            "Bybit Alpha Token Splash": 20,
            "Gas & Buffer": 10
        },
        monthlyAPR: 9.5,
        conservativeMonthlyAPR: 6.5,
        aggressiveMonthlyAPR: 12,
        riskLevel: 2,
        setupCost: 3,
        monthlyCost: 0.05,
        steps: [
            "Bridge MNT to Solana via Super Portal (~$2-3, 5-10 min)",
            "Add 70% to Byreal MNT-USDC LP (~$0.02, get USDC first)",
            "Deposit 20% to Bybit Alpha Token Splash (min 50 USDT volume)",
            "Set weekly reminder to harvest & compound LP rewards"
        ],
        tips: [
            "Start with 50% capital to test the flow first",
            "Weekly compounding adds 8-12% to total returns",
            "Join Mantle Telegram for real-time APR updates",
            "DCA in over 2 weeks to average your entry price"
        ],
        bestFor: ["learning", "capital-preservation"],
        timeRequirement: ["passive"],
        experienceLevel: ["beginner"]
    },
    yieldStacker: {
        name: "The Yield Stacker",
        description: "Balanced approach combining passive LP farming with active Bybit campaigns. Ideal for part-time farmers who want solid returns without constant monitoring.",
        minCapital: 2000,
        maxCapital: 10000,
        allocation: {
            "Byreal LP (compound weekly)": 60,
            "Bybit Alpha Staking": 25,
            "Rotation Reserve": 10,
            "Gas Buffer": 5
        },
        monthlyAPR: 8,
        conservativeMonthlyAPR: 5.5,
        aggressiveMonthlyAPR: 10,
        riskLevel: 3,
        setupCost: 4,
        monthlyCost: 0.10,
        steps: [
            "Bridge full amount via Super Portal (~$3-5, keep 5% for gas)",
            "Deploy 60% to Byreal LP (split evenly MNT/USDC, enable auto-compound)",
            "Stake 25% on Bybit Alpha (check eligibility requirements)",
            "Set weekly routine: harvest, compound, check new campaigns",
            "Use 10% rotation reserve for MNT dips and arbitrage"
        ],
        tips: [
            "Use 10% reserve to buy MNT during 10%+ dips",
            "Weekly compounding adds 8% to annual returns",
            "Track transactions in spreadsheet for taxes",
            "Set price alerts at ±20% to monitor IL risk",
            "Join Bybit Alpha Discord for early announcements"
        ],
        bestFor: ["balanced", "max-returns"],
        timeRequirement: ["passive", "moderate"],
        experienceLevel: ["intermediate", "beginner"]
    },
    arbitrageArchitect: {
        name: "The Arbitrage Architect",
        description: "Advanced strategy leveraging price discrepancies across chains and platforms. Requires active monitoring but offers highest risk-adjusted returns.",
        minCapital: 10000,
        maxCapital: 100000,
        allocation: {
            "Byreal LP (yield anchor)": 40,
            "CEX-DEX Arbitrage Bot": 30,
            "Cross-Chain Arbitrage": 20,
            "Options/Hedging": 10
        },
        monthlyAPR: 10,
        conservativeMonthlyAPR: 8,
        aggressiveMonthlyAPR: 12,
        riskLevel: 4,
        setupCost: 5,
        monthlyCost: 0.50,
        steps: [
            "Split capital: 40% Solana, 30% Bybit, 20% Mantle, 10% options",
            "Set up TradingView price monitoring for 0.5%+ spreads",
            "Deploy 40% LP as yield anchor (baseline 115% APR)",
            "Execute arbitrage cycles when spread >0.8% (10+ cycles/month)",
            "Use options for downside protection on MNT exposure"
        ],
        tips: [
            "Set TradingView alerts for MNT spreads >0.5%",
            "Test bridge flow with $100 first",
            "Use Bybit API to automate CEX-DEX arbitrage",
            "Keep 10% liquid for fast execution",
            "Join SuperMantle Discord #arbitrage for real-time spreads"
        ],
        bestFor: ["max-returns"],
        timeRequirement: ["active"],
        experienceLevel: ["advanced"]
    },
    safehaven: {
        name: "The Safe Haven",
        description: "Conservative approach focusing on capital preservation with steady, predictable yields. Perfect for risk-averse investors or those with larger portfolios.",
        minCapital: 5000,
        maxCapital: 100000,
        allocation: {
            "Mantle Native Staking": 50,
            "Stable Byreal LP (MNT-USDT)": 30,
            "Bybit Fixed Earn": 15,
            "Emergency Reserve": 5
        },
        monthlyAPR: 6,
        conservativeMonthlyAPR: 4.5,
        aggressiveMonthlyAPR: 7.5,
        riskLevel: 1,
        setupCost: 3,
        monthlyCost: 0.03,
        steps: [
            "Stake 50% directly on Mantle Network (lowest risk option)",
            "Add 30% to stable Byreal MNT-USDT LP (minimal IL risk)",
            "Lock 15% in Bybit Fixed Earn products (guaranteed APY)",
            "Keep 5% in wallet as emergency reserve",
            "Set monthly check-in to rebalance if needed"
        ],
        tips: [
            "This strategy prioritizes sleep over maximum gains",
            "Ideal for 'set and forget' over 6-12 months",
            "Lower returns but much lower stress and risk",
            "Perfect for crypto winter or uncertain markets"
        ],
        bestFor: ["capital-preservation", "learning"],
        timeRequirement: ["passive"],
        experienceLevel: ["beginner", "intermediate"]
    },
    gigaFarmer: {
        name: "The Giga Farmer",
        description: "Maximum aggression strategy combining high-risk farms, leverage, and active trading. For experienced farmers with high risk tolerance and significant capital.",
        minCapital: 15000,
        maxCapital: 100000,
        allocation: {
            "Leveraged LP Farming": 40,
            "New Farm Rotations": 25,
            "Perpetual Hedge": 20,
            "Volatility Plays": 15
        },
        monthlyAPR: 12,
        conservativeMonthlyAPR: 9,
        aggressiveMonthlyAPR: 15,
        riskLevel: 5,
        setupCost: 10,
        monthlyCost: 1.00,
        steps: [
            "Use 40% with leverage on Byreal (2-3x if available)",
            "Rotate 25% into newest farms within first 72 hours of launch",
            "Maintain 20% short perpetual position to hedge MNT exposure",
            "Deploy 15% into volatility strategies and options",
            "Daily monitoring and rebalancing required"
        ],
        tips: [
            "This is NOT for beginners - you can lose money fast",
            "Set strict stop-losses on leveraged positions",
            "Never use more than 2x leverage unless you know what you're doing",
            "Track everything in real-time - spreadsheets won't cut it",
            "Have exit strategy planned before entering each position"
        ],
        bestFor: ["max-returns"],
        timeRequirement: ["active"],
        experienceLevel: ["advanced"]
    }
};

function selectBestStrategy(inputs) {
    const scores = {};
    for (const [key, strategy] of Object.entries(STRATEGIES)) {
        let score = 0;
        if (inputs.capital >= strategy.minCapital && inputs.capital <= strategy.maxCapital) {
            score += 30;
        } else if (inputs.capital < strategy.minCapital) {
            score -= 20;
        } else if (inputs.capital > strategy.maxCapital) {
            score += 10;
        }
        if (strategy.bestFor.includes(inputs.goal)) score += 25;
        if (strategy.timeRequirement.includes(inputs.time)) score += 20;
        if (strategy.experienceLevel.includes(inputs.experience)) score += 15;
        const riskDiff = Math.abs(strategy.riskLevel - inputs.risk);
        score += (5 - riskDiff) * 5;
        scores[key] = score;
    }
    const bestStrategyKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return STRATEGIES[bestStrategyKey];
}

document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    initializeInputHandlers();
});

const capitalSlider = document.getElementById('capitalSlider');
const capitalInput = document.getElementById('capitalInput');

capitalSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    capitalInput.value = value.toLocaleString();
    userInputs.capital = value;
});

capitalInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
        const numValue = parseInt(value);
        const clampedValue = Math.min(Math.max(numValue, 100), 100000);
        capitalSlider.value = clampedValue;
        capitalInput.value = clampedValue.toLocaleString();
        userInputs.capital = clampedValue;
    }
});

const riskSlider = document.getElementById('riskSlider');
const riskValueText = document.getElementById('riskValueText');
const riskLabels = { 1: 'Very Conservative', 2: 'Conservative', 3: 'Moderate', 4: 'Aggressive', 5: 'Very Aggressive' };

riskSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    riskValueText.textContent = riskLabels[value];
    userInputs.risk = value;
});

function initializeInputHandlers() {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const questionCard = card.closest('.question-card');
            const questionNum = questionCard.dataset.question;
            questionCard.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const value = card.dataset.value;
            if (questionNum === '2') userInputs.goal = value;
            if (questionNum === '3') userInputs.time = value;
            if (questionNum === '4') userInputs.experience = value;
            setTimeout(() => { if (currentQuestion < totalQuestions) nextQuestion(); }, 300);
        });
    });
}

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const btnText = document.getElementById('btnText');

nextBtn.addEventListener('click', () => {
    if (currentQuestion < totalQuestions) {
        nextQuestion();
    } else {
        calculateStrategy();
    }
});

prevBtn.addEventListener('click', () => { if (currentQuestion > 1) previousQuestion(); });

function nextQuestion() {
    if (!validateCurrentQuestion()) return;
    currentQuestion++;
    showQuestion(currentQuestion);
    updateProgress();
    updateNavButtons();
}

function previousQuestion() {
    currentQuestion--;
    showQuestion(currentQuestion);
    updateProgress();
    updateNavButtons();
}

function showQuestion(num) {
    document.querySelectorAll('.question-card').forEach(card => card.classList.remove('active'));
    document.querySelector(`[data-question="${num}"]`).classList.add('active');
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateNavButtons() {
    prevBtn.style.display = currentQuestion > 1 ? 'flex' : 'none';
    btnText.textContent = currentQuestion === totalQuestions ? 'Get My Strategy' : 'Continue';
}

function validateCurrentQuestion() {
    if (currentQuestion === 2 && !userInputs.goal) { alert('Please select your main goal'); return false; }
    if (currentQuestion === 3 && !userInputs.time) { alert('Please select your time commitment'); return false; }
    if (currentQuestion === 4 && !userInputs.experience) { alert('Please select your experience level'); return false; }
    return true;
}

function calculateStrategy() {
    nextBtn.classList.add('loading');
    btnText.textContent = 'Calculating...';
    setTimeout(() => {
        const strategy = selectBestStrategy(userInputs);
        document.querySelector('.calculator-wrapper').style.display = 'none';
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.style.display = 'block';
        displayResults(strategy);
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nextBtn.classList.remove('loading');
    }, 1500);
}

function displayResults(strategy) {
    const { capital, risk } = userInputs;
    const monthlyAPR = risk <= 2 ? strategy.conservativeMonthlyAPR : risk >= 4 ? strategy.aggressiveMonthlyAPR : strategy.monthlyAPR;
    const return30 = capital * (monthlyAPR / 100);
    const return90 = capital * (monthlyAPR / 100) * 3 * 1.08;
    const annualAPY = monthlyAPR * 12;

    const html = `
        <div class="result-card">
            <div class="result-header">
                <h2 class="result-title">${strategy.name}</h2>
                <div class="result-badges">
                    <span class="badge">Risk: ${strategy.riskLevel}/5</span>
                    <span class="badge">${annualAPY.toFixed(0)}% APY</span>
                </div>
            </div>
            <p class="result-description">${strategy.description}</p>
        </div>
        <div class="result-card">
            <h3>Expected Returns</h3>
            <div class="returns-grid">
                <div class="return-item"><span class="return-label">30-Day</span><span class="return-value">+$${Math.round(return30).toLocaleString()}</span><span class="return-pct">+${monthlyAPR.toFixed(1)}%</span></div>
                <div class="return-item"><span class="return-label">90-Day</span><span class="return-value">+$${Math.round(return90).toLocaleString()}</span><span class="return-pct">+${(monthlyAPR * 3 * 1.08).toFixed(1)}%</span></div>
                <div class="return-item"><span class="return-label">Annual APY</span><span class="return-value">${annualAPY.toFixed(0)}%</span></div>
            </div>
        </div>
        <div class="result-card">
            <h3>Capital Allocation</h3>
            <div class="allocation-list">
                ${Object.entries(strategy.allocation).map(([name, pct], i) => {
                    const colors = ['#00D4AA', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6'];
                    return `<div class="allocation-item" style="border-left: 3px solid ${colors[i]}"><span class="allocation-name">${name}</span><div class="allocation-values"><span class="allocation-pct">${pct}%</span><span class="allocation-amt">$${Math.round(capital * (pct / 100)).toLocaleString()}</span></div></div>`;
                }).join('')}
            </div>
        </div>
        <div class="result-card">
            <h3>Step-by-Step Guide</h3>
            <div class="steps-list">
                ${strategy.steps.map((step, i) => `<div class="step-item"><span class="step-number">${i + 1}</span><span class="step-text">${step}</span></div>`).join('')}
            </div>
        </div>
        <div class="result-card">
            <h3>Pro Tips</h3>
            <div class="tips-list">
                ${strategy.tips.map(tip => `<div class="tip-item"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L11 7L16 8L11 9L10 14L9 9L4 8L9 7L10 2Z" fill="currentColor"/></svg><span>${tip}</span></div>`).join('')}
            </div>
        </div>
        <div class="result-card cta-card">
            <h3>Ready to Start?</h3>
            <div class="cta-buttons">
                <a href="https://portal.mantle.xyz" target="_blank" class="btn-primary">Open Mantle Portal</a>
                <button class="btn-secondary" onclick="location.reload()">Calculate Another</button>
            </div>
        </div>
    `;
    document.getElementById('resultsSection').innerHTML = html;
}
