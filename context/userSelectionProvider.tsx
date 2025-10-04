import { useState } from "react";
import { UserSelectionContext } from "./selectionContext";
import type { User } from "../src/App";

export const UserSelectionProvider = ({ children }: { children: React.ReactNode }) => {
   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
   const [remaining, setRemaining] = useState<number | undefined>(undefined);

   return (
      <UserSelectionContext.Provider value={{ selectedUsers, setSelectedUsers, remaining, setRemaining }}>
         {children}
      </UserSelectionContext.Provider>
   );
};
