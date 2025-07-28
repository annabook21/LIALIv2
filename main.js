// State tax rates (simplified - would need full database in production)
const stateTaxRates = {
“Alabama”: 2.00, “Alaska”: 0.00, “Arizona”: 5.60, “Arkansas”: 6.50, “California”: 7.25,
“Colorado”: 2.90, “Connecticut”: 6.35, “Delaware”: 0.00, “Florida”: 6.00, “Georgia”: 7.00,
“Hawaii”: 4.00, “Idaho”: 6.00, “Illinois”: 7.25, “Indiana”: 7.00, “Iowa”: 5.00,
“Kansas”: 6.50, “Kentucky”: 6.00, “Louisiana”: 4.45, “Maine”: 5.50, “Maryland”: 6.00,
“Massachusetts”: 6.25, “Michigan”: 6.00, “Minnesota”: 6.88, “Mississippi”: 5.00, “Missouri”: 4.23,
“Montana”: 0.00, “Nebraska”: 5.50, “Nevada”: 8.25, “New Hampshire”: 0.00, “New Jersey”: 6.63,
“New Mexico”: 4.00, “New York”: 4.00, “North Carolina”: 3.00, “North Dakota”: 5.00, “Ohio”: 5.75,
“Oklahoma”: 3.25, “Oregon”: 0.00, “Pennsylvania”: 6.00, “Rhode Island”: 7.00, “South Carolina”: 5.00,
“South Dakota”: 4.00, “Tennessee”: 7.00, “Texas”: 6.25, “Utah”: 6.85, “Vermont”: 6.00,
“Virginia”: 4.15, “Washington”: 6.50, “West Virginia”: 6.00, “Wisconsin”: 5.00, “Wyoming”: 4.00
};

// UI Functions
function populateStateDropdown() {
const dropdown = document.getElementById(“state”);

```
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "Select a state";
dropdown.appendChild(defaultOption);

const sortedStates = Object.entries(stateTaxRates).sort((a, b) => a[0].localeCompare(b[0]));

for (const [state, rate] of sortedStates) {
    const option = document.createElement("option");
    option.value = state;
    option.text = `${state} - ${rate}%`;
    dropdown.appendChild(option);
}
```

}

function toggleRateInput() {
const aprSelected = document.getElementById(‘aprInput’).checked;
const aprRow = document.getElementById(‘aprRow’);
const mfRow = document.getElementById(‘mfRow’);

```
if (aprSelected) {
    aprRow.classList.remove('hidden');
    mfRow.classList.add('hidden');
    document.getElementById('moneyFactor').value = '';
} else {
    aprRow.classList.add('hidden');
    mfRow.classList.remove('hidden');
    document.getElementById('apr').value = '';
}
```

}

function updateResults(results) {
// Monthly payment breakdown
document.getElementById(‘monthlyDepreciation’).textContent = ‘$’ + results.monthlyDepreciation.toFixed(2);
document.getElementById(‘monthlyFinance’).textContent = ‘$’ + results.monthlyFinanceCharge.toFixed(2);
document.getElementById(‘basePayment’).textContent = ‘$’ + results.baseMonthlyPayment.toFixed(2);
document.getElementById(‘monthlyPayment’).textContent = ‘$’ + results.monthlyPaymentWithTax.toFixed(2);

```
// Lease details
document.getElementById('capitalizedCost').textContent = '$' + results.capitalizedCost.toFixed(2);
document.getElementById('residualValue').textContent = '$' + results.residualValue.toFixed(2);
document.getElementById('displayMF').textContent = results.moneyFactor.toFixed(6);
document.getElementById('displayAPR').textContent = results.apr.toFixed(2) + '%';
document.getElementById('dealQuality').textContent = rateDealQuality(results.apr, results.residualPercentage);

// Drive-off costs
const driveOff = results.driveOffCosts;
document.getElementById('driveOffDown').textContent = '$' + driveOff.downPayment.toFixed(2);
document.getElementById('driveOffFirst').textContent = '$' + driveOff.firstMonthPayment.toFixed(2);
document.getElementById('driveOffAcq').textContent = '$' + driveOff.acquisitionFee.toFixed(2);
document.getElementById('driveOffSec').textContent = '$' + driveOff.securityDeposit.toFixed(2);
document.getElementById('driveOffReg').textContent = '$' + (driveOff.registrationFees + driveOff.docFees).toFixed(2);
document.getElementById('driveOffTax').textContent = '$' + driveOff.upfrontTax.toFixed(2);
document.getElementById('totalDriveOff').textContent = '$' + driveOff.total.toFixed(2);

// Total costs
document.getElementById('totalPayments').textContent = '$' + results.totalOfPayments.toFixed(2);
document.getElementById('totalDriveOffCopy').textContent = '$' + driveOff.total.toFixed(2);
document.getElementById('totalLeaseCost').textContent = '$' + results.totalLeaseCost.toFixed(2);
document.getElementById('effectiveMonthly').textContent = '$' + (results.totalLeaseCost / results.leaseTerm).toFixed(2);

document.getElementById('results').classList.remove('hidden');
```

}

function calculateLease() {
// Get form values
const msrp = parseFloat(document.getElementById(‘msrp’).value);
const sellingPrice = parseFloat(document.getElementById(‘sellingPrice’).value);
const downPayment = parseFloat(document.getElementById(‘downPayment’).value) || 0;
const rebates = parseFloat(document.getElementById(‘rebates’).value) || 0;
const residualPercentage = parseFloat(document.getElementById(‘residualPercentage’).value);
const leaseTerm = parseInt(document.getElementById(‘leaseTerm’).value);
const state = document.getElementById(‘state’).value;
const taxUpfront = document.getElementById(‘taxUpfront’).checked;

```
// Get rate input
const aprSelected = document.getElementById('aprInput').checked;
const apr = aprSelected ? parseFloat(document.getElementById('apr').value) : null;
const moneyFactor = !aprSelected ? parseFloat(document.getElementById('moneyFactor').value) : null;

// Get fees
const acquisitionFee = parseFloat(document.getElementById('acquisitionFee').value) || 0;
const docFee = parseFloat(document.getElementById('docFee').value) || 0;
const registrationFee = parseFloat(document.getElementById('registrationFee').value) || 0;
const securityDeposit = parseFloat(document.getElementById('securityDeposit').value) || 0;

const salesTaxRate = stateTaxRates[state];
const taxMethod = taxUpfront ? 'upfront' : 'monthly';

// Validation
if (!msrp || !sellingPrice || !residualPercentage || !leaseTerm || !state) {
    alert('Please fill in all required fields');
    return;
}

if (!apr && !moneyFactor) {
    alert('Please enter either APR or Money Factor');
    return;
}

if (sellingPrice > msrp) {
    alert('Selling price cannot be higher than MSRP');
    return;
}

try {
    const results = calculateLeasePayment({
        msrp,
        sellingPrice,
        residualPercentage,
        moneyFactor,
        apr,
        leaseTerm,
        downPayment,
        rebates,
        salesTaxRate,
        taxMethod,
        acquisitionFee,
        securityDeposit,
        registrationFees: registrationFee,
        docFees: docFee
    });
    
    updateResults(results);
    
    // Store results for visualization
    window.lastCalculationResults = results;
    
} catch (error) {
    alert('Calculation error: ' + error.message);
    console.error('Calculation error:', error);
}
```

}

function openVisualization() {
// Open the Three.js visualization page
window.open(’../visualizations/threejs-education.html’, ‘_blank’);
}

// Event listeners
document.addEventListener(‘DOMContentLoaded’, function() {
populateStateDropdown();

```
document.getElementById('aprInput').addEventListener('change', toggleRateInput);
document.getElementById('mfInput').addEventListener('change', toggleRateInput);

document.getElementById('leaseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateLease();
});

document.getElementById('viewVisualization').addEventListener('click', function(e) {
    e.preventDefault();
    openVisualization();
});

// Auto-calculate when values change (optional)
const autoCalcInputs = ['msrp', 'sellingPrice', 'residualPercentage', 'apr', 'moneyFactor'];
autoCalcInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('input', debounce(function() {
            // Only auto-calculate if we have enough required fields
            const msrp = document.getElementById('msrp').value;
            const sellingPrice = document.getElementById('sellingPrice').value;
            const residualPercentage = document.getElementById('residualPercentage').value;
            const state = document.getElementById('state').value;
            const leaseTerm = document.getElementById('leaseTerm').value;
            const apr = document.getElementById('apr').value;
            const mf = document.getElementById('moneyFactor').value;
            
            if (msrp && sellingPrice && residualPercentage && state && leaseTerm && (apr || mf)) {
                calculateLease();
            }
        }, 500));
    }
});
```

});

// Utility function for debouncing
function debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}
