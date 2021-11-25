import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const onDelete = function () {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETE && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm onConfirm={onDelete} onCancel={() => transition(SHOW)} />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="save"
            onClose={() => {
              transition(EMPTY);
            }}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="delete"
            onClose={() => {
              transition(SHOW);
            }}
          />
        )}
      </article>
    </>
  );
}
