const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const http = new XMLHttpRequest();
const twitchData = {
    
}
var csgoScheduleURL = '';
var leagueScheduleURL = '';

bot.login(auth.token);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    var text = msg.content;
    if(text.substring(0, 1) === '!') {
        if (text === '!ping') {
            msg.reply('pong');
        }
        if (text === '!schedule') {
            switch(msg.channel.name) {
                case 'csgo':
                    msg.reply('find our most recent CS:GO tournament here: ' + csgoScheduleURL);
                    break;
                case 'league-of-legends':
                    msg.reply('find our most recent League tournament here: ' + leagueScheduleURL);
                    break;
            }
        }
        if (text.includes('set') && msg.member.roles.find(r => r.name ==='Administrator')) {
            setGameInfo(text.split(" "));
        }
    }
});

http.open("POST", "https://api.twitch.tv/helix/webhooks/hub");
http.send();
http.onreadystatechange=(e)=> {

}


function setGameInfo(array) {
    switch(array[1].toUpperCase()) {
        case 'CSGO':
            switch(array[2].toUpperCase()) {
                case 'SCHEDULE':
                    csgoScheduleURL = array[3];
                    break;
            }
            break;
        case 'LEAGUE':
            switch(array[2].toUpperCase()) {
                case 'SCHEDULE':
                    leagueScheduleURL = array[3];
                    break;
            }
            break;
    }
}