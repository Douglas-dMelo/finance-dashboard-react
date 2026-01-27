import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinanceChart({ income, expense }) {
  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  return <div style={{ maxWidth: 300, margin: "0 auto 32px" }}><Pie data={data} /></div>;
}