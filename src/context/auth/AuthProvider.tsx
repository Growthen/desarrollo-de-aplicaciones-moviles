import { ReactNode, useState } from "react";

import { AuthContext, Role, User } from "./AuthContext";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => {
    // TODO: Reemplazar con autenticación real (API call)
    setUser({
      id: "1",
      name: "Marcelo",
      role,
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
