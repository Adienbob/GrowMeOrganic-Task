import { createContext, useContext } from "react";
import type { User } from "../src/App";

type UserSelectionContextType = {
   selectedUsers: User[];
   setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
   remaining: number | undefined;
   setRemaining: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const UserSelectionContext = createContext<UserSelectionContextType | undefined>(undefined);

export const useUserSelection = () => {
   const ctx = useContext(UserSelectionContext);
   if (!ctx) throw new Error("useUserSelection must be in provider");
   return ctx;
};
