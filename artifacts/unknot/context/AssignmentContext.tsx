import React, { createContext, useContext, useState } from "react";

interface AssignmentContextType {
  imageUri: string | null;
  setImageUri: (uri: string) => void;
}

const AssignmentContext = createContext<AssignmentContextType>({
  imageUri: null,
  setImageUri: () => {},
});

export function AssignmentProvider({ children }: { children: React.ReactNode }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  return (
    <AssignmentContext.Provider value={{ imageUri, setImageUri }}>
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignment() {
  return useContext(AssignmentContext);
}
