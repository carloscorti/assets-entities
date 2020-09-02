import { useState, useEffect, useCallback } from 'react';

/**
 * Function useContextMenu (custom hook): manage satate for custom context menu, on rigth click on row table pops up
 * custom context menu with test button, by clickin test button it displays row's id key
 *
 * @return {string}      xPos         x position where rogth click was made
 * @return {string}      yPos         y position where rogth click was made
 * @return {boolean}     showMenu     to manage context menu visibility
 * @return {Function}    handleClick  to manage context menu text button behavior
 */
const useContextMenu = () => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);
  const [testValue, setTestValue] = useState('');

  /**
   * Function handleContextMenu: prevents default context menu, if rigth click was made inside the table (TD dom node)
   * sets x and y position where rigth ckick was made, sets context menu vivibility to true,
   * sets test button value with row's id key value
   *
   * @param  {object}  e  event object were rigth click was made
   */
  const handleContextMenu = (e) => {
    e.preventDefault();

    if (e.target.nodeName === 'TD') {
      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setShowMenu(true);
      setTestValue(e.path[1].cells[0].innerText);

      // console.log(showMenu);
    }
  };

  /**
   * Function handleClick:  if click was made on test id button from custom context menu,
   * sets context menu vivibility to false, displays testValue
   *
   * @param  {object}  e  event object were click was made
   */
  const handleClick = (e) => {
    showMenu && setShowMenu(false);
    if (e.currentTarget.id === 'test') {
      console.info(`Entity id ${testValue}`);
      alert(`Entity id ${testValue}`);
    }
  };

  useEffect(() => {
    // adds event listener on mounting component
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      // remove event listener on unmounting component
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [showMenu]);

  return {
    xPos,
    yPos,
    showMenu,
    handleClick,
  };
};

export default useContextMenu;
