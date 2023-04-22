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

export function getInterview(state, interview) {
  // return null if an interview is not booked yet
  if(!interview) {
    return null;
  }
  // Get interviewer's ID
  const interviewerID = interview.interviewer;
  // Copy an interviewers object containing
  const interviewer = {...state.interviewers[interviewerID]};
  // Copy provided interview object from arguments, but overwrite interviewerID with interviewerObject
  const newInterview = {...interview, interviewer};

  return newInterview;
}
