import Discord, { Intents } from 'discord.js';

export default async function handler(req, res) {
  const body = req.method === 'POST' ? req.body : JSON.parse(req.body);

  if (body.token === undefined) {
    return res
      .status(500)
      .json({ error: "don't see no tokens here. body token missing" });
  }
  const client = new Discord.Client({ intents: Intents.FLAGS.GUILDS });
  client.token = body.token;

  try {
    await client.login();
  } catch (error) {
    return res.status(500).json({ error: error.name });
  }

  // if (!client.isReady()) {
  //   return res.status(500).json({ error: 'token wrong dud' });
  // }
  const { action, guild, guildId, commands } = body;
  if (req.method === 'POST' && !action)
    return res.status(500).json({ error: 'action missing' });
  if (action === 'CREATE' && !commands[0])
    return res
      .status(500)
      .json({ error: 'commands array is nowhere to be seen' });
  if (guild === null)
    return res.status(500).json({ error: 'guild bool missing' });
  if (guild === true && !guildId)
    return res.status(500).json({ error: 'guildId missing' });

  if (req.method === 'POST') {
    // Process a POST request
    if (action === 'GET') {
      try {
        const _commands = guild
          ? await client.guilds.cache.get(guildId).commands.fetch()
          : await client.application.commands.fetch();
        res.status(200).json({ error: false, data: { commands: _commands } });
      } catch (err) {
        return res
          .status(500)
          .json({ error: 'guildId wrong maybe? fetch is failing' });
      }
      return;
      // const commands = await client.application.commands.fetch();
    }

    if (action === 'CREATE') {
      // if (commands[1]) { // create multiple commands at the same time

      // }
      try {
        const command = guild
          ? await client.guilds.cache.get(guildId).commands.create(commands[0])
          : await client.application.commands.create(commands[0]);

        res.status(200).json({ error: false, command });
      } catch (err) {
        return res
          .status(500)
          .json({ error: 'guildId wrong maybe? fetch is failing' });
      }
      return;
    }
  } else if (req.method === 'DELETE') {
    try {
      const command = guild
        ? await client.guilds.cache.get(guildId).commands.delete(commands[0])
        : await client.application.commands.delete(commands[0]);
      res.status(200).json({ error: false, command, deletedId: commands[0] });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err, stringified: JSON.stringify(err) });
    }
  } else if (req.method === 'PATCH') {
    res.status(200).json({ toimiiko: 'luo vaan uusi komento älä käytä tätä' });
  } else if (req.method === 'GET') {
    // Handle any other HTTP method
    // const command = await client.guilds.cache
    //   .get('279272653834027008')
    //   ?.commands.create(data);

    // console.log(command);

    res.status(200).json({ error: 'use post with action: "GET" in body' });
  }

  client.destroy();
}
