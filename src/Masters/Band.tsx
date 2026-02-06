

  import { useState } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "../css/Dummy.css";
  import Button from "@mui/material/Button";
  import { TextField, Checkbox, FormControlLabel } from "@mui/material";

  const Band: React.FC = () => {
    const employeeData = [
      { code: "E001", name: "Monday" },
      { code: "E002", name: "Tuesday" },
      { code: "E003", name: "Wednesday" },
      { code: "E004", name: "Thursday" },
      { code: "E005", name: "Friday" },
      { code: "E006", name: "Saturday" },
      { code: "E007", name: "Sunday" },
    ];

    const [checkedRows, setCheckedRows] = useState<boolean[]>(
      new Array(employeeData.length).fill(false)
    );
    const [selectAll, setSelectAll] = useState(false);

    // Header checkbox toggle
    const handleSelectAll = (checked: boolean) => {
      setSelectAll(checked);
      setCheckedRows(new Array(employeeData.length).fill(checked));
    };

    // Row checkbox toggle
    const handleRowCheck = (index: number, checked: boolean) => {
      const updated = [...checkedRows];
      updated[index] = checked;
      setCheckedRows(updated);
      setSelectAll(updated.every(Boolean));
    };
  const smallBtn = {
    fontSize: "10px",
    minHeight: "26px",
    padding: "2px 8px",
    textTransform: "none",
    fontFamily: "Poppins, sans-serif",
  };

    return (
      <div className="container poppins-font">

        {/* Title */}
        <div className="heading-with-line">
          <h2 className="stat-value gasp-style">Band</h2>
        </div>

        {/* Form */}
        <form>
          <div className="row g-2">

          

            


            <div className="row">
                <div className="col-md-4 col-sm-6 mb-1">
                  <label htmlFor="code" className="form-label">
                    Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="code"
                    className="form-control"
                    placeholder="Enter code"
                  />
                </div>
                <div className="col-md-4 col-sm-6 mb-1">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter name"
                  />
                </div>
                <div className="col-md-4 col-sm-6 mb-1">
                  <label htmlFor="description" className="form-label">
                    Category 
  <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    placeholder="Enter Category"
                  />
                </div>
              </div>
                <div className="row ">
                <div className="col-md-4 col-sm-6 mb-2">
                  <label htmlFor="code" className="form-label">
                    Probation Period Months <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="code"
                    className="form-control"
                    placeholder="Enter Months"
                  />
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <label htmlFor="name" className="form-label">
                    Shift Type <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Shift Type"
                  />
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <label htmlFor="description" className="form-label">
                    Notice Period Days <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="Enter Days"
                    className="form-control"
                    placeholder="Enter description"
                  />
                </div>
              </div>


        


          </div>
        </form>

        {/* Weekoff Section */}
        <div style={{ marginTop: "8px" }}>
          <div className="heading-with-line">
            <h2 className="stat-value gasp-style">Weekoff</h2>
          </div>

          {/* Scrollable Table */}
      
      <table className="table table-bordered table-hover text-center align-middle compact-table">
    <thead className="table-dark sticky-top">
      <tr>
        <th>
          <Checkbox
            size="small"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </th>
        <th>Week Off</th>
        <th>Full Day</th>
        <th>Half Day</th>
      </tr>
    </thead>

    <tbody>
      {employeeData.map((row, index) => (
        <tr key={index}>
          <td>
            <Checkbox
              size="small"
              checked={checkedRows[index]}
              onChange={(e) => handleRowCheck(index, e.target.checked)}
            />
          </td>

          <td>{row.name}</td>

          <td><Checkbox size="small" /></td>
          <td><Checkbox size="small" /></td>
        </tr>
      ))}
    </tbody>
  </table>


        </div>

  

  {/* Buttons */}
  <div className="mt-2 d-flex gap-2">
    <Button variant="contained" color="success" size="small" sx={smallBtn}>
      Save
    </Button>

    <Button variant="contained" color="info" size="small" sx={smallBtn}>
      View
    </Button>

    <Button variant="contained" color="warning" size="small" sx={smallBtn}>
      Clear
    </Button>
  </div>

      </div>
    );
  };

  export default Band;
