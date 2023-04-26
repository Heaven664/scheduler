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

  const updateSpots = (state, booking = false) => {
    const currentDay = state.days.find(day => {
      return state.day === day.name;
    });

    const dailyAppointments = getAppointmentsForDay(state, currentDay.name);

    let spots = 0;
    for (let day of dailyAppointments) {
      if (!day.interview) {
        spots++;
      }
    }
    spots = booking ? spots - 1: spots + 1
    return spots;
  };

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
      })
      .then(() => {
        const spots = updateSpots(state, true);
        setState(prev => {
          const newDays = prev.days.map(day => {
            if (prev.day === day.name) {
              return { ...day, spots };
            }
            return day;
          });
          return { ...prev, days: newDays };
        });
      });

  }

  // Delete an interview
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => {
        const spots = updateSpots(state);
        setState(prev => {
          const days = prev.days.map(day => {
            if (prev.day === day.name) {
              return { ...day, spots };
            }
            return day;
          });
          return { ...prev, days };
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};