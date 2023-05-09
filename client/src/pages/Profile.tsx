import styled from "styled-components";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import { getUserIdSelector } from "../redux/slices/authSlice/selectors";
import { useUserComments } from "../utils/hooks/useUserComments";
import { Link, useParams } from "react-router-dom";
import CommentsListWithLink from "../components/CommentsListWithLink";
import { AiFillHome, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import UserInfoEditModal from "../components/UserInfoEditModal";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/consts";
import { useUser } from "../utils/hooks/useUser";
import {
  addFriend,
  deleteFriend,
  getFriends,
} from "../redux/slices/friendsSlice/friendsSlice";
import { getFriendsSelector } from "../redux/slices/friendsSlice/selectors";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { ButtonTitle, IconWrapper } from "../components/Sidebar";
import { baseTheme } from "../utils/theme";
import { Post } from "../components/Post";
import { getUserPosts, Status } from "../redux/slices/postsSlice/postsSlice";
import { getUserPostsSelector } from "../redux/slices/postsSlice/selectors";
import SmallSpinner from "../components/Loaders/SmallSpinner";
import { PostsWrapper } from "./Posts";
import CommentSkeletonList from "../components/Loaders/CommentSkeletonList";
import ProfileUserSkeleton from "../components/Loaders/ProfileUserSkeleton";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  column-gap: 20px;
  background-color: ${(props) => props.theme.colors.componentBg};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 15px;
`;

const ProfileAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.mainColor};
  font-size: 21px;
  font-weight: 500;
  align-self: center;
`;

const CommentWrapper = styled.div`
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-bottom: 20px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 15px;
  justify-content: space-around;
  margin-top: 40px;
`;

const More = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Title = styled.div`
  color: #6f6f6f;
  font-weight: 500;
  align-self: center;
  font-size: 14px;
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.componentBg};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 15px 30px;
`;

const Description = styled.div`
  display: flex;
  column-gap: 10px;
`;

const DescriptionTitle = styled.div`
  color: #6f6f6f;
`;

const DescriptionText = styled.span`
  color: ${(props) => props.theme.mainColor};
`;

const CommentTitle = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-size: 21px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.font};
  color: ${(props) => props.theme.colors.bg};
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 5px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const PostsButtonWithIcon = styled(ButtonWithIcon)`
  display: flex;
  column-gap: 8px;
  padding: 15px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #fff;
  cursor: pointer;
`;

const PostsButtonTitle = styled(ButtonTitle)`
  font-size: 13px;
`;

const CreatePostWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  row-gap: 5px;
  flex-wrap: wrap;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.componentBg};
  border-radius: 10px;
  height: max-content;
  padding: 20px;
`;

const PostsTitle = styled.div`
  color: ${(props) => props.theme.colors.font};
  font-size: 25px;
  text-align: center;
  font-weight: 500;
  margin-top: 25px;
`;

const Profile = () => {
  const { id } = useParams();
  const userId = useAppSelector(getUserIdSelector);
  const { friends } = useAppSelector(getFriendsSelector);
  const { status, items } = useAppSelector(getUserPostsSelector);
  const { user, setUser, isUserLoading } = useUser(id as string);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useAppDispatch();

  let isFriend = false;

  for (let i = 0; i < friends.length; i++) {
    if (friends[i]._id === id) {
      isFriend = true;
      break;
    }
  }

  const isOwner = userId === id;

  const { comments, isLoading } = useUserComments(
    id as string,
    user?.avatarUrl as string
  );

  const handleDelete = () => {
    if (typeof user?._id === "string") {
      dispatch(deleteFriend(user._id));
    }
  };

  const handleAdd = () => {
    if (typeof user?._id === "string") {
      dispatch(addFriend(user._id));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getFriends());
      dispatch(getUserPosts(id));
    }
  }, []);

  return (
    <Layout>
      <>
        <ProfileWrapper>
          <UserInfo>
            {isUserLoading ? (
              <ProfileUserSkeleton />
            ) : (
              <>
                <ProfileAvatar src={`${BASE_URL}${user?.avatarUrl}`} />
                <Information>
                  <UserName>{user?.fullName}</UserName>
                  <More>
                    {isOwner ? (
                      <>
                        <AiOutlineEdit />
                        <Title onClick={() => setIsActive(true)}>
                          Изменить
                        </Title>
                      </>
                    ) : (
                      <>
                        {!isFriend ? (
                          <Button onClick={handleAdd}>Добавить в друзья</Button>
                        ) : (
                          <Button onClick={handleDelete}>
                            Удалить из друзей
                          </Button>
                        )}
                      </>
                    )}
                  </More>
                </Information>
                <UserInfoEditModal
                  isActive={isActive}
                  setIsActive={setIsActive}
                  setUser={setUser}
                />
              </>
            )}
          </UserInfo>
          <InfoWrapper>
            <Description>
              <FaBirthdayCake />
              <DescriptionTitle>
                День рождения:
                <DescriptionText>
                  {" "}
                  {user?.birthday ? user?.birthday : "Не указана"}
                </DescriptionText>
              </DescriptionTitle>
            </Description>
            <Description>
              <AiFillHome />
              <DescriptionTitle>
                Город:
                <DescriptionText>
                  {" "}
                  {user?.city ? user?.city : "Не указан"}
                </DescriptionText>
              </DescriptionTitle>
            </Description>
            <Description>
              <BsBriefcaseFill />
              <DescriptionTitle>
                Образование:
                <DescriptionText>
                  {" "}
                  {user?.education ? user?.education : "Не указано"}
                </DescriptionText>
              </DescriptionTitle>
            </Description>
            <Description>
              <AiOutlineHeart />
              <DescriptionTitle>
                Семейное положение:
                <DescriptionText>
                  {" "}
                  {user?.familyStatus ? user?.familyStatus : "Не указано"}
                </DescriptionText>
              </DescriptionTitle>
            </Description>
          </InfoWrapper>
          {isOwner && (
            <CreatePostWrapper>
              <Link to="/add-post" style={{ textDecoration: "none" }}>
                <PostsButtonWithIcon>
                  <IconWrapper>
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
                          fill={baseTheme.mainColor}
                        ></path>
                      </g>
                    </svg>
                  </IconWrapper>
                  <PostsButtonTitle>Написать пост</PostsButtonTitle>
                </PostsButtonWithIcon>
              </Link>
            </CreatePostWrapper>
          )}

          {
            <>
              <PostsTitle>Все посты</PostsTitle>

              <PostsWrapper>
                {status === Status.Loading ? (
                  <SmallSpinner />
                ) : (
                  items.map((post) => (
                    <Post key={post._id} {...post} isOwner={isOwner} />
                  ))
                )}
              </PostsWrapper>
            </>
          }
        </ProfileWrapper>
        <div>
          <CommentTitle>Комментарии</CommentTitle>
          <CommentWrapper>
            {isLoading ? (
              <CommentSkeletonList />
            ) : (
              <CommentsListWithLink comments={comments} user={user} />
            )}
          </CommentWrapper>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
