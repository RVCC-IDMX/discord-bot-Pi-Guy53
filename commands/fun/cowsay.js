const { SlashCommandBuilder } = require('discord.js');
const cowsay = require('cowsay');

async function getChoices(length) {
  console.log('getting choices');

  async function get_cows(error, cow_names) {
    if (error) {
      console.log(error);
    } else if (cow_names) {
      // console.log(`Number of cows available: ${cow_names}`);
    }
  }

  const cowList = await cowsay.list(get_cows);
  const choices = [];
  for (let i = 0; i < cowList.length; i += 1) {
    let saidCow = '';
    let c = '';
    const currentChoice = cowList[i].split('.');

    if (currentChoice[1] != 'cow') {
      c = `${currentChoice[0]}.${currentChoice[1]}`;
    } else {
      c = currentChoice[0];
    }

    if (c != 'ibm' && c != 'yasuna_08') {
      saidCow += cowsay.say({
        text: '1',
        f: c,
      });
    }

    if (saidCow.length < 1999 - length) {
      choices.push(currentChoice[0]);
    }
  }

  // console.log(choices.length, 1999 - length);
  return choices;
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Said the Cow')
    .addStringOption((option) => option.setName('input')
      .setDescription('The text for the cow to say')
      .setRequired(true))
    .addStringOption((option) => option.setName('cow')
      .setDescription('The animal to say it')
      .setAutocomplete(true)),

  async autocomplete(interaction) {
    const length = 6 + interaction.options.getString('input').length;

    const focusedValue = interaction.options.getFocused();
    const choices = await getChoices(length);
    const filtered = choices.filter((choice) => choice.startsWith(focusedValue));

    if (filtered.length < 25) {
      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice })),
      );
    }
  },

  async execute(interaction) {
    const input = interaction.options.getString('input');
    const animal = interaction.options.getString('cow');
    let animalV;

    if (animal != null && animal != '') {
      animalV = animal;
    } else {
      const c = await getChoices();
      animalV = c[getRandomInt(0, c.length)];
    }

    let saidCow = cowsay.say({
      text: input,
      f: animalV,
    });

    saidCow = saidCow.replaceAll('`', "'");
    saidCow = `\`\`\`${saidCow}\`\`\``;

    await interaction.reply(saidCow);
  },
};
