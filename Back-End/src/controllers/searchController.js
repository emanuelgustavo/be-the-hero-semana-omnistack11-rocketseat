/**
 * Criado com base no modelo MVC
 * para não ter 2 métodos index no mesmo controller
 */

const connection = require('../database/connection.js');

module.exports = {
  
  async index(request, response) {

    //conta a quantidade de registro no banco de dados
    const [count] = await connection('incidents').count();
    //busca os registro da tabela incident_history
    const historyIncidentsId = await connection("incident_history")
      .select("incident_id")
      .distinct();
    //extrai apenas os valores de dentro do array de objetos retornados na query acima
    const incidentIdOnHistory = historyIncidentsId.map(incident => {
      return incident.incident_id;
    });
    //busca os incidents que não estão na tabela de histórico
    const incidents = await connection('incidents')
      .join('ongs', function () {
        this.on('ongs.id', '=', 'incidents.ong_id')
          .onNotIn('incidents.id', incidentIdOnHistory);
      })
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  }
};