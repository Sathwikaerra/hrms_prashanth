
import { useEffect } from "react";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Dummy.css";
import { Pencil, Trash2 } from "lucide-react";

import Button from "@mui/material/Button";
import {
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from "@mui/material";
interface BranchRow {
  code: string;
  branch: string;
  address1: string;
  address2: string;
  hierarchyInfo: string;
  hierarchy: string;
  manager: string;
  country: string;
  state: string;
  district: string;
  city: string;
  pin: string;
  tan: string;
  establishment: string;
  tdadj: string;
  managerPhone: string;
  fax: string;
  branchPhone: string;
  email: string;
  pfAcc: string;
  esiAcc: string;
  ptAcc: string;
  biometric: string;
  ccaApplicable: boolean;
  headOffice: boolean;
}


const Branch: React.FC = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // ✅ Action Popup State
  const [actionPopup, setActionPopup] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const [employeeData, setEmployeeData] = useState<LeaveRow[]>([
    { code: "E001", LeaveName: "Casual Leave", LeaveCode: "CL01", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "12" },
    { code: "E002", LeaveName: "Sick Leave", LeaveCode: "SL02", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "10" },
    { code: "E003", LeaveName: "Maternity Leave", LeaveCode: "ML03", LeaveType: "Active", LeavePerMonth: "0", LeavePerYear: "90" },
    { code: "E004", LeaveName: "Earned Leave", LeaveCode: "EL04", LeaveType: "Active", LeavePerMonth: "2", LeavePerYear: "24" },
    { code: "E005", LeaveName: "Special Leave", LeaveCode: "SP05", LeaveType: "Inactive", LeavePerMonth: "1", LeavePerYear: "6" },
    { code: "E006", LeaveName: "Work From Home", LeaveCode: "WFH06", LeaveType: "Active", LeavePerMonth: "3", LeavePerYear: "36" },
    { code: "E007", LeaveName: "Festival Leave", LeaveCode: "FL07", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "8" },
    { code: "E008", LeaveName: "Comp Off", LeaveCode: "CO08", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "5" },
    { code: "E009", LeaveName: "Marriage Leave", LeaveCode: "ML09", LeaveType: "Active", LeavePerMonth: "0", LeavePerYear: "7" },
    { code: "E010", LeaveName: "Emergency Leave", LeaveCode: "EL10", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "6" },
    { code: "E011", LeaveName: "Optional Leave", LeaveCode: "OL11", LeaveType: "Active", LeavePerMonth: "1", LeavePerYear: "4" },
  ]);
const [formData, setFormData] = useState<BranchRow>({
  code: "",
  branch: "",
  address1: "",
  address2: "",
  hierarchyInfo: "",
  hierarchy: "",
  manager: "",
  country: "",
  state: "",
  district: "",
  city: "",
  pin: "",
  tan: "",
  establishment: "",
  tdadj: "",
  managerPhone: "",
  fax: "",
  branchPhone: "",
  email: "",
  pfAcc: "",
  esiAcc: "",
  ptAcc: "",
  biometric: "",
  ccaApplicable: false,
  headOffice: false,
});


  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = employeeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
const handleChange = (e: any) => {
  const { name, value, type, checked } = e.target;

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};


  // Add New
  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      code: "",
      LeaveName: "",
      LeaveCode: "",
      LeaveType: "",
      LeavePerMonth: "",
      LeavePerYear: "",
    });
    setOpenPopup(true);
  };

  // Save
  const handleSave = () => {
    setEmployeeData([...employeeData, { ...formData, code: `E00${employeeData.length + 1}` }]);
    setOpenPopup(false);

    setActionPopup({ open: true, message: "Leave Added Successfully", color: "success" });
  };

  // Edit
  const handleEdit = (index: number) => {
    setIsEditMode(true);
    setEditIndex(index);
    setFormData(employeeData[index]);
    setOpenPopup(true);
  };

  // Update
  const handleUpdate = () => {
    if (editIndex !== null) {
      const updated = [...employeeData];
      updated[editIndex] = formData;
      setEmployeeData(updated);
      setOpenPopup(false);

      setActionPopup({ open: true, message: "Leave Updated Successfully", color: "info" });
    }
  };
const [deleteConfirm, setDeleteConfirm] = useState({
  open: false,
  index: null as number | null,
});
const confirmDelete = () => {
  if (deleteConfirm.index !== null) {
    setEmployeeData(employeeData.filter((_, i) => i !== deleteConfirm.index));
    setDeleteConfirm({ open: false, index: null });

    setActionPopup({
      open: true,
      message: "Leave Deleted Successfully",
      color: "error",
    });
  }
};

  // Delete

useEffect(() => {
  const appRoot = document.getElementById("root");

  const shouldBlur = openPopup || actionPopup.open || deleteConfirm.open;

  if (shouldBlur) {
    appRoot?.classList.add("app-blur");
  } else {
    appRoot?.classList.remove("app-blur");
  }

  return () => appRoot?.classList.remove("app-blur");
}, [openPopup, actionPopup.open, deleteConfirm.open]);


 return (
  <>
    {/* MAIN CONTENT */}
    <div className={openPopup ? "full-screen-blur" : ""}>
      <div className="container mt-1">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="heading-with-line">
          <h2 className="stat-value gasp-style">Branch</h2>
        </div>

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none", fontSize: "12px", borderRadius: "6px" }}
          onClick={handleAddNew}
        >
          + Add New
        </Button>
      </div>

      {/* ✅ TABLE WITH SCROLL */}
      <div className="table-responsive mt-2" style={{ maxHeight: "360px", overflowY: "auto" }}>
<table className="table table-bordered table-hover compact-table text-center align-middle">
          <thead className="table-light sticky-top">
            <tr style={{ fontSize: "12px" }}>
              <th>Actions</th>
              <th>Leave Name</th>
              <th>Leave Code</th>
              <th>Leave Type</th>
              <th>Leaves / Month</th>
              <th>Leaves / Year</th>
            </tr>
          </thead>

          <tbody style={{ fontSize: "12px" }}>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                <td className="d-flex justify-content-center gap-2">
<Pencil
  size={14}
  color="#1976d2"
  style={{ cursor: "pointer" }}

                  onClick={() => handleEdit(index)} />
<Trash2
  size={14}
  color="#d32f2f"
  style={{ cursor: "pointer" }}


  onClick={() => setDeleteConfirm({ open: true, index })}
/>
                </td>

                <td>{row.LeaveName}</td>
                <td>{row.LeaveCode}</td>
                <td>{row.LeaveType}</td>
                <td>{row.LeavePerMonth}</td>
                <td>{row.LeavePerYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={employeeData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 15, 20]}
        sx={{ fontSize: "12px" }}
      />

      {/* MAIN POPUP */}
    <Dialog
  open={openPopup}
  onClose={() => setOpenPopup(false)}
  fullWidth
  maxWidth={false}
  BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.35)" } }}
>
  <DialogTitle className="stat-value gasp-style" sx={{ fontSize: "12px" }}>
    {isEditMode ? "Edit Branch" : "Add Branch"}
  </DialogTitle>
<DialogContent>
<form className="four-grid mt-2">

    {[
      { label: "Branch*", name: "branch" },
      { label: "Code*", name: "code" },
      { label: "Address 1", name: "address1" },
      { label: "Address 2", name: "address2" },
      { label: "Hierarchy Info*", name: "hierarchyInfo" },
      { label: "Hierarchy*", name: "hierarchy" },
      { label: "Manager", name: "manager" },
      { label: "Country*", name: "country" },
      { label: "State*", name: "state" },
      { label: "District*", name: "district" },
      { label: "City*", name: "city" },
      { label: "PIN Code", name: "pin" },
      { label: "TAN-No", name: "tan" },
      { label: "Establishment", name: "establishment" },
      { label: "TDADJ", name: "tdadj" },
      { label: "Manager Phone Number", name: "managerPhone" },
      { label: "Fax", name: "fax" },
      { label: "Branch Phone Number", name: "branchPhone" },
      { label: "E-Mail", name: "email" },
      { label: "PF-Accno", name: "pfAcc" },
      { label: "ESI-Accno", name: "esiAcc" },
      { label: "PT-Accno", name: "ptAcc" },
      { label: "Biometric Device Serial No.", name: "biometric" },
    ].map((field) => (
      <div key={field.name}>
        <label className="form-label">{field.label}</label>
        <input
          name={field.name}
          value={(formData as any)[field.name]}
          onChange={handleChange}
          className="form-control custom-input"
        />
      </div>
    ))}

    {/* CHECKBOXES */}

    <div className="d-flex align-items-center gap-2 mt-4">
      <input
        type="checkbox"
        name="ccaApplicable"
        checked={formData.ccaApplicable}
        onChange={handleChange}
        className="form-check-input custom-checkbox"
      />
      <label className="form-label">CCA Applicable</label>
    </div>

    <div className="d-flex align-items-center gap-2 mt-4">
      <input
        type="checkbox"
        name="headOffice"
        checked={formData.headOffice}
        onChange={handleChange}
        className="form-check-input custom-checkbox"
      />
      <label className="form-label">Head Office Establishment</label>
    </div>

  </form>
</DialogContent>

  <DialogActions sx={{ px: 2 }}>
    <Button size="small" onClick={() => setOpenPopup(false)}>Cancel</Button>

    {isEditMode ? (
      <Button size="small" variant="contained" onClick={handleUpdate}>Update</Button>
    ) : (
      <Button size="small" variant="contained" onClick={handleSave} >Save</Button>
    )}
  </DialogActions>
</Dialog>


      {/* ✅ ACTION SUCCESS POPUP */}
    <Dialog open={actionPopup.open} onClose={() => setActionPopup({ ...actionPopup, open: false })}>
  <DialogTitle
    sx={{
      fontSize: "14px",
      color:
        actionPopup.color === "success"
          ? "green"
          : actionPopup.color === "error"
          ? "red"
          : "blue",
    }}
  >
    {actionPopup.message}
  </DialogTitle>

  <DialogActions>
    <Button
      size="small"
      variant="contained"
      color={actionPopup.color as any}
      onClick={() => setActionPopup({ ...actionPopup, open: false })}
      sx={{ fontSize: "12px" }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>

{/* DELETE CONFIRM POPUP */}
<Dialog
  open={deleteConfirm.open}
  onClose={() => setDeleteConfirm({ open: false, index: null })}
>
  <DialogTitle sx={{ fontSize: "14px" }}>
    Are you sure you want to delete this leave?
  </DialogTitle>

  <DialogActions>
    <Button size="small" onClick={() => setDeleteConfirm({ open: false, index: null })}>
      Cancel
    </Button>

    <Button size="small" color="error" variant="contained" onClick={confirmDelete}>
      Delete
    </Button>
  </DialogActions>
</Dialog>

    </div>
          </div>
    </>

  );
};

export default Branch;