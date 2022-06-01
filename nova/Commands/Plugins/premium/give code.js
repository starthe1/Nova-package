module.exports = ({
name: "give-code",
code: `$onlyForIDs[845312519001342052;You are missing permissions to give premium codes to other users!]
$onlyIf[$mentioned[1]!=;`error` You have to mention someone!]
 
$setVar[code;$randomString[10]$randomString[5]]
 
Premium code has been delivered!

$senddm[You premium code ||$getVar[code]||
Type `>activate code` in any server you share with the bot to activate your premium!]
`})