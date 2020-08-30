import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

/**
 * Function useEndpointData (custom hook): manage satate to display json data into GridView component,
 * on mounting component, if data is already fetched uses local sotre data else fetchs data from api endpoint
 *
 * @return {object}      newData        stores input values (binding onChange)
 * @return {Funcion}     handleInput    control input values from component state (binding onChange)
 * @return {Funcion}     handleSubmit   manage submint for new rows data,
 * adds new data to store with consecutive id number regardin current max id number,
 * sets newData to initial value for new input
 */
const useEndpointData = (
  storeName = '',
  store,
  fetchStoreAction,
  addToStoreAction,
  initState = {}
) => {
  const [newData, setNewData] = useState(initState);

  useEffect(() => {
    // if data is already fetched uses local sotre data
    // else fetchs data from api endpoint to optimize html call to api endpoint
    (async () => {
      if (store) {
        return;
      }
      console.info(`api call to ${storeName}`);
      await fetchStoreAction();
    })();
  }, []);

  /**
   * Function handleInput: binds newData state to input change
   *
   * @param  {object}  e  event object were input change was made
   */
  const handleInput = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  /**
   * Function handleSubmit: manage submint for new rows data to add new elements to store,
   * new elements allways have consecutive id number regarding current max id number,
   * after save new element to store, sets newData to initial value for new input,
   * on succesfull element add displays a succes message in a toast
   *
   * @param  {object}  e  event object were input change was made
   */
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
