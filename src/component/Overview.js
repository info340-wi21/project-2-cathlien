import React from "react";

  // Overview returns a set of text containing the overview information for that major page.
  export function Overview(props) {
    let content;
    props.content.forEach((major) => {
      if (major.majorName === props.name) {
        content = major;
      }
    })
    return <section>
      <h4 id="Overview">Overview</h4>
      <p>{content.overview}</p>
    </section>
  }