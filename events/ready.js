const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client, commands) {
    console.log("Ready");

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    const CLIENT_ID = client.user.id;

    (async () => {
      try {
        if (process.env.production == "false") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Successfully registered commands globally");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Successfully registered commands locally");
        }
      } catch (err) {
        if (err) console.error(err);
      }
    })();
  },
};
