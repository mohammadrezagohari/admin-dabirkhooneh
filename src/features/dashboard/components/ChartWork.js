import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

// getPublicChart

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function ChartWork({ collection = null }) {
  const { t } = useTranslation();
  let currentLanguage = i18n.language;
  let fontStyle = null;
  if (currentLanguage == "fa" || currentLanguage == "ar") {
    fontStyle = "dana";
  } else {
    fontStyle = "danaEn";
  }
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        tooltip: {
          usePointStyle: true,
          bodyFont: {
            family: fontStyle, 
          },
          label: {
            family: fontStyle, 
          },
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 16,
              family: fontStyle,
            },
          },
          datasets: {
            // This more specific font property overrides the global property
            font: {
              size: 16,
              family: fontStyle,
            },
          },
          position: "top",
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: fontStyle,
            },
          },
        },
        y: {
          ticks: {
            font: {
              family: fontStyle,
            },
          },
        },
      },
    };
  }, []);

  const labels = useMemo(() => Object.keys(collection?.data), [collection]);
  const mainData = useMemo(() => Object.values(collection?.data), [collection]);

  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          fill: true,
          label: t("work_count"), // "دفعات پیام",
          data: mainData,
          borderColor: "#e67e22",
          backgroundColor: "#f1c40f",
        },
      ],
    };
  }, [labels, mainData]);

  return (
    <TitleCard title={t("chart_work_count")}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default ChartWork;
