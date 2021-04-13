'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labAccess extends Model {
    
  };
  
  labAccess.init(
    {
      student_id: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      lab_name: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      entered_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, 
    {
      sequelize,
      tableName: 'lab_access_logs',
      modelName: 'labAccess',
      timestamps: false
    }
  );
  return labAccess;
};