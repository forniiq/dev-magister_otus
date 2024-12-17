const { Sequelize, DataTypes } = require("sequelize");

// Создаем подключение к базе данных SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3", // путь к файлу базы данных
});

// Пример модели пользователя (можно создать свои модели в зависимости от нужд)
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Функция для синхронизации базы данных
const syncDatabase = async () => {
  try {
    // Синхронизация базы данных (создание таблиц или обновление существующих)
    await sequelize.sync({ alter: true }); // alter: true обновит структуру таблицы
    console.log("База данных синхронизирована!");
  } catch (error) {
    console.error("Ошибка при синхронизации базы данных:", error);
  }
};

// Выполняем синхронизацию базы данных
syncDatabase();

// Экспортируем sequelize и модель User для дальнейшего использования
module.exports = { sequelize, User };
