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
    }

  },
  {
    tableName: 'cnki_log',
    timestamps: false
  },
)
