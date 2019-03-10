
function drawYAxis(d3, g, y) {
	g.append("g")// 生成y轴
   .attr("class", "yAxis")
   .call(d3.axisLeft(y));
}

export default drawYAxis;