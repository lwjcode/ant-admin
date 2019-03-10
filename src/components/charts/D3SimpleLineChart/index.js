import React from 'react';
// import PropTypes from 'prop-types';
import defaultConfig from './chartConfig';
import initChart from './initChart';

class D3SimpleLineChart extends React.Component {
  componentDidMount() {
    const data = this.props.data;
    const colors = defaultConfig.colors;
    const series = Object.keys(data).map((name, index) => {
      return data[name].map(item => {
        return {
          color: colors[index],
          key: name,
          date: item.timestamp * 1000,
          value: item.value,
        };
      });
    });
    const options = {
      chart: {
        height: 500,
        spacing: {
          left: 60,
          right: 80,
          top: 80,
          bottom: 30,
        },
        container: this.chartRef, // dom节点
      },
      xAxis: {
        color: '#ccc',
        fontSize: 10,
      },
      yAxis: {
        color: '#ccc',
        fontSize: 10,
        min: 0,
        max: 0,
      },
      pointClick: function () {},
      tooltip: {
        formatter: function () {},
      },
      alarmLines: [1489651500000, 1489652520000], // 时间戳数组
      thresholdLines: [{
        name: 'hna',
        value: 60,
      }], // 阈值
      series: series,
    };

    initChart(options);

  }

  render() {
    return (
      <div className="line-chart--simple">
         <svg ref={(r) => this.chartRef = r}></svg>
      </div>
    )
  }
}


export default D3SimpleLineChart;