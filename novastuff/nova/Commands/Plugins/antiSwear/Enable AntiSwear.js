module.exports = ({
    name: "enable-AntiSwear",
    aliases: "enable antiSwear",
    code: `$description[<:success:935751098092884020> successfully enabled the antiSwear plugin]
    $color[#2f3136]
    $setServerVar[antiSwear;true]
    $onlyIf[$getServerVar[antiSwear]==false;{description:<:error:935750920598351872> AntiSwear plugin already enabled}{color:#2f3136}]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==true;{description:<:error:935750920598351872> you dont have enough perms}{color:#2f3136}`
    })