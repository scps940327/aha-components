import { Box } from "@mui/material";
import React from "react";
import Page from "components/Page";
import SectionTitle from "components/SectionTitle";
import WrapperWithFollowList from "./WrapperWithFollowList";
import styled from "styled-components";
import Button from "components/Button";
import THEME from "helpers/theme";

interface PostItem {
  title: string;
  author: string;
  imgUrl: string;
  id: string;
}

const PostImage = styled.div<{ imgUrl: string }>`
  background-image: url('${({ imgUrl }) => imgUrl}');
  background-size: cover;
  background-position: center;
  padding-bottom: 66.667%;
`;

const MoreButton = styled(Button.Normal)`
  width: 343px;

  ${THEME.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const ListPage = () => {
  const lists: PostItem[] = [
    {
      title: 'Full Name',
      author: 'username',
      id: 'id_1',
      imgUrl: 'https://media.vogue.com.tw/photos/658181f10048d45470db2b35/2:3/w_2560%2Cc_limit/Snapinsta.app_390957786_282620114689746_6098023988293676546_n_1024.jpg',
    },
    {
      title: 'Full Name',
      author: 'username',
      id: 'id_2',
      imgUrl: 'https://media.vogue.com.tw/photos/658181f10048d45470db2b35/2:3/w_2560%2Cc_limit/Snapinsta.app_390957786_282620114689746_6098023988293676546_n_1024.jpg',
    },
    {
      title: 'Full Name',
      author: 'username',
      id: 'id_3',
      imgUrl: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1732',
    }
  ];

  return (
    <Page>
      <WrapperWithFollowList>
        <SectionTitle backTo="/" title="Results" />
        <Box display="grid" gap="34px" gridTemplateColumns="1fr 1fr 1fr">
          {lists.map(({ title, author, id, imgUrl }) => (
            <Box key={id}>
              <PostImage imgUrl={imgUrl} />
              <Box fontSize="15px" marginTop="12px">{title}</Box>
              <Box color="#b2b2b2" fontSize="11.17px">{author}</Box>
            </Box>
          ))}
        </Box>
        <MoreButton>MORE</MoreButton>
      </WrapperWithFollowList>
    </Page>
  )
};

export default ListPage;
