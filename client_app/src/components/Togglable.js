import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? '' : 'none' };
  const showWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>CANCEL</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

export default Togglable;
