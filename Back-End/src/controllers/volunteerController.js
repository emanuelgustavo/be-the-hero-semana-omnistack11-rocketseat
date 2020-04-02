const generateUniqueId = require('../utils/generateUniqueId.js');
const connection = require('../database/connection.js');

module.exports = {
  //listagem padrão de todos os voluntário cadastrados
  async index(request, response) {
    const volunteers = await connection('volunteer').select('*');

    return response.json(volunteers);
  },
  //cadastra um novo voluntario no banco de dados
  async create(request, response) {
    const { name, city, uf, whatsapp, email } = request.body;
    //gerando id para o volunteer
    const volunteerId = generateUniqueId();

    await connection('volunteer').
      insert({
        id: volunteerId,
        name,
        whatsapp,
        email,
        city,
        uf
      });
    
    return response.json({ id: volunteerId });
  }
};