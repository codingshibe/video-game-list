import React from 'react';

function Grade(props) {
  return (
    <tr>
      <th scope="row">{props.name}</th>
      <td>{props.course}</td>
      <td>{props.grade}</td>
    </tr>
  );
}

export default Grade;
