const {
  ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('Is Button, is Problem?'),

  async execute(interaction) {
    const btn = new ButtonBuilder()
      .setCustomId('btn')
      .setLabel('Button')
      .setStyle(ButtonStyle.Primary);

    const gitLink = new ButtonBuilder()
      .setLabel('T.A.V.A. Git-Repo')
      .setURL('https://github.com/RVCC-IDMX/discord-bot-Pi-Guy53')
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(btn, gitLink);

    const response = await interaction.reply({
      content: 'A friendly button, be nice to it', components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

    if (confirmation.customId === 'btn') {
      await confirmation.update({ content: 'Ow! That hurt!', components: [] });
    } else {
      await confirmation.update({ content: 'How did we get here? What did you press?!?', components: [] });
    }
  },
};
