module.exports = ({
    name:"rank",
    aliases:"level",
    category:"Levelling",
    description:"Check the rank of a user.",
    usage:"rank <optional user>",
    code:`$if[$message==]
$attachment[http://127.0.0.1:3000/rankcard?avatar=$replaceText[$userAvatar[$findmember[$message;yes]];webp;png]&name=$username&exp=$getUserVar[exp;$get[user]]&maxexp=$getUserVar[req]&level=$getUserVar[rank;$get[user]]&rank=%23$getLeaderboardInfo[rank;$authorID;user;top]&text=#FFFF00&avatarborder=&avatarbackground=&bar=#f8d64f&barbackground=#f8d64f&background=hex&border=&image=url]
    $let[user;$authorid]
    $else
    $suppresserrors
    $color[RANDOM]
    $endif
    $onlyif[$getservervar[levelling]==true;The levelling system is disabled!]`})