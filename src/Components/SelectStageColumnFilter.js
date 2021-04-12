import { Form } from "react-bootstrap";

const SelectStageColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div className="input-container">
      <Form.Control
        as="select"
        name="stage"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">Select stage</option>
        {/* {stages.map((stage, i) => (
                        <option key={i} value={stage.stage}>{stage.stage}</option>
                    ))}
                    {console.log(stages)} */}
        <option key="1" value="1. Prospect (10%)">
          1. Prospect (10%)
        </option>
        <option key="2" value="2. Forecast (50%)">
          2. Forecast (50%)
        </option>
        <option key="3" value="3. Forecast (80%)">
          3. Prospect (80%)
        </option>
        <option key="4" value="4. Won/Closed (100%)">
          4. Won/Closed (100%)
        </option>
      </Form.Control>
    </div>
  );
};

export default SelectStageColumnFilter;
