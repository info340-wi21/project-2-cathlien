import React from "react";

 // PurpleBlock returns a large purple div block containing header text. 
  export function PurpleBlock(props) {
    return <div className="purple-block" aria-label="a purple rectangular block">
      <h3>{props.name}</h3>
    </div>;
  }
