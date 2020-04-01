/**
 * Criado com base no modelo MVC
 * para não ter 2 métodos index no mesmo controller
 */

const connection = require('../database/connection.js');

module.exports = {
  
  async index(request, response) {

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('totalIncidents', count['count(*)']);

    return response.json(incidents);
  }
};