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
    },
    province_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    town_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nature_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    f211: {
      type: DataTypes.STRING,
      allowNull: true
    },
    f985: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dual_class_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    yk_feature: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'school',
    timestamps: false
  },
)
