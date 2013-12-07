<!DOCTYPE html>
<html>

<head>

	<title>Dice</title>
	<link rel="stylesheet" href="/css/styleBall.css" type="text/css">
	<link rel="stylesheet" href="/css/styleChatting.css" type="text/css">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<!-- Pubnub JS Kit -->
	<script src="http://cdn.pubnub.com/pubnub.js"></script>
	<!-- Ball Roll Script -->	
	<script src="/js/ballRoll.js"></script> 
</head>

<body background='/images/cricket_background.jpg'>
		
<div id="container"  >

	<div id="header" style="background-color:#FFA500;">
	<h1 style="margin-bottom:0;">Project # 3 -- Online Cricket -- p3.anwarhaq.biz</h1></div>

	
	<div id="menu" style="background-color:#FFD700;height:650px;width:300px;float:left;">
	<b>-----------------Online Cricket-----------------</b><br>
		<br><br>
			 
		
		
		<button type="button" id='roll' onClick="moveball()"  style="width:300px;color:#FFF700;background-color:#0000FF;">Press to Bowl to Batsman</button><br><br>
		<div id='output'></div>
		<script src="/js/diceCricket.js"></script>
	  
		
		
	</div>

	<div id="content" style="height:650px;width:300px;float:left" >
		<div id="ball" class="bounceBall">
			<img src="/images/ball.jpg" width="50" height="50">
		</div> 
		<div id="batt" class="batting">
			<img src="/images/batt.jpg" width="100" height="200" >
		</div> 

	</div>

	<div id="menu" style="background-color:#FFD700;height:650px;width:400px;float:right;">
	<b>----------------------------Online Chat----------------------------</b><br>


	<div><input id=input placeholder=Enter-your-chat /></div>
		<div id=box></div>
		
		<!-- My PUBNUB Credentials -->
		<div id=pubnub 
				pub-key='pub-c-8658e16f-ebe1-4e5c-a283-73dc328e5d44' 
				sub-key='sub-c-c66b55b0-5c2c-11e3-a8bd-02ee2ddab7fe'>
		</div>
		
		
		<!-- Referencing PUBNUB jquery java script for online chat -->	
		<script src=http://cdn.pubnub.com/pubnub-3.1.min.js></script>
				<script>

				var this_player_id = new Date().getTime()
				console.log(this_player_id);

				(function(){
				var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'chat';
				PUBNUB.subscribe({
				channel : channel,
				callback : function(text) { box.innerHTML = (''+text).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML; }
				});

				PUBNUB.bind( 'keyup', input, function(e) {
				(e.keyCode || e.charCode) === 13 && PUBNUB.publish({
				channel : channel, message : input.value, x : (input.value='')
				});
				} );
				})();

				</script>


	</div>


	<div id="footer" style="background-color:#FFA500;clear:both;text-align:center;">
	CSCI E-15 p3.anwarhaq.biz</div>
</div>
 
</body>
</html>