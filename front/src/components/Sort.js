const Sort = ({ handleSort, sortState }) => {
  return (
    <div className="sorting mt-4">
      <label className="radio-container">
        <input
          className="radio"
          type="radio"
          name="sort-options"
          value="location"
          checked={sortState === "location"}
          onChange={(e) => handleSort(e.target.value)}
        />
        Distance
        <span className="mark"></span>
      </label>
      <label className="radio-container">
        <input
          className="radio"
          type="radio"
          name="sort-options"
          value="age"
          checked={sortState === "age"}
          onChange={(e) => handleSort(e.target.value)}
        />
        Age
        <span className="mark"></span>
      </label>
      <label className="radio-container">
        <input
          className="radio"
          type="radio"
          name="sort-options"
          value="fame"
          checked={sortState === "fame"}
          onChange={(e) => handleSort(e.target.value)}
        />
        <span className="mark"></span>
        Popularity
      </label>
    </div>
  );
};

export default Sort;
