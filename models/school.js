module.exports = (sequelize, DataTypes) => sequelize.define(
  'school',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    school_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_site: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'school',
    timestamps: false
  },
)
