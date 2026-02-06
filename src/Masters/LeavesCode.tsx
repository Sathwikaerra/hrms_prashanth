
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

interface LeaveRow {
  code: string;
  LeaveName: string;
  LeaveCode: string;
  LeaveType: string;
  LeavePerMonth: string;
  LeavePerYear: string;
}

const LeavesCode: React.FC = () => {
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

  const [formData, setFormData] = useState<LeaveRow>({
    code: "",
    LeaveName: "",
    LeaveCode: "",
    LeaveType: "",
    LeavePerMonth: "",
    LeavePerYear: "",
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = employeeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h2 className="stat-value gasp-style">Leave Code</h2>
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
        <table className="table table-sm table-hover table-bordered text-center align-middle">
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
                  <Pencil size={16} className="text-primary cursor-pointer" onClick={() => handleEdit(index)} />
<Trash2
  size={16}
  className="text-danger cursor-pointer"
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
  <DialogTitle className="stat-value gasp-style" sx={{ fontSize: "15px" }}>
    {isEditMode ? "Edit Leave" : "Add Leave"}
  </DialogTitle>

  <DialogContent>
    <form className="form-grid-5 mt-2">

      {/* Row 1 */}
      <div>
        <label className="form-label">Leave Code *</label>
        <input type="text" name="LeaveCode" value={formData.LeaveCode} onChange={handleChange} className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Leave Name *</label>
        <input type="text" name="LeaveName" value={formData.LeaveName} onChange={handleChange} className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Leave Type *</label>
        <select name="LeaveType" value={formData.LeaveType} onChange={handleChange} className="form-control custom-input">
          <option value="">Select</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Restricted">Restricted</option>
        </select>
      </div>

      <div>
        <label className="form-label">Apply Before Days *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Male Leaves / Year *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      {/* Row 2 */}
      <div>
        <label className="form-label">Female Leaves / Year *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Max Leaves At Once *</label>
        <input type="number" className="form-control custom-input" />
      </div>

    

      <div>
        <label className="form-label">Max Carry Forward *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Max Accumulate *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      {/* Row 3 */}
    

      <div>
        <label className="form-label">Work Years *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Encashment Reserve *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Min Encashable Leaves *</label>
        <input type="number" className="form-control custom-input" />
      </div>

     

      {/* Row 4 */}
      <div>
        <label className="form-label">Credit Type *</label>
        <select className="form-control custom-input">
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div>
        <label className="form-label">Leaves / Month *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Credited Date *</label>
        <input type="date" className="form-control custom-input" />
      </div>

   

      <div>
        <label className="form-label">Medical Certificate Days</label>
        <input type="number" className="form-control custom-input" />
      </div>

      {/* Row 5 */}
      <div>
        <label className="form-label">No. of Times / Year *</label>
        <input type="number" className="form-control custom-input" />
      </div>

      <div>
        <label className="form-label">Maternity Expire Months *</label>
        <input type="text" className="form-control custom-input" />
      </div>

      <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Compoff Expire Days</label>
      </div>

      <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Compoff Approval Expire</label>
      </div>
  <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Carried Forward</label>
      </div>
       <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Encashable</label>
      </div>
       <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Auto Credit</label>
      </div>
         <div className="d-flex align-items-center gap-2 mt-4">
        <input type="checkbox" className="form-check-input custom-checkbox" />
        <label className="form-label">Sandwich</label>
      </div>
    </form>
  </DialogContent>

  <DialogActions sx={{ px: 2 }}>
    <Button size="small" onClick={() => setOpenPopup(false)}>Cancel</Button>

    {isEditMode ? (
      <Button size="small" variant="contained" onClick={handleUpdate}>Update</Button>
    ) : (
      <Button size="small" variant="contained" onClick={handleSave}>Save</Button>
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

export default LeavesCode;

// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/Dummy.css";
// import { Upload, Download, Trash2 } from "lucide-react";

// import Button from "@mui/material/Button";
// import { TablePagination } from "@mui/material";

// interface LeaveRow {
//   code: string;
//   LeaveName: string;
//   LeaveCode: string;
//   LeaveType: string;
//   LeavePerMonth: string;
//   LeavePerYear: string;
// }

// const LeavesCode: React.FC = () => {
//   // ✅ STATIC TABLE DATA
//   const [employeeData, setEmployeeData] = useState<LeaveRow[]>([
//     {
//       code: "E001",
//       LeaveName: "Casual Leave",
//       LeaveCode: "CL01",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "12",
//     },
//     {
//       code: "E002",
//       LeaveName: "Sick Leave",
//       LeaveCode: "SL02",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "10",
//     },
//      {
//       code: "E001",
//       LeaveName: "Casual Leave",
//       LeaveCode: "CL01",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "12",
//     },
//     {
//       code: "E002",
//       LeaveName: "Sick Leave",
//       LeaveCode: "SL02",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "10",
//     },
//      {
//       code: "E001",
//       LeaveName: "Casual Leave",
//       LeaveCode: "CL01",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "12",
//     },
//     {
//       code: "E002",
//       LeaveName: "Sick Leave",
//       LeaveCode: "SL02",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "10",
//     },
//      {
//       code: "E001",
//       LeaveName: "Casual Leave",
//       LeaveCode: "CL01",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "12",
//     },
//     {
//       code: "E002",
//       LeaveName: "Sick Leave",
//       LeaveCode: "SL02",
//       LeaveType: "Paid",
//       LeavePerMonth: "1",
//       LeavePerYear: "10",
//     },
//   ]);

//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const paginatedData = employeeData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // ✅ DOWNLOAD EXCEL TEMPLATE WHEN CLICK ADD
//   const downloadExcelTemplate = () => {
//     const templateData = [
//       {
//         LeaveName: "",
//         LeaveCode: "",
//         LeaveType: "",
//         LeavePerMonth: "",
//         LeavePerYear: "",
//       },
//     ];

//     const worksheet = XLSX.utils.json_to_sheet(templateData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveTemplate");

//     XLSX.writeFile(workbook, "Leave_Template.xlsx");
//   };

//   // ✅ IMPORT EXCEL AND LOAD DATA INTO TABLE
//   const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryData = event.target?.result;
//       const workbook = XLSX.read(binaryData, { type: "binary" });

//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const excelData = XLSX.utils.sheet_to_json(sheet);

//       const formattedRows = excelData.map((row: any, index: number) => ({
//         code: `E00${employeeData.length + index + 1}`,
//         LeaveName: row.LeaveName || "",
//         LeaveCode: row.LeaveCode || "",
//         LeaveType: row.LeaveType || "",
//         LeavePerMonth: row.LeavePerMonth || "",
//         LeavePerYear: row.LeavePerYear || "",
//       }));

//       setEmployeeData([...employeeData, ...formattedRows]);
//     };

//     reader.readAsBinaryString(file);
//   };

//   // ✅ DELETE ROW
//   const handleDelete = (index: number) => {
//     setEmployeeData(employeeData.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="container mt-3">

//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-2">


// <div className="heading-with-line">
//            <h2 className="stat-value gasp-style">Leave Code</h2>
//        </div>
//         <div className="d-flex gap-2">

//           {/* ADD BUTTON = DOWNLOAD EXCEL */}
//           <Button
//             variant="contained"
//             size="small"
//             onClick={downloadExcelTemplate}
//           >
//             + Add 
//           </Button>

//           {/* IMPORT BUTTON */}
//           <label className="btn btn-outline-primary btn-sm mb-0 d-flex gap-2">
//             <Upload size={14} /> Import Excel
//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               hidden
//               onChange={handleExcelUpload}
//             />
//           </label>

//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-responsive">
//         <table className="table table-sm table-bordered text-center align-middle">
//           <thead className="table-light">
//             <tr style={{ fontSize: "12px" }}>
//               <th>Actions</th>
//               <th>Leave Name</th>
//               <th>Leave Code</th>
//               <th>Leave Type</th>
//               <th>Leaves / Month</th>
//               <th>Leaves / Year</th>
//             </tr>
//           </thead>

//           <tbody style={{ fontSize: "12px" }}>
//             {paginatedData.map((row, index) => {
//               const actualIndex = page * rowsPerPage + index;

//               return (
//                 <tr key={actualIndex}>
//                   <td>
//                     <Trash2
//                       size={14}
//                       className="text-danger cursor-pointer"
//                       onClick={() => handleDelete(actualIndex)}
//                     />
//                   </td>

//                   <td>{row.LeaveName}</td>
//                   <td>{row.LeaveCode}</td>
//                   <td>{row.LeaveType}</td>
//                   <td>{row.LeavePerMonth}</td>
//                   <td>{row.LeavePerYear}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <TablePagination
//         component="div"
//         count={employeeData.length}
//         page={page}
//         onPageChange={(_, newPage) => setPage(newPage)}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={(e) => {
//           setRowsPerPage(parseInt(e.target.value, 10));
//           setPage(0);
//         }}
//       />
//     </div>
//   );
// };

// export default LeavesCode;
