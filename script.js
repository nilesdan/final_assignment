let chart = null;

const maps = ["map1", "map2", "map3"].map((id) => {
  const map = L.map(id).setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  return map;
});

const countryCoordinates = {
  ARG: { lat: -38.4161, lon: -63.6167, zoom: 4 },
  AUS: { lat: -25.2744, lon: 133.7751, zoom: 4 },
  BRA: { lat: -14.235, lon: -51.9253, zoom: 4 },
  IND: { lat: 20.5937, lon: 78.9629, zoom: 4 },
  IDN: { lat: -0.7893, lon: 113.9213, zoom: 4 },
  CHN: { lat: 35.8617, lon: 104.1954, zoom: 4 },
  ITA: { lat: 41.8719, lon: 12.5674, zoom: 4 },
  JPN: { lat: 36.2048, lon: 138.2529, zoom: 4 },
  KOR: { lat: 35.9078, lon: 127.7669, zoom: 4 },
  GBR: { lat: 51.5074, lon: -0.1278, zoom: 4 },
  MEX: { lat: 23.6345, lon: -102.5528, zoom: 4 },
  USA: { lat: 37.0902, lon: -95.7129, zoom: 4 },
};

function showError(message) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 3000);
}

function performStatisticalTests(data) {
  const results = [];
  const countries = data.slice(0, 3);

  for (let i = 0; i < countries.length; i++) {
    for (let j = i + 1; j < countries.length; j++) {
      const country1 = countries[i];
      const country2 = countries[j];
      const pairedData = getPairedData(country1.data, country2.data);
      if (pairedData.length < 2) continue;
      const result = calculateStatistics(
        pairedData.map((d) => d[0]),
        pairedData.map((d) => d[1]),
        country1.name,
        country2.name
      );
      results.push(result);
    }
  }
  displayStatistics(results);
}

function getPairedData(data1, data2) {
  const paired = [];
  data1.forEach((point1) => {
    const point2 = data2.find((p2) => p2.x === point1.x);
    if (point2) {
      paired.push([point1.y, point2.y]);
    }
  });
  return paired;
}

function calculateStatistics(array1, array2, name1, name2) {
  const correlation = calculateCorrelation(array1, array2);
  const trend1 = calculateTrend(array1);
  const trend2 = calculateTrend(array2);
  const meanVal1 = ss.mean(array1);
  const meanVal2 = ss.mean(array2);
  const relativeDiff = ((meanVal1 - meanVal2) / ((meanVal1 + meanVal2) / 2)) * 100;

  return {
    country1: name1,
    country2: name2,
    correlation: correlation,
    trend1: trend1,
    trend2: trend2,
    relativeDiff: relativeDiff,
  };
}

function calculateCorrelation(array1, array2) {
  const n = array1.length;
  const mean1 = ss.mean(array1);
  const mean2 = ss.mean(array2);
  let numerator = 0;
  let denom1 = 0;
  let denom2 = 0;

  for (let i = 0; i < n; i++) {
    numerator += (array1[i] - mean1) * (array2[i] - mean2);
    denom1 += Math.pow(array1[i] - mean1, 2);
    denom2 += Math.pow(array2[i] - mean2, 2);
  }
  return numerator / Math.sqrt(denom1 * denom2);
}

function calculateTrend(array) {
  if (array.length < 2) return "Insufficient Data";
  
  const firstVal = array[0];
  const lastVal = array[array.length - 1];
  const percentChange = ((lastVal - firstVal) / Math.abs(firstVal)) * 100;
  
  let increasingCount = 0;
  let decreasingCount = 0;
  
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i-1]) increasingCount++;
    if (array[i] < array[i-1]) decreasingCount++;
  }
  
  const totalChanges = array.length - 1;
  const consistencyThreshold = 0.7;
  
  if (Math.abs(percentChange) < 5) {
    return "Stable";
  } else if (percentChange > 5) {
    if (increasingCount / totalChanges >= consistencyThreshold) {
      return "Consistently Increasing";
    }
    return "Variable but Increasing";
  } else {
    if (decreasingCount / totalChanges >= consistencyThreshold) {
      return "Consistently Decreasing";
    }
    return "Variable but Decreasing";
  }
}

function displayStatistics(results) {
  const statsDiv = document.getElementById("statsOutput");
  statsDiv.innerHTML = "";

  results.forEach((result) => {
    const statBox = document.createElement("div");
    statBox.className = "stat-box";
    const correlationStrength = Math.abs(result.correlation) > 0.7 ? 
      '<span class="significant">Strong Correlation</span>' : 
      '<span class="not-significant">Weak Correlation</span>';

    statBox.innerHTML = `
      <strong>${result.country1} vs ${result.country2}</strong><br>
      Correlation: ${result.correlation.toFixed(2)}<br>
      ${result.country1} Trend: ${result.trend1}<br>
      ${result.country2} Trend: ${result.trend2}<br>
      Relative Difference: ${result.relativeDiff.toFixed(2)}%<br>
      ${correlationStrength}
    `;
    statsDiv.appendChild(statBox);
  });
}

async function updateVisualization() {
  const selectedCountries = Array.from(
    document.getElementById("countrySelect").selectedOptions
  ).map((option) => option.value);

  if (selectedCountries.length !== 3) {
    showError("Please select exactly 3 countries");
    return;
  }

  try {
    const response = await fetch("wdi.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    const indicator = document.getElementById("indicatorSelect").value;
    const chartData = processData(data, selectedCountries, indicator);
    updateChart(chartData);
    updateMaps(selectedCountries);
    performStatisticalTests(chartData);
  } catch (error) {
    showError("Error loading data: " + error.message);
  }
}

function processData(data, countries, indicator) {
  const allCountries = ["ARG", "AUS", "BRA", "IND", "IDN", "CHN", "ITA", "JPN", "KOR", "GBR", "MEX", "USA"];

  const allCountryData = allCountries
    .map((country) => {
      const countryData = data.find((d) => d["Country Code"] === country && d["Series Name"].includes(indicator));
      if (!countryData) return null;
      return {
        name: country,
        data: Object.entries(countryData)
          .filter(([key]) => /^\d{4}/.test(key))
          .map(([year, value]) => ({
            year: year.split(" ")[0],
            value: parseFloat(value) || null,
          }))
          .filter((point) => point.value !== null),
      };
    })
    .filter(Boolean);

  const yearlyAverages = {};
  allCountryData.forEach((country) => {
    country.data.forEach((point) => {
      if (!yearlyAverages[point.year]) {
        yearlyAverages[point.year] = {
          sum: point.value,
          count: 1,
        };
      } else {
        yearlyAverages[point.year].sum += point.value;
        yearlyAverages[point.year].count++;
      }
    });
  });

  const averageSeries = {
    name: "Average",
    data: Object.entries(yearlyAverages)
      .map(([year, data]) => ({
        x: year,
        y: data.sum / data.count,
      }))
      .sort((a, b) => a.x.localeCompare(b.x)),
    type: "line",
    dashArray: 5,
  };

  return [
    ...countries.map((country) => {
      const countryData = allCountryData.find((d) => d.name === country);
      return {
        name: country,
        data: countryData?.data.map((point) => ({
          x: point.year,
          y: point.value,
        })) || [],
      };
    }),
    averageSeries,
  ];
}

function updateChart(data) {
  const options = {
    series: data,
    chart: {
      type: "line",
      height: "100%",
      background: "transparent",
      animations: {
        enabled: true,
      },
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 3, 2],
      dashArray: [0, 0, 0, 5],
    },
    colors: ["#00ff00", "#ff0000", "#0000ff", "#FFA500"],
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
        formatter: (value) => value.toLocaleString(),
      },
    },
    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  if (chart) {
    chart.destroy();
  }
  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

function updateMaps(countries) {
  maps.forEach((map, index) => {
    const country = countries[index];
    if (countryCoordinates[country]) {
      const { lat, lon, zoom } = countryCoordinates[country];
      map.setView([lat, lon], zoom);
    }
  });
}

document.getElementById("countrySelect").addEventListener("change", updateVisualization);
document.getElementById("indicatorSelect").addEventListener("change", updateVisualization);
maps.forEach((map) => map.setView([0, 0], 2));