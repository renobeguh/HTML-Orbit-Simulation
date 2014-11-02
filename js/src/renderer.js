(function(){
	var ctx, earthImg, earthImgLoaded = false;

	Renderer = function(opts) {
		ctx = UI.canvas.getContext('2d');
		earthImg = new Image();
		earthImg.src = opts.earthimg;
		earthImg.onload = function() { earthImgLoaded = true; };
		return Renderer;
	};

	Renderer.redraw = function()
	{
		clearCanvas();
		
		for (var sat in sats)
		{
			sats[sat].draw();

			//draw lines between satellites
			var subSats = sats.slice(sat+1,sats.length);
			for (var sat2 in subSats){
				drawLine(sats[sat], subSats[sat2]);
			}
		}
		drawEarth();
	};

	Renderer.drawSatellite = function(opts)
	{
		var xpoints = opts.xpoints;
		var ypoints = opts.ypoints;
		var colors = opts.colors;
		var c = opts.c;
		for (var i = xpoints.length-1; i > -1; i=i-10)
		{
			if (c !== undefined)
			{
				drawCircle({
					x:xpoints[i],
					y:ypoints[i],
					radius:1.25,
					fillStyle:c
				});
			}
			else
			{
				drawCircle({
					x:xpoints[i],
					y:ypoints[i],
					radius:1.25,
					fillStyle:colors[i]
				});
			}
		}
		drawCircle(opts);
	};

	function clearCanvas()
	{
		ctx.clearRect(0, 0, UI.canvas.width, UI.canvas.height);
	}

	function drawEarth()
	{
		if (earthImgLoaded === false)
		{
			drawCircle({
				x: earth.x,
				y: earth.y,
				radius: earth.r,
				strokeStyle: "#00FF00",
				fillStyle: "#00FF00"
			});
		}
		else
		{
			ctx.drawImage(earthImg, earth.x-earthImg.width/2, earth.y-earthImg.height/2);
		}
	}

	function drawLine(sat1, sat2){
		ctx.beginPath();
		ctx.moveTo(sat1.x,sat1.y);
	    ctx.lineTo(sat2.x,sat2.y);
	    ctx.closePath();
	    ctx.strokeStyle = "#FFF000";
	    ctx.stroke();
	}

	function drawCircle(opts)
	{
		if (opts.x !== undefined && opts.y !== undefined && opts.radius !== undefined)
		{
			ctx.beginPath();
			ctx.arc(opts.x, opts.y, opts.radius, 0, Math.PI*2, true);

			if (opts.strokeStyle !== undefined)
			{
				ctx.strokeStyle = opts.strokeStyle;
				ctx.stroke();
			}

			if (opts.fillStyle !== undefined)
			{
				ctx.fillStyle = opts.fillStyle;
				ctx.fill();
			}
		}
	}
})();
