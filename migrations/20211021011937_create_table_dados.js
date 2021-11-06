
exports.up = function(knex) {
    return knex.schema.createTable('dados', table => {
        table.increments('id').primary()
        table.string('name').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('dados')
};
