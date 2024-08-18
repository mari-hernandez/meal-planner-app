import { Box, styled, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { User, UserContent } from "../../../interfaces";
import { BottomNavBar, NavBarRoutes } from "../../../components";
import { PrimaryButton } from "../../../styles";
import { UserActivity } from "./UserActivity";
import { userFullNameToAvatarProps } from "./utils";

const mockUser: User = {
  firtsName: "María Antonia",
  lastName: "Hernández Ramírez",
  username: "maaaaari.hr",
};

const ProfileContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px",
  gap: "8px",
});

const StyledAvatar = styled(Avatar)({
  width: "64px",
  height: "64px",
});

const UserFullName = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
});

const UserName = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
});

export const Profile: React.FC = () => {
  // TODO: Get user from context
  const user = mockUser;
  const createdContent: UserContent[] = [];
  const savedContent: UserContent[] = [];
  return (
    <>
      <ProfileContainer>
        <StyledAvatar
          {...userFullNameToAvatarProps({
            firstName: user.firtsName,
            lastName: user.lastName,
          })}
        />
        <UserFullName>
          {user.firtsName} {user.lastName}
        </UserFullName>
        <UserName>{user.username}</UserName>
        <PrimaryButton>Editar perfil</PrimaryButton>
        <UserActivity
          createdContent={createdContent}
          savedContent={savedContent}
        />
      </ProfileContainer>
      <BottomNavBar activeRoute={NavBarRoutes.PROFILE} />
    </>
  );
};
