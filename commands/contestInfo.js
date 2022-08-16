const axios = require("axios");
const websiteInfo = require("../websiteList.js");

const createEmbed = async (website) => {
  const data = await axios(`https://www.kontests.net/api/v1/${website}`).then(
    (res) => res.data
  );
  console.log(data);

  let feilds = 0;

  let embeds = [{ title: `${websiteInfo.website} Info`, fields: [] }];

  let i = 0;

  for (let a of data) {
    embeds[i].fields.push(
      {
        name: "Contest Name",
        value: a.name,
      },
      {
        name: "URL",
        value: a.url,
      },
      {
        name: "Duration",
        value: `${new Date(a.start_time).toLocaleString("en-US", {
          timeStyle: "medium",
          dateStyle: "full",
        })} to ${new Date(a.end_time).toLocaleTimeString("en-US", {
          timeStyle: "medium",
          dateStyle: "full",
        })}`,
      }
    );
  }

  return embeds;
};

module.exports = {
  data: {
    name: "contest_info",
    description: "Get info about contests using the following filters",
    options: [
      {
        name: "website",
        description: "Filter contests by website",
        required: true,
        type: 3,
        choices: [
          { name: "CodeForces", value: "codeforces" },
          { name: "CodeForces::Gym", value: "codeforces_gym" },
          { name: "TopCoder", value: "top_coder" },
          { name: "AtCoder", value: "at_coder" },
          { name: "CS Academy", value: "cs_academy" },
          { name: "CodeChef", value: "code_chef" },
          { name: "HackerRank", value: "hacker_rank" },
          { name: "HackerEarth", value: "hacker_earth" },
          { name: "Kick Start", value: "kick_start" },
          { name: "LeetCode", value: "leet_code" },
          { name: "Toph", value: "toph" },
        ],
      },
    ],
  },

  async execute(interaction) {
    const site = interaction.options.get("website").value;
    const embed = await createEmbed(site);
    interaction.reply({ embeds: [...embed] });
  },
};
