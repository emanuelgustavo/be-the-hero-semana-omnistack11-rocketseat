const connection = require('../database/connection.js');

module.exports = {

  async index(request, response) {

    const { dashboardType, ong_id, volunteer_id } = request.body;
   
    if (dashboardType === 'ong') {

      const incidents = await connection('incidents')
        .where('ong_id', ong_id);
      
      return response.json(incidents);

    };
    
    if (dashboardType === "volunteer") {

      const incidents = await connection("incidents")
        .select('*')
        .join('incident_history', function () {
          this.on("incidents.id", "=", "incident_history.incident_id")
            .onIn('volunteer_id', [volunteer_id]);
        });

      return response.json(incidents);
    };
  }
};