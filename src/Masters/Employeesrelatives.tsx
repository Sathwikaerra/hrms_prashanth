import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Pencil, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import {
  TablePagination,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

/* SMALL BUTTON */
const smallBtn = {
  fontSize: "10px",
  minHeight: "26px",
  padding: "2px 8px",
  textTransform: "none",
  fontFamily: "Poppins, sans-serif",
};

const SmallButton = (props: any) => {
  return <Button {...props} sx={{ ...smallBtn, ...props.sx }} />;
};

interface LeaveRow {
  code: string;
  LeaveName: string;
  LeaveCode: string;
  LeaveType: string;
}

const EmployeeRelatives: React.FC = () => {
  /* TABLE DATA */
  const [employeeData, setEmployeeData] = useState<LeaveRow[]>([
    { code: "E001", LeaveName: "Casual Leave", LeaveCode: "CL01", LeaveType: "Paid" },
    { code: "E002", LeaveName: "Sick Leave", LeaveCode: "SL02", LeaveType: "Paid" },
     { code: "E001", LeaveName: "Casual Leave", LeaveCode: "CL01", LeaveType: "Paid" },
    { code: "E002", LeaveName: "Sick Leave", LeaveCode: "SL02", LeaveType: "Paid" },
     { code: "E001", LeaveName: "Casual Leave", LeaveCode: "CL01", LeaveType: "Paid" },
    { code: "E002", LeaveName: "Sick Leave", LeaveCode: "SL02", LeaveType: "Paid" },
    
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<LeaveRow>({
    code: "",
    LeaveName: "",
    LeaveCode: "",
    LeaveType: "",
  });

  /* SNACKBAR */
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] =
    useState<"success" | "info" | "error">("success");

  const showSnackbar = (message: string, severity: any) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  /* DELETE */
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    index: null as number | null,
  });

  /* PAGINATION */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedData = employeeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* INPUT */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ADD NEW */
  const handleAddNew = () => {
    setShowForm(true);
    setIsEditMode(false);
    setFormData({
      code: "",
      LeaveName: "",
      LeaveCode: "",
      LeaveType: "",
    });
  };

  /* SAVE */
  const handleSave = () => {
    if (!formData.LeaveName || !formData.LeaveCode) {
      showSnackbar("Please fill required fields", "error");
      return;
    }

    setEmployeeData([
      ...employeeData,
      { ...formData, code: `E00${employeeData.length + 1}` },
    ]);

    showSnackbar("Added Successfully!", "success");
    handleClear();
  };

  /* EDIT */
  const handleEdit = (index: number) => {
    setShowForm(true);
    setIsEditMode(true);
    setEditIndex(index);
    setFormData(employeeData[index]);
  };

  /* UPDATE */
  const handleUpdate = () => {
    if (editIndex !== null) {
      const updated = [...employeeData];
      updated[editIndex] = formData;
      setEmployeeData(updated);

      showSnackbar("Updated Successfully!", "info");
    }

    handleClear();
  };

  /* CLEAR */
  const handleClear = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditIndex(null);
    setFormData({
      code: "",
      LeaveName: "",
      LeaveCode: "",
      LeaveType: "",
    });
  };

  /* DELETE CONFIRM */
  const confirmDelete = () => {
    if (deleteConfirm.index !== null) {
      setEmployeeData(employeeData.filter((_, i) => i !== deleteConfirm.index));
      showSnackbar("Deleted Successfully!", "error");
      setDeleteConfirm({ open: false, index: null });
    }
  };

  return (
    <div className="container" style={{ fontFamily: "Poppins, sans-serif" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">


 {/* Title */}
        <div className="heading-with-line">
        <h2 className="stat-value gasp-style">Employee Relatives</h2>
        </div>

        <SmallButton variant="contained" onClick={handleAddNew}>
          + Add New
        </SmallButton>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="mt-2">
          <div className="row g-2">

            <div className="col-md-3">
              <label style={{ fontSize: "11px" }}> Code</label>
              <input
                name="LeaveCode"
                value={formData.LeaveCode}
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div>

            <div className="col-md-3">
              <label style={{ fontSize: "11px" }}> Name</label>
              <input
                name="LeaveName"
                value={formData.LeaveName}
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div>
{/* 
            <div className="col-md-3">
              <label style={{ fontSize: "11px" }}>Description</label>
              <input
                name="LeaveType"
                value={formData.LeaveType}
                onChange={handleChange}
                className="form-control form-control-sm"
              />
            </div> */}
          </div>

          <div className="mt-2 d-flex gap-2">
            {isEditMode ? (
              <SmallButton variant="contained" onClick={handleUpdate}>
                Update
              </SmallButton>
            ) : (
              <SmallButton variant="contained" color="success" onClick={handleSave}>
                Save
              </SmallButton>
            )}

            <SmallButton color="warning" variant="contained" onClick={handleClear}>
              Cancel
            </SmallButton>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table className="table table-bordered table-hover text-center align-middle compact-table mt-1">
        <thead>
          <tr style={{ fontSize: "8px" }}>
            <th>Actions</th>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "8px" }}>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              <td className="d-flex justify-content-center gap-1">
               <Pencil
  size={14}
  color="#1976d2"   // Blue
  style={{ cursor: "pointer" }}
  onClick={() => handleEdit(index)}
/>

<Trash2
  size={14}
  color="#d32f2f"   // Red
  style={{ cursor: "pointer" }}
  onClick={() => setDeleteConfirm({ open: true, index })}
/>

              </td>
              <td>{row.LeaveName}</td>
              <td>{row.LeaveCode}</td>
              <td>{row.LeaveType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE DIALOG */}
      <Dialog open={deleteConfirm.open}>
        <DialogTitle sx={{ fontSize: "12px" }}>
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <SmallButton onClick={() => setDeleteConfirm({ open: false, index: null })}>
            Cancel
          </SmallButton>
          <SmallButton color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </SmallButton>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackSeverity} variant="filled" sx={{ fontSize: "10px" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeeRelatives;
