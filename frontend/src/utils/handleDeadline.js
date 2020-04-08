import api from '../services/api.js';

export default function handleDeadline(incidentDeadline, incidentId) {

  const nowTime = Date.now();  

  if (nowTime > incidentDeadline) {
    api.post('/incidents/expired', {
      incidentId
    });
  }

  const deadline = incidentDeadline - nowTime;
  const deadlineDays = Math.floor((deadline / (24 * 60 * 60 * 1000)));

  let text = `${deadlineDays}`;

  if (deadlineDays === 1) {
    text += ` dia`;
  } else {
    text += ` dias`;
  }

  return text;
}