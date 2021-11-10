
module.exports = {
  client: 'postgresql',
  connection: {
    host: "ec2-34-194-100-156.compute-1.amazonaws.com",
    database: 'd2gb9kahmibeco',
    user: 'uxtysgehfovjzp',
    password: 'a4b68b2e58a73302f32fd091ff85dd5d7b25d7ea68e1e577af7415fa35230afe',
  },
  pool: { 
    min: 2,
    max: 10
  }
}; 

// LOCAL

// module.exports = {
//   client: 'postgresql',
//   connection: {
//     host: ""
//     database: 'cadastro',
//     user: 'postgres',
//     password: 'admin',
//   },
//   pool: { 
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// };
