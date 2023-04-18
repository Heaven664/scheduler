import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

/**
 * Generates string based on number of spots
 * @param {number} spots
 * @returns string
 */
const formatSpots = (spots) => {
  if (spots === 0) {
    return "no spots";
  }
  if (spots === 1) {
    return "1 spot";
  }
  return `${spots} spots`;
};

export default function DayListItem(props) {
  const spots = formatSpots(props.spots);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spots} remaining</h3>
    </li>
  );
}
