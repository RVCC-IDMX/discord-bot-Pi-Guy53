const { SlashCommandBuilder, TextChannel } = require('discord.js');
const user = require('../utility/user');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption((option) => option.setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)
      .setMaxLength(25))

    .addChannelOption((option) => option.setName('channel')
      .setDescription('The channel to echo into'))

    .addBooleanOption((option) => option.setName('ephemeral')
      .setDescription('Whether or not the echo should be private')),

  async execute(interaction) {
    const userInput = { input: '', secretBool: 'false', channel: '' };
    userInput.input = interaction.options.getString('input');

    // console.log(interaction.options.getBoolean('ephemeral'));

    if (interaction.options.getBoolean('ephemeral') != null) {
      userInput.secretBool = interaction.options.getBoolean('ephemeral');
    } else {
      userInput.secretBool = false;
    }

    if (interaction.options.getChannel('channel') != null) {
      userInput.channel = interaction.options.getChannel('channel');
      console.log(userInput.channel.type);

      if (userInput.channel.type != 1) {
        // console.log(interaction.options.getChannel('channel'));
        await interaction.guild.channels.cache.get(`${userInput.channel.id}`).send(userInput.input);
        await interaction.reply({ content: `echoed to ${userInput.channel}`, ephemeral: userInput.secretBool });
      } else {
        await interaction.reply({ content: `Could not be echoed ${userInput.channel} is not a valid channel`, ephemeral: userInput.secretBool });
      }
    } else {
      await interaction.reply({ content: userInput.input, ephemeral: userInput.secretBool });
    }
  },
};
