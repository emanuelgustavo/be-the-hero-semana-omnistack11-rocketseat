
exports.up = function(knex) {
  return knex.schema.createTable("incident_history", function (table) {
    table.increments();
    table.string("incident_id").notNullable();
    table.foreign("incident_id").references("id").inTable("incidents");
    table.string("volunteer_id").notNullable();
    table.foreign("volunteer_id").references("id").inTable("volunteer");
    table.decimal("received_value").notNullable();
    table.boolean("completeValue").notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incident_history");
};
