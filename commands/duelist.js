const fs = require('fs');
const { randomizeArray, capitalize } = require('../utils/randomizeUtils.js');
const { bold, userMention, SlashCommandBuilder } = require('discord.js');

let duelist;
let combinedArray = [];

fs.readFile('./agents.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Assign the data from the JSON file to the variables
  duelist = jsonData.duelist;

});


  module.exports = {
	data: new SlashCommandBuilder()
	  .setName('duelistpls')
	  .setDescription('Duelists Only.'),
	async execute(interaction) {
	  let userName = interaction.user.username;
	  let userId = interaction.user.id;
	  let randomizedNumber = randomizeArray(duelist);
	  let randomizedAgent = duelist[randomizedNumber];
	  await interaction.reply(userMention(userId) + " picked " + bold(capitalize(randomizedAgent)));
	},
  };
