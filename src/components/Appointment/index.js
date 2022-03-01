import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log(
      "NAME",
      name,
      "INTERVIEWER",
      interviewer,
      "INTERWIEW",
      interview
    );

    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  //   Before we can test that the state is changed locally, we need to have the Appointment component transition to the SHOW mode.

  // Within the save function in our Appointment component transition to the SHOW mode after calling props.bookInterview.
  console.log("PROPS", props.interview);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}
