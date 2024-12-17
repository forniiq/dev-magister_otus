const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");
const { sequelize } = require("./database");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname, "events"),
  commandsPath: path.join(__dirname, "commands"),
  testServer: "1276095762450612305",
});

sequelize
  .sync()
  .then(() => console.log("База данных синхронизирована"))
  .catch((err) => console.error("Ошибка синхронизации базы данных: ", err));

client.login(process.env.token);
