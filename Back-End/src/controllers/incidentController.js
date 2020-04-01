const connection = require('../database/connection.js');

module.exports = {
  //Lista incidents do banco de dados
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection("incidents")
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //junta registros de duas tabelas
      .limit(5) //limite de registros retornados
      .offset( (page - 1) * 5) //avança para o registro da proxima pagina
      .select([ //seleciona os dados necessários de cada registro
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    //retorna a quantidade total de registros no header do response
    response.header("X-Total-Count", count["count(*)"] );
    
    return response.json(incidents);
  },
  //Cadastra um incident no banco de dados
  async create(request, response) {
    const { title, description, value, deadline, status } = request.body;
    const ong_id = request.headers.authorization;
    const create_at = Date.now();

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
      create_at,
      deadline,
      status
    });

    return response.json({ id });
  },
  //deleta um incident recebendo a id no params
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({
        error: 'Operation not permitted.'
      });
    } else {
      try {
        await connection('incidents').where('id', id).delete();
      } catch (error) {
        alert('Erro ao deletar incidente. Tente Novamente.')
      }
        return response.status(204).send();
    }
  }
};