/*Variable area*/
var Discordbot = require('discord.io');
var config = require('./config');

var bot = new Discordbot({
	email: config.email,
	password: config.password,
	autorun: true
});

//variable for the complete list of memers and their real names
var memers = [];

/*Event area*/
bot.on("err", function(error) {
	console.log(error)
});

bot.on("ready", function(rawEvent) {
	console.log("Connected!");
	console.log("Logged in as: ");
	console.log(bot.username + " - (" + bot.id + ")");
});

bot.on("message", function(user, userID, channelID, message, rawEvent) {
	console.log(user + " - " + userID);
	console.log("in " + channelID);
	console.log(message);
	console.log("----------");
    
	var mapped = memers.map(function(person) { return person.userID; });
	var indexMemer = mapped.indexOf(userID);
	
	if (indexMemer == -1) { //add new user to memers array
		console.log('adding new memer to memers[]');
		
		var memerName = {userID: userID, nick: user, name: 'unknown'};
		memers.push(memerName);
		
		console.log(memers);
	} else { //update object in memer array
		console.log('memer detected in memers[]');
		
		var memerObj = memers[indexMemer];
		memerObj.nick = user;
		
		console.log(memers);
	}
	
    switch(message) {
        case '!nunu ping':
        case '!ping':
            bot.sendMessage({
                to: channelID,
                message: 'ping this you little bitch',
                tts: true
            });
            break;
        case '!nunu help':
        case '!nunu pls':
        case '!nunu halp':
        case '!help':
        case '!halp':
            bot.sendMessage({
                to: channelID,
                message: '*All commands can be called with either*  **!command-name**  *or*  **!nunu command-name** \n\n'+
							'\t __*More features and commands coming soon*__ \n'+
							'\t **!nunu help: **  *get this list you\'re looking at right now, you downsie* \n'+
							'\t **!nunu about: **  *find out who created me* \n'+
							'\t **!nunu creed: **  *recite our sacred memer oath* \n'+
							'\t **!nunu normies: **  *activate my anti-normie protocol* \n'+
							'\t **!nunu time: **  *get the current time* \n'+
							'\t **!nunu laugh: **  *hear my glorious laugh* \n'+
							'\t **!nunu ping: **  *ping me you little bitch, I dare you* \n'+
							'\t **!nunu remember: **  *things to never forget* \n'
            });
            break;
        case '!nunu time':
        case '!time':
            bot.sendMessage({
                to: channelID,
                message: 'it\'s time to tower dive, we must tower dive.',
                tts: true
            });
            break;
        case '!nunu laugh':
        case '!laugh':
            bot.sendMessage({
                to: channelID,
                message: 'ha ha ha ha ha ha ha ha ha ha ha ha ha',
                tts: true
            });
            break;
        case '!nunu about':
        case '!about':
            bot.sendMessage({
                to: channelID,
                message: 'I was created by my master, mastergates. he is the dankest motherfucking meamer.',
                tts: true
            });
            break;
        case '!nunu creed':
        case '!creed':
            bot.sendMessage({
                to: channelID,
                message: 'In Dankest Day and Dopest Night, no rare meme shall escape my sight. Let those who worship normies might; Beware my power, Green Pepe\'s Light!',
                tts: true
            });
            break;
        case '!nunu normies':
        case '!normies':
            bot.sendMessage({
                to: channelID,
                message: 'Kill all normies protocol engaged',
                tts: true
            });
            break;
		case '!nunu remember':
		case '!remember':
			bot.sendMessage({
				to: channelID,
				message: 'Never forgetto the spaghetto',
				tts: true
			});
			break;
		case '!whois all':
			bot.sendMessage({
				to: channelID,
				message: JSON.stringify(memers)
			});
			break;
		case '!nunu names':
		case '!names':
			var combined = '';
			var nicks = memers.map(function (e) { return e.nick; });
			var names = memers.map(function (e) { return e.name; });
			var i;
			
			console.log(nicks);
			console.log(names);
			
			for (i = 0; i < nicks.length; i++) {
				combined = combined + '\t ```' + nicks[i] + ' = ' + names[i] + '``` \n';
			}
			
			bot.sendMessage({
				to: channelID,
				message: combined
			});
    }
	
	if(message.substr(0,9) === '!savename') {
		var chatInputs = message.split(" ");
		
		if (chatInputs.length >= 3) {
			var name = chatInputs[1];
			var userID = chatInputs[2];
			
			console.log(name);
			console.log(userID);
			
			saveName(name, userID);
		}
	}
});

bot.on("presence", function(user, userID, status, rawEvent) {
	var mapped = memers.map(function(person) { return person.userID; });
	var indexMemer = mapped.indexOf(userID);
	
	if (indexMemer == -1) { //add new user to memers array
		console.log('adding new memer to memers[]');
		
		var memerName = {userID: userID, nick: user, name: 'unknown'};
		memers.push(memerName);
		
		console.log(memers);
	} else { //update object in memer array
		console.log('memer detected in memers[]');
		
		var memerObj = memers[indexMemer];
		memerObj.nick = user;
		
		console.log(memers);
	}
});

bot.on("debug", function(rawEvent) {
	/*console.log(rawEvent)*/ //Logs every event
});

bot.on("disconnected", function() {
	console.log("Bot disconnected");
	/*bot.connect()*/ //Auto reconnect
});

/*Function declaration area*/
function sendMessages(ID, messageArr, interval) {
	var callback, resArr = [], len = messageArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 100;
	
	function _sendMessages() {
		setTimeout(function() {
			if (messageArr[0]) {
				bot.sendMessage({
					to: ID,
					message: messageArr.shift()
				}, function(res) {
					resArr.push(res);
					if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
				});
				_sendMessages();
			}
		}, interval);
	}
	_sendMessages();
}

function sendFiles(channelID, fileArr, interval) {
	var callback, resArr = [], len = fileArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;
	
	function _sendFiles() {
		setTimeout(function() {
			if (fileArr[0]) {
				bot.uploadFile({
					to: channelID,
					file: require('fs').createReadStream(fileArr.shift())
				}, function(res) {
					resArr.push(res);
					if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
				});
				_sendFiles();
			}
		}, interval);
	}
	_sendFiles();
}

function saveName(name, userID) {
	var mapped = memers.map(function (e) { return e.userID; });
	var memerIndex = mapped.indexOf(userID);
	
	if(memerIndex == -1) {
		//do nothing
	} else {
		var memerObj = memers[memerIndex];
		memerObj.name = name;
	}
}
