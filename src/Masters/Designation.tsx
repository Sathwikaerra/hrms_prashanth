import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Snackbar, Alert } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { CloudUpload, Download } from "@mui/icons-material";
import * as XLSX from "xlsx";

import { useEdit } from "../context/EditContext"; // ✅ GLOBAL EDIT

/* TYPES */
interface DesignationRow {
  id: string;
  Name: string;
  Code: string;
  Description: string;
}

/* SMALL BUTTON */
const SmallButton = (props: any) => (
  <Button
    {...props}
    size="small"
    sx={{
      fontSize: "10px",
      minHeight: "24px",
      padding: "2px 6px",
      textTransform: "none",
      fontFamily: "'Poppins', sans-serif",
      ...props.sx,
    }}
  />
);

const Designation: React.FC = () => {

  // ✅ GLOBAL EDIT STATE
  const { isDesignationEditing, setIsDesignationEditing } = useEdit();

  /* DEFAULT DATA */
  const defaultRows: DesignationRow[] = [
    { id: "1", Name: "Manager", Code: "MGR", Description: "Manages team" },
    { id: "2", Name: "Developer", Code: "DEV", Description: "Writes code" },
    { id: "3", Name: "HR", Code: "HR", Description: "Handles employees" },
    { id: "4", Name: "Tester", Code: "TST", Description: "Tests software" },
    { id: "5", Name: "Support", Code: "SUP", Description: "Customer support" },
  ];

  const [tableData, setTableData] = useState(defaultRows);
  const [editedData, setEditedData] = useState(defaultRows);
  const [editedCells, setEditedCells] = useState(new Set<string>());
  const [search, setSearch] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<DesignationRow>({
    id: "",
    Name: "",
    Code: "",
    Description: "",
  });

  /* SEARCH */
  const filteredData = editedData.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  /* ENABLE EDIT / SAVE */
  const toggleEditSave = () => {

    if (isDesignationEditing) {
      // ✅ SAVE MODE
      setTableData(editedData);
      setEditedCells(new Set());
      setSnackOpen(true);
      setIsDesignationEditing(false); // 🔥 GLOBAL OFF
    } else {
      // ✅ ENABLE EDIT MODE
      setEditedData(tableData);
      setIsDesignationEditing(true);  // 🔥 GLOBAL ON
    }
  };

  /* CELL CHANGE */
  const handleCellChange = (
    id: string,
    field: keyof DesignationRow,
    value: string
  ) => {
    const updated = editedData.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );

    setEditedData(updated);
    setEditedCells(prev => new Set(prev).add(`${id}-${field}`));
  };

  /* FORM CHANGE */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ADD */
  const handleAdd = () => {
    if (!formData.Name || !formData.Code) return;

    const newRow = {
      ...formData,
      id: String(tableData.length + 1),
    };

    const updated = [...tableData, newRow];

    setTableData(updated);
    setEditedData(updated);

    setFormData({
      id: "",
      Name: "",
      Code: "",
      Description: "",
    });

    setShowForm(false);
  };

  /* DOWNLOAD TEMPLATE */
  const handleDownload = () => {
    const template = [{
      Name: "",
      Code: "",
      Description: "",
    }];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Designation");
    XLSX.writeFile(wb, "Designation_Template.xlsx");
  };

  /* UPLOAD */
  const handleUpload = (e: any) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt: any) => {

      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<any>(sheet);

      const newRows = data.map((row: any, index: number) => ({
        id: String(tableData.length + index + 1),
        Name: row.Name || "",
        Code: row.Code || "",
        Description: row.Description || "",
      }));

      const merged = [...tableData, ...newRows];

      setTableData(merged);
      setEditedData(merged);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="container-fluid mt-2">

      {/* HEADER */}
      <div className="d-flex justify-content-between flex-wrap gap-2">

        <div className="heading-with-line">
          <h2 className="stat-value gasp-style">Designation</h2>
        </div>

        {!showForm && (
          <div className="d-flex gap-2">

            <input
              placeholder="Search..."
              className="form-control form-control-sm"
              style={{ width: "150px", fontSize: "10px" }}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Tooltip title="Download Template">
              <IconButton size="medium" color="primary" onClick={handleDownload}>
                <Download fontSize="medium" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Upload Excel">
              <IconButton size="medium" color="success" component="label">
                <CloudUpload fontSize="medium" />
                <input hidden type="file" onChange={handleUpload} />
              </IconButton>
            </Tooltip>

            <Tooltip title={isDesignationEditing ? "Save Changes" : "Enable Editing"}>
              <IconButton
                size="medium"
                onClick={toggleEditSave}
                sx={{
                  color: isDesignationEditing ? "#2e7d32" : "#ed6c02",
                }}
              >
                {isDesignationEditing ? (
                  <Save fontSize="medium" />
                ) : (
                  <Edit fontSize="medium" />
                )}
              </IconButton>
            </Tooltip>

            <SmallButton variant="contained" onClick={() => setShowForm(true)}>
              + Add Designation
            </SmallButton>

          </div>
        )}
      </div>

      {/* FORM */}
      {showForm ? (
        <div className="mt-3">
          <div className="row g-2">
            {["Name", "Code", "Description"].map(field => (
              <div className="col-md-3" key={field}>
                <label style={{ fontSize: "10px" }}>{field}</label>
                <input
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  style={{ fontSize: "10px", height: "26px" }}
                />
              </div>
            ))}
          </div>

          <div className="mt-2 d-flex gap-2">
            <SmallButton variant="contained" color="success" onClick={handleAdd}>
              Save
            </SmallButton>

            <SmallButton
              color="warning"
              variant="contained"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </SmallButton>
          </div>
        </div>
      ) : (
        /* TABLE */
        <div
          style={{
            height: "420px",
            overflowY: "auto",
            border: "1px solid #ddd",
            marginTop: "8px",
          }}
        >
          <table
            className="table table-bordered mb-0"
            style={{
              tableLayout: "fixed",
              fontSize: "10px",
            }}
          >
            <thead style={{ position: "sticky", top: 0, background: "#fafafa" }}>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} style={{ height: "26px" }}>
                  {(["Name", "Code", "Description"] as (keyof DesignationRow)[])
                    .map(field => (
                      <td
                        key={field}
                        style={{
                          padding: "2px 6px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          backgroundColor: editedCells.has(`${row.id}-${field}`)
                            ? "#fff3cd"
                            : "",
                        }}
                      >
                        {isDesignationEditing ? (
                          <input
                            className="form-control form-control-sm"
                            style={{ height: "22px", fontSize: "10px" }}
                            value={row[field]}
                            onChange={(e) =>
                              handleCellChange(row.id, field, e.target.value)
                            }
                          />
                        ) : (
                          row[field]
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Saved Successfully!
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Designation;
