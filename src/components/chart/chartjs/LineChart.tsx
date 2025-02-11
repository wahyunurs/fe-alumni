import { Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement);

export type DataDiagram = {
    label: string,
    data: number
}

export default function LineChart({ title, label, dataDiagram = [], isShowLabel = false }: { title?: string, label?: string, dataDiagram?: DataDiagram[], isShowLabel?: boolean }){

    const inputLabel = dataDiagram?.map((item) => item.label) || [];
    const inputData = dataDiagram?.map((item) => item.data) || [];

    const data: ChartData<'line'> = {
        labels: inputLabel?.length ? inputLabel : [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [{
            label: label ? label : 'Skills',
            data: inputData?.length ? inputData : [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.5,
        }]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: isShowLabel,
            },
            title: {
                display: true,
                text: title ? title : 'Chart.js Line Chart',
                position: 'top',
                align: 'center',
                color: 'black',
                padding: 3,
            },
            subtitle: {
                display: true,
                color: 'grey',
                text: "Line Chart"
            }
            
        }
    }

    return <Line data={data} options={options} />
}