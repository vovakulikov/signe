/**
 * Created by Vova on 28.02.2017.
 */
let interv = genInterval();
let data = {
    type: 'line',

    data: {
        labels: interv,
        datasets: [
                    {
                        label: "Gistogramm of image",
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: true,
                    }
                ]
    },
    options: {
        scales: {
            yAxes: [{
                override: {
                    stacked: true
                }
            }]
        }
    }
}
function genInterval(){
    let inter = [];
    for(let i = 0; i < 255;i=i+1){
        inter.push(i)
    }
    return inter
}
export function configLineChart(config){
    data.data.datasets[0].data = config;
    return data;
}
