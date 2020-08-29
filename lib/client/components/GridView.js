import React from 'react';
import { Link } from 'react-router-dom';

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

GridView.defaultProps = {
  linkCell: false,
};

export default GridView;
