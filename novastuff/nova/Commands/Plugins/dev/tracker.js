module.exports = [{
    type: "servers",
    channel: "982378266239336498",
    code: `
$log[——————————\nJoined $serverName\nGuild Invite: $getServerInvite\nTotal Servers: $serverCount\n——————————]
`,
}, {
    type: "servers",
    channel: "982378266239336498",
    code: `
$log[——————————\nLeft $serverName\nTotal Servers: $serverCount\n——————————]
`
}]