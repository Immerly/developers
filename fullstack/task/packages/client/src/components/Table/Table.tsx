import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import './Table.css'

interface BaseType {
  id: string | number;
}

type Props<T> = {
  onRenderCell: (d: T, col: keyof T) => ReactElement;
  data: T[];
  columns: string[];
} & ComponentPropsWithoutRef<'table'>;

function Table<T extends BaseType>(props: Props<T>) {
  const { data, columns } = props;

  return (
    <table className='table'>
      <thead>
        <tr>
          {
            columns.map(c => (
              <th key={c}>{c}</th>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          data.map(d => (
            <tr key={d.id}>
              {
                columns.map(c => (
                  // @ts-ignore (for now)
                  <td key={c}>{props.onRenderCell(d, c)}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table
