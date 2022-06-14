module.exports = [{
name: "user-invites",
code: `$title[$username's invite info]
$thumbnail[$authorAvatar]
$description[
Total: $sum[$userInfo[real];$userInfo[fake]]
Real: $userInfo[real]
Fake: $userInfo[fake]
---------------------
Invited By: $userTag[$userInfo[inviter]]
$color[#2f3136]
`,
}, {
name: "reset-invites",
code: `
$description[Successfully reset invites for $mentioned[1]]
$resetInvites[$guildID;$mentioned[1]]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==true;{description:<:error:935750920598351872> you dont have enough perms}{color:#2f3136}
$suppressErrors[{description:you diden't mention the person to remove the invites from!}{color:$getvar[color]}]
$color[#2f3136]
`,
}]