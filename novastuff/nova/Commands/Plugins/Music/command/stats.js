module.exports = {
  name: "stats",
  aliases: ["stats","clientinfo"],
  code: `$thumbnail[$userAvatar[$clientID]]
  $color[#03c39a]
  $addTimestamp
  $footer[Requested by $userTag[$authorID]]
  $addField[CLIENT;\`\`\`Node.js version: $nodeVersion\nPackage version: v$packageVersion\`\`\`;no]
  $addField[VPS STATS;\`\`\`Vps ping: $pingms 
Ram: $ram/2GB
Cpu: $cpu/2 vcores
\`\`\`]
$title[$userTag[$clientID] - \`(5.6.7)\`]`
}