import React from "react";

const Textarea = ({ onChange, rows, placeHolder, name, value }) => {
  return (
    <div>
      <textarea
        className="textarea border border-gray block w-full"
        name={name}
        rows={rows}
        onChange={onChange}
        placeholder={value}
      ></textarea>
    </div>
  );
};

export default Textarea;
