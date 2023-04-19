import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.key}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      ></DayListItem>
    );
  });

  return <ul>{days}</ul>;
}
