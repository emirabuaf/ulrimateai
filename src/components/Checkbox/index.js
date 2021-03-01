import React from "react";
import styles from "./styles.css";

const Checkbox = (props) => {
  return (
    <div>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={props.isChecked[props.id]}
          name={props.id}
          value={props.id}
          onChange={props.onChange}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Checkbox;
