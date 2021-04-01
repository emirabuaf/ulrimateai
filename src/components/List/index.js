import React, { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import styles from "./styles.css";

const List = (props) => {
  const [value, setValue] = useState("");
  const [selectedId, selectId] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = (event, id) => {
    setValue(event.target.value);
  };

  console.log(isChecked);

  const handleClick = (id) => {
    selectId(id);
    setValue("");
  };

  const handleAllCheck = (e) => {
    setAllChecked(e.target.checked);
  };

  const handleSingleCheck = (e) => {
    setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
  };

  // only in the first render with the reduce function an object is created and false value
  // is assigned to each id and it will not have
  // any data change even though the select all button is clicked.
  useEffect(() => {
    const initialIsChecked = props.jsonData.reduce((data, item) => {
      data[item.id] = false;
      return data;
    }, {});
    setIsChecked(initialIsChecked);
  }, []);

  //   this will handle each item's checkbox from select all input and
  //   everytime the state is changed with allchecked state the checboxes will get their new value
  useEffect(() => {
    setIsChecked((current) => {
      const nextIsChecked = {};
      Object.keys(current).forEach((key) => {
        nextIsChecked[key] = allChecked;
      });
      return nextIsChecked;
    });
  }, [allChecked]);

  return (
    <div className="container">
      <div className="header">
        <h1>User Intent</h1>
        <h1>Training expression</h1>
      </div>
      <input
        className="select-all-input"
        name="checkall"
        type="checkbox"
        checked={allChecked}
        onChange={handleAllCheck}
      />
      {!allChecked ? "Select All" : "Clear Selection"}
      <div>
        Selected Items: {Object.values(isChecked).filter((x) => x).length}
      </div>
      {props.jsonData.map((item) => (
        <div key={item.id} className="main-intent-container">
          <div className="intent-container">
            <Checkbox
              isChecked={isChecked}
              onChange={handleSingleCheck}
              {...item}
            />
            <div className="intent">
              <h3 className="name">{item.name}</h3>
              <p className="description">
                (When {item.description.toLowerCase()})
              </p>
            </div>
            <select
              onClick={(id) => handleClick(item.id)}
              onChange={handleSelectChange}
              className="user-response"
            >
              {item.trainingData.expressions.map((expression) => (
                <option key={expression.id} selected disabled hidden>
                  {expression.text}
                </option>
              ))}
              {item.trainingData.expressions.map((expression) => (
                <option key={expression.id}>{expression.text}</option>
              ))}
            </select>
          </div>
          <p className="select-title">
            Choose an answer to see the bot response
          </p>

          {item.id == selectedId && value !== "" ? (
            <div className="response-container">
              <p className="response-text">{item.reply.text}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default List;
