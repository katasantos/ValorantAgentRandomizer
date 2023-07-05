const fs = require('fs');
const { capitalize } = require('../utils/randomizeUtils.js');
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
	  .setName('fivestack')
	  .setDescription('Provides information about the user.'),
	async execute(interaction) {
      
    let userId = interaction.user.id;
      // Randomize the combined array
      const randomizedArray = randomizeArray(combinedArray);

      // Get the first 5 elements from the randomized array
      const randomizedStringArray = randomizedArray.slice(0, 5);
      let randomString = userMention(userId) + " shuffled: \n";

      randomizedStringArray.forEach((agent, index) => {
        randomString += bold(capitalize(agent));
        if (index < randomizedStringArray.length - 1) {
          randomString += "\n";
        }
      });

	  await interaction.reply(randomString);
	},
  };


  
function randomizeArray(array) {
    // Make a copy of the original array
    const shuffledArray = [...array];
  
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }
