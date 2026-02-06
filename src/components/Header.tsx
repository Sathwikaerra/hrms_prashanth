import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  MessageSquare,
  Sun,
  Moon,
  GripVertical,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import { menuItems } from "../menuItems";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import logo from "../Images/Jayam new logo (1).png";
import { useEdit } from "../context/EditContext";  // ✅ IMPORTANT

interface HeaderProps {
  onMenuClick: () => void;
  isVertical: boolean;
  setIsVertical: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  isVertical,
  setIsVertical,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();
  const { isDesignationEditing } = useEdit();   // ✅ GLOBAL

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleNavigation = (path: string) => {
    if (isDesignationEditing) {
      setShowWarning(true);
      return;
    }

    navigate(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b relative z-[1000]"
      >
        <div className="px-4 lg:px-6 py-3 flex justify-between items-center">

          <div className="flex items-center space-x-4">
            <button onClick={onMenuClick}>
              <Menu className="w-6 h-6" />
            </button>

            <img
              src={logo}
              alt="Company Logo"
              className="h-9 cursor-pointer"
              onClick={() => handleNavigation("/dashboard")}
            />
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsVertical(!isVertical)}>
              {isVertical ? <GripVertical size={20} /> : <LayoutGrid size={20} />}
            </button>

            <button onClick={toggleTheme}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Bell size={20} />
            <MessageSquare size={20} />
          </div>
        </div>
      </motion.header>

      {/* WARNING DIALOG */}
      <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          Please save the changes before navigating.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWarning(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
