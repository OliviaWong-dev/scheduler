export function getAppointmentsForDay(state, day) {
  let found = state.days.find((d) => day === d.name);
  if (state.days.length === 0 || found === undefined) {
    return [];
  }
  return found.appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (interview === null || interview === undefined) {
    return null;
  }
  interview.interviewer = state.interviewers[interview.interviewer];
  return interview;
}

export function getInterviewersForDay(state, day) {
  let found = state.days.find((d) => day === d.name);
  if (state.days.length === 0 || found === undefined) {
    return [];
  }
  return found.interviewers.map((id) => state.interviewers[id]);
}
