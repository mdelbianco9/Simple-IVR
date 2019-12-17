const VoiceResponse = require('twilio').twiml.VoiceResponse;


const testAPICallback = (req, res) => {
	res.send('test API!')
}


// Main menu
/* This function acts as a callback for the /voice route. It sends the digits that the caller presses to the 
/gather route as a request*/
const mainMenu = (req, res) => {
	console.log('Start /voice ==== ', req.body)
	
	const twiml = new VoiceResponse();
	// Set up gathwer verb to accept 1 of two options
	const gather = twiml.gather({
		numDigits: '1',
		action: '/gather',
		method: 'POST',
		input: 'dtmf speech'
	});
	// Say something when the caller is connected.
	gather.say({
		voice: 'woman',
		language: 'en-gb'
	}, 'Welcome to Heaven, to hear more options press 1, to hang up press 2')
	// If the caller doesnt enter anything then loop to main menu
	twiml.redirect('/voice');
	console.log('End /voice')
	// res.type('text/xml');
	res.send(twiml.toString())
}

// Gather
/* Takes a request from the mainMenu function and performs logic as to what to do when ceritan numbers are pressed
by the caller.*/
const gather = (req, res) => {
	console.log('Start /gather ==== ', req.body)
	const twiml = new VoiceResponse();

	if(req.body.Digits == 1) {
		const gather = twiml.gather({
			numDigits: '1',
			action: '/menuTwo',
			method: 'POST',
			input: 'dtmf speech'
		});
		gather.say({
			voice: 'woman',
			language: 'en-gb'
		}, "To be connected to God Press 1, to hang up press 2")
	} else if (req.body.Digits == 2) {
		twiml.hangup();
	} else {
		twiml.redirect('/voice')
	}

	console.log('End /gather ==== ', req.body)
	// Render the response as XML in reply to the webhook request
	// res.type('text/xml');
  	res.send(twiml.toString());
}


// MenuTwo
/* Accepts the dialed numbers from the /Gather route then connects the call or ends the call*/
const menuTwo = (req, res) => {
	console.log('Start /menuTwo ==== ', req.body)
	const twiml = new VoiceResponse();

	if(req.body.Digits == 1) {
		twiml.dial('14153416915');
	}else{
		twiml.hangup();
	}
	console.log('End /menuTwo ==== ', req.body)
	// res.type('text/xml');
  	res.send(twiml.toString());
}



module.exports = {
	testAPICallback: testAPICallback,
	mainMenu: mainMenu,
	gather: gather,
	menuTwo, menuTwo,
}








