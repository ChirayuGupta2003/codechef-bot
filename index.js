const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
require("dotenv").config();

// Event Handler
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, commands, client)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, commands, client)
    );
  }
}

// Command Handler
const commands = [];
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
  client.commands.set(command.data.name, command);
}

client.login(process.env.TOKEN);
