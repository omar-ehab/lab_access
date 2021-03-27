'use strict';
const data = [];

for(let i = 1; i <= 50; i++)
{
  data.push({
    student_id: i,
    lab_id: "E618",
    entered_at: new Date()
  });
}

for(let i = 1; i <= 50; i++)
{
  data.push({
    student_id: i,
    lab_id: "E620",
    entered_at: new Date()
  });
}

for(let i = 1; i <= 50; i++)
{
  data.push({
    student_id: i,
    lab_id: "E426",
    entered_at: new Date()
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lab_access_logs', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lab_access_logs', null, {});
  }
};
