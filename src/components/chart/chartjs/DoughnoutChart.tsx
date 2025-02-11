import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip, Title, SubTitle } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title, SubTitle);

export type DataDiagram = {
  label: string,
  data: number
}

export default function DoughnutChart({ title, label, dataDiagram = [], isShowLabel = false }: { title?: string, label?: string, dataDiagram?: DataDiagram[], isShowLabel?: boolean }){
  
    const inputLabel = dataDiagram?.map((item) => item.label) || [];
    const inputData = dataDiagram?.map((item) => item.data) || [];

    const data: ChartData<'doughnut'> = {
        labels: inputLabel?.length ? inputLabel :  [
          'Green',
          'Red',
          'Yellow'
        ],
        datasets: [{
          label: label ? label : 'Skills',
          data: inputData?.length ? inputData : [300, 50, 100],
          backgroundColor: [   
            'rgb(34, 177, 76)',        
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]
    };

    const options: ChartOptions<'doughnut'> = {
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
        }
    };

    return <Doughnut data={data} options={options}  />
}