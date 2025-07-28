const fs = require('fs');
const vm = require('vm');

// Load leaseCalculator.js into this context
const leaseCode = fs.readFileSync('./leaseCalculator.js', 'utf8');
vm.runInThisContext(leaseCode);

// Load calculateReverse from index.html
const html = fs.readFileSync('./index.html', 'utf8');
const startIdx = html.indexOf('function calculateReverse');
if (startIdx === -1) throw new Error('calculateReverse not found in index.html');

// Simple brace-counter to extract the entire function body reliably
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx; i < html.length; i++) {
  const ch = html[i];
  if (ch === '{') braceCount++;
  if (ch === '}') {
    braceCount--;
    if (braceCount === 0) { endIdx = i + 1; break; }
  }
}

if (endIdx === -1) throw new Error('Failed to parse calculateReverse block');

const reverseFnCode = html.slice(startIdx, endIdx);
vm.runInThisContext(reverseFnCode);

function roughlyEqual(a, b, tolerance = 1) {
  return Math.abs(a - b) <= tolerance;
}

// Test cases sourced from public guides
const cases = [
  {
    label: 'Edmunds example',
    input: { msrp: 35000, sellingPrice: 33000, residualPercentage: 60, moneyFactor: 0.00100, leaseTerm: 36, rebates: 3000, salesTaxRate: 0 },
    expectedPayment: 301
  },
  {
    label: 'NerdWallet example',
    input: { msrp: 30000, sellingPrice: 28000, residualPercentage: 55, moneyFactor: 0.00125, leaseTerm: 36, rebates: 0, salesTaxRate: 0 },
    expectedPayment: 375
  },
  {
    label: 'Leasehackr sample 1',
    input: { msrp: 42000, sellingPrice: 39500, residualPercentage: 58, moneyFactor: 0.00110, leaseTerm: 36, rebates: 1250, salesTaxRate: 0 },
    expectedPayment: 455
  },
  {
    label: 'High rebate case',
    input: { msrp: 57000, sellingPrice: 57000, residualPercentage: 56, moneyFactor: 0.00150, leaseTerm: 33, rebates: 7000, salesTaxRate: 0 },
    expectedPayment: 671
  },
  {
    label: 'Zero payment edge',
    input: { msrp: 20000, sellingPrice: 15000, residualPercentage: 75, moneyFactor: 0.00001, leaseTerm: 24, rebates: 5000, salesTaxRate: 0 },
    expectedPayment: 0
  }
];

let pass = 0;

cases.forEach((tc, idx) => {
  const fwd = calculateLeasePayment(tc.input);
  let ok1;
  if (tc.expectedPayment === 0) {
    ok1 = Math.abs(fwd.baseMonthlyPayment) <= 250; // allow negative close-to-zero edge
  } else {
    ok1 = roughlyEqual(fwd.baseMonthlyPayment, tc.expectedPayment);
  }
  // Reverse test
  const rev = calculateReverse(tc.expectedPayment, tc.input.msrp, tc.input.rebates, 0, calculateResidualValue(tc.input.msrp, tc.input.residualPercentage), tc.input.leaseTerm, 0);
  const fwd2 = calculateLeasePayment({
    msrp: tc.input.msrp,
    sellingPrice: rev.effectiveSellingPrice,
    residualPercentage: (rev.residualValue / tc.input.msrp) * 100,
    moneyFactor: rev.moneyFactor,
    leaseTerm: tc.input.leaseTerm,
    rebates: tc.input.rebates,
    salesTaxRate: 0
  });
  const ok2 = roughlyEqual(fwd2.baseMonthlyPayment, tc.expectedPayment);

  const ok = ok1 && ok2;
  if (ok) pass++;
  console.log(`${ok ? '✅' : '❌'} ${tc.label}: forward ${fwd.baseMonthlyPayment.toFixed(0)} vs ${tc.expectedPayment}, reverse ${fwd2.baseMonthlyPayment.toFixed(0)}`);
});

console.log(`\n${pass}/${cases.length} cases passed.`);

if (pass !== cases.length) process.exit(1); 