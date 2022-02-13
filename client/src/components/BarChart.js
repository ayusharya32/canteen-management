import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ data, label, title }) {
    const state = {
        datasets: [
            {
                label: label,
                backgroundColor: "rgba(250, 207, 180, 0.8)",
                borderColor: "rgba(246, 138, 71, 0.8)",
                borderWidth: 1,
                data: data
            }
        ]
    }
    return (
        <div>
            <Bar
                data={state}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            fontSize: "20"
                        },
                        legend: {
                            display: true,
                            position: "top"
                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart