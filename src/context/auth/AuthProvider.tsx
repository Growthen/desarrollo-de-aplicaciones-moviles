import { ReactNode, useState } from "react";

import { AuthContext, User } from "./AuthContext";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({
      id: "1",
      name: "Marcelo",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
