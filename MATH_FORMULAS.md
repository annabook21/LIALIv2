# Lease Calculation Formulas

This document outlines the mathematical formulas used in the Love It and Lease It calculator, based on the LeaseHackr methodology.

## Core Lease Mathematics

### 1. Monthly Depreciation

```
Monthly Depreciation = (Capitalized Cost - Residual Value) / Lease Term (months)
```

**Example:**

- Capitalized Cost: $30,000
- Residual Value: $21,000 (60% of $35,000 MSRP)
- Lease Term: 36 months
- Monthly Depreciation = ($30,000 - $21,000) / 36 = $250.00

### 2. Monthly Finance Charge

```
Monthly Finance Charge = (Capitalized Cost + Residual Value) × Money Factor
```

**Example:**

- Capitalized Cost: $30,000
- Residual Value: $21,000
- Money Factor: 0.00100
- Monthly Finance Charge = ($30,000 + $21,000) × 0.00100 = $51.00

### 3. Base Monthly Payment

```
Base Monthly Payment = Monthly Depreciation + Monthly Finance Charge
```

**Example:**

- Monthly Depreciation: $250.00
- Monthly Finance Charge: $51.00
- Base Monthly Payment = $250.00 + $51.00 = $301.00

## Key Terms and Calculations

### Capitalized Cost

```
Capitalized Cost = Selling Price - Down Payment - Rebates/Incentives
```

This is the amount being financed, not the MSRP or selling price.

### Residual Value

```
Residual Value = MSRP × Residual Percentage
```

The residual percentage is set by the manufacturer and varies by:

- Vehicle make/model
- Lease term (24, 36, 39, 48 months)
- Market conditions

### Money Factor ↔ APR Conversion

```
APR = Money Factor × 2400
Money Factor = APR ÷ 2400
```

**Example:**

- Money Factor 0.00125 = 3.0% APR
- 4.8% APR = 0.00200 Money Factor

## Tax Calculations

### Monthly Tax (Most States)

```
Monthly Payment with Tax = Base Monthly Payment × (1 + Sales Tax Rate)
```

### Upfront Tax (Some States)

```
Upfront Tax = Capitalized Cost × Sales Tax Rate
Monthly Payment = Base Monthly Payment (unchanged)
```

## Drive-Off Costs

```
Total Drive-Off = Down Payment + First Month Payment + Acquisition Fee + 
                  Security Deposit + Registration Fees + Doc Fees + Upfront Tax
```

Common fees:

- **Acquisition Fee**: $395 - $1,095 (bank processing fee)
- **Security Deposit**: Usually one monthly payment (refundable)
- **Documentation Fee**: $55 - $700+ (varies by state regulations)
- **Registration/Title**: DMV fees (varies by state)

## Total Lease Cost

```
Total Lease Cost = (Monthly Payment × Lease Term) + Drive-Off Costs
```

### Effective Monthly Cost

```
Effective Monthly Cost = Total Lease Cost ÷ Lease Term
```

This gives a true comparison metric that includes all upfront costs.

## Deal Quality Rating

Based on APR equivalent:

- **Excellent**: APR < 3%
- **Good**: APR 3% - 5%
- **Fair**: APR 5% - 7%
- **Poor**: APR > 7%

Additional factors:

- **High Residual**: > 60% (better deal)
- **Low Residual**: < 50% (worse deal)

## LeaseHackr Example Verification

Using the exact example from LeaseHackr:

- MSRP: $35,000
- Selling Price: $33,000
- Rebate: $3,000
- Capitalized Cost: $30,000
- Residual: 60% = $21,000
- Money Factor: 0.00100 (2.4% APR)
- Term: 36 months

**Calculations:**

1. Monthly Depreciation = ($30,000 - $21,000) ÷ 36 = $250.00
1. Monthly Finance Charge = ($30,000 + $21,000) × 0.00100 = $51.00
1. Base Monthly Payment = $250.00 + $51.00 = $301.00

**Result**: $301.00 monthly payment (before taxes)

## Regional Variations

The application models regional variations using economic indicators:

### Money Factor Adjustment

```
Regional MF = Base MF × Regional Factor
```

Where Regional Factor considers:

- Credit risk (utilization rates, delinquency rates)
- Market competition (vehicle density)
- Economic strength (purchasing power)

### Residual Adjustment

```
Regional Residual = Base Residual × (1 + Demand Factor × 0.15)
```

Higher income areas typically have better residuals for luxury vehicles.

## Common Mistakes to Avoid

1. **Using MSRP instead of Capitalized Cost** in calculations
1. **Forgetting to subtract rebates** from the capitalized cost
1. **Applying tax to the wrong base** (varies by state)
1. **Ignoring acquisition fees** in total cost calculations
1. **Comparing payments with different terms** without considering total cost

## Sources

- LeaseHackr Manual Calculation Guide
- Automotive Lease Guide (ALG) Industry Standards
- Federal Reserve Economic Data (FRED)
- Bureau of Labor Statistics (BLS) Regional Data
