import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error('Missing DISCORD_BOT_TOKEN');
  process.exit(1);
}

const clientId = process.env.DISCORD_CLIENT_ID ?? '';
const guildId = process.env.DISCORD_GUILD_ID ?? '';

const commands = [
  new SlashCommandBuilder().setName('rank').setDescription('Show your rank'),
  new SlashCommandBuilder().setName('link').setDescription('Link your account'),
  new SlashCommandBuilder().setName('notify').setDescription('Toggle notifications').addStringOption(o => o.setName('mode').setDescription('on|off').setRequired(true)),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(token);
await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }).catch(() => undefined);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Bot ready as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'rank') {
    await interaction.reply({ content: 'Rank: Peasant (demo)', ephemeral: true });
  }
  if (interaction.commandName === 'link') {
    await interaction.reply({ content: 'Linking not yet implemented.', ephemeral: true });
  }
  if (interaction.commandName === 'notify') {
    const mode = interaction.options.getString('mode');
    await interaction.reply({ content: `Notifications ${mode}`, ephemeral: true });
  }
});

client.login(token);


