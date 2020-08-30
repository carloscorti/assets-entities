import React from 'react';
import useContextMenu from './useContextMenu';

/**
 * ContextMenu comoponent: Displays custom context menu, with test button,
 * by clicking test button displays id from row in wich rigth click was pressed
 * uses useContextMenu custom hook to manage state
 *
 */
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
