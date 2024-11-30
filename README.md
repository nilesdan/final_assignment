# World Development Index Project

## Overview
This project provides a simple web-based application to explore data from the World Development Index (WDI). It allows users to select countries and specific development indicators to visualize historical trends. The data is sourced from a static JSON file.

## Features
- Multi-select dropdown for country selection with clear instructions (Hold `Ctrl` (Windows) or `Cmd` (Mac) for multi-selection).
- Dynamic indicator dropdown populated based on selected data.
- Simple and clean user interface for better usability.

## Project Components
### HTML
The web application interface is built using basic HTML5 and includes the following key elements:
- **Dropdowns** for selecting countries and indicators.
- **Interactive Table/Charts** to display data dynamically based on the user's input.

### Data
- Data is provided via a JSON file sourced from the World Development Index dataset. The JSON file includes information on multiple countries and their development indicators.

## Usage Instructions
1. Open the project folder.
2. Launch the `assign1.html` file in a web browser.
3. Use the **Country Dropdown** to select one or multiple countries.
4. View the displayed data or chart representing the selected criteria.
5. Export data by clicking right top corner of the chart.
   
## Requirements
- A modern web browser with JavaScript enabled.
- No external dependencies; the project is standalone.

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


