import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/**
 * GridView comoponent: Displays grid view from json and headers imputs, dysplays an empty row at table begining
 * to adding new row to the grid, if linkCell provided sets link to content,
 *
 * @props  {Array}     json      json with data to display grid, is required
 * @props  {Array}     headers   json with headers data to display grid, key and label keys are required for json elements
 * @props  {string}    linkCell  if provided sets link cell to linkCell content
 * @props  {Function}  handleSubmit   manage submit for new rows, is required
 * @props  {Function}  handleInput    manage input content for submit new rows, is required
 * @props  {object}    formElement    sets value for inputs row, is required
 */

const GridView = ({
  json,
  headers,
  linkCell,
  handleSubmit,
  handleInput,
  formElement,
}) => {
  return (
    <>
      <form id="add_form" onSubmit={handleSubmit}></form>

      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            {headers.map((header) => {
              return <th key={header.key}>{header.label}</th>;
            })}
            {linkCell && (
              <th>{`Go to ${linkCell.charAt(0).toUpperCase()}${linkCell
                .slice(1)
                .toLowerCase()}`}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header) => {
              return header.key === 'id' ? (
                <td key="add_button">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    form="add_form"
                  >
                    Add New
                  </button>
                </td>
              ) : (
                <td key={`${header.key}_input`}>
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleInput}
                    name={header.key}
                    placeholder={header.key}
                    value={formElement[header.key] || ''}
                    form="add_form"
                    readOnly={header.key === 'id_asset' && 'readonly'}
                  />
                </td>
              );
            })}
            {linkCell && <td></td>}
          </tr>

          {json.map((element) => {
            return (
              <tr key={element.id || 'empy_case'}>
                {headers.map((header) => {
                  return (
                    <td key={`${header.key}_${element[header.key]}`}>
                      {element[header.key]}
                    </td>
                  );
                })}
                {linkCell && (
                  <td>
                    <Link to={`/${linkCell.toLowerCase()}/${element.id}`}>
                      {`${linkCell.charAt(0).toUpperCase()}${linkCell
                        .slice(1)
                        .toLowerCase()}`}
                    </Link>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

GridView.propTypes = {
  json: PropTypes.array.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  linkCell: PropTypes.string,
  formElement: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default GridView;
