import React, { UseState, UseEffect } from "react";

export function checkList() {
  const [checkState, setCheckState] = UseState([]);

  UseEffect(() => {
    let checkState = [
      { id: 1, checkText: "Stone"},
      { id: 2, checkText: "Stone"},
      { id: 3, checkText: "Stone"}
    ];

    setCheckState(
      checkState.map(temp => {
        return {
          select: false,
          id: temp.id,
          checkText: temp.firstname
        };
      })
    );
  }, []);

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange={e => {
                  let checked = e.target.checked;
                  setCheckState(
                    checkState.map(temp => {
                      temp.select = checked;
                      return temp;
                    })
                  );
                }}
              ></input>
            </th>
            <th scope="col">checkText</th>
          </tr>
        </thead>
        <tbody>
          {checkState.map((temp, i) => (
            <tr key={temp.id}>
              <th scope="row">
                <input
                  onChange={event => {
                    let checked = event.target.checked;
                    setCheckState(
                      checkState.map(data => {
                        if (temp.id === data.id) {
                          data.select = checked;
                        }
                        return data;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={temp.select}
                ></input>
              </th>
              <td>{temp.checkText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}