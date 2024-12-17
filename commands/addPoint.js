const { User } = require("../database"); // подключаем модель User

module.exports = {
  data: {
    name: "addpoint",
    description: "Добавить очки пользователю",
  },

  run: async ({ interaction }) => {
    let user = await User.findOne({
      where: { username: interaction.user.username },
    });

    if (!user) {
      user = await User.create({ username: interaction.user.username });
    }

    // Увеличиваем очки на 10
    user.points += 10;
    await user.save();

    // Отправляем ответ
    interaction.reply(`Вы получили 10 очков! Ваши очки: ${user.points}`);
  },
};
