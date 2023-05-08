import { RootState } from "../../store";

export const getFriendsSelector = (state: RootState) => {
  return state.friends;
};
