import React, { useState } from 'react';

const Togglable = ({ btnLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? '' : 'none' };
  const showWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>{btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>CANCEL</button>
      </div>
    </div>
  );
};

export default Togglable;
