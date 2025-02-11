import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip, Title, SubTitle, CategoryScale, LinearScale, BarElement, ChartData, ChartOptions } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, SubTitle);

export type DataDiagram = {
    label: string,
    data: number
}

export default function BarChart({ title, label, dataDiagram = [], isShowLabel = false }: { title?: string, label?: string, dataDiagram?: DataDiagram[], isShowLabel?: boolean }){
    const inputLabel = dataDiagram?.map((item) => item.label) || [];
    const inputData = dataDiagram?.map((item) => item.data) || [];

    const data: ChartData<'bar'> = {
        labels: inputLabel?.length ? inputLabel :  [
            'Light Blue',
            'Dark Blue',
            'Medium Blue',
            'Amber Yellow',
            'Bright Yellow',
            'Soft Yellow',
            'Pale Blue-Yellow Mix',
        ],
        datasets: [{
          label: label ? label : 'Skills',
          data: inputData?.length ? inputData : [300, 50, 100],
          backgroundColor: [
                '#60A5FA',
                '#F59E0B',
                '#1E3A8A',
                '#FACC15',
                '#2563EB',
                '#A5D8FF',
                '#FEF08A',
          ],
        }],

    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
              display: isShowLabel,
                position: 'top',
                labels: {
                  font: {
                    size: 8
                  }
                }
            },
            title: {
                display: true,
                // text: title ? title : 'Chart.js Line Chart'
            }
        }
    };

    return <Bar data={data} options={options}  />
}