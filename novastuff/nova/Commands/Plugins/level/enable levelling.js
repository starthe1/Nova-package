module.exports = ({
    name: "enable-levelling",
    code: `$description[<:success:935751098092884020> successfully enabled the levelling plugin]
    $color[#2f3136]
    $setServerVar[levelling;true]
    $onlyIf[$getServerVar[levelling]==false;{description:<:error:935750920598351872> levelling plugin already enabled}{color:#2f3136}]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==true;{description:<:error:935750920598351872> you dont have enough perms}{color:#2f3136}]`
    })