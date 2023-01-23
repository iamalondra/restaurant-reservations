import { freeTable } from "../../utils/api";

export default function TableListItem({ table, onFinish }) {
  /*
 Each table should show "free" or "occupied" based on whether or not the table is seated
    => The free and occupied text should have data-table-id-status=${table.table_id} attribute, 
        so it can be found by the tests. 
*/

  //conditionally render "occupied" if table.status === "seated"
  const handleFinish = async () => {
    //check if table status = "occupied"
    if (!table.reservation_id) {
      return;
    }
    //if windowConfirm
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      //call api to update table
      //call onFinish callback
      try {
        await freeTable(table.table_id, table.reservation_id);
        onFinish();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <li className="table-list-item card bg-light p-2 mb-3 flex-row justify-content-between align-items-center">
      <p className="table-name m-0">Name: {table.table_name}</p>
      <p
        className="table-status m-0"
        data-table-id-status={`${table.table_id}`}
      >
        {table.reservation_id ? <span className="text-danger">occupied</span> : <span className="text-success">free</span>}
      </p>
      
        <button
          data-table-id-finish={table.table_id}
          className={`btn btn-${table.reservation_id? "primary" : "secondary"}`}
          onClick={handleFinish}
          disabled={table.reservation_id? false : true}
        >
          finish
        </button>
    </li>
  );
}
