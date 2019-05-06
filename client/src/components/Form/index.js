import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input (props) {
  return (
    <input className="" {...props} />
  );
}

export function TextArea (props) {
  return (
    <div className="">
      <textarea className="" rows="20" {...props} />
    </div>
  );
}

export function FormBtn (props) {
  return (
    <button {...props} className="btn-search btn">
      {props.children}
    </button>
  );
}
