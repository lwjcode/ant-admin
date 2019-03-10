function getY(d3, series, height, yAxis) {
	const defaultMax = d3.max(series, function (s) { return d3.max(s, function (d) { return d.value; }); });
	const defaultMin = 0;
	const minValue = yAxis.min || defaultMin;
	const maxValue = yAxis.max || defaultMax;
	yAxis.min = minValue;
	yAxis.max = maxValue;
	const y = d3.scaleLinear() // 定义y轴
            .domain([minValue, maxValue])
            .range([height, 0]);
  return y;
}

export default getY;