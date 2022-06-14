module.exports = ({
name: "leaderboard",
code: `$title[Rank leaderboard]
$description[$userLeaderboard[rank;asc;[**number**: {top}] - [{username}] - [**rank:** {value}]]
**Your curent position is: $getLeaderboardInfo[rank;$authorID;user;top]**]
$color[#2f3136]
$onlyif[$getservervar[levelling]==true;The levelling system is disabled!]`
})