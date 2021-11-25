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
    console.log("day", day);
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

  const bookInterview = function (id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState({
        ...state,
        appointments,
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
      setState({ ...state, deleteItem });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
