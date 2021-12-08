import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = function (id, interview, isNew) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      // updateSpots("bookInterview");
      const days = isNew
        ? updateSpots2([...state.days], id, -1)
        : [...state.days];
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const cancelInterview = function (id) {
    const deleteItem = {
      ...state.appointments[id],
      interview: null,
    };
    delete deleteItem[id];
    return axios.delete(`/api/appointments/${id}`).then(() => {
      // updateSpots();
      const days = updateSpots2([...state.days], id, 1);
      setState({ ...state, deleteItem, days });
    });
  };

  const updateSpots = function (requestType) {
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const days = { ...state.days };
    if (dayIndex < 0) return;
    if (requestType === "bookInterview") {
      days[dayIndex].spots -= 1;
      // day.spots -= 1;
    } else {
      days[dayIndex].spots += 1;
      // day.spots += 1;
    }
    // days[dayIndex] = { ...day };
    return days;
  };

  const updateSpots2 = function (days, id, value) {
    days.forEach((day) => {
      if (day.appointments.includes(id)) {
        day.spots = day.spots + value;
      }
    });
    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
}
