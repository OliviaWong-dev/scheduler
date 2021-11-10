import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewers__item = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const interviewerName = function (name) {
    return props.selected ? `${name}` : "";
  };
  return (
    <li className={interviewers__item} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {interviewerName(props.name)}
    </li>
  );
}
