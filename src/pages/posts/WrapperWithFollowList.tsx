import THEME from "helpers/theme";
import { Box, Tab } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import styled from "styled-components";
import Tabs from "components/Tabs";
import Button from "components/Button";
import { useGetFollowerListApiQuery } from "services/getFollowers";
import LoadingPanel from "components/LoadingPanel";

interface AccountRowProps {
  fullName: string;
  userName: string;
  imgUrl: string;
  isFollowing?: boolean;
}

const tabKey = {
  followers: 'followers',
  following: 'following',
}

const StyledTabs = styled(Tabs)`
  .MuiTab-root {
    flex: 1;
  }
`;

const AccountImg = styled.div<{ url?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${THEME.colors.BORDER};
  background-image: url("${({ url }) => url}");
  background-size: cover;
  background-position: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 105px 20px 390px 20px;

  ${THEME.breakpoints.down('md')} {
    padding: 20px 20px 86px 20px;
  }
`;

const FollowSection = styled(Box)`
  position: fixed;
  right: 0;
  top: 0;
  width: 375px;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: ${THEME.colors.BG_LIGHT};

  ${THEME.breakpoints.down('lg')} {
    display: none;
  }
`;

const AccountRow = ({ fullName, userName, imgUrl, isFollowing }: AccountRowProps) => (
  <Box display="flex" alignItems="center">
    <AccountImg url={imgUrl} />
    <Box marginLeft="15px" flex="1">
      <Box>{fullName}</Box>
      <Box fontSize="14px" color="rgba(255, 255, 255, 0.5)">@{userName}</Box>
    </Box>
    <Button.Outlined isActive={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</Button.Outlined>
  </Box>
);

const FollowList = () => {
  const [activeTab, setActiveTab] = useState(tabKey.following);
  const { data, error, isLoading, refetch } = useGetFollowerListApiQuery();

  const followerList = useMemo(() => (data?.data.list ?? []).filter(({ isFollowing }) => isFollowing), [data?.data.list]);

  return (
    <Box>
      <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Following" value={tabKey.following} />
        <Tab label="Follower" value={tabKey.followers} />
      </StyledTabs>
      {error ? (
        <Button.Normal onClick={refetch}>Refresh</Button.Normal>
      ) : (
        <>
          {activeTab === tabKey.following && (
            <Box padding="32px 16px" overflow="scroll" display="grid" gap="20px">
              {isLoading && <LoadingPanel />}
              {data?.data.list.map((item) => (
                <AccountRow key={item.id} {...item} />
              ))}
            </Box>
          )}
          {activeTab === tabKey.followers && (
            <Box padding="32px 16px" overflow="scroll" display="grid" gap="20px">
              {isLoading && <LoadingPanel />}
              {followerList.map((item) => (
                <AccountRow key={item.id} {...item} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
};

const WrapperWithFollowList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box display="flex">
      <ContentWrapper>
        <Box maxWidth="725px" margin="0 auto" display="grid" gap="30px">
          {children}
        </Box>
      </ContentWrapper>
      <FollowSection>
        <FollowList />
      </FollowSection>
    </Box>
  )
}

export default WrapperWithFollowList;
