function drawLine(d3, g, x, y, series) {
	// const labelPadding = 3;   
	let line = d3.line()
               .x(function (d) { return x(d.date); })
               .y(function (d) { return y(d.value); });
  let serie = g.selectAll('.serie') // 生成两线条
            .data(series)
            .enter().append('g') 
            .attr('class', 'serie');

        serie.append('path') // 绘画线条
            .attr('clip-path', 'url(#clip)')     
            .attr('class', 'line')
            .attr('stroke-width', 1.5)
            .style('stroke', function (d) { return d[0].color; })
            .attr('fill', 'none')
            .attr('d', line);

        let label = serie.selectAll('.label') // 生成文字包层
            .data(function (d) { return d; })
          .enter().append('g')
            .attr('class', 'label')
            .attr('transform', function (d, i) { return `translate(${x(d.date)}, ${y(d.value)})`; });

        label.insert('circle')
            .attr('fill', function(d) { return d.color; })
            .attr('x', function (d) { return d.date; })
            .attr('y', function (d) { return d.value; })
            .attr('r', 1)
            .on('mouseover', function(d) { // 鼠标移到某个点上，则显示次点的名字和值
               // console.log(d);
              d3.event.target.style.r = 5;
            })
            .on('mouseout', function(d) {
              d3.event.target.style.r = 1;
            })
            .on('click', function() {
            	alert('click');
            });
}

export default drawLine;