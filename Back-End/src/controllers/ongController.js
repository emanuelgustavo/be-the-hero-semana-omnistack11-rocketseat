//pacote para criar criptografia do nodejs
const crypto = require("crypto");
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
  const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    return response.json({ id });
  }

};