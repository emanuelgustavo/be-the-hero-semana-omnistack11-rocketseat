
const connection = require('../database/connection.js');

//recebe o id de um incident com deadline expirado e atualiza o status
const updateDeadlineExpiredDeadline = async (incidentId) => {

  await connection('incidents')
    .where('id', incidentId)
    .update({
      status: 'Não Resolvido'
    });
  
};

module.exports = {
  
  async index(request, response) {

    /**
     * verifica se o prazo de deadline não está expirado
     * se sim, altera o status para não resolvido para não
     * exibir na busca
     */
    const nowTime = Date.now();

    const incidentsDeadline = await connection('incidents')
      .where('deadline', '<', nowTime)
      .select([
        'id',
        'deadline'
      ]);
    
    incidentsDeadline.forEach(incident => {

      updateDeadlineExpiredDeadline(incident.id);

    });

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
    /**
     * No search de incidents, aparece apenas os casos abertos
     * e dentro do prazo. Se o caso recebe uma doação, ele passa
     * a ter o status de resolvido e sai do search. Se o caso
     * passa do deadline de arrecadação sem receber doação
     * ele passa a ter o status de não resolvido e sai do search
     * passando a aparecer para a ong como não resolvido.
     */
    const incidents = await connection('incidents')
      .join('ongs', function () {
        this.on('ongs.id', '=', 'incidents.ong_id')
          .onIn('incidents.status', ['aberto', 'Aberto'])
          .onNotIn('incidents.id', incidentIdOnHistory);
      })
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', incidents.length);

    return response.json(incidents);
  }
};