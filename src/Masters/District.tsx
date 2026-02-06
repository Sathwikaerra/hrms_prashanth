import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Dummy.css";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Pencil, Trash2 } from "lucide-react";

/* BUTTON STYLE */
const smallBtn = {
  fontSize: "10px",
  minHeight: "26px",
  padding: "2px 8px",
  textTransform: "none",
  fontFamily: "Poppins, sans-serif",
};

interface DistrictRow {
  code: string;
  state: string;
  district: string;
}

const District: React.FC = () => {

  /* ✅ TABLE STATE */
  const [districtData, setDistrictData] = useState<DistrictRow[]>([
    { code: "AP001", state: "Andhra Pradesh", district: "Visakhapatnam" },
    { code: "AP002", state: "Andhra Pradesh", district: "Vijayawada" },
    { code: "TS001", state: "Telangana", district: "Hyderabad" },
    { code: "KA001", state: "Karnataka", district: "Bengaluru" },
    { code: "TN001", state: "Tamil Nadu", district: "Chennai" },
  ]);

  /* CHECKBOX STATE */
  const [checkedRows, setCheckedRows] = useState<boolean[]>(
    new Array(districtData.length).fill(false)
  );

  const [selectAll, setSelectAll] = useState(false);

  /* FORM STATE */
  const [formData, setFormData] = useState<DistrictRow>({
    code: "",
    state: "",
    district: "",
  });

  /* HANDLE INPUT */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ADD DISTRICT */
  const handleSave = () => {
    if (!formData.code || !formData.state || !formData.district) {
      alert("Please fill all fields");
      return;
    }

    const updated = [...districtData, formData];

    setDistrictData(updated);
    setCheckedRows(new Array(updated.length).fill(false));

    setFormData({
      code: "",
      state: "",
      district: "",
    });
  };

  /* DELETE */
  const handleDelete = (index: number) => {
    const updated = districtData.filter((_, i) => i !== index);
    setDistrictData(updated);
    setCheckedRows(new Array(updated.length).fill(false));
  };

  /* SELECT ALL */
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedRows(new Array(districtData.length).fill(checked));
  };

  /* ROW CHECK */
  const handleRowCheck = (index: number, checked: boolean) => {
    const updated = [...checkedRows];
    updated[index] = checked;
    setCheckedRows(updated);
    setSelectAll(updated.every(Boolean));
  };

  return (
    <div className="container poppins-font">

      {/* TITLE */}
      <div className="heading-with-line">
        <h2 className="stat-value gasp-style">District</h2>
      </div>

      {/* FORM */}
      <div className="row g-2 mt-1">

        <div className="col-md-3">
          <label className="form-label">
            Code <span className="text-danger">*</span>
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">
            District <span className="text-danger">*</span>
          </label>

          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="form-control form-control-sm"
          />
        </div>

     
      </div>
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


      {/* TABLE */}
      <div className="table-responsive mt-3">

        <table className="table table-bordered table-hover compact-table text-center align-middle">

          <thead className="table-light sticky-top">
            <tr>
              <th>
                <Checkbox
                  size="small"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>

              <th>Code</th>
              <th>State</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {districtData.map((row, index) => (
              <tr key={index}>

                <td>
                  <Checkbox
                    size="small"
                    checked={checkedRows[index]}
                    onChange={(e) =>
                      handleRowCheck(index, e.target.checked)
                    }
                  />
                </td>

                <td>{row.code}</td>
                <td>{row.state}</td>
                <td>{row.district}</td>

                <td className="d-flex justify-content-center gap-2">

                  <Pencil
                    size={14}
                    color="#1976d2"
                    style={{ cursor: "pointer" }}
                  />

                  <Trash2
                    size={14}
                    color="#d32f2f"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(index)}
                  />

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default District;
