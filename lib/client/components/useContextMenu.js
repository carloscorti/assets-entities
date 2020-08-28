import { useState, useEffect } from 'react';

const useContextMenu = () => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);
  const [testValue, setTestValue] = useState('');

  const handleContextMenu = (e) => {
    e.preventDefault();

    if (e.target.nodeName === 'TD') {
      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setShowMenu(true);
      setTestValue(e.path[1].cells[0].innerText);
    }
  };

  const handleClick = (e) => {
    if (e.currentTarget.id === 'test') {
      showMenu && setShowMenu(false);
      console.info(`Entity id ${testValue}`);
      alert(`Entity id ${testValue}`);
    }
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return {
    xPos,
    yPos,
    showMenu,
    handleClick,
  };
};

export default useContextMenu;
