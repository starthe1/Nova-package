module.exports = {
    type: "readyCommand",
    channel: "966700897491120249",
    code: `
    $log[└─────────────────────────────────────────────┘]
    $log[│\       Server release :: $djseval[require('os').release();yes]\   │]]
    $log[├─────────────────────────────────────────────┤]
    $log[│\       Server platform :: $djseval[require('os').platform();yes]\              │]
    $log[├─────────────────────────────────────────────┤]
    $log[│\       Server arch :: $djseval[require('os').arch;yes]\                    │]
    $log[├─────────────────────────────────────────────┤]
    $log[│\       Server cores :: $djseval[require('os').cpus().length;yes] \                    │]
    $log[┌───────────────[ Server stats ]──────────────┐]
    $log[\                                              ]
    $log[\                                              ]
    $log[\                                              ]
    $log[└───────────────────────────────────────────┘]
    $log[│ \ \ \ \ \ \ Bot commands :: $commandsCount \ \ \ \             │]
    $log[├───────────────────────────────────────────┤]
    $log[│ \ \ \ \ \ \ Db ping :: $dbpingms \ \ \ \ \ \ \ \             │]
    $log[├───────────────────────────────────────────┤]
    $log[│ \ \ \ \ \ \ Bot ping :: $pingms \ \ \ \ \ \ \ \           │]
    $log[├───────────────────────────────────────────┤]
    $log[│ \ \ \ \ \ \ Owner :: $usertag[$botownerid] \ \ \             │]
    $log[┌───────────────[ Bot stats ]───────────────┐]
    `
}