import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      avatar={interviewer.avatar}
      setInterviewer={props.setInterviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
