import { Form } from "react-bootstrap";

const ActiveStaffFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div className="input-container">
      <Form.Control
        as="select"
        name="active"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">Empty</option>
        {/* {stages.map((stage, i) => (
                        <option key={i} value={stage.stage}>{stage.stage}</option>
                    ))}
                    {console.log(stages)} */}
        <option key="1" value="1">
          Active
        </option>
        <option key="2" value="0">
          Inactive
        </option>
      </Form.Control>
    </div>
  );
};

export default ActiveStaffFilter;
