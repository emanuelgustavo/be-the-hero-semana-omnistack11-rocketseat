/**
 * Criado com base no modelo MVC
 * para não ter 2 métodos index no mesmo controller
 */

const connection = require('../database/connection.js');

module.exports = {
  
  async index(request, response) {

    const incidents = await connection('incidents').select('*');

    return response.json(incidents);
  }
};