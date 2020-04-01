
exports.up = function(knex) {
  return knex.schema.createTable("volunteer", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("whatsapp").notNullable();
    table.string("email").notNullable();
    table.string("city").notNullable();
    table.string("uf").notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("volunteer");  
};
