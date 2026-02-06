import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown, LogOut } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { menuItems } from "../menuItems";
import profileImage from "../Images/pawan kalyan.jpeg";
import jayam from "../Images/Jayam new logo (1).png";
import JayamJ from "../Images/Jayam Y.png";
import "../css/Sidebar.css";
import { useEdit } from "../context/EditContext";   // ✅ IMPORTANT

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  collapsed,
  setCollapsed,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDesignationEditing } = useEdit();   // ✅ GLOBAL STATE

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const userButtonRef = useRef<HTMLDivElement | null>(null);

  const isMobile = window.innerWidth < 1024;

  /* Close user menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Navigation handler */
  const handleNavigation = (path: string) => {
    if (isDesignationEditing) {
      setShowWarning(true);
      return;
    }

    navigate(path);
    if (isMobile) onClose();
  };

  const toggleExpanded = (title: string) => {
    if (collapsed) {
      setCollapsed(false);
      setExpandedItems([title]);
      return;
    }

    setExpandedItems(prev =>
      prev.includes(title) ? [] : [title]
    );
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "-100%" }}
        className={`fixed lg:relative z-[2000] flex flex-col h-full bg-white shadow-xl transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Collapse Button */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-4 top-6 bg-white shadow-md border p-1 rounded-full hidden lg:block"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        {/* Logo */}
        <div className="flex justify-center items-center py-2">
          <img
            src={collapsed ? JayamJ : jayam}
            className={`${collapsed ? "w-15 h-12" : "w-28 h-14"} transition-all duration-300`}
          />
        </div>

        {/* MENU */}
        <nav className="flex-1 px-2 overflow-y-auto space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div key={item.title}>
                <div
                  onClick={() =>
                    item.submenu
                      ? toggleExpanded(item.title)
                      : handleNavigation(item.path)
                  }
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer
                  ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} />
                    {!collapsed && (
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                  </div>

                  {!collapsed && item.submenu && (
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        expandedItems.includes(item.title)
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  )}
                </div>

                {/* SUBMENU */}
                {!collapsed &&
                  item.submenu &&
                  expandedItems.includes(item.title) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((sub) => (
                        <div
                          key={sub.path}
                          onClick={() => handleNavigation(sub.path)}
                          className="block p-2 rounded text-xs hover:bg-gray-50 cursor-pointer"
                        >
                          {sub.title}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>

        {/* USER SECTION */}
        <div className="border-t mt-auto">
          <div
            ref={userButtonRef}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <img src={profileImage} className="w-8 h-8 rounded-full" />
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium">Prashanth</p>
                  <p className="text-xs text-gray-500">SR Developer</p>
                </div>
              )}
            </div>

            {!collapsed &&
              (showUserMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </div>

          <AnimatePresence>
            {showUserMenu && !collapsed && (
              <motion.div
                ref={userMenuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-16 left-3 right-3 bg-white border rounded-lg shadow-lg py-2"
              >
                <button
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut size={16} />
                  <span className="ml-3 text-sm">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* WARNING DIALOG */}
      <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          Please save the changes before navigating to another page.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWarning(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
