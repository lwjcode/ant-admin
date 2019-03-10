function drawCrossLine(chart, height) {
	// 画出阈值线
	let g = chart.append('g');
	g.append('line')
	.attr('class', 'cross-line')
  .attr('x1', 0)
  .attr('y1', 80)
  .attr('x2', 0)
  .attr('y2', height + 80)
  .attr("stroke-width", 1.5)
  .style("stroke", 'orange')
  .style('opacity', 0);
}

export default drawCrossLine;