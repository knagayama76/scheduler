import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  // appointment ID = 3
  const updateSpot = (state, appointmentId) => {
    // find the current day
    const currentDay = state.days.find((dayObj) =>
      dayObj.appointments.includes(appointmentId)
    );
    // console.log("CURRENT DAY", currentDay);
    const nullAppointments = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    );
    // console.log("NULL", nullAppointments);

    const spots = nullAppointments.length;

    const modifiedNewDay = {
      ...currentDay,
      spots,
    };
    // console.log("MODIFIED", modifiedNewDay);
    const newDaysArray1 = [];
    state.days.forEach((dayObj) => {
      if (state.day === dayObj.name) {
        newDaysArray1.push(modifiedNewDay);
      } else {
        newDaysArray1.push(dayObj);
      }
    });
    // console.log("NEW!", newDaysArray1);

    // const newDaysArray2 = state.days.map((dayObj) => {
    //   if (state.day === dayObj.name) {
    //     return modifiedNewDay;
    //   } else {
    //     return dayObj;
    //   }
    // });

    const newDaysArray3 = state.days.map((dayObj) =>
      state.day === dayObj.name ? modifiedNewDay : dayObj
    );

    setState({
      ...state,
      days: newDaysArray3,
    });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = {
      ...state,
      appointments,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments });
      updateSpot(newState, id);
    });
  }
  // console.log("STATE", state);

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = {
      ...state,
      appointments,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({ ...prev, appointments }));
      updateSpot(newState, id);
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

// Create a new file hooks/useApplicationData.js and move the logic used to manage the state from the components/Application.js into it.

// Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.
