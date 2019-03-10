class Zoom {
	constructor(d3, chart, width, data) {
		this.chart = chart;
		this.d3 = d3;
		this.width = width;
		this.data = data;
	}

	renderZoomBtn() {
		const chart = this.chart;
		const width = this.width;
		const g = chart.append('g');
		g.append('text')
		 .attr('class', 'd3-resetzoom')
		 .attr('width', 100)
		 .attr('height', 30)
		 .attr('x', width - 60)
		 .attr('y', 20)
		 .style('fill', '#bbb')
		 .style('opacity', 0)
		 .text('Reset zoom')
		 .on('click', () => {
		 		const d3 = this.d3;
				const target = d3.event.target;
		 		this.clearZoomBtn(target);
		 });
	}

	renderBackground() {
		const chart = this.chart;
		const g = chart.append('g');
		g.append('rect')
		 .attr('class', 'd3-background')
		 // .attr('width', endX - startX)
		 // .attr('height', height)
		 // .attr('x', startX)
		 // .attr('y', 0)
		 // .style('fill', 'blue')
		 // .style('opacity', 0);
	}

	showZoomBtn() {
		const d3 = this.d3;
		d3.select('.d3-resetzoom')
			.style('opacity', 1);
	}

	clearZoomBtn(target) {
		if (target) {
			target.style.opacity = 0;
		}
	}

	showBackground(startX, endX, height, top) {
		const d3 = this.d3;
		d3.select('.d3-background')
			.attr('width', endX - startX)
		  .attr('height', height)
		  .attr('x', startX)
		  .attr('y', top)
		  .style('fill', 'blue')
		  .style('opacity', 0.4);
	}

	clearBackground() {
		const d3 = this.d3;
		d3.select('.d3-background')
			.style('opacity', 0);
	}

	expandChart(startPointDate, endPointDate) {
		const series = Object.keys(this.data).map((name, index) => {
      return this.data[name].filter(item => {
      	if (item.date >= startPointDate && item.date <= endPointDate) {
	        return item;
	      }
      });
    });
    console.log(series);
	}

	resetChart() {

	}
}

export default Zoom;

