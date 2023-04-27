import axios from 'axios';
import { useState, useEffect } from "react";
import { updateSpots } from 'helpers/helpers';

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
      axios.get("/api/interviewers"),
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
        const days = updateSpots(state, appointments);
        setState(prev => ({ ...prev, appointments, days }));
      });

  }

  // Delete an interview
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState(prev => ({ ...prev, appointments, days }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};