# World Development Index Project
https://github.com/nilesdan/Assignment1?tab=readme-ov-file#readme
## Overview

This project provides a simple web-based application to explore data from the World Development Index (WDI). It allows users to select countries and specific development indicators to visualize historical trends. The data is sourced from a static JSON file.

## Features
1. Select exactly three countries from the dropdown menu
2. Use Ctrl/Cmd + Click for multiple selections
3. Choose a development indicator to compare
4. Analyze the results through:
- Interactive line chart showing trends over time
- Statistical analysis panel showing correlations and trends
- Geographic maps showing selected countries

## Getting Started

## Prerequisites

1. Modern web browser with JavaScript enabled
2. Local development server (e.g., Live Server for VS Code)
3. World Development Index data file (wdi.json)

## Project Components

### HTML

The web application interface is built using basic HTML5 and includes the following key elements:

- **Dropdowns** for selecting countries and indicators.
- **Interactive Table/Charts** to display data dynamically based on the user's input.

## Dependencies

1. ApexCharts - For data visualization
2. Simple Statistics - For statistical calculations
3. Leaflet - For interactive maps
4. Roboto Flex Font - For typography


### Data

- Data is provided via a JSON file sourced from the World Development Index dataset. The JSON file includes information on multiple countries and their development indicators.



## Technical Details

Visualization Components

1. Line Chart

Built with ApexCharts
Includes trend lines and averages
Responsive design

2. Statistical Analysis

Correlation calculations
Trend detection
Relative difference analysis

3. Geographic Maps

Built with Leaflet
Interactive zoom and pan
Country-specific views

## Statistical Calculations

The application performs several statistical analyses:

1. Correlation coefficient between country pairs
2. Trend analysis (>5% growth, stable, >5% decline)
3. Relative difference between country averages


## Project Structure

```
project-folder/
├── assign1.html       # Main HTML file
├── wdi.json        # Static JSON file with WDI data
├── styles.css       # Styling (if applicable)
└── scripts.js       # JavaScript functionality
```

## Future Enhancements

- Integrate real-time data from an external API.
- Improve visualizations with advanced charting libraries like D3.js or Chart.js.

## Credits

- Data Source: [World Development Index](https://databank.worldbank.org/source/world-development-indicators).
