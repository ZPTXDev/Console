# Console

A fun and games bot.

## Prerequisites

* [Node.js v16.9.1 or above](https://nodejs.org/en/download/current/)

* [Application token](https://discord.com/developers/applications) and [applications.commands scope](https://discord.com/developers/docs/interactions/application-commands#authorizing-your-application) in guilds

## Installation

Before running the bot, run `npm ci` to install dependencies.

After installation of dependencies, make a copy of `config.example.json` and rename it to `config.json`.

### <a name="configuration"></a>Configuration

`clientId` - The ID or User ID of the application.

`guildId` - The ID of your development guild. (Optional, only required if `global` is set to `false`)

`staffIds` - The User ID(s) to be granted escalated privileges (by the `manager` property) and badges (by all other properties) (Recommended)

`token` - The token of your application.

`global` - Whether or not to register slash commands globally when running `deploy-commands`.

## Usage

Use `npm run deploy` to deploy slash commands. This should only be run once, and uses the [`global`](#configuration) setting.

Use `node .` or `node main.js` to start the bot.

## Contributing

Pull requests are welcome.

Ensure all checks are passing before requesting a review.

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)