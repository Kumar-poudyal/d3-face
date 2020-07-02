$(function() {
	initface();
});

function initface() {
	var svg = d3.select('#face'); 		//svg se;ect
	var height  = +svg.attr('height');  //height from markup
	var width  = +svg.attr('width'); 	//width from markup
	var viewbox  = svg.attr("viewBox", `0 0 ${width} ${height}`)
	var g  = svg.append('g');			//apending group in svg	
	g.attr('transform', `translate(${width / 2}, ${height / 2})`);  //center the group
	var circle  = g.append('circle')
		.attr('r' , height/2)
		.attr('fill' , 'yellow')
		.attr('stroke' , 'black')
	
	var eyeSpacing = 101;
	var eyeYOffset = -89;
	var eyeRadius = 40;
	var eyebrowWidth = 70;
	var eyebrowHeight = 20;
	var eyebrowYOffset = -70;

	var eyesG = g
		.append('g')
			.attr('transform', `translate(0, ${eyeYOffset})`);

	var leftEye = eyesG
		.append('circle')
			.attr('r', eyeRadius)
			.attr('cx', -eyeSpacing);

	var rightEye = eyesG
		.append('circle')
			.attr('r', eyeRadius)
			.attr('cx', eyeSpacing);

	var mounth = g
		.append('path')
			.attr('d', d3.arc()( {
				innerRadius: 150,
				outerRadius: 170,
				startAngle: Math.PI / 2,
				endAngle: Math.PI * 3/2,
			}));

	var eyebrowG = eyesG
		.append('g')
			.attr('transform', `translate(0, ${eyebrowYOffset})`);

	function myTrans() {
		eyebrowG
			.transition().duration(2000)
				.attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
			.transition().duration(2000)
				.attr('transform', `translate(0, ${eyebrowYOffset})`)
			.on("end", function() {
				eyebrowG
				.transition().duration(2000)
					.attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
				.transition().duration(2000)
					.attr('transform', `translate(0, ${eyebrowYOffset})`)
				.on("end", function() { myTrans(); });
			});
	}

	myTrans();

	var leftEyeBrow = eyebrowG
		.append('rect')
			.attr('x', -eyeSpacing - eyebrowWidth/2)
			.attr('width', eyebrowWidth)
			.attr('height', eyebrowHeight)
		

	var rightEyeBrow = eyebrowG
		.append('rect')
			.attr('x', eyeSpacing - eyebrowWidth/2)
			.attr('width', eyebrowWidth)
			.attr('height', eyebrowHeight)
}