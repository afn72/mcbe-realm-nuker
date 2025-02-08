const bedrock = require('bedrock-protocol');
const crypto = require('crypto');

const code = 'NrTfeYsK9aB5KYU';
const amount = 10000 // amount of messages
const msg = 'abc'

function rl() {
  const a = 'db4pav';
  const r = Math.floor(Math.random() * a.length);
  return a[r];
}

const client = bedrock.createClient({
  username: 'bot1',
  skinData: {
    ThirdPartyName: 'spoof name',
    ThirdPartyNameOnly: true,
  },
  realms: {
    realmInvite: code
  }
});

client.on('text', (packet) => {
  if (packet.message.startsWith('* External')){
    setTimeout(() => {
      client.disconnect()
    }, 2000);
  }
});

client.on('disconnect', (packet) => {
  console.log(packet)
});

client.on('join', (packet) => {
  console.log('Joining')
});

client.on('start_game', (packet) => {
  setTimeout(() => { client.disconnect }, 5000)
});

client.on('start_game', (packet) => {
  console.log('Joined')
  setTimeout(() => {
    for (let i = 0; i < amount; i++){
      client.queue('command_request', {
        command: `me §${rl()}§l${msg}`,
        internal: false,
        version: 78,
        origin: {
          type: 5,
          uuid: '',
          request_id: crypto.randomUUID()
        }
      });
    }
  }, 3000)
});