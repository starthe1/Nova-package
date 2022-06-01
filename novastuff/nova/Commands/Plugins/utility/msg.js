module.exports = ({
    name: "msg",
    aliases: ['dm'],
    code: `
    **$customEmoji[tak] Message has been sent to \`($userTag[$message[1]])\`!**
    $sendDM[$message[1];
    {title:📩 DM!}
    {description:$messageSlice[1]

    > From: **$username[$authorID]**
    > To: **$username[$message[1]]**
    > Server: **$serverName**}
    {color:BLUE}]
    $onlyIf[$message[1]!=;{title:Msg} {description:**Error! Argument \`(ID)\` is missing!**}
    {color:RED}]
    $deletecommand`
})