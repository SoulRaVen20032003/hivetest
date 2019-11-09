const config = require('./config.json'); 
const Discord = require('discord.js');

const bot = new Discord.Client({ disableEveryone: true });

bot.on('ready', async () => {
  console.log('Le bot est en ligne ! ');
  bot.user.setActivity('AWP/MG/DEAGLE');
});


bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1);

  // info sur le bot 
  if (command === `${prefix}info`) {
    let botIcon = bot.user.displayAvatarURL;
    let enbed = new Discord.RichEmbed()
      .setDescription('Information sur le bot')
      .setColor('#dc143c')
      .setThumbnail(botIcon)
      .addField('Hive Community', bot.user.username)
      .addField('Crée le ', bot.user.createdAt)
      .addField('Commandes', '-----------------')
      .addField(` !info`, 'Renvoie des informations sur le bot')
      .addField(`!infoserv`, 'Renvoie des informations sur le serveur')
      .addField(`!report`, "Mentionne un membre pour avertir les staffs, n'oublie pas de mettre un")
      .addField(`!oxy`, "Un DM pour vous presentez Oxygen")
      .addField(`!soul`, "une demande assez simple à comprendre")

    return message.channel.send(enbed);
  }
  // info sur le server 
  if (command === `${prefix}infoserv`) {
    let servIcon = message.guild.iconURL;
    let servEnbed = new Discord.RichEmbed()
      .setDescription('Information sur le Server')
      .setColor('#dc143c')
      .setThumbnail(servIcon)
      .addField('Nom du serveur :', message.guild.name)
      .addField('Crée le :', message.guild.createdAt)
      .addField('Nombre de membres:', message.guild.memberCount)
      .addField('Vous avez rejoin le :', message.member.joinedAt);

    return message.channel.send(servEnbed);
  }
  // invite 
  if (command === `${prefix}invite`) {
    return message.channel.send("Voici l'invitation https://discord.gg/wgmFJPC");

  }

    // report 
    if (command === `${prefix}report`) {
      let reportedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
        ); 
            if(!reportedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
      }
      let reportedReason = args.join(' ').slice(22);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription('Reports')
      .setColor('#dc143c')
      .addField(
        "Utilisateur Signalé",
        `${reportedUser} (ID: ${reportedUser.id})`
        )
      .addField("Utilisateur ayant  report", `${message.author} (ID: ${message.author.id})`)
      .addField("Canal", message.channel)
      .addField("Raison", reportedReason);

      let reportChannel = message.guild.channels.find(`name`, 'signalements');
      if (!reportChannel) {
        return message.channel.send(
          "Salon 'signalements' introuvable veuiller le crée !"
          );
      }
      message.delete();
      reportChannel.send(reportEmbed);
      }
      if (command === `${prefix}liens`) {
        message.author.createDM().then(channel =>{
          channel.send("Bonjour, voici tous les liens du serveur Forum : https://hive-server.fr/fr / - - - - - - - Règles AWP : https://hive-server.fr/fr/forum/2/serveur-awp  / - - - - - - - Règles Minigames : https://hive-server.fr/fr/forum/topic/4/reglement-du-serveur-minigames / - - - - - - - :ban: : http://bans.hive-server.fr/ / - - - - - - - :discord: : https://discord.gg/wgmFJPC / - - - - - - - :paypal: : https://www.paypal.me/hivess / - - - - - - - ");
        })
      }
      if (command === `${prefix}oxy`) {
        message.author.createDM().then(channel =>{
          channel.send("Je suis Oxygen et je fais des chateaux de cartes sur le lit avec ma meuf ps: voici la bande a Oxy https://youtu.be/i9bKz7Fvtm0 https://www.youtube.com/watch?v=J2htMbJj8JY voici sa meuf!!!!!!!!");
        })
      }
        if (command === `${prefix}soul`) {
          message.author.createDM().then(channel =>{
            channel.send("le plus beau, givez lui le nitro mes frr");
          })
        }
  
     
    
});

bot.login(config.token);


