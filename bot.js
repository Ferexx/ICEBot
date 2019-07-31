const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
/*const twitchData = {
    hub.callback = "";
    hub.mode = "subscribe";
    hub.topic = "https://api.twitch.tv/helix/streams?user_id=52993629";
    hub.lease_seconds = 864000;
}*/
//var xhr = new XMLHttpRequest();
var csgoScheduleURL = '';
var leagueScheduleURL = '';

bot.login(auth.token);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    //subscribeToTwitch();
});

bot.on('message', msg => {
    var text = msg.content;
    text = text.toLowerCase();
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

        //Adding roles to people as they request them
        if(msg.channel.name==='roles') {
            role = text.substring(1, text.length);

            //Games
            switch(role) {
                case 'csgo':
                    msg.member.addRole('584072334537916431');
                    break;
                case 'league':
                    msg.member.addRole('584072216535367691');
                    break;
                case 'rocket':
                    msg.member.addRole('584072288962347019');
                    break;
                case 'siege':
                    msg.member.addRole('584072411423571992');
                    break;
                case 'smash':
                    msg.member.addRole('584072461507887107');
                    break;
                case 'overwatch':
                    msg.member.addRole('584090694453428274');
                    break;
                case 'tft':
                    msg.member.addRole('606254744314576896');
                    break;

                //Colleges
                default:
                    msg.member.addRole(msg.guild.roles.findKey(r => r.name.toLowerCase() === role.toLowerCase()));
            }
        }
    }
});


function subscribeToTwitch() {
    xhr.open("POST", "https://api.twitch.tv/helix/webhooks/hub", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(twitchData));
    xhr.onreadystatechange = function() {
        var json = JSON.parse(xhr.responseText);
    }
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
