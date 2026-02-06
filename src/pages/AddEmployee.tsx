import React, { useState, useRef, useEffect } from "react";
import {  Box,  Stepper,  Step,  StepLabel,  TextField,  Button,  MenuItem,  FormControl,  FormLabel,  RadioGroup,FormControlLabel,  Radio,  Checkbox,} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";




const steps: string[] = [
  "Employee Details",
  "Personal Details",
  "Family",
  "Nominee",
  "Academic Qualification",
  "Experience",
  "Documents & Compliance",
  "Documents Upload", 
  "Payroll & Compensation",
  "Security Deposit",
  "Subscription",
  "Leaves Update",
  "Employee Salary",
];

const REQUIRED_DOCUMENTS = [
  {
    key: "aadhar",
    label: "Aadhar Card",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    key: "pan",
    label: "PAN Card",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
  {
    key: "resume",
    label: "Resume",
    accept: ".pdf",
  },
  {
    key: "photo",
    label: "Passport Size Photo",
    accept: ".jpg,.jpeg,.png",
  },
];

const inputProps: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,
  autoComplete: "off",

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
      height: "36px", // ✅ total compact height
    },
  },

  sx: {
    "& .MuiOutlinedInput-root": {
      height: "36px", // ✅ compact input box
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px", // ✅ inner padding ~8px
      fontSize: "13px",
    },

    "& .MuiInputLabel-root": {
      top: "-2px", // ✅ label align fix
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "6px",
    },
  },
};



/* ----------------------------------
   MAIN COMPONENT
---------------------------------- */


const EmployeeOnboard: React.FC = () => {
const [activeStep, setActiveStep] = useState<number>(0);

  // ✅ refs MUST be inside component
const scrollContainerRef = useRef<HTMLDivElement | null>(null);
const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
useEffect(() => {
  const container = scrollContainerRef.current;
  const step = stepRefs.current[activeStep];

  if (!container || !step) return;

  const containerRect = container.getBoundingClientRect();
  const stepRect = step.getBoundingClientRect();

  const offset =
    stepRect.left -
    containerRect.left -
    containerRect.width / 2 +
    stepRect.width / 2;

  const targetScroll =
    container.scrollLeft + offset;

  container.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
}, [activeStep]);

  // ✅ auto-scroll when active step changes
  useEffect(() => {
    const currentStep = stepRefs.current[activeStep];
    if (currentStep) {
      currentStep.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeStep]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen font-poppins p-2">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl">

          {/* Header */}
          <div className="px-3 py-2 border-b border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-slate-700">
              Employee Onboard
            </p>
          </div>

          {/* Stepper */}
      {/* Stepper Wrapper */}
<Box
  ref={scrollContainerRef}
  sx={{
    overflowX: "auto",
    whiteSpace: "nowrap",

    /* Hide scrollbar (Chrome, Edge, Safari) */
    "&::-webkit-scrollbar": {
      display: "none",
    },

    /* Hide scrollbar (Firefox) */
    scrollbarWidth: "none",

    /* Hide scrollbar (IE, Edge Legacy) */
    msOverflowStyle: "none",
  }}
  className="px-3 py-3"
>

  {/* Stepper Inner */}
  <Box sx={{ display: "inline-flex" }}>
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ width: "max-content" }}
    >
      {steps.map((label, index) => (
        <Step
          key={label}
          ref={(el) => (stepRefs.current[index] = el)}
          sx={{ width: "auto" }}
        >
          <StepLabel
            onClick={() => setActiveStep(index)}
            sx={{
              cursor: "pointer",
              "&:hover .MuiStepLabel-label": { color: "#1d4ed8" },
              "& .MuiStepLabel-label": {
                fontFamily: "Poppins",
                fontSize: "12px",
                whiteSpace: "normal",
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
</Box>


          {/* Content */}
<div className="p-3">
{activeStep === 0 && <EmployeeDetails />}
{activeStep === 1 && <PersonalDetails />}
{activeStep === 2 && <FamilyDetails />}
{activeStep === 3 && <NomineeDetails />}
{activeStep === 4 && <AcademicDetails />}
{activeStep === 5 && <ExperienceDetails />}
{activeStep === 6 && <DocumentsCompliance />}
{activeStep === 7 && <DocumentsUpload />}
{activeStep === 8 && <PayrollCompensation />}
{activeStep === 9 && <SecurityDeposit />}
{activeStep === 10 && <Subscription />}
{activeStep === 11 && <LeavesUpdate />}
{activeStep === 12 && <EmployeeSalary />}
</div>

          {/* Footer */}
          <div className="flex justify-between items-center px-3 py-2 border-t bg-slate-50">
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((p) => p - 1)}
              sx={{
                textTransform: "none",
                fontSize: "12px",
                borderRadius: "6px",
              }}
            >
              Back
            </Button>

 <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((p) => p - 1)}
              sx={{
                textTransform: "none",
                fontSize: "12px",
                borderRadius: "6px",
              }}
            >
              Save
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  borderRadius: "6px",
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep((p) => p + 1)}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  borderRadius: "6px",
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EmployeeOnboard;

/* ----------------------------------
   STEP SECTIONS
---------------------------------- */
const selectMenuProps = {
  PaperProps: {
    sx: {
      borderRadius: "8px",
      mt: 0.5,
      "& .MuiMenuItem-root": {
        fontFamily: "Poppins, sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        color: "#0f172a",
        padding: "8px 14px",
      },
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#e0e7ff",
        color: "#1d4ed8",
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#f1f5f9",
      },
    },
  },
};
const EmployeeDetails: React.FC = () => {
  const [joiningDate, setJoiningDate] = useState<Dayjs | null>(null);
  const [confirmationDate, setConfirmationDate] = useState<Dayjs | null>(null);
  const [retirementDate, setRetirementDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("");
  const [physicallyHandicapped, setPhysicallyHandicapped] = useState("");


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Place of Work */}
         {/* Department */}
   <TextField
  select
  label="Place of Work"
  {...inputProps}
  required
  SelectProps={{
    MenuProps: selectMenuProps,
  }}
>
  <MenuItem value="hr">Office</MenuItem>
  <MenuItem value="it">Work From Home</MenuItem>
  <MenuItem value="finance">Hybrid</MenuItem>
</TextField>

      {/* Employee Code */}<TextField
  label="Employee Code"
  {...inputProps}
  required
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#eff6ff", // ✅ light blue
      height: "36px",
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px",
      fontWeight: 600, // ✅ looks system-generated
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#93c5fd", // ✅ soft blue border
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#60a5fa",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2563eb",
    },
  }}
/>


      {/* Names */}
      <TextField label="First Name" {...inputProps} required />
      <TextField label="Short Name" {...inputProps} />
      <TextField label="Middle Name" {...inputProps} />
      <TextField label="Last Name" {...inputProps} required />

    <TextField
  select
  label="Employee Band"
  {...inputProps}
  required
  SelectProps={{
    MenuProps: selectMenuProps,
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#eff6ff", // ✅ light blue background
      height: "36px",
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px",
      fontWeight: 500,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#93c5fd",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#60a5fa",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2563eb",
    },
  }}
>
  <MenuItem value="A">Band A</MenuItem>
  <MenuItem value="B">Band B</MenuItem>
  <MenuItem value="C">Band C</MenuItem>
  <MenuItem value="D">Band D</MenuItem>
</TextField>

      {/* Mobile */}
      <TextField label="Mobile No" {...inputProps} required />

      {/* Gender */}
      <FormControl>
        <FormLabel sx={{ fontSize: "13px", fontFamily: "Poppins" }}>
          Gender *
        </FormLabel>
        <RadioGroup
          row
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      {/* Cost Center */}
      <TextField label="Cost Center" {...inputProps} required />

      {/* Department */}
   <TextField
  select
  label="Department"
  {...inputProps}
  required
  SelectProps={{
    MenuProps: selectMenuProps,
  }}
>
  <MenuItem value="hr">HR</MenuItem>
  <MenuItem value="it">IT</MenuItem>
  <MenuItem value="finance">Finance</MenuItem>
</TextField>


      {/* Designation */}
      <TextField label="Designation" {...inputProps} required />

      {/* Joining Date */}
      <DatePicker
        label="Joining Date"
        value={joiningDate}
        onChange={setJoiningDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: { ...inputProps, required: true },
        }}
      />

      {/* Job Type */}
      <TextField
  select
  label="Job Type"
  {...inputProps}
  required
  SelectProps={{
    MenuProps: selectMenuProps,
  }}
>
  <MenuItem value="permanent">Permanent</MenuItem>
  <MenuItem value="contract">Contract</MenuItem>
  <MenuItem value="intern">Intern</MenuItem>
</TextField>


      {/* Reporting */}
      <TextField label="Reporting To" {...inputProps} />
      <TextField label="Level 1 Reporting" {...inputProps} />
      <TextField label="Level 2 Reporting" {...inputProps} />

      {/* Probation */}
      <TextField
        label="Probation Period (In Months)"
        {...inputProps}
        type="number"
      />

      {/* Confirmation Date */}
      <DatePicker
        label="Confirmation Date"
        value={confirmationDate}
        onChange={setConfirmationDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: { ...inputProps, required: true },
        }}
      />

      {/* Employee Shift */}
      <TextField select label="Employee Shift" {...inputProps} required SelectProps={{
    MenuProps: selectMenuProps,
  }}>
        <MenuItem value="general">General</MenuItem>
        <MenuItem value="night">Night</MenuItem>
        <MenuItem value="rotational">Rotational</MenuItem>
      </TextField>

      {/* Email */}
      <TextField label="Email-ID" {...inputProps} required />

      {/* Physically Handicapped */}
      <FormControl>
        <FormLabel sx={{ fontSize: "13px", fontFamily: "Poppins" }}>
          Physically Handicapped *
        </FormLabel>
        <RadioGroup
          row
          value={physicallyHandicapped}
          onChange={(e) => setPhysicallyHandicapped(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {/* Work From */}
      <TextField select label="Work From" {...inputProps} SelectProps={{
    MenuProps: selectMenuProps,
  }}>
        <MenuItem value="office">Office</MenuItem>
        <MenuItem value="home">Home</MenuItem>
        <MenuItem value="hybrid">Hybrid</MenuItem>
      </TextField>

      {/* Supervisor */}
      <TextField label="Supervisor" {...inputProps} />

      {/* Special Shift */}
      <FormControlLabel
        control={<Checkbox />}
        label="Special Shifts Applicable"
        sx={{
          "& .MuiFormControlLabel-label": {
            fontFamily: "Poppins",
            fontSize: "13px",
            color: "#475569",
          },
        }}
      />

      {/* Retirement Date */}
      <DatePicker
        label="Date of Retirement"
        value={retirementDate}
        onChange={setRetirementDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: { ...inputProps },
        }}
      />
    </div>
  );
};


const PersonalDetails: React.FC = () => {
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [birthdayEventDate, setBirthdayEventDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Alternate Contact */}
      <TextField label="Alternate Email-ID" {...inputProps} />
      <TextField label="Alternate Contact No." {...inputProps} />

      {/* Birthday Event Date */}
      <DatePicker
        label="Birthday Event Date"
        value={birthdayEventDate}
        onChange={setBirthdayEventDate}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps } }}
      />

      {/* Age */}
      <TextField label="Age" type="number" {...inputProps} />

      {/* Date of Birth */}
      <DatePicker
        label="Date of Birth"
        value={dob}
        onChange={setDob}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps, required: true } }}
      />

      {/* Identification */}
      <TextField label="Mark of Identification" {...inputProps} />

      {/* Blood Group */}
      <TextField select label="Blood Group" {...inputProps}  SelectProps={{
    MenuProps: selectMenuProps,
  }}>
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
          <MenuItem key={bg} value={bg}>{bg}</MenuItem>
        ))}
      </TextField>

      {/* Marital Status */}
      <TextField select label="Marital Status" {...inputProps}  SelectProps={{
    MenuProps: selectMenuProps,
  }}>
        <MenuItem value="single">Single</MenuItem>
        <MenuItem value="married">Married</MenuItem>
      </TextField>

      {/* Religion */}
      <TextField label="Religion" {...inputProps} />

      {/* Category */}
      <TextField select label="Category" {...inputProps} SelectProps={{
    MenuProps: selectMenuProps,
  }}> 
        <MenuItem value="general">General</MenuItem>
        <MenuItem value="obc">OBC</MenuItem>
        <MenuItem value="sc">SC</MenuItem>
        <MenuItem value="st">ST</MenuItem>
      </TextField>

      {/* Nationality */}
      <TextField label="Nationality" {...inputProps} required />

      {/* PRESENT ADDRESS */}
      <TextField
        label="Present Address"
        {...inputProps}
        multiline
        rows={1}
        className="lg:col-span-2"
      />

      <TextField label="State" {...inputProps} />
      <TextField label="District" {...inputProps} />
      <TextField label="City" {...inputProps} />
      <TextField label="PIN Code" {...inputProps} />

      {/* Emergency Contact */}
      <TextField label="Emergency Contact Person Name" {...inputProps} required />
      <TextField label="Contact Person Relation" {...inputProps} required />

     

      <TextField label="State" {...inputProps} />
      <TextField label="District" {...inputProps} />
      <TextField label="City" {...inputProps} />
      <TextField label="PIN Code" {...inputProps} />

      <TextField
        label="Emergency Contact Phone No."
        {...inputProps}
        required
      />

      {/* Language */}
      <TextField label="Language" {...inputProps} />
       {/* PERMANENT ADDRESS */}
      <TextField
        label="Permanent Address"
        {...inputProps}
        multiline
        rows={1}
        className="lg:col-span-2"
      />
    </div>
  );
};

const FamilyDetails: React.FC = () => {
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Auto calculate age
  useEffect(() => {
    if (!dob) return setAge("");
    const years = dayjs().diff(dob, "year");
    setAge(years);
  }, [dob]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Employee Code (SERVICE) */}
    <TextField
  label="Employee Code"
  {...inputProps}
  required
  InputProps={{ readOnly: true }}
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#eff6ff", // light blue
      height: "36px", // compact height
    },

    "& .MuiOutlinedInput-input": {
      padding: "8px 10px", // ✅ EXACT 8px padding
      fontSize: "13px",
      fontWeight: 600,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#93c5fd",
      borderRadius: "6px",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#60a5fa",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2563eb",
    },
  }}
/>


      {/* Name */}
      <TextField label="Name" {...inputProps} required />

      {/* Relation */}
      <TextField label="Relation" {...inputProps} required />

      {/* Gender (DROPDOWN) */}
      <TextField
        select
        label="Gender"
        {...inputProps}
        required
        SelectProps={{ MenuProps: selectMenuProps }}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </TextField>

      {/* DOB */}
      <DatePicker
        label="DOB"
        value={dob}
        onChange={setDob}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps, required: true } }}
      />

      {/* Age (AUTO) */}
      <TextField
        label="Age"
        {...inputProps}
        value={age}
        InputProps={{ readOnly: true }}
      />

      {/* Occupation */}
      <TextField label="Occupation" {...inputProps} />

      {/* Monthly Income */}
      <TextField label="Monthly Income" {...inputProps} type="number" />

      {/* Address */}
      <TextField
        label="Address"
        {...inputProps}
        multiline
        rows={1}
        className="lg:col-span-2"
      />

      {/* Contact No */}
      <TextField label="Contact No" {...inputProps} required />

      {/* Aadhar Number */}
      <TextField label="Aadhar Number" {...inputProps} required />

      {/* Dependent (DROPDOWN) */}
      <TextField
        select
        label="Dependent"
        {...inputProps}
        SelectProps={{ MenuProps: selectMenuProps }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      {/* Upload */}
      <Button
        variant="outlined"
        component="label"
        sx={{
          height: "36px",
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        {file ? "File Uploaded" : "Upload Document"}
        <input
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Button>

      {/* Add Button */}
      <Button
        variant="contained"
        sx={{
          height: "36px",
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        + Add Family Member
      </Button>

    </div>
  );
};
const NomineeDetails: React.FC = () => {
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<number | "">("");

  // Auto calculate age
  useEffect(() => {
    if (!dob) return setAge("");
    setAge(dayjs().diff(dob, "year"));
  }, [dob]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Employee Code (SERVICE) */}
      <TextField
        label="Employee Code"
        {...inputProps}
        required
        InputProps={{ readOnly: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#eff6ff",
            height: "36px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 10px",
            fontWeight: 600,
          },
        }}
      />

      {/* Nominee Name (MANDATORY) */}
      <TextField label="Nominee Name" {...inputProps} required />

      {/* Nominee Address (MANDATORY) */}
      <TextField
        label="Nominee Address"
        {...inputProps}
        required
        multiline
        rows={1}
        className="lg:col-span-2"
      />

      {/* Relation with Employee (DROPDOWN) */}
      <TextField
        select
        label="Relation with Employee"
        {...inputProps}
        required
        SelectProps={{ MenuProps: selectMenuProps }}
      >
        <MenuItem value="spouse">Spouse</MenuItem>
        <MenuItem value="father">Father</MenuItem>
        <MenuItem value="mother">Mother</MenuItem>
        <MenuItem value="child">Child</MenuItem>
        <MenuItem value="sibling">Sibling</MenuItem>
      </TextField>

      {/* DOB */}
      <DatePicker
        label="DOB"
        value={dob}
        onChange={setDob}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps, required: true } }}
      />

      {/* Age (AUTO) */}
      <TextField
        label="Age"
        {...inputProps}
        value={age}
        InputProps={{ readOnly: true }}
      />

      {/* Amount of Share % (MANDATORY) */}
      <TextField
        label="Amount of Share %"
        {...inputProps}
        required
        type="number"
      />

      {/* Guardian Name (MANDATORY) */}
      <TextField label="Guardian Name" {...inputProps} required />

      {/* Guardian Address (MANDATORY) */}
      <TextField
        label="Guardian Address"
        {...inputProps}
        required
        multiline
        rows={1}
        className="lg:col-span-2"
      />

      {/* Add Button */}
      <Button
        variant="contained"
        sx={{
          height: "36px",
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        + Add Nominee
      </Button>

    </div>
  );
};

const AcademicDetails: React.FC = () => {
  const [passingDate, setPassingDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Employee Code (SERVICE) */}
      <TextField
        label="Employee Code"
        {...inputProps}
        required
        InputProps={{ readOnly: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#eff6ff",
            height: "36px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 10px",
            fontWeight: 600,
          },
        }}
      />

      {/* Course (DROPDOWN) */}
      <TextField
        select
        label="Course"
        {...inputProps}
        required
        SelectProps={{ MenuProps: selectMenuProps }}
      >
        <MenuItem value="ssc">SSC</MenuItem>
        <MenuItem value="intermediate">Intermediate</MenuItem>
        <MenuItem value="diploma">Diploma</MenuItem>
        <MenuItem value="graduation">Graduation</MenuItem>
        <MenuItem value="postgraduation">Post Graduation</MenuItem>
      </TextField>

      {/* Percentage (MANDATORY) */}
      <TextField
        label="Percentage"
        {...inputProps}
        required
        type="number"
      />

      {/* College / Institute (MANDATORY) */}
      <TextField
        label="College / Institute"
        {...inputProps}
        required
      />

      {/* Board / University (MANDATORY) */}
      <TextField
        label="Board / University"
        {...inputProps}
        required
      />

      {/* Month & Year of Passing (MANDATORY) */}
      <DatePicker
        label="Month & Year of Passing"
        views={["year", "month"]}
        value={passingDate}
        onChange={setPassingDate}
        format="MM/YYYY"
        slotProps={{ textField: { ...inputProps, required: true } }}
      />

      {/* Grade (DROPDOWN) */}
      <TextField
        select
        label="Grade"
        {...inputProps}
        SelectProps={{ MenuProps: selectMenuProps }}
      >
        <MenuItem value="distinction">Distinction</MenuItem>
        <MenuItem value="first">First Class</MenuItem>
        <MenuItem value="second">Second Class</MenuItem>
        <MenuItem value="pass">Pass</MenuItem>
      </TextField>

      {/* Add Button */}
      <Button
        variant="contained"
        sx={{
          height: "36px",
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        + Add Qualification
      </Button>

    </div>
  );
};
const ExperienceDetails: React.FC = () => {
  const [joiningDate, setJoiningDate] = useState<Dayjs | null>(null);
  const [relievingDate, setRelievingDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Employee Code (SERVICE) */}
      <TextField
        label="Employee Code"
        {...inputProps}
        required
        InputProps={{ readOnly: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#eff6ff",
            height: "36px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 10px",
            fontWeight: 600,
          },
        }}
      />

      {/* Organization Name (MANDATORY) */}
      <TextField label="Organization Name" {...inputProps} required />

      {/* Designation (MANDATORY) */}
      <TextField label="Designation" {...inputProps} required />

      {/* Joining Date (MANDATORY) */}
      <DatePicker
        label="Joining Date"
        value={joiningDate}
        onChange={setJoiningDate}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps, required: true } }}
      />

      {/* Relieving Date */}
      <DatePicker
        label="Relieving Date"
        value={relievingDate}
        onChange={setRelievingDate}
        format="DD/MM/YYYY"
        slotProps={{ textField: { ...inputProps } }}
      />

      {/* Location */}
      <TextField label="Location" {...inputProps} />

      {/* CTC */}
      <TextField label="CTC" {...inputProps} type="number" />

      {/* Remarks */}
      <TextField
        label="Remarks"
        {...inputProps}
        multiline
        rows={1}
        className="lg:col-span-2"
      />

      {/* Add Button */}
      <Button
        variant="contained"
        sx={{
          height: "36px",
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        + Add Experience
      </Button>

    </div>
  );
};

  const DocumentsCompliance: React.FC = () => {
  const [passportExpiryDate, setPassportExpiryDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* TAX REGIME */}
      <TextField select label="New Tax Regime" {...inputProps}>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      {/* VPF */}
      <TextField select label="VPF Applicable" {...inputProps} required>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      {/* EPS */}
      <TextField select label="EPS Applicable" {...inputProps}>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      {/* GRATUITY */}
      <TextField label="Gratuity ID" {...inputProps} />
      <TextField label="Gratuity No" {...inputProps} />

      {/* PAN / PRAN */}
      <TextField label="PAN Number" {...inputProps} />
      <TextField label="PRAN Number" {...inputProps} />

      {/* PF / UAN */}
      <TextField label="PF Number" {...inputProps} />
      <TextField label="UAN Number" {...inputProps} />

      {/* AADHAR */}
      <TextField label="Aadhar Number" {...inputProps} required />

      {/* PASSPORT */}
      <TextField label="Passport Number" {...inputProps} />

      <DatePicker
        label="Passport Expiry Date"
        value={passportExpiryDate}
        onChange={setPassportExpiryDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            ...inputProps,
          },
        }}
      />

    </div>
  );
  };

  const PayrollCompensation: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Bank Details */}
      <TextField label="Bank Name" {...inputProps} />
      <TextField label="Branch Name" {...inputProps} />
      <TextField label="COD" {...inputProps} />

      {/* Account Details */}
      <TextField
        label="Account Number"
        {...inputProps}
        required
      />

      <TextField
        label="Account Type (SB)"
        {...inputProps}
        placeholder="SB"
      />

      <TextField
        label="IFSC Code"
        {...inputProps}
        required
      />

      {/* VPF Applicable */}
      <TextField
        select
        label="VPF Applicable"
        {...inputProps}
        required
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                },
              },
            },
          },
        }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

    </div>
  );
};
const SecurityDeposit: React.FC = () => {
  const [paymentDate, setPaymentDate] = useState<Dayjs | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Date of Payment */}
      <DatePicker
        label="Date of Payment"
        value={paymentDate}
        onChange={setPaymentDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            ...inputProps,
          },
        }}
      />

      {/* Security Deposit Amount */}
      <TextField
        label="Security Deposit"
        {...inputProps}
        type="number"
      />

      {/* Bank Details */}
      <TextField label="Bank Name" {...inputProps} />
      <TextField label="Bank Branch Name" {...inputProps} />

    </div>
  );
};

  const LeavesUpdate: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"> 
  </div>
       );
const Subscription: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Mandatory IDs */}
      <TextField
        label="Society Id"
        {...inputProps}
        required
      />

      <TextField
        select
        label="Pension Eligibility"
        {...inputProps}
        required
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "13px",
                },
              },
            },
          },
        }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      <TextField
        label="Union Id"
        {...inputProps}
        required
      />

      {/* Insurance Numbers */}
      <TextField label="GSLI No" {...inputProps} />
      <TextField label="GDLI No" {...inputProps} />

      {/* Insurance IDs */}
      <TextField label="GSLI Id" {...inputProps} />
      <TextField label="GDLI Id" {...inputProps} />

    </div>
  );
};

const EmployeeSalary: React.FC = () => (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Mandatory IDs */}
      <TextField
        label="Employee Code"
        {...inputProps}
        required
      />

    

    
      {/* Insurance Numbers */}
      <TextField label="Pay Category" {...inputProps} />
     

    </div>
);
const DocumentsUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Record<string, File | null>>({});
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleUpload = (key: string, file: File | null) => {
    if (!file) return;
    setDocuments(prev => ({ ...prev, [key]: file }));
  };

  const closePreview = () => { setPreviewFile(null);};
  const isImage = (file: File) => file.type.startsWith("image/");
  const isPDF = (file: File) => file.type === "application/pdf";



  return (
    <div className="space-y-4">

      {/* Document Upload Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {REQUIRED_DOCUMENTS.map(doc => {
          const file = documents[doc.key];

          return (
            <div
              key={doc.key}
              className="border rounded-md p-3 bg-white shadow-sm space-y-2"
            >
              <p className="text-sm font-medium text-slate-700">
                {doc.label} <span className="text-red-500">*</span>
              </p>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ textTransform: "none", fontSize: "12px" }}
              >
                {file ? "Replace File" : "Upload File"}
                <input
                  type="file"
                  hidden
                  accept={doc.accept}
                  onChange={e =>
                    handleUpload(doc.key, e.target.files?.[0] || null)
                  }
                />
              </Button>

              {/* Preview Card */}
              {file && (
                <div
                  className="border rounded p-2 cursor-pointer hover:bg-slate-50"
                  onClick={() => setPreviewFile(file)}
                >
                  {isImage(file) ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-24 w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-24 flex flex-col items-center justify-center text-slate-600">
                      📄
                      <span className="text-xs mt-1 text-center">
                        {file.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-3xl p-4 relative">

            <button
              className="absolute top-2 right-3 text-xl text-slate-600"
              onClick={closePreview}
            >
              ✕
            </button>

            <p className="text-sm font-medium mb-2">
              {previewFile.name}
            </p>

            {isImage(previewFile) && (
              <img
                src={URL.createObjectURL(previewFile)}
                alt="preview"
                className="max-h-[70vh] mx-auto rounded"
              />
            )}

            {isPDF(previewFile) && (
              <iframe
                src={URL.createObjectURL(previewFile)}
                className="w-full h-[70vh] border rounded"
                title="PDF Preview"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
