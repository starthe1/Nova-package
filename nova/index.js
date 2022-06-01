const gradient = require('gradient-string');
var figlet = require('figlet');
const Aoijs = require("aoi.js");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const chalk = require("chalk");
const up = chalk.green; // ok working color
const static = chalk.hex("#03fcca");// Staticstics and lines color
const blurplexd = chalk.hex("#7289DA"); // xd blurple color
const on = chalk.yellow; // process turned on color


const Discord = require("discord.js");

const config = require("./handler/config.json");


const msg = `Nova`;

figlet(msg, (err, data) => {
  console.log(gradient.pastel.multiline(data));
});

const bot = new Aoijs.Bot({

        connectedBots: true, 
sharding: true,
shardAmount: 100,
    token: config.bots_settings.token, //paste your token here
    prefix: ['$GetServerVar[prefix]','$getglobaluservar[up]'], //change the prefix in line 270
  mobile: false,
fetchInvites: true,
applicationCache: true,
intents: "all",
})

require('./website/dashboard/index.js')(bot, 27026, './Commands/Plugins/', 'NovaPass', '7122011')

const plugins=require("aoi.js-plugins");
const dash = new plugins.Dash({
  bot:bot,
  clientID:config.dash_settings.id,
  clientSecret:config.dash_settings.secret,
  redirectURI:config.dash_settings.redirect
  
})

bot.loadCommands(`/root/novastuff/nova/Commands/Plugins`)


const disbut = require('discord-buttons') 
disbut(bot.client)
//Allows to execute Command


const fetch = require('node-fetch');


bot.variables(require('./handler/Variables.js'))
require('./handler/status')(bot)

bot.onJoined()
bot.onMessage({
  guildOnly: false,

respondToBots:false// commands will work in dms. set "true" for commands to work in guilds only
});


bot.command({
    name: "guess",
    code: `
Alright. Guess my number from \`1 - 10\`. Either type \`<guess>\` or \`hint\`
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[guess;$random[1;10]]
$setUserVar[hint;2]
$setUserVar[msg;0]
`
})
bot.awaitedCommand({
    name: "guess",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
Take a guess first before taking a hint
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`3\` tries left, \`$getUserVar[hint]\` hint(s) left.
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess2",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`2\` tries left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess3",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`1\` try left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess4",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess4;I have waited for to long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! My number is \`$getUserVar[guess]\`
$endIf
`
})

bot.command({
name: "splitText",
code: `
$splitText[1] test1
$splitText[2] test2
`
})

bot.joinCommand({
  channel: "$getServerVar[verifchannel]",
  code: `
  <@$authorID>
  $title[:white_check_mark:VERIFICATION]
  $description[Verify Your Self To Access This Server
  With Send **$getUserVar[code]** At This Channel]
  $image[https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.imgur.com%2FOrxlL0R.jpg&text=$getUserVar[code]&text_size=128&y_align=middle&x_align=center]
  $setUserVar[code;$randomString[5]]
  $onlyIf[$getServerVar[verify]oN;]
  `})

  bot.command({
    name: "setup",
    code: `
    $awaitMessages[$authorID;30s;everything;tsp2;Command has been cancelled]
    $sendMessage[**Which Category Do you want to make For Ticket System.
    Provide the Category ID. 
    This Command will be cancelled after** \`30 seconds\`.;no]
    $onlyPerms[admin;Only Users with \`ADMIN\` perms can use this{delete:10s}]
    $suppressErrors[]`
   })
    
   bot.awaitedCommand({
    name: "tsp2",
    code: `
   **✅ Setup ticket is complete**
    $setServerVar[ticketchannel;$message]
    $onlyIf[$channelExists[$message]==true;Provided Category Doesn't Exist{delete:10s}]
    $onlyIf[$isNumber[$message]==true;Please provide Category ID{delete:10s}]`
   })
    
   bot.command({
    name: "ticket",
    code: `
   $newTicket[ticket-$username[$authorID];{title:Ticket opened!}{description:Hello, <@$authorID>. Here is your ticket!:tickets: Please give the information about your problem or feedback. 
   Thanks in advance for being patient}{footer:Use close to close your ticket};$getServerVar[ticketchannel];no;<@$authorID>, I failed to create your ticket! Try again]
   $sendMessage[Ticket Successfully opened! Hello, <@$authorID>. Go to **$toLowercase[#$username$discriminator]** to describe your issue!;Something went wrong]
 $deleteCommand`
   })
    
   bot.command({
    name: "close",
    code: `
   $closeTicket[This is not a ticket]
   $onlyIf[$checkContains[$channelName;ticket]==true;This command can only be used in tickets{delete:10s}]
   $suppressErrors`
   })
   
bot.command({
name:"giveaway",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won **$get[prize]**;no]
$onlyif[$getmessagevar[ended]==false;]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$wait[$get[time]]
$setmessagevar[endstamp;$get[endstamp];$get[e]]
$setmessagevar[hoster;$authorid;$get[e]]
$setmessagevar[prize;$get[prize];$get[e]]
$let[e;$apimessage[$channelid;;{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**No one** has joined this giveaway}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE};{actionRow:🎊 Join 🎊,2,3,join:🔁 Reroll 🔁,2,1,reroll:🔚 End 🔚,2,4,end};;yes]]
$let[endstamp;$sum[$datestamp;$ms[$get[time]]]]
$let[prize;$messageslice[1]]
$onlyif[$ms[$get[time]]!=undefined;Invalid time provided]
$let[time;$message[1]]
$onlyif[$message[2]!=;Enter a time and a prize]`})
bot.onInteractionCreate()
bot.interactionCommand({
name:"join",
prototype:"button",
code:`$editmessage[$get[msg];{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$get[host]>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users have participated in this giveaway.}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE}]
$setmessagevar[joinedusers;$getmessagevar[joinedusers;$get[msg]]$authorid@;$get[msg]]
$setmessagevar[joined;$get[participated];$get[msg]]
$onlyif[$get[condition]==false;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];false;Joined the giveaway];true;You have already joined the giveaway];ended;The giveaway ended];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;ended];false;$get[condition]]]
$let[condition;$checkcontains[$getmessagevar[joinedusers;$interactiondata[message.id]];$authorid]]
$let[participated;$sum[$getmessagevar[joined;$get[msg]];1];$get[msg]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"reroll",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (REROLLED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Reroll:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the reroll of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]
})==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Rerolled the giveaway];true;This giveaway has not ended yet];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;$replacetext[$replacetext[$get[condition];true;perform];false;false]];false;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"end",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (FORCE ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Force End:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the giveaway(force ended) of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Ended the giveaway];true;This giveaway has already ended];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];false;$replacetext[$replacetext[$get[condition];true;perform];false;false]];true;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})

bot.command({
    name: "shardID",
    code: `Guilds Shard: $shardID`
})
  
bot.command({
name: "create",
code: `$createSlashCommand[$guildID;say;send a message;message:your message:true:3]`})

bot.command({
name: "create",
code: `$createSlashCommand[$guildID;AOIjs;A cool slash command for AOIjs]`
/*
    Code Breakdown:
This will make a slashcommand named "AOIjs" (meaning you'd do /AOIjs),
the description will say "A cool slash command for AOIjs"
*/
})

bot.reactionAddCommand({
  channel:"$channelid",
  code:`$setchannelvar[to;$authorid;$splittext[1]]
  $textsplit[$newticket[ticket-$username-$discriminator;<@$authorid> {title:Welcome to your ticket, $username!}{description:$advancedtextsplit[$getservervar[tmm];/;$findtextsplitindex[$messageid]]}{color:FFFF}{footer:$username[$clientid] tickets | Created with ❤️:$useravatar[$clientid]}{thumbnail:$authoravatar}{author:$usertag:$replacetext[$replacetext[$checkcondition[$servericon==];true;];false;$servericon]};$advancedtextsplit[$getservervar[tmc];/;$findtextsplitindex[$messageid]];yes;]; ]
  $clearreactions[$channelid;$messageid;$authorid;$emojitostring]
  $onlyif[$findtextsplitindex[$messageid]!=0;]
  $onlyif[$isbot==false;]
  $textsplit[$getservervar[tmid];/]
  $onlyif[$getservervar[tmid]!=a;]
  $onlyif[\`$emojitostring\`==\`🎫\`;]`})
  bot.onReactionAdd()





    
    
    
    
bot.command({
  name: "addemoji",
  aliases: "steal",
  code:`Emoji $addEmoji[https://cdn.discordapp.com/emojis/$replaceText[$replaceText[$checkCondition[$checkContains[$message[1];<]$checkContains[$message[1];:]$checkContains[$message[1];>]==truetruetrue]$isNumber[$message[1]];truefalse;$replaceText[$advancedTextSplit[$message[1];:;3];>;]];falsetrue;$message[1]];$message[2];yes] added with the name -> **$message[2]**
 $onlyIf[$charCount[$message[2]]>=2;⛔ **You must put a longer name over than \`2 chars\`**]
 $onlyIf[$message[2]!=;**Usage**: \`addemoji <emoji | emojiID> <name>\`]
$onlyPerms[manageemojis;**You dont have the permission to use this command**]
$onlyBotPerms[manageemojis;**I dont have the permission to use this command**]
$suppressErrors`
})

  



 

bot.command({
name: "antilink",
code: `$let[e;$apiMessage[;{author:$username[$authorID]#$discriminator[$authorID]:$authorAvatar::}{description:✅ -> \`Enable\`\n\n⛔ -> \`Disable\`\n**Antilink status:** $replaceText[$replaceText[$getServerVar[antilink];true;Enabled];false;Disabled]}{timestamp:ms}{color:#5865F2};{actionRow:Enable,2,1,EnableButton,✅|0|false:Disable,2,1,DisableButton,⛔|0|false};;yes]]
$onlyPerms[admin;Missing permission:\`admin\`]
$onlyBotPerms[admin;Missing permission:\`admin\`]`
})
 
bot.interactionCommand({
 name: "EnableButton",
 prototype:"button",
 code:`$setServerVar[antilink;true]
$interactionReply[;{title:✅ Done}{description:Antilink successfully enabled!}{color:#7BDE3D};;0;7]
$onlyIf[$getServerVar[antilink]==false;$interactionReply[Antilink already enabled!;;;0;4]`
})
 
bot.interactionCommand({
 name: "DisableButton",
 prototype:"button",
 code:`$setServerVar[antilink;false]
$interactionReply[;{title:✅ Done}{description:Antilink successfully disabled!!}{color:#179C33};;0;7]
$onlyIf[$getServerVar[antilink]==true;$interactionReply[Antilink already disabled!;;;0;4]`
})
 
 
bot.command({
name: "$alwaysExecute",
code: `
$deleteIn[5s]
<@$authorID>, \`You can't send links here!\` ***Reason***:**Antilink Enabled.**
$deletecommand
$onlyIf[$checkContains[$message;https#COLON#://;http#COLON#//;discord.gg/;https://discord.gg/]==true;]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==false;]
 $onlyIf[$getServerVar[antilink]==true;] 
`})



bot.command({
name: "removerole",
code: `$color[RANDOM]
$takeRoles[$mentioned[1];$mentionedRoles[1]]
$title[Removed role to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has taken <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
name: "giverole",
aliases: ['role' , 'grole'],
code: `$color[RANDOM]
$giveRoles[$mentioned[1];$mentionedRoles[1]]
$title[Role given to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has given <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
  name: "temprole",
  code: `
$channelSendMessage[$channelID;<@$mentioned[1]>, I removed the $roleName[$findRole[$message[2]]] role, time's up]
$takeRoles[$mentioned[1];$findRole[$message[2]]]
$wait[$replaceText[$replaceText[$checkCondition[$message[3]==];true;24d];false;$message[3]]]
$channelSendMessage[$channelID;{description::white_check_mark: | $username[$mentioned[1]]#$discriminator[$mentioned[1]] has been given the $roleName[$findRole[$message[2]]] role. For \`$replaceText[$replaceText[$checkCondition[$message[3]==];true;undefined time];false;$message[3]]\`}{color:RANDOM}]
$giveRoles[$mentioned[1];$findRole[$message[2]]]
$suppressErrors[{title:An error occured}{description:Looks like I can't find the role}{color:RED}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than me on role position]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$argsCheck[>3;Incorrect arguments. Example: temprole @user @role]
$onlyPerms[manageroles;{title:Missing Permissions}{color:RANDOM}{description:You don't have \`MANAGE_ROLES\` permissions to use this command}]`
})



//utility start
bot.deletedCommand({
 channel: "$channelID",
 code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day $month $year - $hour:$minute]`
});
bot.onMessageDelete();
 
bot.command({
name: "snipe",
code: `$color[RANDOM]
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]`
})
 
bot.command({
name: "quote",
code: ` $author[$userTag[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]];$userAvatar[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]]]
$description[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];content]
 
[Jump to message\\]($replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$message];false;https://discord.com/channels/$guildID/$mentionedChannels[1;yes]/$noMentionMessage])]
$textSplit[$message;/]
$color[RANDOM]
$suppressErrors[**⛔ Could not find message**]`
})
 
 
bot.updateCommand({
 channel: "$channelID",
 code: `$setChannelVar[msgEditorID;$authorID]
 $setChannelVar[esnipeOldMsg;$oldMessage]`
})
bot.onMessageUpdate();
 
bot.command({
 name: "editsnipe",
 aliases: ["esnipe"],
 code: `$author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
$description[$getChannelVar[esnipeOldMsg]]
$addTimestamp
$color[RANDOM]
$onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$suppressErrors[There is nothing to snipe]`
})
//utility end













//moderation
bot.command({
  name: "ban",
  code: `$author[$userTag[$findUser[$message[1];no]] has been banned;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[FF0000]
  $addTimestamp
  $ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't ban yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't ban the owner of the server]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user was already banned from the server]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't ban me with myself]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
  $argsCheck[1;Invalid command usage, try using it like:
ban [member] (optional reason)
 
Example:
ban @user/ID optional reason]
  $onlyBotPerms[ban;I need \`Ban\` permission to do this]
  $onlyPerms[ban;you need \`Ban\` permission to do this]
  $suppressErrors[user not found]
  $sendDM[$sendDM[$findUser[$message[1]];{author:You have been banned from $serverName}{description:**Moderator:** $userTag[$authorID]
**Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]}`
})
bot.command({
  name: "kick",
  code: `$author[$userTag[$findUser[$message[1];no]] has been kicked;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[ffd84d]
  $addTimestamp
  $kick[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user is banned from the server]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't kick me with myself]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't kick yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't kick the owner of the server]
   $argsCheck[1;❌ **incorrect usage**
  
  ✅ correct usage: kick @user/ID optional reason]
   $onlyBotPerms[kick;I need \`Kick\` permission to do this]
  $onlyPerms[ban;you need \`Kick\` permission to do this]
  $suppressErrors[user not found]`
})
bot.command({
  name: "setmuterole",
  aliases: "setmute",
  code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $description[the <@&$findRole[$message[1]]> role has been established as a mute role]
  $color[$getRoleColor[$findRole[$message[1]]]]
  $addTimestamp
  $setServerVar[mute;$findRole[$message[1]];$guildID]
  $onlyIf[$roleExists[$findRole[$message[1]]]==true;that role doesn't exist]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$message[1]]];my highest role is lower than the role you choose]
  $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
  $suppressErrors[role not found]`
  })
  bot.command({
  name: "mute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been muted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $giveRole[$findUser[$message[1];no];$getServerVar[mute]]
    $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to mute is higher than my highest role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
  $onlyIf[$hasRole[$findUser[$message[1];$getServerVar[mute]]]==false;this user was already muted]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
    $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to mute the user]`
})
bot.command({
  name: "unmute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been unmuted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $takeRole[$findUser[$message[1];no];$getServerVar[mute]]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to unmute is higher than my highest role]
 
$onlyIf[$hasRole[$findUser[$message[1];no];$getServerVar[mute]]==true;this user is not muted]
  $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
    $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
    $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
$onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to unmute the user]`
})
bot.command({
  name: "warn",
  code: `$author[$userTag[$findUser[$message[1];no]] has been warned;$userAvatar[$findUser[$message[1];no]]]
  $title[**Moderator:** $userTag[$authorID]]
  $description[**Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[RANDOM]
  $addTimestamp
  $setUserVar[warn;$sum[$getUserVar[warn;$findUser[$message[1];no]];1];$findUser[$message[1];no]]
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;you can't warn bots]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't warn the owner of the server]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't warn yourself]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: warn @user/ID optional reason]
  $onlyPerms[kick;you need \`Kick\` permission]
  $suppressErrors[user not found]`
})
bot.command({
  name: "warns",
  code: `$author[$userTag[$findUser[$message[1];no]];$userAvatar[$findUser[$message[1];no]]]
  $title[Have: $getUserVar[warn;$findUser[$message[1]]] infractions]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: infractions @user/ID]
  $suppressErrors[user not found]`
})
bot.command({
  name: "tempmute",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$giveRole[$findUser[$message[1]];$getServerVar[mute]]
$setTimeout[$message[2];userID: $findUser[$message[1]]
serverID: $guildID]
$onlyIf[$hasRole[$findUser[$message[1]];$getServerVar[mute]]==false;this user was already muted]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
$onlyIf[$getServerVar[mute]!=;you didn't set the mute role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't mute the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't mute me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[manageroles;I need \`Manage roles\` permission]
$onlyPerms[manageroles;you need \`Manage roles\` permission]`
})
bot.command({
  name: "tempban",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$setTimeout[$message[2];userID2: $findUser[$message[1]]
reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;this user was already banned]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't ban the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't ban me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[ban;I need \`Ban\` permission]
$onlyPerms[ban;you need \`Ban\` permission]`
})
bot.command({
  name: "clear",
  aliases: "purge",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully deleted $message[1] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message]]
  $color[RANDOM]
  $addTimestamp
 
$clear[$message[1]]
  $onlyIf[$checkContains[$message[1];-]==false;you can use negative numbers, stop trying to break me smh]
  $onlyIf[$message[1]=>1;you can only clear more than 1 message]
  $argsCheck[>1;❌ incorrect usage
  
  ✅ correct usage: clear <number>]
  $onlyPerms[managemessages;you need \`Manage messages\` permission]
  $onlyBotPerms[managemessages;I need \`Manage messages\` permission]
$suppressErrors[failed to clear the messages]`
})
bot.command({
  name: "clearwarns",
code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $title[$message[last] warnings cleared from $userTag[$findUser[$message[1];no]]]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $onlyPerms[kick;you need \`Kick\` permission]
  $onlyIf[$isNumber[$message[last]]==true;please write a valid number of warnings to clean from the user]
  $onlyIf[$getUserVar[warn;$findUser[$message[1]]]<=$message[last];the user does not have that amount of warnings to clean]
  $onlyIf[$checkContains[$message[last];-]==false;please write a valid **positive number** of warnings to clean from the user]
    $setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message[1];no]];$message[last]];$findUser[$message[1];no]]
  $argsCheck[>1;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $argsCheck[>2;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $suppressErrors[failed to clear the warnings]`
})



 
bot.timeoutCommand({
 
 
code: `$sendDM[$timeoutdata[userID2];you have been unbanned in $serverName[$timeoutdata[serverID]]]
$unban[$timeoutdata[userID2]]`
 
})
 
bot.timeoutCommand({
 
code: `$sendDM[$timeoutdata[userID];you have been unmuted in $serverName[$timeoutdata[serverID]]]
$takeRole[$timeoutdata[userID];$getServerVar[mute;$timeoutdata[serverID]]]`
 
})

bot.JoinCommand = ({
channel: "$getServerVar[welcome_channel]",
code: `$channelsendmessage[$replacetext[$replacetext[$checkcondition[$getservervar[welcome_channel]==];true;$channelid];false;$getservervar[welcome_channel]];{title: Welcome to $serverName $username}{image:http://api2.nova-bot.tk/card?avatar=$replaceText[$userAvatar[$findmember[$message;yes]];webp;png]&middle=%20&bottom=%20&name=welcome%20to%20the%20server%20$username&text=#fffff&avatarborder=#5865F2&avatarbg=hex&background=https://cdn.nova-bot.tk/5ynk5an5.jpg}{color:#2f3136}`,
})
bot.onJoined();
//nod end

bot.command({
 name: "redeem", 
 code:  `$author[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
 $description[**$customEmoji[success] Success:** <@$authorID> You've claimed premium perks for 1 month]
 $color[GREEN]
$setUserVar[premium;true;$authorID]
$setTimeout[30d;userID: $authorID]
$onlyIf[$getUserVar[premium;$authorID]==false;**⛔ You have already redeemed your perk**]
 $onlyIf[$hasRole[$authorID;962276067765256242]==true;{description:**⛔ You aren't a \`booster\` in my** [support server](https://discord.gg/BASBGn7Gwh)}{color:RED}]
 $onlyForServers[895560577055883265;{description:**⛔ You can use this command only in my** [support server](https://discord.gg/BASBGn7Gwh}{color:RED}]`
})
 
bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Your premium has just run out!]
 $setUserVar[premium;false;$timeoutData[userID]]`
})

//economy commands
bot.command({
  name: "work", 
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[45;100]];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[5;10]];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Work]
  $description[
  $username, $randomText[it looks like you'd do anything for money 😳.;you were employed as a construction worker today!;you're a discord workaholic!;nice music dude! Here, you earned it!;you were employed as a hair stylist today;hacking can make you a good deal of money if you know what you're doing! From your last hack job, you made;your bitcoin miner scraped up some cash for you!;were you not satisfied with your past employers? Well I counted the tips from your pole dancing gig and you didn't do too bad 😳]
  ]
  $footer[💵 +$$random[45;100] | 🗡 +$random[5;10]xp]
  $globalCooldown[60s;Try again in %time%]`
  })
   
  bot.command({
  name: "beg", 
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[0;5]];$authorID]
  $title[Beg]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $description[$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
  ]
  $footer[💵 +$$random[0;25] | 🗡 +$random[0;5]xp]
  $globalCooldown[30s;Quit being a begger and try again in %time%]`
  })
   
  bot.command({
  name: "bal", 
  code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
  $thumbnail[$userAvatar[$mentioned[1;yes]]]
  $color[RANDOM]
  $title[$username[$mentioned[1;yes]]'s Balance]
  $description[
  $addField[🗡 Experience;
  $numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]xp
  ]
  $addField[💵 Wallet;
  $$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
  ]
  $addField[🏦 Bank;
  $$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
  ]
  $addField[📊 Net Worth;
  $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]
  ]]`
  })
   
  bot.command({
  name: "profile",
  code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ Discord bots dont have profiles**]
  $thumbnail[$userAvatar[$mentioned[1;yes]]]
  $title[Economy profile]
  $color[RANDOM]
  $description[
  **__User/ID__**:
  <@$mentioned[1;yes]>
  $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]
  (\`$mentioned[1;yes]\`)
   
  **__Badges__**:
  **$getUserVar[badge1], $getUserVar[badge2], $getUserVar[badge3]**

  **__Chests__**:
  **$getGlobalUserVar[DailyChest;$mentioned[1;yes]]** | Daily
  **$getGlobalUserVar[lucky;$mentioned[1;yes]]** | Lucky
  **$getGlobalUserVar[spiteful;$mentioned[1;yes]]** | Spiteful
   
  **__Flow__**:
  \`💵\` **$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]**
  \`🏦\` **$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]**
  \`📊\` **$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]**
  \`🗡\` **$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]**xp
   
  **__Assets__**:
  \`💼\` ($getGlobalUserVar[duffle;$mentioned[1;yes]]) Bags
  \`📺\` ($getGlobalUserVar[tv;$mentioned[1;yes]]) TVs
  \`📱\` ($getGlobalUserVar[smartphone;$mentioned[1;yes]]) Smartphones
  \`💻\` ($getGlobalUserVar[laptop;$mentioned[1;yes]]) Laptops
  \`🚗\` ($getGlobalUserVar[car;$mentioned[1;yes]]) Cars
  \`🚚\` ($getGlobalUserVar[truck;$mentioned[1;yes]]) Trucks
  \`🚁\` ($getGlobalUserVar[helicopter;$mentioned[1;yes]]) Helicopters
  \`🏫\` ($getGlobalUserVar[apartment;$mentioned[1;yes]]) Apartments
  \`🏡\` ($getGlobalUserVar[house;$mentioned[1;yes]]) Houses
  \`🏰\` ($getGlobalUserVar[mansion;$mentioned[1;yes]]) Mansions
] `
  })
   
   
  bot.command({
  name: "deposit", 
  aliases: 'dep',
  code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
  $setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
  $title[Deposited]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $description[
  $username, you deposited $$numberSeparator[$message] into your bank!]
  $footer[💵 $$numberSeparator[$sub[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sum[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
  $onlyIf[$isNumber[$message[1]]==true;That's not a number!]
  $onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]
  $argsCheck[>1;How much are you depositing? Try this: \`$getServerVar[prefix]dep <amount>\`]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
  })
   
   
  bot.command({
    name: 'withdraw',
    aliases: 'with',
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
  $setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
  $title[Withdrew]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $description[
  $username, you withdrew $$numberSeparator[$message] from your bank!]
  $footer[💵 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sub[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
  $onlyIf[$isNumber[$message[1]]==true;That's not a number!]
  $onlyIf[$message<=$getGlobalUserVar[Bank;$authorID];Cannot withdraw more than what's in your bank!]
  $argsCheck[>1;How much are you withdrawing?]
  $onlyIf[$getGlobalUserVar[Bank;$authorID]>0;There's nothing to withdraw!]`
  })
   
   
  bot.command({
  name: "daily",
  code: `$setGlobalUserVar[DailyChest;$sum[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Daily Chest]
  $description[
  Congrats $username! You received 1 daily chest!
  This action can be done once every 12 hours.
  ]
  $footer[To open use, $getServerVar[prefix]open-daily]
  $onlyIf[$getGlobalUserVar[DailyChest;$authorID]<1;**You still have an unopened daily chest in your inventory. Open it for room to receive another chest.** \`$getServerVar[prefix]open-daily\`]
  $globalCooldown[12h;**⛔ Please wait %time% before you can claim another daily chest!**]`
  })
   
   
  bot.command({
  name: "open-daily",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
  $setGlobalUserVar[DailyChest;$sub[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];15];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Daily Chest]
  $description[$username, you opened your Daily Chest!
  ]
  $footer[💵 +$250 | 🗡 +15xp]
  $onlyIf[$getGlobalUserVar[DailyChest;$authorID]==1;**⛔ You dont have a Daily Chest yet! Try using \`$getServerVar[prefix]daily\` to receive your Daily Chest and then run this command to open it**]`
  })
   
   
  bot.command({
  name: "heist",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4800;7600]];$authorID]
  $setGlobalUserVar[laptop;$sub[$getGlobalUserVar[laptop;$authorID];1];$authorID]
  $setGlobalUserVar[smartphone;$sub[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
  $setGlobalUserVar[duffle;$sub[$getGlobalUserVar[duffle;$authorID];1];$authorID]
  $setGlobalUserVar[tv;$sub[$getGlobalUserVar[tv;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[20;42]];$authorID]
  $color[00ff00]
  $thumbnail[$userAvatar[$authorID]]
  $title[Heist]
  $description[$username, you used a \`Laptop\` to hack the security system in your favor, a rooted \`Smartphone\` to shut down the cameras and used the \`TV\` screen to monitor surveillance while you fill your \`Bag\` with a buttload of cash and then tossed the contraband $randomText[in a lake!;over a bridge!;down a storm drain!;in separate dumpsters around town!;in the bed of a random truck!;on a roof!;in a ditch!]
  ]
  $footer[💵 +$$numberSeparator[$random[4800;7600]] | 🗡 +$random[20;42]]
  $onlyIf[$getGlobalUserVar[laptop;$authorID]>=1;Missing laptop. Try working for it and buying one first.]
  $onlyIf[$getGlobalUserVar[smartphone;$authorID]>=1;Missing smartphone. Try working for it and buying one first.]
  $onlyIf[$getGlobalUserVar[duffle;$authorID]>=1;Missing bag. Try working for it and buying one first.]
  $onlyIf[$getGlobalUserVar[tv;$authorID]>=1;Missing TV. Try working for it and buying one first.]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need at least 300 XP to commit a heist! \`XP will not be deducted and is only needed as a requirement!\`]
  $globalCooldown[3h;Wait %time% until you can launch another heist!]`
  })
   
  bot.command({
  name: "givemoney", 
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
  $setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$noMentionMessage];$authorID]
  $color[RANDOM]
  $thumbnail[$userAvatar[$authorID]]
  $title[$username gave $username[$mentioned[1]] money]
  $description[
  $username gave $username[$mentioned[1]] **$noMentionMessage** :dollar:!
  $username[$mentioned[1]] is now holding **$sum[$getGlobalUserVar[Wallet;$mentioned[1]];$noMentionMessage]** :dollar: in his wallet!
  ]
  $onlyIf[$noMentionMessage<=$getGlobalUserVar[Wallet;$authorID];**⛔ You don't have enough in your wallet**]
  $onlyIf[$mentioned[1]!=$authorID;**⛔ You can't give money to yourself**]
  $onlyIf[$mentioned[1]!=;**⛔ Mention someone to give money to and then the amount, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
  $onlyIf[$isBot[$mentioned[1]]!=true;**⛔ You can't give money to a Discord bot**]
  $onlyIf[$isNumber[$noMentionMessage]==true;**⛔ That is not a number, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
  $suppressErrors[Usage: **$getServerVar[prefix]givemoney <@user> <amount>**]`
  })
   
  bot.command({
  name: "shop", 
  code: `$thumbnail[$authorAvatar]
  $title[Economy Shop]
  $color[RANDOM]
  $description[
$addField[
  __Badges:__;
 \`<:badge1:914161692617875456>\` **$1000 | beginner badge**
 \`<:badge3:914161810838519819>\` **$1500 | pro badge**
 \`<:badge2:914161785890828318>\` **$10000 | advanced badge**
]
ur pfp cute

  $addField[
    __Items:__;
  \`💼\` **$250 | bag**
  \`📺\` **$400 | tv**
  \`📱\` **$500 | phone**
  \`💻\` **$1,000 | laptop**
  \`🚗\` **$10,000 | car**
  \`🚚\` **$15,000 | truck**
  \`🚁\` **$20,000 | helicopter**
  \`🏫\` **$50,000 | apartment**
  \`🏡\` **$100,000 | house**
  \`🏰\` **$500,000 | mansion**
  ]
  $addField[__Purchasable chests:__;
  **$250 | lucky**
  **$1,000 | spiteful**
  \`Lucky\` - **Press your luck. Nobody loses!**
  \`Spiteful\` - **Possibility of winning $10,000 but be warned, it could be spiteful! Goodluck!**
  ]]`
  })
   
  bot.command({
  name: "buy-car", 
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];10000];$authorID]
  $setGlobalUserVar[car;$sum[$getGlobalUserVar[car;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];250];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=10000;Need $10,000 in your wallet, try withrawing it first.]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=250;You need 250 XP, in which will be deducted after purchase.]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[🚗 $username]
  $description[
  Nice! You bought a Car for $10,000!
  **250xp has been deducted!**
  You can strip it for parts to scrap for more money and XP.
  ]
  $footer[Usage: $getServerVar[prefix]scrap-car]`
  })
   
  bot.command({
  name: "buy-phone",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500];$authorID]
  $setGlobalUserVar[smartphone;$sum[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>499;Need $500 in your wallet, try withrawing it first]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[📱 $username]
  $description[
  Nice! You bought a smartphone for $500!
  ]
  $footer[This item is used to commit a heist]`
  })
   
  bot.command({
  name: "buy-tv",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];400];$authorID]
  $setGlobalUserVar[tv;$sum[$getGlobalUserVar[tv;$authorID];1];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>399;Need $400 in your wallet, try withrawing first]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[📺 $username]
  $description[
  Nice! You bought a TV for $400!
  ]
  $footer[This item is used to commit a heist]`
  })
   
  bot.command({
  name: "buy-truck",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];15000];$authorID]
  $setGlobalUserVar[truck;$sum[$getGlobalUserVar[truck;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];300];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=15000;Need $15,000 in your wallet, try withrawing it first]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need 300 XP, in which will be deducted after purchase]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[🚚 $username]
  $description[
  Nice! You bought a Truck for $15,000!
  **300xp has been deducted!**
  You can strip it for parts to scrap for more money and XP.
  ]
  $footer[Usage: $getServerVar[prefix]scrap-truck]`
  })
   
  bot.command({
  name: "buy-laptop",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
  $setGlobalUserVar[laptop;$sum[$getGlobalUserVar[laptop;$authorID];1];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first.]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[💻 $username]
  $description[
  Nice! You bought a laptop for $1,000!
  ]
  $footer[This item is used to commit a heist]`
  })
   
  bot.command({
  name: "buy-helicopter",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];20000];$authorID]
  $setGlobalUserVar[helicopter;$sum[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];350];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=20000;Need $20,000 in your wallet, try withrawing it first]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=350;You need 350 XP, in which will be deducted after purchase.]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[🚁 $username]
  $description[
  Nice! You bought a Helicopter for $20,000!
  **350xp has been deducted!**
  You can strip it for parts to scrap for more money and XP.
  ]
  $footer[Usage: $getServerVar[prefix]scrap-helicopter]`
  })
   
  bot.command({
  name: "buy-house",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100000];$authorID]
  $setGlobalUserVar[house;$sum[$getGlobalUserVar[house;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];500];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=100000;Need $100,000 in your wallet, try withrawing it first.]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=500;You need 500 XP, in which will be deducted after purchase.]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[🏡 $username]
  $description[
  Nice! Stepping up! You bought a House for $100,000!
  **500 XP has been deducted!**
  Coming up in the world I see! The real estate business is in high demand and you can make a difference! Try flipping the house to make a profit and earn more XP.
  ]
  $footer[Usage: $getServerVar[prefix]flip-house]`
  })
   
   
  bot.command({
  name: "buy-apartment",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];50000];$authorID]
  $setGlobalUserVar[apartment;$sum[$getGlobalUserVar[apartment;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];400];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=50000;Need $50,000 in your wallet, try withrawing it first.]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=400;You need 400 XP, in which will be deducted after purchase.]
  $thumbnail[$authorAvatar]
  $color[RANDOM]
  $title[🏫 $username]
  $description[
  Nice! Stepping up! You bought an Apartment for $50,000!
  **400xp has been deducted!**
  The real estate business is in high demand and you can make a difference! Try flipping the apartment to make a profit and earn more XP.
  ]
  $footer[Usage: $getServerVar[prefix]flip-apartment]`
  })
   
  bot.command({
  name: "buy-mansion",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500000];$authorID]
  $setGlobalUserVar[mansion;$sum[$getGlobalUserVar[mansion;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];750];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=500000;Need $500,000 in your wallet, try withrawing it first]
  $onlyIf[$getGlobalUserVar[XP;$authorID]>=750;You need 750 XP, in which will be deducted after purchase]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[🏰 $username]
  $description[
  Nice! You bought a Mansion for $500,000!
  **750 XP has been deducted!**
  Now you're just showing off and living it up lol! Try flipping the mansion to make a profit and earn more XP.
  ]
  $footer[Usage: $getServerVar[prefix]flip-mansion]`
  })
   
  bot.command({
  name: "buy-bag",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
  $setGlobalUserVar[duffle;$sum[$getGlobalUserVar[duffle;$authorID];1];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[💼 $username]
  $description[
  Nice! You bought a dufflebag for $250!
  ]
  $footer[This item is used to commit a heist]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withdrawing it first]`
  })
   
  bot.command({
  name: "buy-spiteful",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
  $setGlobalUserVar[spiteful;$sum[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Spiteful Chest]
  $description[You bought a Spiteful chest for $1,000!
  **Open it and see what you find!
  Just be warned! It could be spiteful, Goodluck!**
  ]
  $footer[Usage: $getServerVar[prefix]open-spiteful]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first]`
  })
   
  bot.command({
  name: "open-spiteful",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]];$authorID]
  $setGlobalUserVar[spiteful;$sub[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[10;20]];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Spiteful Chest]
  $description[You opened a spiteful Chest!
  ]
  $footer[💵 +$$numberSeparator[$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]] | 🗡 +$random[10;20]xp]
  $onlyIf[$getGlobalUserVar[spiteful;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
  $globalCooldown[20m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
  })
   
  bot.command({
  name: "buy-lucky",
  code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
  $setGlobalUserVar[lucky;$sum[$getGlobalUserVar[lucky;$authorID];1];$authorID]
  $onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withrawing it first.]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Lucky Chest]
  $description[You bought a lucky chest for $250!
  Open it and press your luck for a chance to get the $5,000 lucky pot! Goodluck!
  ]
  $footer[Usage: $getServerVar[prefix]open-lucky]`
  })
   
  bot.command({
  name: "open-lucky",
  code: `
  $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]];$authorID]
  $setGlobalUserVar[lucky;$sub[$getGlobalUserVar[lucky;$authorID];1];$authorID]
  $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[3;7]];$authorID]
  $thumbnail[$userAvatar[$authorID]]
  $color[RANDOM]
  $title[Lucky Chest]
  $description[You opened a lucky Chest!
  ]
  $footer[💵 +$$numberSeparator[$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]] | 🗡 +$random[3;7]xp]
  $onlyIf[$getGlobalUserVar[lucky;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
  $globalCooldown[3m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
  })

  bot.command({
    name: "rob",
    code: `
    $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]];$authorID]
    $setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]];$mentioned[1]]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;75];$authorID]]
    $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]];$mentioned[1]]
    $color[RANDOM]
    $thumbnail[$userAvatar[$authorID]]
    $title[$username robbed $username[$mentioned[1]]]
    $description[
    $addField[$username;
    💵 +$$random[0;750]
    🗡 +$random[50;75]xp
    Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]] | $sum[$getGlobalUserVar[XP;$authorID];$random[50;75]]xp
    ]
    $addField[$username[$mentioned[1]];
    Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]]xp
    ]]
    $footer[💵 -$$random[0;750] | 🗡 -$random[50;75]xp]
    $globalCooldown[15m;You can rob someone again in %time%]
    $onlyIf[$getGlobalUserVar[Wallet;$authorID]>=750;Your wallet needs to contain at least $750 to rob someone.]
    $onlyIf[$getGlobalUserVar[XP;$authorID]>=75;You need at least 75xp to rob someone.]
    $onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=25;They need at least 25xp]
    $onlyIf[$getGlobalUserVar[Wallet;$mentioned[1]]>=750;Their wallet needs to contain at least $750]
    $onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ You can't rob discord bots**]
    $onlyIf[$mentioned[1]!=$authorID;**⛔ You can't rob yourself**]
    $onlyIf[$mentioned[1]!=;**⛔ Mention someone to rob**]`
    })
     
     
    //Steal from someones bank account and XP base
    bot.command({
    name: "steal",
    code: `
    $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[250;2500]];$authorID]
    $setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$mentioned[1]];$random[250;2500]];$mentioned[1]]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[75;150]];$authorID]
    $setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]];$mentioned[1]]
    $color[RANDOM]
    $thumbnail[$userAvatar[$authorID]]
    $title[$username stole from $username[$mentioned[1]]'s bank]
    $description[
    $addField[$username;
    💵 +$$random[1000;2500]
    🗡 +$random[75;150]xp
    Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[1000;2500]] | $sum[$getGlobalUserVar[XP;$authorID];$random[75;150]]xp
    ]
    $addField[$username[$mentioned[1]];
    Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[1000;2500]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]]xp
    ]]
    $footer[💵 -$$random[1000;2500] | 🗡 -$random[75;150]xp]
    $globalCooldown[30m;You can steal from someone's bank account again in %time%]
    $onlyIf[$getGlobalUserVar[XP;$authorID]>=1000;You need at least 1,000 XP to steal from someone's bank account]
    $onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=500;They need at least 500 XP to be sapped from!]
    $onlyIf[$getGlobalUserVar[Bank;$mentioned[1]]>=7500;Their bank needs to contain at least $7,500 to be stolen from.]
    $onlyIf[$isBot[$mentioned[1]]!=true;You can't steal from discord bots]
    $onlyIf[$mentioned[1]!=$authorID;You can't rob yourself lol]
    $onlyIf[$mentioned[1]!=;Mention someone to steal from thier bank account. Try this: \`$getServerVar[prefix]steal @user\`]`
    })
     
    bot.command({
    name: "search",
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[20;60]];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1;5]];$authorID]
    $title[Search]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $description[$username, $randomText[you looked under the welcome mat.;you went searching thru your mom's purse while she was asleep.;you're hungry so you decided to search thru the dumpster behind the Subway.;you searched your dads truck very thoroughly.;your friends came over and when one of them went to the bathroom, you searched thru his coat pockets.]
    ]
    $footer[💵 +$$random[20;60] | 🗡 +$random[1;5]xp]
    $globalCooldown[35s;Looking for a little loose change? You're going to have to try again in %time%]`
    })
     
    bot.command({
    name: "scrap-car",
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[11000;16000]];$authorID]
    $setGlobalUserVar[car;$sub[$getGlobalUserVar[car;$authorID];1];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[260;300]];$authorID]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $title[🚗 Scrapped]
    $description[
    Nice $username! You scrapped a car for its parts and sold them for a profit!
    ]
    $footer[💵 +$$numberSeparator[$random[11000;16000]] | 🗡 +$random[260;300]xp]
    $globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
    $onlyIf[$getGlobalUserVar[car;$authorID]>=1;You need at least 1 \`Car\` in your inventory to scrap]`
    })
     
    bot.command({
    name: "scrap-helicopter",
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[22000;29000]];$authorID]
    $setGlobalUserVar[helicopter;$sub[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[360;435]];$authorID]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $title[🚁 Scrapped]
    $description[
    Nice $username! You scrapped a helicopter for its parts and sold them for a profit!
    ]
    $footer[💵 +$$numberSeparator[$random[22000;29000]] | 🗡 +$random[360;435]xp]
    $globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
    $onlyIf[$getGlobalUserVar[helicopter;$authorID]>=1;You need at least 1 \`Helicopter\` in your inventory to scrap]`
    })
     
     
    bot.command({
    name: "scrap-truck",
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[16500;22000]];$authorID]
    $setGlobalUserVar[truck;$sub[$getGlobalUserVar[truck;$authorID];1];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[310;380]];$authorID]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $title[🚚 Scrapped]
    $description[
    Nice $username! You scrapped a truck for its parts and sold them for a profit!
    ]
    $footer[💵 +$$numberSeparator[$random[16500;22000]] | 🗡 +$random[310;380]xp]
    $globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
    $onlyIf[$getGlobalUserVar[truck;$authorID]>=1;You need at least 1 \`Truck\` in your inventory to scrap]`
    })
     
    bot.command({
    name: "flip-house", 
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[125000;150000]];$authorID]
    $setGlobalUserVar[house;$sub[$getGlobalUserVar[house;$authorID];1];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[550;650]];$authorID]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $title[🏡 Flipped]
    $description[
    Nice job $username! You flipped your house and sold it for a profit!
    ]
    $footer[💵 +$$numberSeparator[$random[125000;150000]] | 🗡 +$random[550;650]xp]
    $globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
    $onlyIf[$getGlobalUserVar[house;$authorID]>=1;You need to have bought at least 1 \`House\` to flip]` 
    })
     
    bot.command({
    name: "flip-apartment", 
    code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[70000;95000]];$authorID]
    $setGlobalUserVar[apartment;$sub[$getGlobalUserVar[apartment;$authorID];1];$authorID]
    $setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[425;525]];$authorID]
    $thumbnail[$userAvatar[$authorID]]
    $color[RANDOM]
    $title[🏫 Flipped]
    $description[
    Nice job $username! You flipped your apartment and sold it for a profit!
    ]
    $footer[💵 +$$numberSeparator[$random[70000;95000]] | 🗡 +$random[425;525]xp]
    $globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
    $onlyIf[$getGlobalUserVar[apartment;$authorID]>=1;You need to have bought at least 1 \`Apartment\` to flip]` 
    })
     
    bot.command({
    name: "fish",
    code: `$color[RANDOM]
    $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[50;100]]]
    $title[$username is fishing]
    $description[You fished a $randomText[🥿;👠;👡;👢;👞;👟;🥾;🦀;🦑;🐙;🦞;🦐;🐠;🐟;🐡;🐬;🦈;🐳;🐋;🐊;🦢;🦆] and you get $$random[50;100]]
    $globalCooldown[15m;**⏳ You can fish again in %time%**]`
    })
     
     
    bot.command({
    name: "lb-bank",
    code: `$title[**__🏦 Bank leaderboard__** 
    $globalUserLeaderboard[Bank;asc]]
    $color[RANDOM]
    $footer[You have $$numberSeparator[$getGlobalUserVar[Bank;$authorID]] 💵 in your bank]`
    })
     
     
    bot.command({
    name: "lb-wallet",
    code: `$title[**__👛 Wallet leaderboard__**
    $globalUserLeaderboard[Wallet;asc]]
    $color[RANDOM]
    $footer[You have $$numberSeparator[$getGlobalUserVar[Wallet;$authorID]] 💵 in your wallet]`
    })
     
     
    //Resets user money for all guilds
    bot.command({
    name: "reset", 
    code: `$resetGlobalUserVar[Wallet]
    $resetGlobalUserVar[Bank]
    $resetGlobalUserVar[XP]
    $title[Reset]
    $description[Economy has been reset for all guilds]
    $footer[Economy Commands]
    $color[RANDOM]
    $onlyForIDs[$ownerID;**⛔ You're not the owner of this bot**]` 
    })

bot.command({
name: "$alwaysExecute",
code: `$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1;5]]]
$onlyIf[$getServerVar[badge1]==<:badge1:914161692617875456>;]
$cooldown[1d;]`})

bot.command({
name: "$alwaysExecute",
code: `$setGlobalUserVar[XP;$sum[$getGlobalUserVar[waller;$authorID];$random[1;5]]]
$onlyIf[$getServerVar[badge2]==<:badge3:914161810838519819>;]
$cooldown[1d;]`})

bot.command({
  name: "$alwaysExecute",
code: `$setGlobalUserVar[XP;$sum[$getGlobalUserVar[waller;$authorID];$random[1000;50000]]]
  $onlyIf[$getServerVar[badge3]==<:badge2:914161785890828318>;]
  $cooldown[1d;]`})


bot.command({
name: "buy-beginnerBadge",
code: `$setGlobalUserVar[badge1;<:badge1:914161692617875456>;$authorID]
$onlyIf[$getUserVar[wallet]==1000;You cant afford this badge]
`})

bot.command({
  name: "buy-proBadge",
  code: `$setGlobalUserVar[badge2;<:badge3:914161810838519819>;$authorID]
  $onlyIf[$getUserVar[wallet]==1500;You cant afford this badge]
  `})

  bot.command({
    name: "buy-advancedBadge",
    code: `$setGlobalUserVar[badge3;<:badge2:914161785890828318>;$authorID]
    $onlyIf[$getUserVar[wallet]==10000;You cant afford this badge]
    `})

bot.command({
    name: "set-modlogs",
    code: `$setServerVar[modlogs;$mentionedChannels[1]]
$description[Logs channel succesfully set]
$color[GREEN]
$onlyIf[$mentionedChannels[1]!=;Mention a channel!]
$onlyPerms[admin;You don't have permission!]`
})


bot.command({
    name: "remove-modlogs",
    code: `$setServerVar[modlogs;]
$description[Logs channel removed from the channel]
$color[GREEN]
$onlyPerms[admin;You don't have permission!]`
})

bot.awaitedCommand({
    name: "rrole",
    code: `
    $sendDM[$authorID;{description:Given you the role in $serverName!} {color:GREEN}]
    $giveRole[$authorID;$getServerVar[rr]]`
})
 



try{}catch(error){
  console.log(static("--- [ Debug ] ---"))
  console.log(on("  Bot error "))
  console.log(static("------------------------"))
  console.log(blurplexd(" [ Avoding crash ]"))
  console.log(static("------------------------"))
  console.log(up(" [ All gud ]"))
  console.log(static("------------------------"));
  console.log(up(" [ Connected to the server ]"))
  console.log(static("------------------------"));}
