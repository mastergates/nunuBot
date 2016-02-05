/*Variable area*/
var Discordbot = require('discord.io');
var bot = new Discordbot({
	email: "",
	password: "",
	autorun: true
});

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
                message: '*All commands can be called with either*  **!command-name**  *or*  **!nunu command-name** \n\n',
            });
            sendMessages(channelID, [
                '\t __*More features and commands coming soon*__',
                '\t **!nunu help: **  *get this list you\'re looking at right now, you downsie*',
                '\t **!nunu about: **  *find out who created me*',
                '\t **!nunu creed: **  *recite our sacred memer oath*',
                '\t **!nunu normies: **  *activate my anti-normie protocol*',
                '\t **!nunu time: **  *get the current time*',
                '\t **!nunu laugh: ** *hear my glorious laugh*',
                '\t **!nunu ping: ** *ping me you little bitch, I dare you*'
            ]);
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
    }
});

bot.on("presence", function(user, userID, status, rawEvent) {
	/*console.log(user + " is now: " + status);*/
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