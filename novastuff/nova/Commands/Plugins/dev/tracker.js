module.exports = [{
    type: "botJoinCommand",
    channel: "967684984779472937",
    code: `
$log[——————————\nJoined $serverName\nGuild Invite: $getServerInvite\nTotal Servers: $serverCount\n——————————]
`,
}, {
    type: "botLeaveCommand",
    channel: "967684984779472937",
    code: `
$log[——————————\nLeft $serverName\nTotal Servers: $serverCount\n——————————]
`
}]