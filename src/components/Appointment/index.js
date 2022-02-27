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
        <Form interviewers={props.interviewers} onCancel={() => back()} />
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

// The Form Component
// When the mode === CREATE we want to show the Form component.

// Update the Appointment component with the appropriate conditional logic to handle the transition to CREATE.

// We haven't properly implemented the getInterviewersForDay selector yet and the Form component requires a list of interviewers, so for now we'll need a workaround.

// Set the interviewers prop to an empty array. We will implement this properly in a future activity.
