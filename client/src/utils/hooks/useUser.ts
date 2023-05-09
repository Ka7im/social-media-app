import { useEffect, useState } from "react";
import { IUser } from "../../types/User";
import { $authHost } from "../../axios/axios";

export function useUser(id: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    setIsUserLoading(true);
    $authHost.get("auth/user", { params: { id } }).then(({ data }) => {
      setUser(data);
      setIsUserLoading(false);
    });
  }, [id]);

  return { user, setUser, isUserLoading };
}
