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
  id: string;
  onButtonClick: (param: { id: string; isFollowing: boolean }) => void;
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
  padding: 52px 20px 20px 20px;

  ${THEME.breakpoints.up('lg')} {
    padding-right: 390px;
  }
  ${THEME.breakpoints.down('md')} {
    padding: 0 20px 86px 20px;
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
  padding-top: 19px;

  ${THEME.breakpoints.down('lg')} {
    display: none;
  }
`;

const AccountRow = ({
  fullName,
  userName,
  imgUrl,
  isFollowing,
  onButtonClick,
  id,
}: AccountRowProps) => (
  <Box display="flex" alignItems="center">
    <AccountImg url={imgUrl} />
    <Box marginLeft="15px" flex="1">
      <Box>{fullName}</Box>
      <Box fontSize="14px" color="rgba(255, 255, 255, 0.5)">@{userName}</Box>
    </Box>
    {isFollowing
      ? (
        <Button.Contained onClick={() => onButtonClick({ id, isFollowing: false })}>
          Following
        </Button.Contained>
      )
      : (
        <Button.Outlined onClick={() => onButtonClick({ id, isFollowing: true })}>
          Follow
        </Button.Outlined>
      )
    }
  </Box>
);

const FollowList = () => {
  const [activeTab, setActiveTab] = useState(tabKey.followers);
  const { data, error, isLoading, refetch } = useGetFollowerListApiQuery();

  const followingList = useMemo(() =>
    (data?.data.list ?? []).filter(({ isFollowing }) => isFollowing),
    [data?.data.list],
  );

  return (
    <Box>
      <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Followers" value={tabKey.followers} />
        <Tab label="Following" value={tabKey.following} />
      </StyledTabs>
      {error ? (
        <Box textAlign="center" padding="20px">
          <Button.Normal onClick={refetch}>Refresh</Button.Normal>
        </Box>
      ) : (
        <>
          {activeTab === tabKey.followers && (
            <Box padding="32px 16px" overflow="scroll" display="grid" gap="16px">
              {isLoading && <LoadingPanel />}
              {data?.data.list.map((item) => (
                <AccountRow key={item.id} {...item} onButtonClick={refetch} />
              ))}
            </Box>
          )}
          {activeTab === tabKey.following && (
            <Box padding="32px 16px" overflow="scroll" display="grid" gap="16px">
              {isLoading && <LoadingPanel />}
              {followingList.map((item) => (
                <AccountRow key={item.id} {...item} onButtonClick={refetch} />
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
        <Box maxWidth="725px" margin="0 auto" display="grid">
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
