export function getAppointmentsForDay(state, day) {
  const appointments = [];
  let appointmentsIndices = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      appointmentsIndices = [...dayObj.appointments];
      break;
    }
  }
  
  appointmentsIndices.forEach((index) => {
    appointments.push(state.appointments[index]);
  });
  return appointments;
}
