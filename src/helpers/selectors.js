// export

const getAppointmentsForDay = function (state, day) {
  let found = state.days.find((d) => day === d.name);
  if (state.days.length === 0 || found === undefined) {
    return [];
  }
  return found.appointments.map((id) =>
    console.log("state", state.appointments[id])
  );
};
