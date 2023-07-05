const fs = require('fs');
const { randomizeArray, capitalize } = require('../utils/randomizeUtils.js');
const { bold, userMention, SlashCommandBuilder } = require('discord.js');

let duelist, sentinel, controller, initiator;
let combinedArray = [];

fs.readFile('./agents.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Assign the data from the JSON file to the variables
  duelist = jsonData.duelist;
  sentinel = jsonData.sentinel;
  controller = jsonData.controller;
  initiator = jsonData.initiator;

  // Combine the arrays
  combinedArray = duelist.concat(sentinel, controller, initiator);
});

module.exports = {
	data: new SlashCommandBuilder()
	  .setName('agentpls')
	  .setDescription('Provides information about the user.'),
	async execute(interaction) {
	  let userName = interaction.user.username;
	  let userId = interaction.user.id;
	  let randomizedNumber = randomizeArray(combinedArray);
	  let randomizedAgent = combinedArray[randomizedNumber];
	  await interaction.reply(userMention(userId) + " picked " + bold(capitalize(randomizedAgent)));
	},
  };

