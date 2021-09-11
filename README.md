# Console

A fun and games bot.

## Prerequisites

* [Node.js v16.9.1 or above](https://nodejs.org/en/download/current/)

* [Application token](https://discord.com/developers/applications) and [applications.commands scope](https://discord.com/developers/docs/interactions/application-commands#authorizing-your-application) in guilds

## Installation

Before running the bot, run `npm ci` to install dependencies.

After installation of dependencies, make a copy of `config.example.json` and rename it to `config.json`.

### Configuration

`clientId` - The ID or User ID of the application.

`guildId` - The ID of your development guild. (Optional, only required if `global` is set to `false`)

`token` - The token of your application.

`global` - Whether or not to register slash commands globally when running `deploy-commands`.

## Usage

Use `node .` or `node main.js` to start the bot.

## Contributing

Pull requests are welcome.

Ensure all checks are passing before requesting a review.

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)