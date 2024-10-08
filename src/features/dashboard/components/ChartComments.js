import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartComments({ collection = null }) {
  const { t } = useTranslation();
  let currentLanguage = i18n.language;
  let fontStyle = null;
  if (currentLanguage === "fa" || currentLanguage === "ar") {
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
            family: fontStyle, // Set the font family for the tooltip body
          },
        },
        legend: {
          position: "top",
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

  const ourColllection = collection?.data;
  const keysArray = Object.keys(ourColllection); // Extract keys
  const valuesArray = keysArray.map((key) => ourColllection[key]); // Map keys to values
  //   console.log("mainData",mainData)
  //   const data = useMemo(() => {
  //     return { labels,
  //       datasets: mainData,
  //     };
  //   }, [labels, mainData]);

  //   const labels = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //   ];

  const data = {
    labels,
    datasets: [
      {
        label: t("comment_counts"),
        data: valuesArray.map((item) => {
          return item;
        }),
        backgroundColor: "#8e44ad",
      },
    ],
  };

  return (
    <TitleCard title={t("chart_comment_counts")}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default ChartComments;
