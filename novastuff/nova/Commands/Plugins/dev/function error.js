module.exports = ({
type: "functionErrorCommand",
channel: "966700897491120249",
code: `$title[Error Occurred in $serverName]
$description[Function: $handleError[function]
Command: $handleError[command]
Error: $handleError[error]]
$color[RED]
$djsEval[const chalk = require("chalk");
const error = chalk.red

console.log(static("Error for command $handleError[function] in server $serverNAme"));true]`
})