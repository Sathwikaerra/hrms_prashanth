import React, { createContext, useContext, useState } from "react";

interface EditContextType {
  isDesignationEditing: boolean;
  setIsDesignationEditing: (value: boolean) => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesignationEditing, setIsDesignationEditing] = useState(false);

  return (
    <EditContext.Provider value={{ isDesignationEditing, setIsDesignationEditing }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used inside EditProvider");
  }
  return context;
};
