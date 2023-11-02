import PropTypes from 'prop-types';

export const Filter = ({ filterFn }) => {
  return (
    <>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        className="find-contact"
        name="find-contact"
        onChange={filterFn}
      ></input>
    </>
  );
};

Filter.propTypes = {
  h3: PropTypes.string,
  filterFn: PropTypes.func,
  input: PropTypes.string,
};
