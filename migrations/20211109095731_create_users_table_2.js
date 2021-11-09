
exports.up = function(knex) {
    return knex.schema.createTable('usuario3', table => {
        table.increments('id').primary()
        table.string('email').notNull()
        table.string('username').notNull()
        table.string('password').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuario3')
};
