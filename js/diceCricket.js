// Code responsible to retain the value of player 1 score on a cookie.
var cookieManager = { 
  set: function (name, value, expireDays) { 
    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate() + expireDays); 

    document.cookie = name + "=" + escape(value) + 
      ((!expireDays) ? "" : ";expires="+expireDate.toGMTString()); 
  }, 

  get: function (key) { 
    var start,end; 

    if (document.cookie.length > 0) { 
      start = document.cookie.indexOf(key + "="); 

      if (start != -1) { 
        start = start + key.length + 1; 
        end = document.cookie.indexOf(";",start); 

        if (end == -1) { 
          end = document.cookie.length; 
        }
        return unescape(document.cookie.substring(start,end)); 
      }
    }
    return ""; 
  },

  remove: function (key) {
    this.set(key, '', -1);
  }
}





var this_player_id = new Date().getTime()
		var bowler       	= $('#bowler');
		var batsman      	= $('#batsman');
		var output       	= $('#output');
		var ballcount 	 	= 0;
		var batscore 		= 0;
		var totballcount  	= 0;
		
										
				
								
		// PUBNUB credentials
		var pubnub = PUBNUB.init({
			publish_key: 'pub-c-8658e16f-ebe1-4e5c-a283-73dc328e5d44',
			subscribe_key: 'sub-c-c66b55b0-5c2c-11e3-a8bd-02ee2ddab7fe'
		});
		

		/*-------------------------------------------------------------------------------------------------
		Subscribe to the channel
		This is triggered after every turn, since the turn sends a message
		-------------------------------------------------------------------------------------------------*/
		pubnub.subscribe({
			channel: 'game',
			message: function(message){
			
				// Turn the string of JSON into an array
				var results   = $.parseJSON(message);
								
				// Pull the player_id and roll out of the array
				var player_id = results['player_id'];
				var roll      = results['roll'];				

	
				
				ballcount = ballcount+1;
				totballcount = totballcount + 1;
				var ballstop;
				ballstop = ballcount;
				

				// Registering score by the player
				
				output.append('Opponent score on your ball # ');
                output.append(ballcount);
				output.append(' is ');
				output.append(roll);
				if (roll == 0) {
				output.append(' -- OUT!! ');
				output.append(' <img src="/images/out.jpg" width="50" height="50"> ');
				}
				output.append('<br>');
				
				batscore = batscore + roll;

				
				if (ballstop == 6 ) {
				    $("#roll").hide();
				output.append('Total Score = ');
                output.append(batscore);
				output.append('<br><br>');
				playball(player_id,batscore,totballcount);
				ballcount 	 = 0;
				batscore = 0;
				
				}


				if (totballcount == 12 ) {
					$("#roll").hide();
				}

			},

		}

		
);
		

		/*-------------------------------------------------------------------------------------------------
		batsman take a turn
		-------------------------------------------------------------------------------------------------*/
		$('#roll').click(function() {
			

			

			// Score
			var random_number = Math.floor((Math.random()*5));
			var dice_number = random_number -1 ;	
			

			// Data of player_id and score
			data = { 
				'player_id' : this_player_id, 
				'roll' : random_number 
			}
			
			// Convert data to JSON string
			var message = JSON.stringify(data);
			
			// Publish 
			pubnub.publish({
				channel: 'game',        
				message: message,
			});
			
			
		});
	
	
		/*-------------------------------------------------------------------------------------------------
		Called after an inning is over. Responsible for figuring out the decission on the game win or loose.
		-------------------------------------------------------------------------------------------------*/	
		function playball(player_id,totbatscore,totballcount) {

				var firstid = this_player_id;
				var firstscore = totbatscore;

				if(totballcount == 6){
				cookieManager.set('first', firstscore, 1);
				}

				var secondid = player_id;
				var secondscore = totbatscore;


				// Roll was by bowler, not batsman
				if(player_id != this_player_id) {
					$("#roll").show();
				}

				
				console.log(firstid);
				console.log(secondid);
				var firstplayerscore = cookieManager.get('first');
				console.log(firstplayerscore);
				console.log(secondscore);

						
				if(totballcount == 12 ) {

					if (firstplayerscore > secondscore){
					alert('Player 1 wins... ');
					// Remove a key/value:
				cookieManager.remove('first');
					}

						if (firstplayerscore < secondscore){
					alert('Player 2 wins... ');
					// Remove a key/value:
				cookieManager.remove('first');
					}
					
						if (firstplayerscore == secondscore){
					alert('Its a tie!!! ');
					// Remove a key/value:
				cookieManager.remove('first');
					}
				}		
		
		}		