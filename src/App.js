import React from 'react';

export default function App() {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock />
    <MainNav />
    <Filter />
    </div>;
}

export function TopHeader() {
  return <div className="top">
    <h1>
      ExploreUW
    </h1>
    <h2>UW College of Environment</h2>
    </div>
}

export function PurpleBlock() {
  return <div className="purple-block" aria-label="a purple rectangular block">
    <h3>Undergraduate Programs</h3>
  </div>;
}

/* Doesn't link to anything at the moment */
export function MainNav() {
  return <div className="main-nav" role="navigation"><a href="resources.html">Additional resources</a></div>;
}

export function Filter() {
  return <form className="filters">
  <label for="filter"><p className="filter-label">Filter programs by: </p></label>
  <div className="row justify-content-center">
      <select id="filter" className="custom-select custom-select-lg mb-6">
          <option selected>No filter</option>
          <option value="1">Bachelor of Sciences</option>
          <option value="2">Bachelor of Arts</option>
          <option value="3">Capacity-contrained major</option>
          <option value="4">Minimum major</option>
          <option value="5">Open major</option>
      </select>
  </div>
</form>;
}