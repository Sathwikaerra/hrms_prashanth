import {
  LayoutDashboard,
  Users,
  Clock,
  FileText,
  User,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  title: string;
  path: string;
}

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  path: string;
  submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admindashbaord",
    submenu: [
      { title: "Employee", path: "/dashboard" },
      { title: "Payroll", path: "/Payrolldashbaord" },
      { title: "Admin", path: "/admindashbaord" }
    ]
  },
  {
    title: "Organization",
    icon: Users,
    path: "/employees",
    submenu: [{ title: "All Employees", path: "/employees" }]
  },
  {
    title: "Setup",
    icon: Clock,
    path: "/setup",
    submenu: [
      { title: "Policies", path: "/Setup_policies" },
      { title: "Holidays", path: "/Setup_Holidays" },
      { title: "Organization Chart", path: "/organizationchart" },
      { title: "Holidays Upload", path: "/setup_Holidayupload" }
    ]
  },
  {
    title: "Master",
    icon: FileText,
    path: "/master",
    submenu: [
      { title: "Band", path: "/band" },
      { title: "Designation", path: "/designation" },
      { title: "Languages", path: "/languages" },
      { title: "Leaves Code", path: "/leavescode" },
      { title: "Employee Relatives", path: "/Employeerelatives" },
      { title: "Branch", path: "/branch" },
      { title: "District", path: "/district" },

    ]
  },
  {
    title: "Employee",
    icon: User,
    path: "/Employee",
    submenu: [
      { title: "Employee Leaves", path: "/employeeleaves" },
      { title: "Employee Experience", path: "/Employee_experience" },
      { title: "Employee Nominee", path: "/EmployeeNominee" },
      { title: "Employee Qualification", path: "/EmployeeQualification" },
      { title: "Employee Salary", path: "/Employeesalary" },
      { title: "Employee Insurance Details", path: "/Employee_insurance_details" },
      { title: "Employee Family Details", path: "/Employee_family_Details" },
      { title: "Employee Biometric", path: "/Employee_Biometric" },
      { title: "Employee Details 360", path: "/Employee_details_360" }
    ]
  },
  {
    title: "Attendance",
    icon: Clock,
    path: "/attendance",
    submenu: [{ title: "Daily Attendance", path: "/attendance" }]
  },
  {
    title: "Leave Management",
    icon: Calendar,
    path: "/leave",
    submenu: [
      { title: "Leave Application", path: "/leaveapplication" },
      { title: "Leave Approval", path: "/leave" }
    ]
  },
  {
    title: "Payroll",
    icon: DollarSign,
    path: "/payroll",
    submenu: [
      { title: "Salary Management", path: "/payroll" },
      { title: "Pay Category Creation", path: "/payroll/Paycategorycreation" }
    ]
  },
  {
    title: "Performance",
    icon: TrendingUp,
    path: "/performance",
    submenu: [{ title: "Performance Review", path: "/performance" }]
  }
];
