import { useEffect, useState } from "react";
import { $authHost } from "../../axios/axios";
import { IUser } from "../../types/User";

export function useDialogs() {
  const [dialogs, setDialogs] = useState<IUser[]>([]);
  const [isDialogsLoading, setIsDialogsLoading] = useState(true);

  useEffect(() => {
    $authHost.get("/dialogs").then(({ data }) => {
      setDialogs(data);
      setIsDialogsLoading(false);
    });
  }, []);

  return { dialogs, setDialogs, isDialogsLoading };
}
