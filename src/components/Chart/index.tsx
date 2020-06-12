import React, { FC, useEffect } from 'react';
import { Chart } from '@antv/g2';

interface Data {
    [propName: string]: string | number;
}

interface Props {
    type: string;
    data: Data[];
}

const POSITION = {
    RingDiagram: 'ringDiagram',
    BarDiagram: 'barDiagram',
};

const index: FC<Props> = (props) => {
    const { type } = props;

    /**环图 */
    const renderRing = () => {
        const data = [
            { item: '事例一', count: 40, percent: 0.4 },
            { item: '事例二', count: 21, percent: 0.21 },
            { item: '事例三', count: 17, percent: 0.17 },
            { item: '事例四', count: 13, percent: 0.13 },
            { item: '事例五', count: 9, percent: 0.09 },
        ];
        const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 500,
        });
        chart.data(data);
        chart.scale('percent', {
            formatter: (val) => {
                val = val * 100 + '%';
                return val;
            },
        });
        chart.coordinate('theta', {
            radius: 0.75,
            innerRadius: 0.6,
        });
        chart.tooltip({
            showTitle: false,
            showMarkers: false,
            itemTpl:
                '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        });
        // 辅助文本
        chart
            .annotation()
            .text({
                position: ['50%', '50%'],
                content: '主机',
                style: {
                    fontSize: 14,
                    fill: '#8c8c8c',
                    textAlign: 'center',
                },
                offsetY: -20,
            })
            .text({
                position: ['50%', '50%'],
                content: '200',
                style: {
                    fontSize: 20,
                    fill: '#8c8c8c',
                    textAlign: 'center',
                },
                offsetX: -10,
                offsetY: 20,
            })
            .text({
                position: ['50%', '50%'],
                content: '台',
                style: {
                    fontSize: 14,
                    fill: '#8c8c8c',
                    textAlign: 'center',
                },
                offsetY: 20,
                offsetX: 20,
            });
        chart
            .interval()
            .adjust('stack')
            .position('percent')
            .color('item')
            .label('percent', (percent) => {
                return {
                    content: (data) => {
                        return `${data.item}: ${percent * 100}%`;
                    },
                };
            })
            .tooltip('item*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent,
                };
            });

        chart.interaction('element-active');

        chart.render();
    };

    /**柱状图 */
    const renderBar = () => {
        const data = [
            { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
            { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
            { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
            { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
            { name: 'London', 月份: 'May', 月均降雨量: 47 },
            { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
            { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
            { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
            { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
            { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
            { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
            { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
            { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
            { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
            { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
            { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
        ];

        const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 500,
        });

        chart.data(data);
        chart.scale('月均降雨量', {
            nice: true,
        });
        chart.tooltip({
            shared: true,
            showMarkers: false,
        });

        chart.interval().position('月份*月均降雨量').color('name').adjust('stack');

        chart.coordinate('rect').transpose();

        chart.interaction('active-region');

        chart.render();
    };

    const renderFn = {
        [POSITION.RingDiagram]: renderRing,
        [POSITION.BarDiagram]: renderBar,
    };

    const currentChart = renderFn[type];

    useEffect(() => {
        currentChart();
    }, [type]);

    return <div id="container"></div>;
};

export default index;
