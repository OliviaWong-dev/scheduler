import React from "react";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const appointmentTime = props.time
    ? `Appointment at ${props.time}`
    : "No Appointment";
  return <article className="appointment">{appointmentTime}</article>;
}
