const bedrock = require('bedrock-protocol')

const code = 'DfyUr2y4AAbEYsc'

const client = bedrock.createClient({
  username: 'bot1',
  skinData: {
    PersonaPieces: [],
    ThirdPartyName: 'spoof name',
    ThirdPartyNameOnly: true
  },
  realms: {
    realmInvite: code
  }
})

client.on('join', (packet) => {
  console.log('Joining Realm')
});

client.on('disconnect', (packet) => {
  console.log(packet)
});

const round = (num) => +num.toFixed(2);

client.on('start_game', async (packet) => {
  runtimeid = packet.runtime_entity_id;
  sx = packet.spawn_position.x; sy = packet.spawn_position.y; sz = packet.spawn_position.z;
  let seed = packet.seed.toString();
  let hardcore = packet.hardcore;
  if (hardcore === true){ hardcore = 'On' } else {
    hardcore = 'Off'
  }
  let difficulty = packet.difficulty;
  if (difficulty === 0){ difficulty = 'Peaceful' }
  if (difficulty === 1){ difficulty = 'Easy' }
  if (difficulty === 2){ difficulty = 'Medium' }
  if (difficulty === 3){ difficulty = 'Hard' }
  let achievements = packet.achievements_disabled;
  if (achievements == false){ achievements = 'On' } else {
    achievements = 'Off'
  }
  let ontrial = packet.is_trial;
  if (ontrial === true){ ontrial = 'Yes' } else {
    ontrial = 'No'
  }
  let ticks = Number(packet.current_tick);
  let secs = ticks / 20; let mins = secs / 60;
  let hours = mins / 60; let days = hours / 24;
  hours = round(hours); days = round(days)
  console.log(`\nSeed: ${seed}\nHardcore: ${hardcore}\nDifficulty: ${difficulty}\nSpawn Cords: x: ${sx} y: ${sy} z: ${sz}\nAchievements: ${achievements}\nOn Trial: ${ontrial}\nWorld Existing Time in Ticks: ${ticks}\nWorld Existing Time IRL: ${days} Days ( ${hours} hours )\n\nJoined Realm\n`)
});