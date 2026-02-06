import React, { useState, useRef, useEffect } from "react";
import {
  Box, Stepper, Step, StepLabel, TextField, Button, MenuItem,
  Typography, Avatar, Grid
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

/* ----------------------------------
   STATIC DATA (Complete Master Dataset)
---------------------------------- */
const initialStaticData = {
  // Employee Details
  placeOfWork: "Hyderabad",
  employeeCode: "EMP2025001",
  firstName: "Amit",
  shortName: "Ami",
  middleName: "Kumar",
  lastName: "Sharma",
  employeeBand: "B2",
  mobileNo: "9876543210",
  gender: "Male",
  costCenter: "CC-99",
  department: "IT",
  designation: "Software Engineer",
  joiningDate: dayjs("2024-01-10"),
  jobType: "Permanent",
  reportingTo: "Suresh Raina",
  level1Reporting: "Manager A",
  level2Reporting: "Director B",
  probationPeriod: "6",
  confirmationDate: dayjs("2024-07-10"),
  employeeShift: "General",
  emailId: "amit.sharma@company.com",
  physicallyHandicapped: "No",
  workFrom: "Office",
  supervisor: "Rajesh Koothrappali",
  specialShifts: "No",
  retirementDate: dayjs("2050-12-31"),

  // Personal Details
  alternateEmail: "amit.personal@gmail.com",
  alternateContact: "9123456789",
  birthdayEventDate: dayjs("2024-05-20"),
  age: "28",
  dob: dayjs("1996-05-20"),
  identificationMark: "Mole on right cheek",
  bloodGroup: "O+",
  maritalStatus: "Married",
  religion: "Hindu",
  category: "General",
  nationality: "Indian",
  presentAddress: "H.No 123, Jubilee Hills, Hyderabad",
  permanentAddress: "H.No 123, Jubilee Hills, Hyderabad",
  state: "Telangana",
  district: "Hyderabad",
  city: "Hyderabad",
  pinCode: "500033",
  emergencyContactName: "Priya Sharma",
  emergencyPhone: "9988776655",
  language: "Hindi, English",

  // Family & Nominee
  fatherName: "Rajesh Sharma",
  motherName: "Suman Sharma",
  maritalDate: dayjs("2022-02-14"),
  spouseName: "Priya Sharma",
  nomineeName: "Priya Sharma",
  nomineeRelation: "Spouse",
  nomineeAadhar: "XXXX-XXXX-9012",

  // Academic Qualification
  highestQualification: "B.Tech (CSE)",
  university: "JNTU Hyderabad",
  passingYear: "2018",
  percentage: "82%",
  grade: "Distinction",

  // Experience
  totalExperience: "5.5 Years",
  previousCompany: "Tech Solutions Pvt Ltd",
  previousDesignation: "Associate Engineer",
  lastCTC: "8,00,000",
  reasonForLeaving: "Career Growth",

  // Documents & Compliance
  newTaxRegime: "Old Regime",
  vpfApplicable: "No",
  gratuityId: "GRAT-9982",
  gratuityNo: "G-112233",
  epsApplicable: "Yes",
  panNumber: "ABCDE1234F",
  pranNumber: "110022334455",
  passportExpiryDate: dayjs("2032-05-20"),
  pfNumber: "MH/BAN/12345/678",
  passportNumber: "Z9988776",
  uanNumber: "100998877665",
  aadharNumber: "1234 5678 9012",

  // Payroll
  bankName: "HDFC Bank",
  branchName: "Madhapur",
  accountNumber: "5010022334455",
  ifscCode: "HDFC0001234",
  paymentMode: "Bank Transfer",

  // Security Deposit
  sdBranchName: "Main Branch - Hyderabad",
  securityDeposit: "50,000",
  dateOfPayment: dayjs("2024-01-15"),

  // Subscription & Attendance
  societyId: "SOC-HYD-01",
  leavesBalance: "18",
  totalAttendance: "98%",
  shiftStartTime: "09:30 AM",
  shiftEndTime: "06:30 PM"
};

const steps = [
  "Employee Details", "Personal Details", "Family", "Nominee",
  "Academic Qualification", "Experience", "Documents & Compliance",
  "Documents Upload", "Payroll & Compensation", "Security Deposit",
  "Subscription", "Leaves Update", "Attendance",
];
const viewInputProps: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,

  InputLabelProps: {
    shrink: true,
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "12px",
      fontWeight: 600,
      color: "#1e293b",
      top: "-2px"        // ✅ label alignment fix
    },
  },

  InputProps: {
    readOnly: true,
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "13px",
      color: "#475569",
      height: "36px",     // ✅ FIXED HEIGHT SAME AS OTHERS
      padding: "0px 10px" // ✅ EXACT COMPACT INNER PADDING
    },
  },

  sx: {
    "& .MuiOutlinedInput-root": {
      height: "36px",          // ✅ Same height everywhere
      borderRadius: "6px",     // ✅ Same smooth border
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px",     // ✅ Same padding as Add/Edit forms
      fontSize: "13px",
    },

    "& .MuiInputLabel-root": {
      top: "-2px",             // Label alignment
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "6px",     // Smooth consistent rounding
    },
  },
};


const ViewEmployee: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentStepEl = stepRefs.current[activeStep];
    if (currentStepEl) {
      currentStepEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeStep]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen font-poppins bg-slate-50 p-2">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          
          <div className="px-4 py-3 border-b border-l-4 border-l-green-600 bg-white flex justify-between items-center">
            <Typography variant="body1" sx={{ fontWeight: 700, color: "#334155" }}>
              VIEW EMPLOYEE : <span className="text-green-600">{initialStaticData.employeeCode}</span>
            </Typography>
          </div>

          <Box ref={scrollContainerRef} className="px-1 py-3 overflow-x-auto no-scrollbar border-b bg-slate-50/50">
            <Box sx={{ minWidth: 1600 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} ref={(el) => (stepRefs.current[index] = el)}>
                    <StepLabel 
                      onClick={() => setActiveStep(index)}
                      sx={{ cursor: "pointer", "& .MuiStepLabel-label": { fontFamily: "Poppins", fontSize: "11px" }}}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <div className="p-6">
            
            {/* 0. EMPLOYEE DETAILS */}
            {activeStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Place of Work" {...viewInputProps} value={initialStaticData.placeOfWork} />
                <TextField label="Employee Code" {...viewInputProps} value={initialStaticData.employeeCode} />
                <TextField label="First Name" {...viewInputProps} value={initialStaticData.firstName} />
                <TextField label="Short Name" {...viewInputProps} value={initialStaticData.shortName} />
                <TextField label="Middle Name" {...viewInputProps} value={initialStaticData.middleName} />
                <TextField label="Last Name" {...viewInputProps} value={initialStaticData.lastName} />
                <TextField label="Employee Band" {...viewInputProps} value={initialStaticData.employeeBand} />
                <TextField label="Mobile No." {...viewInputProps} value={initialStaticData.mobileNo} />
                <TextField label="Gender" {...viewInputProps} value={initialStaticData.gender} />
                <TextField label="Cost Center" {...viewInputProps} value={initialStaticData.costCenter} />
                <TextField label="Department" {...viewInputProps} value={initialStaticData.department} />
                <TextField label="Designation" {...viewInputProps} value={initialStaticData.designation} />
                <TextField label="Joining Date" {...viewInputProps} value={initialStaticData.joiningDate.format("DD/MM/YYYY")} />
                <TextField label="Job Type" {...viewInputProps} value={initialStaticData.jobType} />
                <TextField label="Reporting To" {...viewInputProps} value={initialStaticData.reportingTo} />
                <TextField label="Level 1 Reporting" {...viewInputProps} value={initialStaticData.level1Reporting} />
                <TextField label="Level 2 Reporting" {...viewInputProps} value={initialStaticData.level2Reporting} />
                <TextField label="Probation (In Months)" {...viewInputProps} value={initialStaticData.probationPeriod} />
                <TextField label="Confirmation Date" {...viewInputProps} value={initialStaticData.confirmationDate.format("DD/MM/YYYY")} />
                <TextField label="Employee Shift" {...viewInputProps} value={initialStaticData.employeeShift} />
                <TextField label="Email-ID" {...viewInputProps} value={initialStaticData.emailId} />
                <TextField label="Physically Handicapped" {...viewInputProps} value={initialStaticData.physicallyHandicapped} />
                <TextField label="Work From" {...viewInputProps} value={initialStaticData.workFrom} />
                <TextField label="Supervisor" {...viewInputProps} value={initialStaticData.supervisor} />
                <TextField label="Date of Retirement" {...viewInputProps} value={initialStaticData.retirementDate.format("DD/MM/YYYY")} />
              </div>
            )}

            {/* 1. PERSONAL DETAILS */}
            {activeStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Alternate Email" {...viewInputProps} value={initialStaticData.alternateEmail} />
                <TextField label="Alternate Contact" {...viewInputProps} value={initialStaticData.alternateContact} />
                <TextField label="Birthday Event Date" {...viewInputProps} value={initialStaticData.birthdayEventDate.format("DD/MM/YYYY")} />
                <TextField label="Age" {...viewInputProps} value={initialStaticData.age} />
                <TextField label="Date of Birth" {...viewInputProps} value={initialStaticData.dob.format("DD/MM/YYYY")} />
                <TextField label="Identification Mark" {...viewInputProps} value={initialStaticData.identificationMark} />
                <TextField label="Blood Group" {...viewInputProps} value={initialStaticData.bloodGroup} />
                <TextField label="Marital Status" {...viewInputProps} value={initialStaticData.maritalStatus} />
                <TextField label="Religion" {...viewInputProps} value={initialStaticData.religion} />
                <TextField label="Category" {...viewInputProps} value={initialStaticData.category} />
                <TextField label="Nationality" {...viewInputProps} value={initialStaticData.nationality} />
                <TextField label="State" {...viewInputProps} value={initialStaticData.state} />
                <TextField label="District" {...viewInputProps} value={initialStaticData.district} />
                <TextField label="City" {...viewInputProps} value={initialStaticData.city} />
                <TextField label="PIN Code" {...viewInputProps} value={initialStaticData.pinCode} />
                <TextField label="Emergency Name" {...viewInputProps} value={initialStaticData.emergencyContactName} />
                <TextField label="Emergency Phone" {...viewInputProps} value={initialStaticData.emergencyPhone} />
                <TextField label="Language" {...viewInputProps} value={initialStaticData.language} />
                <TextField label="Present Address" {...viewInputProps} multiline value={initialStaticData.presentAddress} className="lg:col-span-2" />
                <TextField label="Permanent Address" {...viewInputProps} multiline value={initialStaticData.permanentAddress} className="lg:col-span-2" />
              </div>
            )}

            {/* 2. FAMILY & 3. NOMINEE */}
            {(activeStep === 2 || activeStep === 3) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Father Name" {...viewInputProps} value={initialStaticData.fatherName} />
                <TextField label="Mother Name" {...viewInputProps} value={initialStaticData.motherName} />
                <TextField label="Marital Date" {...viewInputProps} value={initialStaticData.maritalDate.format("DD/MM/YYYY")} />
                <TextField label="Spouse Name" {...viewInputProps} value={initialStaticData.spouseName} />
                <TextField label="Nominee Name" {...viewInputProps} value={initialStaticData.nomineeName} />
                <TextField label="Nominee Relation" {...viewInputProps} value={initialStaticData.nomineeRelation} />
                <TextField label="Nominee Aadhar" {...viewInputProps} value={initialStaticData.nomineeAadhar} />
              </div>
            )}

            {/* 4. ACADEMIC & 5. EXPERIENCE */}
            {(activeStep === 4 || activeStep === 5) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Highest Qualification" {...viewInputProps} value={initialStaticData.highestQualification} />
                <TextField label="University" {...viewInputProps} value={initialStaticData.university} />
                <TextField label="Passing Year" {...viewInputProps} value={initialStaticData.passingYear} />
                <TextField label="Percentage/CGPA" {...viewInputProps} value={initialStaticData.percentage} />
                <TextField label="Grade" {...viewInputProps} value={initialStaticData.grade} />
                <TextField label="Total Experience" {...viewInputProps} value={initialStaticData.totalExperience} />
                <TextField label="Previous Company" {...viewInputProps} value={initialStaticData.previousCompany} />
                <TextField label="Previous Designation" {...viewInputProps} value={initialStaticData.previousDesignation} />
                <TextField label="Last CTC" {...viewInputProps} value={initialStaticData.lastCTC} />
                <TextField label="Reason for Leaving" {...viewInputProps} value={initialStaticData.reasonForLeaving} />
              </div>
            )}

            {/* 6. DOCUMENTS & COMPLIANCE */}
            {activeStep === 6 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="New Tax Regime" {...viewInputProps} value={initialStaticData.newTaxRegime} />
                <TextField label="VPF Applicable" {...viewInputProps} value={initialStaticData.vpfApplicable} />
                <TextField label="Gratuity Id" {...viewInputProps} value={initialStaticData.gratuityId} />
                <TextField label="Gratuity No" {...viewInputProps} value={initialStaticData.gratuityNo} />
                <TextField label="EPS Applicable" {...viewInputProps} value={initialStaticData.epsApplicable} />
                <TextField label="PAN Number" {...viewInputProps} value={initialStaticData.panNumber} />
                <TextField label="PRAN Number" {...viewInputProps} value={initialStaticData.pranNumber} />
                <TextField label="Passport Expiry Date" {...viewInputProps} value={initialStaticData.passportExpiryDate.format("DD/MM/YYYY")} />
                <TextField label="PF Number" {...viewInputProps} value={initialStaticData.pfNumber} />
                <TextField label="Passport Number" {...viewInputProps} value={initialStaticData.passportNumber} />
                <TextField label="UAN Number" {...viewInputProps} value={initialStaticData.uanNumber} />
                <TextField label="Aadhar Number" {...viewInputProps} value={initialStaticData.aadharNumber} />
              </div>
            )}

            {/* 7. DOCUMENTS UPLOAD */}
            {activeStep === 7 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {["Profile Photo", "PAN Card", "Aadhar Card"].map((doc) => (
                  <Box key={doc} sx={{ p: 2, border: "1px dashed #cbd5e1", borderRadius: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: "#475569" }}>{doc}</Typography>
                    <Avatar variant="rounded" sx={{ width: "100%", height: 150, bgcolor: "#f1f5f9", color: "#94a3b8" }}>
                       Preview: {doc}
                    </Avatar>
                  </Box>
                ))}
              </div>
            )}

            {/* 8. PAYROLL & COMPENSATION */}
            {activeStep === 8 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Bank Name" {...viewInputProps} value={initialStaticData.bankName} />
                <TextField label="Branch Name" {...viewInputProps} value={initialStaticData.branchName} />
                <TextField label="Account Number" {...viewInputProps} value={initialStaticData.accountNumber} />
                <TextField label="IFSC Code" {...viewInputProps} value={initialStaticData.ifscCode} />
                <TextField label="Payment Mode" {...viewInputProps} value={initialStaticData.paymentMode} />
              </div>
            )}

            {/* 9. SECURITY DEPOSIT */}
            {activeStep === 9 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Branch Name" {...viewInputProps} value={initialStaticData.sdBranchName} />
                <TextField label="Security Deposit Amount" {...viewInputProps} value={initialStaticData.securityDeposit} />
                <TextField label="Date of Payment" {...viewInputProps} value={initialStaticData.dateOfPayment.format("DD/MM/YYYY")} />
              </div>
            )}

            {/* 10. SUBSCRIPTION, 11. LEAVES, 12. ATTENDANCE */}
            {activeStep >= 10 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Society ID" {...viewInputProps} value={initialStaticData.societyId} />
                <TextField label="Leaves Balance" {...viewInputProps} value={initialStaticData.leavesBalance} />
                <TextField label="Total Attendance %" {...viewInputProps} value={initialStaticData.totalAttendance} />
                <TextField label="Shift Start Time" {...viewInputProps} value={initialStaticData.shiftStartTime} />
                <TextField label="Shift End Time" {...viewInputProps} value={initialStaticData.shiftEndTime} />
              </div>
            )}

          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t bg-slate-50">
            <Button variant="outlined" disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)} sx={{ textTransform: "none", fontSize: "12px" }}>Back</Button>
            <div className="flex gap-3">
              <Button onClick={() => window.history.back()} sx={{ textTransform: "none", color: "#64748b", fontSize: "12px" }}>Cancel View</Button>
              <Button 
                variant="contained" 
                onClick={() => activeStep < steps.length - 1 ? setActiveStep(activeStep + 1) : window.print()} 
                sx={{ textTransform: "none", px: 4, fontSize: "12px" }}
              >
                {activeStep === steps.length - 1 ? "Print Profile" : "Next Section"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ViewEmployee;