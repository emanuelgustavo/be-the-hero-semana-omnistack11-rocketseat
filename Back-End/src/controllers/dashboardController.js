const connection = require('../database/connection.js');

module.exports = {

  async index(request, response) {

    //recebe as ionformações passadas pelo header da requisição
    const { dashboardtype, id } = request.headers;

    const [count] = await connection('incidents').count();
    
    switch (dashboardtype) {

      case 'ong':
        const ongIncidents = await connection('incidents')
          .where('ong_id', id);

        response.header("X-Total-Count", count["count(*)"]);
        
        return response.json(ongIncidents);
      
      case 'volunteer':
        const volunteerIncidents = await connection("incidents")         
          .join('incident_history', function () {
            this.on("incidents.id", "=", "incident_history.incident_id")
              .onIn('volunteer_id', [id]);
          })
          .select([
            'incident_history.*',
            'incidents.title',
            'incidents.description',
            'incidents.value',
            'incidents.ong_id',
            'incidents.create_at',
            'incidents.deadline',
            'incidents.status',
          ])
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .select([
            'ongs.name',
            'ongs.city',
            'ongs.uf'
          ]);
        
        response.header("X-Total-Count", count["count(*)"]);

        return response.json(volunteerIncidents);
      
      default:
    }
  }
};