const connection = require('../database/connection.js');

async function handleExpiredDeadline(incidendId) {

  await connection('incidents')
    .where('id', incidendId)
    .update({
      status: 'Não Resolvido'
    });
  
}

module.exports = {

  async index(request, response) {

    /**
     * Primeiro verifica o deadline de cada incident
     * Se estiver expirado e o incident muda o status para
     * não resolvido
     */
    const allIncidents = await connection('incidents');

    allIncidents.forEach( incident => {
      
      if (incident.deadline < Date.now()) {
        
        handleExpiredDeadline(incident.id);

      }

    });

    //recebe as informações passadas pelo header da requisição
    const { dashboardtype, id } = request.headers;

    switch (dashboardtype) {

      case 'ong':
        const ongIncidents = await connection('incidents')
          .where('ong_id', id);

        response.header("X-Total-Count", ongIncidents.length);
        
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
        
        response.header("X-Total-Count", volunteerIncidents.length);

        console.log(volunteerIncidents);

        return response.json(volunteerIncidents);
      
      default:
    }
  },

  //Retorna os incidents para o dashboard mobile do voluntário
  async indexMobile(request, response) {

    const { id } = request.headers;

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
        
    response.header("X-Total-Count", volunteerIncidents.length);

    console.log(volunteerIncidents);

    return response.json(volunteerIncidents);
  },

  //Retorna o status de todos os incidents para o gráfico da dashboard
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
        const allOngIncidents = await connection('incidents')
          .where('ong_id', id)
          .select([
            'incidents.id',
            'incidents.status',
            'incidents.value'
          ]);
        
        incidentsStatus.count = allOngIncidents.length;
        
        allOngIncidents.forEach(incident => {
          
          switch (incident.status) {    
            
            case 'Aberto':
              incidentsStatus.open++;
              break;
            
            case 'aberto':
              incidentsStatus.open++;
              break;
            
            case 'Resolvido':
              incidentsStatus.solved++;
              incidentsStatus.totalReceived += incident.value;
              break;
            
            default:
              incidentsStatus.notSolved++;
              break;
          }          
        });

        break;
      
      case 'volunteer':        
        //conta total de casos do voluntário
        const allVolunteerIncidents = await connection('incident_history')
          .where('volunteer_id', id)
          .select([
            'incident_history.incident_id',
            'incident_history.received_value'
          ]);
        
        incidentsStatus.count = allVolunteerIncidents.length;
        
        allVolunteerIncidents.forEach(incident => {
          incidentsStatus.solved++;
          incidentsStatus.totalReceived += incident.received_value;
        });
        break;
      
      default:
        break;

    };

    return response.json(incidentsStatus);

  }

};