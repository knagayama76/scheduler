export function getAppointmentsForDay(state, day) {
  const appointmentArray = [];

  state.days.map((el) => {
    if (el.name === day) {
      el.appointments.map((id) => {
        appointmentArray.push(state.appointments[id]);
      });
    }
  });
  return appointmentArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  result.student = interview.student;

  result.interviewer = state.interviewers[interview.interviewer];

  return result;
}
