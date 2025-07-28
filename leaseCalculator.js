/**
 * LeaseHackr-Based Lease Calculation Functions
 * Based directly on: https://leasehackr.com/blog/2016/4/17/how-to-calculate-lease-payments-by-hand
 */

/**
 * Step 1: Calculate Monthly Depreciation
 * Formula: (Capitalized Cost - Residual Value) / Number of Months
 */
function calculateMonthlyDepreciation(capitalizedCost, residualValue, leaseTerm) {
    return (capitalizedCost - residualValue) / leaseTerm;
}

/**
 * Calculate Capitalized Cost
 * Formula: Selling Price - Down Payment - Rebates/Incentives
 */
function calculateCapitalizedCost(sellingPrice, downPayment = 0, rebates = 0) {
    return sellingPrice - downPayment - rebates;
}

/**
 * Calculate Residual Value from MSRP and percentage
 * Formula: MSRP × Residual Percentage
 */
function calculateResidualValue(msrp, residualPercentage) {
    return msrp * (residualPercentage / 100);
}

/**
 * Step 2: Calculate Monthly Finance Charge
 * Formula: (Capitalized Cost + Residual Value) × Money Factor
 */
function calculateMonthlyFinanceCharge(capitalizedCost, residualValue, moneyFactor) {
    return (capitalizedCost + residualValue) * moneyFactor;
}

/**
 * Convert APR to Money Factor
 * Formula: APR ÷ 2400
 */
function aprToMoneyFactor(apr) {
    return apr / 2400;
}

/**
 * Convert Money Factor to APR
 * Formula: Money Factor × 2400
 */
function moneyFactorToApr(moneyFactor) {
    return moneyFactor * 2400;
}

/**
 * Step 3: Calculate Base Monthly Payment (before taxes)
 * Formula: Monthly Depreciation + Monthly Finance Charge
 */
function calculateBaseMonthlyPayment(capitalizedCost, residualValue, moneyFactor, leaseTerm) {
    const monthlyDepreciation = calculateMonthlyDepreciation(capitalizedCost, residualValue, leaseTerm);
    const monthlyFinanceCharge = calculateMonthlyFinanceCharge(capitalizedCost, residualValue, moneyFactor);
    return monthlyDepreciation + monthlyFinanceCharge;
}

/**
 * Calculate Monthly Payment with Tax
 * Most states tax the monthly payment, some tax the full purchase price upfront
 */
function calculateMonthlyPaymentWithTax(basePayment, salesTaxRate, taxMethod = 'monthly') {
    if (taxMethod === 'monthly') {
        // Most common: tax applied to monthly payment
        return basePayment * (1 + salesTaxRate / 100);
    } else if (taxMethod === 'upfront') {
        // Some states: tax paid upfront, monthly payment unchanged
        return basePayment;
    }
}

/**
 * Calculate Total Upfront Tax (for states that tax upfront)
 * This would be paid at signing, not added to monthly payment
 */
function calculateUpfrontTax(capitalizedCost, salesTaxRate) {
    return capitalizedCost * (salesTaxRate / 100);
}

/**
 * LeaseHackr Step 4: Calculate Drive-Off Costs
 * These are the upfront costs when signing the lease
 */
function calculateDriveOffCosts(params) {
    const {
        downPayment = 0,
        firstMonthPayment = 0,
        acquisitionFee = 0,
        securityDeposit = 0,
        registrationFees = 0,
        docFees = 0,
        upfrontTax = 0
    } = params;
    
    const total = downPayment + firstMonthPayment + acquisitionFee + 
                  securityDeposit + registrationFees + docFees + upfrontTax;
    
    return {
        downPayment,
        firstMonthPayment,
        acquisitionFee,
        securityDeposit,
        registrationFees,
        docFees,
        upfrontTax,
        total
    };
}

/**
 * Complete Lease Calculation Function
 * Based on LeaseHackr methodology
 */
function calculateLeasePayment(params) {
    const {
        msrp,
        sellingPrice,
        residualPercentage,
        moneyFactor, // If provided directly
        apr, // If APR provided instead of MF
        leaseTerm,
        downPayment = 0,
        rebates = 0,
        salesTaxRate = 0,
        taxMethod = 'monthly',
        acquisitionFee = 0,
        securityDeposit = 0,
        registrationFees = 0,
        docFees = 0
    } = params;
    
    // Step 1: Calculate key values
    const residualValue = calculateResidualValue(msrp, residualPercentage);
    const capitalizedCost = calculateCapitalizedCost(sellingPrice, downPayment, rebates);
    const mf = moneyFactor || aprToMoneyFactor(apr);
    
    // Step 2: Calculate payment components
    const monthlyDepreciation = calculateMonthlyDepreciation(capitalizedCost, residualValue, leaseTerm);
    const monthlyFinanceCharge = calculateMonthlyFinanceCharge(capitalizedCost, residualValue, mf);
    const baseMonthlyPayment = monthlyDepreciation + monthlyFinanceCharge;
    
    // Step 3: Calculate payment with tax
    const monthlyPaymentWithTax = calculateMonthlyPaymentWithTax(baseMonthlyPayment, salesTaxRate, taxMethod);
    
    // Step 4: Calculate upfront costs
    const upfrontTax = taxMethod === 'upfront' ? calculateUpfrontTax(capitalizedCost, salesTaxRate) : 0;
    const driveOffCosts = calculateDriveOffCosts({
        downPayment,
        firstMonthPayment: monthlyPaymentWithTax,
        acquisitionFee,
        securityDeposit,
        registrationFees,
        docFees,
        upfrontTax
    });
    
    return {
        // Input summary
        msrp,
        sellingPrice,
        capitalizedCost,
        residualValue,
        residualPercentage,
        moneyFactor: mf,
        apr: moneyFactorToApr(mf),
        leaseTerm,
        
        // Payment breakdown
        monthlyDepreciation,
        monthlyFinanceCharge,
        baseMonthlyPayment,
        monthlyPaymentWithTax,
        salesTaxRate,
        
        // Costs
        driveOffCosts,
        
        // Total lease cost
        totalOfPayments: monthlyPaymentWithTax * leaseTerm,
        totalLeaseCost: (monthlyPaymentWithTax * leaseTerm) + driveOffCosts.total
    };
}

/**
 * Rate deal quality based on APR
 */
function rateDealQuality(apr, residualPercentage) {
    let quality = "Fair";
    
    if (apr < 3) quality = "Excellent";
    else if (apr < 5) quality = "Good";
    else if (apr < 7) quality = "Fair";
    else quality = "Poor";
    
    // Higher residual percentages are generally better
    if (residualPercentage > 60 && apr < 4) quality = "Excellent";
    
    return quality;
}

/**
 * Example Usage - LeaseHackr's exact example:
 * MSRP: $35,000
 * Selling Price: $33,000
 * Rebate: $3,000
 * Residual: 60% ($21,000)
 * Money Factor: 0.00100 (2.4% APR)
 * Term: 36 months
 */
function testLeaseHackrExample() {
    const result = calculateLeasePayment({
        msrp: 35000,
        sellingPrice: 33000,
        residualPercentage: 60,
        moneyFactor: 0.00100,
        leaseTerm: 36,
        rebates: 3000,
        salesTaxRate: 0,
        taxMethod: 'monthly'
    });
    
    console.log('LeaseHackr Test Results:');
    console.log('Monthly Depreciation:', result.monthlyDepreciation); // Should be $250
    console.log('Monthly Finance Charge:', result.monthlyFinanceCharge); // Should be $51  
    console.log('Base Monthly Payment:', result.baseMonthlyPayment); // Should be $301
    console.log('APR:', result.apr.toFixed(1) + '%'); // Should be 2.4%
    
    return result;
}
