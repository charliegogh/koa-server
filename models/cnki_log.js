module.exports = (sequelize, DataTypes) => sequelize.define(
  'cnki_log',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true // 主键
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isClient: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cookie: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'cnki_log',
    timestamps: false
  },
)
