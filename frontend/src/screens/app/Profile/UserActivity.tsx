import React, { useState } from "react";
import { Box, Typography, styled, Tabs, Tab } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { UserContent } from "../../../interfaces";

const TabContainer = styled(Box)({
  width: "100%",
});

const ContentList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "32px",
  gap: "16px",
});

const ContentItem = styled(Box)({
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
});

const EmptyContent = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  textAlign: "center",
});

type UserActivityProps = {
  createdContent: UserContent[];
  savedContent: UserContent[];
};

type UserActivityTypes = "CREATED" | "SAVED";

export const UserActivity: React.FC<UserActivityProps> = ({
  createdContent,
  savedContent,
}) => {
  const [activeTab, setActiveTab] = useState<UserActivityTypes>("CREATED");

  const handleTabChange = (
    event: React.SyntheticEvent,
    newActiveTab: UserActivityTypes
  ) => {
    setActiveTab(newActiveTab);
  };

  return (
    <TabContainer>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab
          label="Creados"
          value="CREATED"
          icon={<AddCircleOutlineIcon />}
          iconPosition="end"
        />
        <Tab
          label="Guardados"
          value="SAVED"
          icon={<BookmarkBorderOutlinedIcon />}
          iconPosition="end"
        />
      </Tabs>

      {activeTab === "CREATED" && (
        <ContentList>
          {createdContent.length > 0 ? (
            createdContent.map((content, index) => (
              <ContentItem key={index}>
                <Typography variant="body1">{content.title}</Typography>
              </ContentItem>
            ))
          ) : (
            <EmptyContent variant="body2">
              Aún no has creado recetas
            </EmptyContent>
          )}
        </ContentList>
      )}

      {activeTab === "SAVED" && (
        <ContentList>
          {savedContent.length > 0 ? (
            savedContent.map((content, index) => (
              <ContentItem key={index}>
                <Typography variant="body1">{content.title}</Typography>
              </ContentItem>
            ))
          ) : (
            <EmptyContent variant="body2">
              Aún no tienes recetas guardadas
            </EmptyContent>
          )}
        </ContentList>
      )}
    </TabContainer>
  );
};
