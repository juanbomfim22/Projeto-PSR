
exports.up = function(knex) {
    return knex.schema.createTable('usuario2', table => {
        table.increments('id').primary()
        table.string('username').notNull()
        table.string('password').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuario2')
};
