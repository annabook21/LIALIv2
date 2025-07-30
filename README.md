# Love It and Lease It v2

https://annabook21.github.io/LIALIv2/

An educational car lease calculator that helps users make informed leasing decisions using accurate mathematical formulas and real economic data.

## Features

- **Accurate Lease Math**: Based on LeaseHackr methodology with proper depreciation and finance charge calculations
- **Regional Market Analysis**: Economic data modeling using FRED, BLS, and Census data for realistic regional variations
- **3D Visualizations**: Interactive Three.js scatter plots showing market deals and negotiation impact
- **Deal Quality Assessment**: Real-time feedback on lease deal quality compared to market standards
- **Windows 98 Aesthetic**: Nostalgic retro interface using authentic styling

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Three.js r128
- **Styling**: Windows 98 CSS framework with custom retro styling
- **Data Sources**: Free government APIs (FRED, BLS, Census Bureau)
- **Backend** (planned): Go with PostgreSQL for full-stack implementation
- **Visualization**: Three.js for 3D market analysis and educational simulations

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/annabook21/LIALIv2.git
cd LIALIv2
```

1. Open the main calculator:

```bash
open frontend/calculator/index.html
```



## Project Structure

```
frontend/
├── calculator/           # Main lease calculator
├── visualizations/       # Three.js educational tools
└── assets/              # Shared CSS, data files

backend/                 # Future Go implementation
docs/                   # Documentation
tests/                  # Test files
```

## Educational Value

This calculator teaches users:

- How lease payments are actually calculated (depreciation + finance charge)
- Regional market variations based on economic indicators
- Visual understanding of deal quality through 3D scatter plots
- Impact of negotiation on total lease costs
- Comparison with real market data from 20+ metro areas

## Data Sources

All data comes from free government sources:

- **Federal Reserve Economic Data (FRED)**: Interest rates, regional economic indicators
- **Bureau of Labor Statistics (BLS)**: Cost of living, median income data
- **Census Bureau**: Demographics, vehicle registration data
- **Federal Reserve Bank**: Credit utilization and delinquency rates

## Mathematics

Lease calculations follow the industry-standard LeaseHackr methodology:

- **Monthly Depreciation** = (Capitalized Cost - Residual Value) / Lease Term
- **Monthly Finance Charge** = (Capitalized Cost + Residual Value) × Money Factor
- **Total Monthly Payment** = Depreciation + Finance Charge + Tax

See `/docs/MATH_FORMULAS.md` for detailed explanations.

## Regional Modeling

The application models regional lease market variations using:

- Median household income by metro area
- Cost of living adjustments
- Regional credit utilization rates
- Auto loan delinquency rates
- Vehicle density and market competition

This creates realistic lease term variations without expensive API costs.

## Development

### Frontend Development

All frontend code is vanilla JavaScript with no build process required. Simply open HTML files in a modern browser.

### Future Backend

Planned Go backend will provide:

- RESTful API for lease calculations
- Real-time data updates from government sources
- User session management
- Enhanced regional data processing

## Contributing

1. Fork the repository
1. Create a feature branch
1. Make your changes
1. Test with multiple browsers
1. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- **LeaseHackr** for accurate lease calculation methodology
- **98.css** for authentic Windows 98 styling
- **Three.js** community for 3D visualization capabilities
- **Federal Reserve** and **BLS** for providing free economic data
