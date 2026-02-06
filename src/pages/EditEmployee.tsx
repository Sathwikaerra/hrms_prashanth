import React, { useState, useRef, useEffect } from "react";
import {
  Box, Stepper, Step, StepLabel, TextField, Button, MenuItem,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Avatar, Typography
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

/* ----------------------------------
   STATIC DATA (Full Dataset)
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
  gender: "male",
  costCenter: "CC-99",
  department: "it",
  designation: "Software Engineer",
  joiningDate: dayjs("2024-01-10"),
  jobType: "permanent",
  reportingTo: "Suresh Raina",
  level1Reporting: "Manager A",
  level2Reporting: "Director B",
  probationPeriod: "6",
  confirmationDate: dayjs("2024-07-10"),
  employeeShift: "general",
  emailId: "amit.sharma@company.com",
  physicallyHandicapped: "no",
  workFrom: "office",
  supervisor: "Rajesh Koothrappali",
  specialShifts: false,
  retirementDate: dayjs("2050-12-31"),

  // Personal Details
  alternateEmail: "amit.personal@gmail.com",
  alternateContact: "9123456789",
  birthdayEventDate: dayjs("2024-05-20"),
  age: "28",
  dob: dayjs("1996-05-20"),
  identificationMark: "Mole on right cheek",
  bloodGroup: "O+",
  maritalStatus: "married",
  religion: "Hindu",
  category: "general",
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
  nomineeName: "Priya Sharma",
  nomineeRelation: "Spouse",

  // Academic & Experience
  highestQualification: "B.Tech",
  university: "JNTU",
  passingYear: "2018",
  totalExperience: "5 Years",
  previousCompany: "Tech Solutions Inc",

  // Documents & Compliance
  newTaxRegime: "no",
  vpfApplicable: "no",
  gratuityId: "GRAT-9982",
  gratuityNo: "G-112233",
  epsApplicable: "yes",
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
  sdBranchName: "Main Branch",
  securityDepositAmount: "50,000",
  dateOfPayment: dayjs("2024-01-15"),

  // Subscriptions & Others
  societyId: "SOC-101",
  leavesBalance: "15",
  attendanceId: "ATT-2025"
};

const steps = [
  "Employee Details", "Personal Details", "Family", "Nominee",
  "Academic Qualification", "Experience", "Documents & Compliance",
  "Documents Upload", "Payroll & Compensation", "Security Deposit",
  "Subscription", "Leaves Update", "Attendance",
];
const inputProps: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,

  InputLabelProps: {
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "12px",
      fontWeight: 500,
      color: "#475569",
    },
  },

  InputProps: {
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "13px",
      color: "#0f172a",
      height: "36px", // ✅ SAME HEIGHT
    },
  },

  sx: {
    "& .MuiOutlinedInput-root": {
      height: "36px", // ✅ FIXED INPUT BOX HEIGHT
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px", // ✅ EXACT PADDING
      fontSize: "13px",
    },

    "& .MuiInputLabel-root": {
      top: "-2px", // ✅ LABEL ALIGN FIX
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "6px",
    },
  },
};


const EditEmployee: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>(initialStaticData);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentStepEl = stepRefs.current[activeStep];
    if (currentStepEl) {
      currentStepEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeStep]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    console.log("Saving Employee Record:", formData);
    alert("Employee record updated successfully!");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen font-poppins bg-slate-50 p-2">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          
          <div className="px-4 py-3 border-b border-l-4 border-l-blue-600 bg-white flex justify-between items-center">
            <p className="text-sm font-bold text-slate-700 uppercase tracking-widest">
              Edit Employee Code : <span className="text-blue-600 font-extrabold">{formData.employeeCode}</span>
            </p>
          </div>

          <Box ref={scrollContainerRef} className="px-1 py-3 overflow-x-auto no-scrollbar border-b bg-slate-50/50">
            <Box sx={{ minWidth: 1600 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label} ref={(el) => (stepRefs.current[index] = el)}>
                    <StepLabel onClick={() => setActiveStep(index)} sx={{ cursor: "pointer", "& .MuiStepLabel-label": { fontFamily: "Poppins", fontSize: "11px" }}}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <div className="p-6">
            
            {/* STEP 0: EMPLOYEE DETAILS */}
            {activeStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Place of Work *" {...inputProps} value={formData.placeOfWork} onChange={(e)=>handleChange("placeOfWork", e.target.value)} />
                <TextField label="Employee Code *" {...inputProps} disabled value={formData.employeeCode} />
                <TextField label="First Name *" {...inputProps} value={formData.firstName} onChange={(e)=>handleChange("firstName", e.target.value)} />
                <TextField label="Short Name" {...inputProps} value={formData.shortName} onChange={(e)=>handleChange("shortName", e.target.value)} />
                <TextField label="Middle Name" {...inputProps} value={formData.middleName} onChange={(e)=>handleChange("middleName", e.target.value)} />
                <TextField label="Last Name *" {...inputProps} value={formData.lastName} onChange={(e)=>handleChange("lastName", e.target.value)} />
                <TextField label="Employee Band *" {...inputProps} value={formData.employeeBand} onChange={(e)=>handleChange("employeeBand", e.target.value)} />
                <TextField label="Mobile No. *" {...inputProps} value={formData.mobileNo} onChange={(e)=>handleChange("mobileNo", e.target.value)} />
                <TextField label="Cost Center *" {...inputProps} value={formData.costCenter} onChange={(e)=>handleChange("costCenter", e.target.value)} />
                <TextField select label="Department *" {...inputProps} value={formData.department} onChange={(e)=>handleChange("department", e.target.value)}>
                    <MenuItem value="it">IT</MenuItem><MenuItem value="hr">HR</MenuItem><MenuItem value="finance">Finance</MenuItem>
                </TextField>
                <TextField label="Designation *" {...inputProps} value={formData.designation} onChange={(e)=>handleChange("designation", e.target.value)} />
                {/* <DatePicker label="Joining Date *" value={formData.joiningDate} onChange={(v)=>handleChange("joiningDate", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} /> */}
             <DatePicker
  label="Joining Date"
  value={formData.joiningDate}
  onChange={(v) => handleChange("joiningDate", v)}
  format="DD/MM/YYYY"
  slotProps={{
    textField: {
      ...inputProps,
    },
  }}
/>

                <TextField select label="Job Type *" {...inputProps} value={formData.jobType} onChange={(e)=>handleChange("jobType", e.target.value)}>
                    <MenuItem value="permanent">Permanent</MenuItem><MenuItem value="contract">Contract</MenuItem>
                </TextField>
                <TextField label="Reporting To" {...inputProps} value={formData.reportingTo} onChange={(e)=>handleChange("reportingTo", e.target.value)} />
                <TextField label="Level 1 Reporting" {...inputProps} value={formData.level1Reporting} onChange={(e)=>handleChange("level1Reporting", e.target.value)} />
                <TextField label="Level 2 Reporting" {...inputProps} value={formData.level2Reporting} onChange={(e)=>handleChange("level2Reporting", e.target.value)} />
                <TextField label="Probation (In Months)" {...inputProps} value={formData.probationPeriod} onChange={(e)=>handleChange("probationPeriod", e.target.value)} />
                <DatePicker label="Confirmation Date *" value={formData.confirmationDate} onChange={(v)=>handleChange("confirmationDate", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
                <TextField select label="Employee Shift *" {...inputProps} value={formData.employeeShift} onChange={(e)=>handleChange("employeeShift", e.target.value)}>
                    <MenuItem value="general">General</MenuItem><MenuItem value="night">Night</MenuItem>
                </TextField>
                <TextField label="Email-ID *" {...inputProps} value={formData.emailId} onChange={(e)=>handleChange("emailId", e.target.value)} />
                <FormControl>
                  <FormLabel sx={{ fontSize: "12px" }}>Physically handicapped *</FormLabel>
                  <RadioGroup row value={formData.physicallyHandicapped} onChange={(e)=>handleChange("physicallyHandicapped", e.target.value)}>
                    <FormControlLabel value="yes" control={<Radio size="small"/>} label={<span className="text-xs">Yes</span>} />
                    <FormControlLabel value="no" control={<Radio size="small"/>} label={<span className="text-xs">No</span>} />
                  </RadioGroup>
                </FormControl>
                <TextField label="Work From" {...inputProps} value={formData.workFrom} onChange={(e)=>handleChange("workFrom", e.target.value)} />
                <TextField label="Supervisor" {...inputProps} value={formData.supervisor} onChange={(e)=>handleChange("supervisor", e.target.value)} />
                <FormControlLabel control={<Checkbox checked={formData.specialShifts} onChange={(e)=>handleChange("specialShifts", e.target.checked)} />} label={<span className="text-xs">Special Shifts Applicable</span>} />
                <DatePicker label="Date of Retirement" value={formData.retirementDate} onChange={(v)=>handleChange("retirementDate", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
              </div>
            )}

            {/* STEP 1: PERSONAL DETAILS */}
            {activeStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Alternate Email-ID" {...inputProps} value={formData.alternateEmail} onChange={(e)=>handleChange("alternateEmail", e.target.value)} />
                <TextField label="Alternate Contact No." {...inputProps} value={formData.alternateContact} onChange={(e)=>handleChange("alternateContact", e.target.value)} />
                <DatePicker label="Birthday Event Date" value={formData.birthdayEventDate} onChange={(v)=>handleChange("birthdayEventDate", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
                <TextField label="Age" type="number" {...inputProps} value={formData.age} onChange={(e)=>handleChange("age", e.target.value)} />
                <DatePicker label="Date of Birth *" value={formData.dob} onChange={(v)=>handleChange("dob", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
                <TextField label="Identification Mark" {...inputProps} value={formData.identificationMark} onChange={(e)=>handleChange("identificationMark", e.target.value)} />
                <TextField select label="Blood Group" {...inputProps} value={formData.bloodGroup} onChange={(e)=>handleChange("bloodGroup", e.target.value)}>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                </TextField>
                <TextField select label="Marital Status" {...inputProps} value={formData.maritalStatus} onChange={(e)=>handleChange("maritalStatus", e.target.value)}>
                    <MenuItem value="married">Married</MenuItem><MenuItem value="single">Single</MenuItem>
                </TextField>
                <TextField label="Religion" {...inputProps} value={formData.religion} onChange={(e)=>handleChange("religion", e.target.value)} />
                <TextField label="Nationality" {...inputProps} value={formData.nationality} onChange={(e)=>handleChange("nationality", e.target.value)} />
                <TextField label="Present Address" {...inputProps} multiline rows={1} className="lg:col-span-2" value={formData.presentAddress} onChange={(e)=>handleChange("presentAddress", e.target.value)} />
                <TextField label="Permanent Address" {...inputProps} multiline rows={1} className="lg:col-span-2" value={formData.permanentAddress} onChange={(e)=>handleChange("permanentAddress", e.target.value)} />
                <TextField label="State" {...inputProps} value={formData.state} onChange={(e)=>handleChange("state", e.target.value)} />
                <TextField label="District" {...inputProps} value={formData.district} onChange={(e)=>handleChange("district", e.target.value)} />
                <TextField label="City" {...inputProps} value={formData.city} onChange={(e)=>handleChange("city", e.target.value)} />
                <TextField label="PIN Code" {...inputProps} value={formData.pinCode} onChange={(e)=>handleChange("pinCode", e.target.value)} />
                <TextField label="Emergency Contact Name" {...inputProps} value={formData.emergencyContactName} onChange={(e)=>handleChange("emergencyContactName", e.target.value)} />
                <TextField label="Emergency Phone" {...inputProps} value={formData.emergencyPhone} onChange={(e)=>handleChange("emergencyPhone", e.target.value)} />
                <TextField label="Language" {...inputProps} value={formData.language} onChange={(e)=>handleChange("language", e.target.value)} />
              </div>
            )}

            {/* STEP 2: FAMILY & STEP 3: NOMINEE */}
            {(activeStep === 2 || activeStep === 3) && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Father Name" {...inputProps} value={formData.fatherName} onChange={(e)=>handleChange("fatherName", e.target.value)} />
                <TextField label="Mother Name" {...inputProps} value={formData.motherName} onChange={(e)=>handleChange("motherName", e.target.value)} />
                <TextField label="Nominee Name" {...inputProps} value={formData.nomineeName} onChange={(e)=>handleChange("nomineeName", e.target.value)} />
                <TextField label="Relation with Nominee" {...inputProps} value={formData.nomineeRelation} onChange={(e)=>handleChange("nomineeRelation", e.target.value)} />
              </div>
            )}

            {/* STEP 4: ACADEMIC & STEP 5: EXPERIENCE */}
            {(activeStep === 4 || activeStep === 5) && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Highest Qualification" {...inputProps} value={formData.highestQualification} onChange={(e)=>handleChange("highestQualification", e.target.value)} />
                <TextField label="University/Board" {...inputProps} value={formData.university} onChange={(e)=>handleChange("university", e.target.value)} />
                <TextField label="Year of Passing" {...inputProps} value={formData.passingYear} onChange={(e)=>handleChange("passingYear", e.target.value)} />
                <TextField label="Total Experience" {...inputProps} value={formData.totalExperience} onChange={(e)=>handleChange("totalExperience", e.target.value)} />
                <TextField label="Last Company Name" {...inputProps} value={formData.previousCompany} onChange={(e)=>handleChange("previousCompany", e.target.value)} />
              </div>
            )}

            {/* STEP 6: DOCUMENTS & COMPLIANCE */}
            {activeStep === 6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField select label="New Tax Regime" {...inputProps} value={formData.newTaxRegime} onChange={(e)=>handleChange("newTaxRegime", e.target.value)}>
                    <MenuItem value="yes">Yes</MenuItem><MenuItem value="no">No</MenuItem>
                </TextField>
                <TextField select label="VPF Applicable *" {...inputProps} value={formData.vpfApplicable} onChange={(e)=>handleChange("vpfApplicable", e.target.value)}>
                    <MenuItem value="yes">Yes</MenuItem><MenuItem value="no">No</MenuItem>
                </TextField>
                <TextField label="Gratuity Id" {...inputProps} value={formData.gratuityId} onChange={(e)=>handleChange("gratuityId", e.target.value)} />
                <TextField label="Gratuity No" {...inputProps} value={formData.gratuityNo} onChange={(e)=>handleChange("gratuityNo", e.target.value)} />
                <TextField select label="EPS Applicable" {...inputProps} value={formData.epsApplicable} onChange={(e)=>handleChange("epsApplicable", e.target.value)}>
                    <MenuItem value="yes">Yes</MenuItem><MenuItem value="no">No</MenuItem>
                </TextField>
                <TextField label="PAN Number" {...inputProps} value={formData.panNumber} onChange={(e)=>handleChange("panNumber", e.target.value)} />
                <TextField label="PRAN Number" {...inputProps} value={formData.pranNumber} onChange={(e)=>handleChange("pranNumber", e.target.value)} />
                <DatePicker label="Passport Expiry Date" value={formData.passportExpiryDate} onChange={(v)=>handleChange("passportExpiryDate", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
                <TextField label="PF Number" {...inputProps} value={formData.pfNumber} onChange={(e)=>handleChange("pfNumber", e.target.value)} />
                <TextField label="Passport Number" {...inputProps} value={formData.passportNumber} onChange={(e)=>handleChange("passportNumber", e.target.value)} />
                <TextField label="UAN Number" {...inputProps} value={formData.uanNumber} onChange={(e)=>handleChange("uanNumber", e.target.value)} />
                <TextField label="Aadhar Number *" {...inputProps} value={formData.aadharNumber} onChange={(e)=>handleChange("aadharNumber", e.target.value)} />
              </div>
            )}

            {/* STEP 7: DOCUMENTS UPLOAD */}
            {activeStep === 7 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {["Profile Photo", "PAN Card", "Aadhar Card"].map((doc) => (
                  <Box key={doc} sx={{ p: 2, border: "1px dashed #cbd5e1", borderRadius: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: "#475569" }}>{doc}</Typography>
                    <Avatar variant="rounded" sx={{ width: "100%", height: 150, bgcolor: "#f1f5f9", color: "#94a3b8", mb: 2 }}>[Preview]</Avatar>
                    <Button variant="outlined" component="label" size="small" sx={{ textTransform: "none" }}>
                      Upload {doc}
                      <input type="file" hidden accept="image/*,.pdf" />
                    </Button>
                  </Box>
                ))}
              </div>
            )}

            {/* STEP 8: PAYROLL & COMPENSATION */}
            {activeStep === 8 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Bank Name" {...inputProps} value={formData.bankName} onChange={(e)=>handleChange("bankName", e.target.value)} />
                <TextField label="Branch Name" {...inputProps} value={formData.branchName} onChange={(e)=>handleChange("branchName", e.target.value)} />
                <TextField label="Account Number" {...inputProps} value={formData.accountNumber} onChange={(e)=>handleChange("accountNumber", e.target.value)} />
                <TextField label="IFSC Code" {...inputProps} value={formData.ifscCode} onChange={(e)=>handleChange("ifscCode", e.target.value)} />
                <TextField select label="Payment Mode" {...inputProps} value={formData.paymentMode} onChange={(e)=>handleChange("paymentMode", e.target.value)}>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                </TextField>
              </div>
            )}

            {/* STEP 9: SECURITY DEPOSIT */}
            {activeStep === 9 && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="SD Branch Name" {...inputProps} value={formData.sdBranchName} onChange={(e)=>handleChange("sdBranchName", e.target.value)} />
                <TextField label="Security Deposit Amount" {...inputProps} value={formData.securityDepositAmount} onChange={(e)=>handleChange("securityDepositAmount", e.target.value)} />
                <DatePicker label="Date of Payment" value={formData.dateOfPayment} onChange={(v)=>handleChange("dateOfPayment", v)} format="DD/MM/YYYY" slotProps={{ textField: { ...inputProps } }} />
              </div>
            )}

            {/* STEP 10: SUBSCRIPTION, 11: LEAVES, 12: ATTENDANCE */}
            {(activeStep >= 10) && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <TextField label="Society ID" {...inputProps} value={formData.societyId} onChange={(e)=>handleChange("societyId", e.target.value)} />
                <TextField label="Leaves Balance" {...inputProps} value={formData.leavesBalance} onChange={(e)=>handleChange("leavesBalance", e.target.value)} />
                <TextField label="Attendance ID" {...inputProps} value={formData.attendanceId} onChange={(e)=>handleChange("attendanceId", e.target.value)} />
              </div>
            )}

          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t bg-slate-50">
            <Button variant="outlined" disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)} sx={{ textTransform: "none", fontSize: "12px", borderRadius: "8px" }}>Back</Button>
            <div className="flex gap-3">
              <Button onClick={() => window.history.back()} sx={{ textTransform: "none", color: "#64748b", fontSize: "12px" }}>Cancel</Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ textTransform: "none", px: 4, fontSize: "12px", borderRadius: "8px" }}>Update</Button>
              ) : (
                <Button variant="contained" onClick={() => setActiveStep((p) => p + 1)} sx={{ textTransform: "none", px: 4, fontSize: "12px", borderRadius: "8px" }}>Next</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EditEmployee;