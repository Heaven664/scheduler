import { useState, useEffect } from "react";
import { getAppointmentsForDay } from 'helpers/selectors';
import axios from 'axios';

export default function useApplicationData() {
  // Set initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Get state from API and update it
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }
      ));
    });
  }, []);

  // Update spots func(state, appointments)
  // Filter days by state.day to find current
  // Get appointments for a specific day
  // ++, when delete appointment
  // --, when book appointment
  // return numb of spots

  // const updateSpots = (state) => {

  //   const currentDay = state.days.find(day => {
  //     return state.day === day.name
  //   })
  //   console.log(currentDay)

  //   // const dailyAppointments = getAppointmentsForDay(state, currentDay.name)
  //   // console.log(dailyAppointments)

  // }

  // updateSpots(state)

  // Update current day
  const setDay = (day) => setState({ ...state, day });

  // Book new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments, }));
        // console.log(state.appointments);
      });
    // .then(() => console.log(state.appointments))

  }

  // Delete an interview
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => console.log(state.appointments));
  }

  return { state, setDay, bookInterview, cancelInterview };
};