const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
var server;
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
            role = text.substring(1, text.length).toLowerCase();

            //Games
            switch(role) {
                case 'csgo':
                    msg.member.addRole('584072334537916431')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'league':
                    msg.member.addRole('584072216535367691')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'rocket':
                    msg.member.addRole('584072288962347019')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'siege':
                    msg.member.addRole('584072411423571992')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'smash':
                    msg.member.addRole('584072461507887107')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'overwatch':
                    msg.member.addRole('584090694453428274')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'tft':
                    msg.member.addRole('606254744314576896')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'nuig':
                    msg.member.addRole('480425709769064448')
                        .then(console.log)
                        .catch(console.error);
                    break;
                case 'alumni':
                    msg.member.addRole('570404609387135003')
                        .then(console.log)
                        .catch(console.error);
                    break;

                //Colleges
                default:
                    msg.member.addRole(msg.guild.roles.findKey(r => r.name.toLowerCase() === role.toLowerCase()))
                        .then(console.log)
                        .catch(console.error);
            }
        }
        if(msg.channel.type==='dm') {
            if(server.available) {
                var guildMember = server.fetchMember(msg.author);
                console.log(guildMember.user.username);
            }
            guildMember.addRole(server.roles.findKey(r => r.name.toLowerCase() === msg.content.toLowerCase()))
                .then(console.log)
                .catch(console.error);
            msg.author.send('Thanks! I\'ve given you the ' + msg.content + 'role. You can now send messages in the server.\nYou can get more roles in the #roles channel in the server.');
        }
    }
});

bot.on('guildMemberAdd', member => {
    member.send('Hello, ' + member.user.username + ', and welcome to the ICE Discord server!\nIn order for you to send messages in the server, we need to know which college you are attending. Please reply to this message with the initials of the college you are attending.\nFor example, if you are attending University College Dublin, simply reply with UCD.\nIf you are graduated from college, please reply with "Alumni" without quotes.');
    server = member.guild;
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
