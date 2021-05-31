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