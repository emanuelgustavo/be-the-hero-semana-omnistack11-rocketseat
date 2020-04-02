//pacote para criar criptografia do nodejs
const generateUniqueId = require('../utils/generateUniqueId.js');
const connection = require("../database/connection.js");

module.exports = {
  //Lista as ongs do banco de dados
  async index(request, response){ 
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },
  //Cadastra uma ong no banco de dados
  async create(request, response){ 
  //Para acessar os parametros passado na requisição
  const { name, email, whatsapp, city, uf } = request.body;
  //cria uma id aleatoria e converte para string em caracteres hexadecimais
  const ongId = generateUniqueId();

  await connection('ongs')
    .insert({
      id: ongId,
      name,
      email,
      whatsapp,
      city,
      uf
    });
  return response.json({ id: ongId });
  }

};