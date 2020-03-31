/**
 * Criado com base no modelo MVC
 * para não ter 2 métodos index no mesmo controller
 */

const connection = require('../database/connection.js');

module.exports = {
  
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

    return response.json(incidents);
  }
};