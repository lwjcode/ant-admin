import moment from 'moment';

let preNearstPointes = [];
let bodyPosition = {};
let startPoints = [];
let endPoints = [];
let tag;

class tooltip {
	constructor(d3, className, zoom, height, margin) {
		this.d3 = d3;
		this.className = className;
		this.zoom = zoom;
		this.height = height;
		this.margin = margin;
		zoom.renderZoomBtn();
		zoom.renderBackground();
	}

	addMousemoveListener() {
		const d3 = this.d3;
		const zoom = this.zoom;
		const height = this.height;
		const margin = this.margin;
		bodyPosition = this.getChartBodyPosition();
		let x = 0;
		const chart = d3.select(this.className);
			chart
			.on('mousedown', () => {
				x = d3.event.pageX;
				const { pageX, pageY, target } = d3.event;
				tag = target;
				startPoints = this.getNearstPoints(target, pageX);
			})
			.on('mousemove', () => {
				const endX = d3.event.pageX;
				this.showSome();
				const startX = x - bodyPosition.startX;
				const endx = endX - bodyPosition.startX;
				if (x > 0 && endx > startX) {
					zoom.showBackground(x - bodyPosition.startX + margin.left, endX - bodyPosition.startX + margin.left, height, margin.top);
				}
			})
			.on('mouseup', () => {
				// console.log(d3.event.pageX);
				const { pageX, pageY, target } = d3.event;
				if (pageX - x > 5) {
					zoom.showZoomBtn();
					zoom.clearBackground();
					x = 0;
					endPoints = this.getNearstPoints(tag, pageX);
					if (endPoints.length > 0 && startPoints.length > 0);
					zoom.expandChart(startPoints[0].__data__.date, endPoints[0].__data__.date);
				}
			});
	}

	getChartBodyPosition() {
		const chartBody = this.className.querySelector('.d3-chart-body');
		const position = chartBody.getBoundingClientRect();
		return {
			startX: position.left + 25,
			startY: position.top,
			endX: position.left + position.width,
			endY: position.top + position.height - 20,
		}
	}

	getNearstPoints(target, x) {
		const circleList = target.querySelectorAll('circle');
		let min = 1000;
		let pointArray = [];
		for (let i = 0; i < circleList.length; i++) {
			const position = circleList[i].getBoundingClientRect();
			const distance = Math.abs(position.left - x);
			if (distance < min) {
				min = distance;
				pointArray = [];
				pointArray.push(circleList[i]);
			} else if (distance === min) {
				pointArray.push(circleList[i]);
			}
		}
		return pointArray;
	}
	// 鼠标移动时清除掉上一次的最近点的样式
	clearPreNearstPoints() {
		for (let i = 0; i < preNearstPointes.length; i++) {
			preNearstPointes[i].style.r = 1;
		}
	}

	showCrossLine(x, target) {
		const d3 = this.d3;
		d3.select('.cross-line')
			.attr('x1', x)
		  .attr('x2', x)
		  .style('opacity', 1);
	}

	showTooltip(points, pageX, pageY) {
		const radarTooltip = document.getElementById('radar-tooltip');
    const left = `${pageX + 20}px`;
    const top = `${pageY + 20}px`;
    radarTooltip.style.top = top;
    radarTooltip.style.left = left;
    let content = `<div>${moment(points[0].__data__.date).format('YYYY-MM-DD hh:mm:ss')}</div>`;
    for (let i = 0; i < points.length; i++) {
    	const d = points[i].__data__;
    	content += `<div>
    		<span style="color: ${d.color}">◼</span>
    		<span>${d.key}：</span>
    		<strong>${d.value}</strong>
    	</div>`;
    }
    radarTooltip.innerHTML = content;
    radarTooltip.style.display = 'block';
	}

	createTooltip() {
		const radarTooltip = document.createElement('div');
		document.body.appendChild(radarTooltip);
    radarTooltip.id = 'radar-tooltip';
    radarTooltip.className = 'd3-chart-tooltip';
    radarTooltip.style.display = 'none';
	}

	hindTooltip() {
		const d3 = this.d3;
		d3.select('.cross-line')
			.style('opacity', 0);
		document.getElementById('radar-tooltip').style.display = 'none';
	}

	showSome() {
		const d3 = this.d3;
		this.clearPreNearstPoints();
		const { pageX, pageY, target } = d3.event;
		if (pageX >= bodyPosition.startX && pageX <= bodyPosition.endX && pageY >= bodyPosition.startY && pageY <= bodyPosition.endY) {
			const nearstPoints = this.getNearstPoints(target, pageX);
			preNearstPointes = nearstPoints;
			if (nearstPoints.length > 0) {
				for (let i = 0; i < nearstPoints.length; i++) { // 修改点的半径
					nearstPoints[i].style.r = 4;
				}
				this.showCrossLine(nearstPoints[0].getBoundingClientRect().left - bodyPosition.startX + 60 - 4, target);
				this.showTooltip(nearstPoints, pageX, pageY);
			}
		} else {
			this.hindTooltip();
		}
	}

};


export default tooltip;