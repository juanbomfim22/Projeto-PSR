// Usar esse arquivo de configuração padrão

module.exports = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  pool: { 
    min: 2,
    max: 10
  },
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
