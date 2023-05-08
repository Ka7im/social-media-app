import { useEffect, useState } from "react";
import { $authHost } from "../../axios/axios";
import { IComment } from "../../types/Comment";

export function useUserComments(id: string, avatarUrl: string) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    $authHost.get<IComment[]>(`/comments/${id}`).then(({ data }) => {
      setComments(data);
      setIsLoading(false);
    });
  }, [avatarUrl, id]);

  return { comments, isLoading };
}
