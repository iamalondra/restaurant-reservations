import ErrorAlert from "../../layout/ErrorAlert";
import TableListItem from "../TableListItem/TableListItem";
import "./TableList.css";

export default function TablesList({ tables, onFinish, error }) {

  return (
    <>
      <div className="d-md-flex mb-3">
        <h2 className="mb-0">Tables</h2>
      </div>
      <ErrorAlert error={error} />
      {tables.length === 0 ? (
        <p className="alert alert-secondary mt-3 px-3 h5">No tables found</p>
      ) : (
        <ul className="table-list-container list-unstyled p-3 mh-80 rounded">
          {tables.map((table) => (
            <TableListItem
              key={table.table_id}
              table={table}
              onFinish={onFinish}
            />
          ))}
        </ul>
      )}
    </>
  );
}
