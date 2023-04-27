/**
 * Updates number of available number of spots
 * @param {object} object with data 
 * @param {array} array of appointment objects
 * @returns array of objects
 */
export const updateSpots = (state, appointments) => {
  const dayObj = state.days.find((day) => day.name === state.day);
  const appointmentsArray = dayObj.appointments;
  let spots = 0;
  for (let index of appointmentsArray) {
    if (!appointments[index].interview) {
      spots++;
    }
  }
  const newDay = { ...dayObj, spots };
  const days = state.days.map((day) => (state.day === day.name ? newDay : day));
  return days;
};

/**
 * Generates string based on number of spots
 * @param {number} spots
 * @returns string
 */
export const formatSpots = (spots) => {
  if (spots === 0) {
    return "no spots remaining";
  }
  if (spots === 1) {
    return "1 spot remaining";
  }
  return `${spots} spots remaining`;
};
