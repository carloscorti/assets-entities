import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

const useEndpointData = (
  storeName = '',
  store,
  fetchStoreAction,
  addToStoreAction,
  initState = {}
) => {
  const [newData, setNewData] = useState(initState);

  useEffect(() => {
    (async () => {
      if (store) {
        return;
      }
      console.info(`api call to ${storeName}`);
      await fetchStoreAction();
    })();
  }, []);

  const handleInput = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDatatId = Math.max(...store.map((asset) => asset.id));
    addToStoreAction({ id: newDatatId + 1, ...newData });
    setNewData(initState);
    toast.success(`${storeName} saved :)¡¡¡¡`);
  };

  return {
    newData,
    handleInput,
    handleSubmit,
  };
};

export default useEndpointData;
