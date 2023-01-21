import TableListItem from "../TableListItem/TableListItem"

export default function TablesList({tables}){

  return(
    <ul>
     {tables.map((table) => (
        <TableListItem key={table.table_id} table={table}/>
      ))}
    </ul>
  )

}