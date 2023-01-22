import TableListItem from "../TableListItem/TableListItem"

export default function TablesList({tables, onFinish}){

  return(
    <ul>
     {tables.map((table) => (
        <TableListItem key={table.table_id} table={table} onFinish={onFinish}/>
      ))}
    </ul>
  )

}