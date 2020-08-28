import React from 'react';
import useContextMenu from './useContextMenu';

const ContextMenu = () => {
  const { xPos, yPos, showMenu, handleClick } = useContextMenu();

  return (
    <>
      {showMenu ? (
        <div
          className="list-group"
          style={{ position: 'absolute', top: yPos, left: xPos }}
        >
          <button
            type="button"
            id="test"
            className="list-group-item list-group-item-action"
            onClick={handleClick}
          >
            Test
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContextMenu;
