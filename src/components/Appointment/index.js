import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const render = props.interview ? (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  ) : (
    <Empty />
  );
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {render}
      </article>
    </>
  );
}
