function drawXAxis(d3, g, x, height) {
  g.append('g') // 生成x轴
   .attr('class', 'xAxis')
   .attr('transform', `translate(0, ${height})`)
   .call(d3.axisBottom(x));
}

export default drawXAxis;