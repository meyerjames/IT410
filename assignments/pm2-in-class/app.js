console.log("I'm Running");
setInterval(function() {
	if (Math.random() < 0.2) throw Error('Crash!');
	console.log('Still Running');
}, 1000);


