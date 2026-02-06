// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import Sidebar from './Sidebar';
// import Header from './Header';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar - Always visible on desktop, toggleable on mobile */}
//       <div className="hidden lg:flex lg:flex-shrink-0">
//         <Sidebar isOpen={true} onClose={() => {}} />
//       </div>
      
//       {/* Mobile Sidebar */}
//       <div className="lg:hidden">
//         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       </div>
      
//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
      
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header onMenuClick={() => setSidebarOpen(true)} />
// <main id="scrollable-main" className="flex-1 overflow-auto p-4 lg:p-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {children}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Desktop Sidebar */}
//       <div className="hidden lg:flex lg:flex-shrink-0">
//         <Sidebar
//           isOpen={true}
//           collapsed={sidebarCollapsed}
//           setCollapsed={setSidebarCollapsed}
//           onClose={() => {}}
//         />
//       </div>

//       {/* Mobile Sidebar */}
//       <div className="lg:hidden">
//         <Sidebar
//           isOpen={sidebarOpen}
//           collapsed={false}
//           setCollapsed={() => {}}
//           onClose={() => setSidebarOpen(false)}
//         />
//       </div>

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* MAIN CONTENT */}
//       <div
//         className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 
//         ${sidebarCollapsed ? "lg:ml-0" : "lg:ml-0"}`}
//       >
//         <Header onMenuClick={() => setSidebarOpen(true)} />

//         <main id="scrollable-main" className="flex-1 overflow-auto p-4 lg:p-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {children}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 🔥 NEW STATE — controls menu position
  const [isVertical, setIsVertical] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SHOW SIDEBAR ONLY IF VERTICAL */}
      {isVertical && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <Sidebar
              isOpen={true}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
              onClose={() => {}}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <Sidebar
              isOpen={sidebarOpen}
              collapsed={false}
              setCollapsed={() => {}}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && isVertical && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          isVertical={isVertical}
          setIsVertical={setIsVertical}
        />

        <main id="scrollable-main" className="flex-1 overflow-auto p-2 lg:p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
