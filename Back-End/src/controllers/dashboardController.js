const connection = require('../database/connection.js');

module.exports = {

  async index(request, response) {

    //recebe as informações passadas pelo header da requisição
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
              .onIn('volunteer_id', [id])
              .onIn('status', ['resolvido', 'Resolvido']);
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
  },

  async getStatus(request, response) {
    
    //recebe as informações passadas na requisição
    const { dashboardtype, id } = request.headers;

    const incidentsStatus = {
      count: 0,
      solved: 0,
      open: 0,
      notSolved: 0,
      totalReceived: 0
    };

    switch (dashboardtype) {
      
      case 'ong':
        //conta total de casos da ong
        const totalOngIncidents = await connection('incidents')
          .where('ong_id', id)
          .select([
            'incidents.id',
            'incidents.status',
            'incidents.value'
          ]);
        
        incidentsStatus.count = totalOngIncidents.length;
        
        totalOngIncidents.forEach(incident => {

          incidentsStatus.totalReceived += incident.value;
          switch ( incident.status ) {
            
            case 'Aberto':
              incidentsStatus.open++;
              break;
            
            case 'aberto':
              incidentsStatus.open++;
              break;
            
            case 'Resolvido':
              incidentsStatus.solved++;
              break;
            
            default:
              incidentsStatus.notSolved++;
              break;
          }          
        });

        break;
      
      case 'volunteer':        
        //conta total de casos do voluntário
        const totalVolunteerIncidents = await connection('incident_history')
          .where('volunteer_id', id)
          .select([
            'incident_history.incident_id',
            'incident_history.received_value'
          ]);
        
        console.table(totalVolunteerIncidents);
        
        incidentsStatus.count = totalVolunteerIncidents.length;
        
        totalVolunteerIncidents.forEach(incident => {
          incidentsStatus.solved++;
          incidentsStatus.totalReceived += incident.received_value;
        });
        break;
      
      default:
        break;

    };

    console.table(incidentsStatus);
    return response.json(incidentsStatus);

  }

};