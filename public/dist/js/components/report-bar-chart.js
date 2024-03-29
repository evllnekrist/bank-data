(() => {
  // src/js/components/report-bar-chart.js
  (function() {
    "use strict";
    if ($(".report-bar-chart").length) {
      let reportBarChartData = new Array(40).fill(0).map((data, key) => {
        if (key % 3 == 0 || key % 5 == 0) {
          return Math.ceil(Math.random() * (0 - 20) + 20);
        } else {
          return Math.ceil(Math.random() * (0 - 7) + 7);
        }
      });
      let reportBarChartColor = reportBarChartData.map((data) => {
        if (data >= 8 && data <= 14) {
          return $("html").hasClass("dark") ? "#2E51BBA6" : getColor("primary", 0.65);
        } else if (data >= 15) {
          return $("html").hasClass("dark") ? "#2E51BB" : getColor("primary");
        }
        return $("html").hasClass("dark") ? "#2E51BB59" : getColor("primary", 0.35);
      });
      const ctx = $(".report-bar-chart")[0].getContext("2d");
      const reportBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: reportBarChartData,
          datasets: [
            {
              label: "Html Template",
              barThickness: 6,
              data: reportBarChartData,
              backgroundColor: reportBarChartColor
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              }
            },
            y: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              },
              border: {
                display: false
              }
            }
          }
        }
      });
      setInterval(() => {
        let newData = reportBarChartData[0];
        reportBarChartData.shift();
        reportBarChartData.push(newData);
        let newColor = reportBarChartColor[0];
        reportBarChartColor.shift();
        reportBarChartColor.push(newColor);
        reportBarChart.update();
      }, 1e3);
      helper.watchClassNameChanges($("html")[0], (currentClassName) => {
        reportBarChart.update();
      });
    }
  })();
})();
