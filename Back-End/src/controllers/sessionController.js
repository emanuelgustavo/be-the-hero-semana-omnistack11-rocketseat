const connection = require('../database/connection.js');

module.exports = {

  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();
    
    if (!ong) {
      return response
        .status(400)
        .json({ error: 'ID not found.' });
    } else {
      return response.json( ong );
    }
  }

};