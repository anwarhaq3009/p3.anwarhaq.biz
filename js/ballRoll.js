<!--
		var x = 0;
		var y = 0;
		var h = 10;
		var v = 2;
		var g = 6;
		var r = 0;
		var q = 0;
		var gg = 5;
		var Netscape=(navigator.appName.indexOf("Netscape") != -1);
		if(Netscape){document.captureEvents(Event.KEYPRESS);document.onkeypress = testKey;}		 
		function moveball() {
			var e = document.getElementById('ball');
			v=v+g;r=q;q=y;if(y==r&&y>394&&g==5)return;
			x=x+h;y=y+v;
			if(x>900+(Netscape)*28){x=752+(Netscape)*28;h=h*-1;}
			if(y>408-(Netscape)*12){y=408-(Netscape)*12;v=v*-1;}
			if(x<0){x=0;h=h*-1;}
			if(v==-26&&gg==5){gg=0;g=5;}
			e.style.top=y + 'px';
			e.style.left=x + 'px';
			t=setTimeout("moveball()",0);
		}
		 
		function testKey(){gg=5;}
		 