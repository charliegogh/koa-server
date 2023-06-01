module.exports = {
  port: 3000, // 服务器端口
  sequelize: {
    username: 'charlie',
    password: 'g042900.',
    database: 'charlie',
    host: '47.93.4.29',
    port: '3306',
    dialect: 'mysql',
    define: {
      underscored: false,
      paranoid: true
    }
  },
  token: 'charlie'
}
