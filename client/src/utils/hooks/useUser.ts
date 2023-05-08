import { useEffect, useState } from "react";
import { IUser } from "../../types/User";
import { $authHost } from "../../axios/axios";

export function useUser(id: string) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    $authHost
      .get("auth/user", { params: { id } })
      .then(({ data }) => setUser(data));
  }, [id]);

  return { user, setUser };
}
