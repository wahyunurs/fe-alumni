import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title);

export type DataDiagram = {
  label: string;
  data: number;
};

export default function PieChart({
  title,
  label,
  dataDiagram = [],
  isShowLabel = false,
}: {
  title?: string;
  label?: string;
  dataDiagram?: DataDiagram[];
  isShowLabel?: boolean;
}) {
  const inputLabel = dataDiagram?.map((item) => item.label) || [];
  const inputData = dataDiagram?.map((item) => item.data) || [];

  const data: ChartData<'pie', number[], string> = {
    labels: inputLabel.length
      ? inputLabel
      : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: label || '# of Votes',
        data: inputData.length ? inputData : [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        hoverBorderColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        display: isShowLabel,
        labels: {
          color: '#333',
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: 'Arial, sans-serif',
        },
        bodyFont: {
          size: 12,
          family: 'Arial, sans-serif',
        },
        padding: 10,
        boxWidth: 10,
        boxHeight: 10,
      },
      title: {
        display: true,
        text: title || 'Pie Chart',
        font: {
          size: 18,
          family: 'Arial, sans-serif',
          weight: 'bold',
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
