const fs = require('fs');
const { randomizeArray, capitalize } = require('../utils/randomizeUtils.js');
const { bold, userMention, SlashCommandBuilder } = require('discord.js');

let initiator;
let combinedArray = [];

fs.readFile('./agents.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Assign the data from the JSON file to the variables
  initiator = jsonData.initiator;

});


  module.exports = {
	data: new SlashCommandBuilder()
	  .setName('initiatorpls')
	  .setDescription('Initiators Only.'),
	async execute(interaction) {
	  let userName = interaction.user.username;
	  let userId = interaction.user.id;
	  let randomizedNumber = randomizeArray(initiator);
	  let randomizedAgent = initiator[randomizedNumber];
	  await interaction.reply(userMention(userId) + " picked " + bold(capitalize(randomizedAgent)));
	},
  };
