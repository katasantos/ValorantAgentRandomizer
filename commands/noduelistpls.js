const fs = require('fs');
const { randomizeArray, capitalize } = require('../utils/randomizeUtils.js');
const { bold, userMention, SlashCommandBuilder } = require('discord.js');

let sentinel, controller, initiator;
let combinedArray = [];

fs.readFile('./agents.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Assign the data from the JSON file to the variables
  sentinel = jsonData.sentinel;
  controller = jsonData.controller;
  initiator = jsonData.initiator;

  // Combine the arrays
  combinedArray = sentinel.concat(controller, initiator);
});

module.exports = {
	data: new SlashCommandBuilder()
	  .setName('noduelistpls')
	  .setDescription('No Duelists Allowed.'),
	async execute(interaction) {
	  let userName = interaction.user.username;
	  let userId = interaction.user.id;
	  let randomizedNumber = randomizeArray(combinedArray);
	  let randomizedAgent = combinedArray[randomizedNumber];
	  await interaction.reply(userMention(userId) + " picked " + bold(capitalize(randomizedAgent)));
	},
  };

