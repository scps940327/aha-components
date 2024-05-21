import THEME from "helpers/theme";
import { Box, Tab } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import Tabs from "components/Tabs";
import Button from "components/Button";

interface AccountRowProps {
  fullName: string;
  username: string;
  id: string;
  imgUrl: string;
  isFollowing: boolean;
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
  border: 1px solid ${THEME.colors.border};
  background-image: url("${({ url }) => url}");
  background-size: cover;
  background-position: center;
`;


const FollowSection = styled(Box)`
  ${THEME.breakpoints.down('lg')} {
    display: none;
  }
`;

const AccountRow = ({ fullName, username, id, imgUrl, isFollowing }: AccountRowProps) => (
  <Box display="flex" alignItems="center">
    <AccountImg url={imgUrl} />
    <Box marginLeft="15px" flex="1">
      <Box>{fullName}</Box>
      <Box fontSize="14px" color="rgba(255, 255, 255, 0.5)">@{username}</Box>
    </Box>
    <Button.Outlined isActive={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</Button.Outlined>
  </Box>
);

const FollowList = () => {
  const [activeTab, setActiveTab] = useState(tabKey.followers);

  const followingList: AccountRowProps[] = [
    {
      fullName: 'Full Name',
      username: 'username',
      id: 'id_1',
      imgUrl: 'https://media.vogue.com.tw/photos/658181f10048d45470db2b35/2:3/w_2560%2Cc_limit/Snapinsta.app_390957786_282620114689746_6098023988293676546_n_1024.jpg',
      isFollowing: true,
    },
    {
      fullName: 'Full Name',
      username: 'username',
      id: 'id_2',
      imgUrl: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1732',
      isFollowing: false,
    }
  ];

  const followerList: AccountRowProps[] = [
    {
      fullName: 'Full Name',
      username: 'username',
      id: 'id_1',
      imgUrl: 'https://media.vogue.com.tw/photos/658181f10048d45470db2b35/2:3/w_2560%2Cc_limit/Snapinsta.app_390957786_282620114689746_6098023988293676546_n_1024.jpg',
      isFollowing: true,
    },
    {
      fullName: 'Full Name',
      username: 'username',
      id: 'id_2',
      imgUrl: 'https://media.vogue.com.tw/photos/658181f10048d45470db2b35/2:3/w_2560%2Cc_limit/Snapinsta.app_390957786_282620114689746_6098023988293676546_n_1024.jpg',
      isFollowing: true,
    },
    {
      fullName: 'Full Name',
      username: 'username',
      id: 'id_3',
      imgUrl: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1732',
      isFollowing: true,
    }
  ];

  return (
    <Box bgcolor={THEME.colors.backgroundHeader} width="375px">
      <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Following" value={tabKey.following} />
        <Tab label="Follower" value={tabKey.followers} />
      </StyledTabs>
      {activeTab === tabKey.following && (
        <Box padding="32px 16px" overflow="scroll" display="grid" gap="20px">
          {followingList.map((item) => (
            <AccountRow key={item.id} {...item} />
          ))}
        </Box>
      )}
      {activeTab === tabKey.followers && (
        <Box padding="32px 16px" overflow="scroll" display="grid" gap="20px">
          {followerList.map((item) => (
            <AccountRow key={item.id} {...item} />
          ))}
        </Box>
      )}
    </Box>
  )
};

const WrapperWithFollowList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box display="flex">
      <Box flex="1" padding="105px 20px">
        <Box maxWidth="725px" margin="0 auto" display="grid" gap="30px">
          {children}
        </Box>
      </Box>
      <FollowSection>
        <FollowList />
      </FollowSection>
    </Box>
  )
}

export default WrapperWithFollowList;
