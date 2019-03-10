import * as d3 from 'd3';
import legend from './legend';
import getX from './x';
import getY from './y';
import drawX from './xAxis';
import drawY from './yAxis';
import line from './line';
import title from './title';
import thresholdLine from './threshold';
import alarmLine from './alarm';
import crossLine from './crossLine';
import Tooltip from './tooltip';
import Zoom from './zoom';

// const margin = { top: 80, right: 80, bottom: 30, left: 60 };

function initChart(options) {
	const { chart, xAxis, yAxis, series, thresholdLines, alarmLines } = options;
	const { height, container, spacing } = chart;
	const width = container.parentElement.offsetWidth;
	const margin = spacing;
	const chartContainer = d3.select(container)
					  							 .attr('width', width)
					  							 .attr('height', height);
  const g = chartContainer.append('g')
					    						.attr('transform', `translate(${margin.left}, ${margin.top})`) // 设最外包层在总图上的相对位置
					    						.attr('class', 'd3-chart-body');

  const containerWidth = width - margin.left - margin.right;
  const containerHeight = height - margin.left - margin.right;
  let x = getX(d3, series, containerWidth, xAxis);
  let y = getY(d3, series, containerHeight, yAxis);

  drawX(d3, g, x, containerHeight); // x轴
  drawY(d3, g, y); // y轴
	line(d3, g, x, y, series); // 曲线
	thresholdLine(chartContainer, containerWidth, series, containerHeight, yAxis, thresholdLines, margin); // 阈值线
	alarmLine(chartContainer, containerWidth, containerHeight, margin, xAxis, alarmLines); // 报警线
  title(chartContainer, containerWidth, margin); // 标题
  legend(chartContainer, series); // 图例
  crossLine(chartContainer, containerHeight);
  const zoom = new Zoom(d3, chartContainer, containerWidth, series);
  const tooltip = new Tooltip(d3, container, zoom, containerHeight, margin);
  tooltip.createTooltip();
  tooltip.addMousemoveListener();
}

export default initChart;