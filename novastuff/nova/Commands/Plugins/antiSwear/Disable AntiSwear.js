module.exports = ({
    name: "disable-antiswear",
    code: `$description[<:success:935751098092884020> successfully disabled the antiSwear plugin]
    $color[#2f3136]
    $setServerVar[antiSwear;false]
    $onlyIf[$getServerVar[antiSwear]==true;{description:<:error:935750920598351872> AntiSwear plugin already Disable}{color:#2f3136}]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==true;{description:<:error:935750920598351872> you dont have enough perms}{color:#2f3136}]`
    })