export default function TableListItem({ table }) {
  /*
 Each table should show "free" or "occupied" based on whether or not the table is seated
    => The free and occupied text should have data-table-id-status=${table.table_id} attribute, 
        so it can be found by the tests. 
*/

  //conditionally render "occupied" if table.status === "seated"

  return (
    <li>
      <div>
        <p>Name: {table.table_name}</p>
      </div>
      <div>
        <p data-table-id-status={`${table.table_id}`}>
          {table.reservation_id ? "occupied" : "free"}
        </p>
      </div>
    </li>
  );
}
