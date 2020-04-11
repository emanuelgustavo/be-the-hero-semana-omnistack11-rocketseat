const connection = require('../database/connection.js');

module.exports = {

  async create(request, response) {

    const { id, type } = request.body;
    const database = type === 'ong' ? 'ongs' : 'volunteer'; 

    console.log(database, id, type);

    const register = await connection(database)
      .where('id', id)
      .select('name')
      .first();
    
    if (!register) {
      return response
        .status(400)
        .json({ error: 'ID not found.' });
    } else {
      console.log(register);
      return response.json( register );
    }

  }

};