module.exports = {
  name: "afk",
  code: `
    $title[Set your status to afk!]
    $description[Reason: $noMentionMessage]
    $color[#2f3136]
    $setUserVar[afk;AFK;$authorID]
    $setUserVar[reason;$noMentionMessage]
  `
}