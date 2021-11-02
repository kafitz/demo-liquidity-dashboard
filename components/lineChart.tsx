/* ./components/lineCharts.tsx */
import { ResponsiveLine } from '@nivo/line'
import format from 'date-fns/format';

import { formatCash } from '../lib/utils';


interface LineChartProps {
    data: any;
};

const LineChart = (props: LineChartProps) => {
    return (
        <ResponsiveLine
            data={props.data}
            margin={{ top: 20, right: 110, bottom: 70, left: 80 }}
            xScale={{ type: 'time' }}
            yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickPadding: 5,
                tickRotation: -30,
                legend: 'Date',
                legendOffset: 60,
                legendPosition: 'middle',
                format: v => format(v, 'MMM d, yyyy')
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total Value ($)',
                legendOffset: -60,
                legendPosition: 'middle',
                format: v => formatCash(v),
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}                            
        />
    );
}

export default LineChart;
