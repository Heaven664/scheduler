/**
 * Returns list of appointments objects for a specific day
 * @param {object} object with data
 * @param {string} day name
 * @returns array of objects
 */
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

/**
 * Returns list of interviewers objects for a specific day
 * @param {object} object with data 
 * @param {string} day name
 * @returns array of objects
 */
export function getInterviewersForDay(state, day) {
  const interviewers = [];
  let interviewersIndices = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      interviewersIndices = [...dayObj.interviewers];
      break;
    }
  }

  interviewersIndices.forEach((index) => {
    interviewers.push(state.interviewers[index]);
  });

  return interviewers;
}

/**
 * Replace interviewer id with their object
 * @param {object} object with data 
 * @param {object} interview
 * @returns object
 */
export function getInterview(state, interview) {
  // return null if an interview is not booked yet
  if (!interview) {
    return null;
  }
  // Get interviewer's ID
  const interviewerID = interview.interviewer;
  // Copy an interviewers object containing the interviewer's id
  const interviewer = { ...state.interviewers[interviewerID] };
  // Copy provided interview object from arguments, but overwrite interviewerID with interviewerObject
  const newInterview = { ...interview, interviewer };

  return newInterview;
}