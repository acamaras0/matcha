const Sort = ({ handleSort, sortState }) => {
  return (
    <div className="sorting mt-4">
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="radio"
          name="sort-options"
          value="location"
          checked={sortState === "location"}
          onChange={(e) => handleSort(e.target.value)}
        />
        Distance
      </label>
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="radio"
          name="sort-options"
          value="age"
          checked={sortState === "age"}
          onChange={(e) => handleSort(e.target.value)}
        />
        Age
      </label>
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="radio"
          name="sort-options"
          value="fame"
          checked={sortState === "fame"}
          onChange={(e) => handleSort(e.target.value)}
        />
        Popularity
      </label>
    </div>
  );
};

export default Sort;
