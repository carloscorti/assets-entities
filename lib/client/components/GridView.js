import React from 'react';
import { Link } from 'react-router-dom';

const GridView = ({ json, linkCell }) => {
  const headers = Object.keys(json[0]).map((header) => ({
    key: header,
    label: header,
  }));

  return (
    <>
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
                  <button type="submit" className="btn btn-primary">
                    Add New
                  </button>
                </td>
              ) : (
                <td key={`${header.key}_input`}>
                  <input
                    className="form-control"
                    type="text"
                    name={header.key}
                    placeholder={header.key}
                  />
                </td>
              );
            })}
            {linkCell && <th></th>}
          </tr>

          {json.map((element) => {
            return (
              <tr key={element.id}>
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

export default React.memo(GridView);
