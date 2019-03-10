export default function drawLegend(chart, series) {
	// 画出图例  
	let g = chart.append('g');
	let legend = g.selectAll('.legend')
						  .data(series)
						  .enter().append('g').attr('class', 'legend');

  legend.append('rect')
  .attr('x', function (d, i) { return 50 * i;})
  .attr('y', function (d, i) { return 20;})
  .attr("width", 10)
  .attr("height", 10)
  .style('fill', function (d) { return d[0].color; });

  legend.append('text')
  .attr('fill', '#000')
  .attr('x', function (d, i) { return 50 * i + 10;})
  .attr('y', function (d, i) { return 30;})
  .attr("width", 10)
  .attr("height", 10)
  .text(function(d) {return d[0].key});
}