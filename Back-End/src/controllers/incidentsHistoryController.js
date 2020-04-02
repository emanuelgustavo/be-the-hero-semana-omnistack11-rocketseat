const connection = require('../database/connection.js');

module.exports = {

  async index(request, response) {
    const incidentsHistory = await connection('incident_history').select('*');

    return response.json(incidentsHistory);
  },
  /**
   * Adiciona ao historico do incidente o valor doado por um voluntário
   */
  async create(request, response) {
    
    const { incident_id, volunteer_id, received_value } = request.body;

    //busca o valor do incident na tabela de incidents
    const incidentValue = await connection('incidents')
      .where('id', incident_id)
      .select('value')
      .first();
    //verifica se o valor doado é o valor total do incident
    if (incidentValue === received_value) {
      completeValue = true;
    } else {
      completeValue = false;
    }

    //insere os dados no banco
    const [id] = await connection("incident_history").insert({
      incident_id,
      volunteer_id,
      received_value,
      completeValue: true
    });

    //soma o total doado para cada incident
    const totalValueDonate = await connection("incident_history")
      .where("incident_id", incident_id)
      .sum('received_value as value');
    
    //atualiza a flag informando quando o valor do incident é atingido
    if (totalValueDonate[0].value >= incidentValue.value) {
      await connection("incident_history")
        .where("incident_id", incident_id)
        .update({
          completeValue: true
        });
    }
    
    return response.json({ id });
  }
};