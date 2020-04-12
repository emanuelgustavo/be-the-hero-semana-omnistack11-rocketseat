export default function handleDeadline(deadline) {

  const deadlineDays = Math.floor((deadline - Date.now()) / (24 * 60 * 60 * 1000));
  let text = '';

  if (deadlineDays > 1) {
    text += `${deadlineDays} dias`;
  } else {
    text += `${deadlineDays} dia`;
  }

  return text;
}