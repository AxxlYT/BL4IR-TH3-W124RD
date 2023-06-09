const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =  require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription(`Ask the 8ball a question (Not polar [y/n])`)
        .addStringOption(option =>
        option.setName('question')
        .setDescription('What would you like to as me?')
        .setRequired(true)
        ),
        async execute(interaction) {

            const { options } = interaction;

            const question = options.getString('question');
            const choice = ["It is Certain", "There is a possibility", "Without a doubt", "Impossible!", "Focus a bit harder. Try again.", "It is not for certain."]
            const ball = Math.floor(Math.random() * choice.length)

            const ask = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`${interaction.user.username}'s 8ball game`)
            .setFields({ name: 'Question', value: `${question}`, inline: true })

            const answer = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${interaction.user.username}'s 8ball game`)
            .setFields({ name: 'Answer', value: `${choice[ball]}`, inline: true })

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('8ball')
                .setLabel('Roll the ball')
                .setStyle(ButtonStyle.Primary)
            )

            const msg = await interaction.reply({
                embeds: [ask],
                components: [button]
            });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {
                if (i.customId == '8ball') {
                    i.update({
                        embeds: [answer],
                        components: [],
                        content: `**Question: ${question}**`
                    });
                    }
                })
            }
}