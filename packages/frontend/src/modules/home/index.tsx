import { Box, Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { IsLoggedInContext } from '../common/components/isloggedin-context';

const HomePageContainer = () => {
  const { isLoggedIn, notLoggedIn } = useContext(IsLoggedInContext);
  return (
    <Box
      bgcolor="primary.main"
      padding={'15px'}
      color="white"
      borderRadius="10px"
      mt="20px"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="h4" component="h1">
        APP TODOS
      </Typography>
      {!isLoggedIn && (
        <Box
          border={'1px solid'}
          padding={'5px'}
          borderRadius="5px"
          width={'80px'}
          textAlign={'center'}
          mt={'50px'}
        >
          <Link to={APP_KEYS.ROUTER_KEYS.REGISTER}>Sign Up</Link>
        </Box>
      )}
      <Box
        border={'1px solid'}
        padding={'5px'}
        borderRadius="5px"
        display={'block'}
        width={'80px'}
        textAlign={'center'}
        mb={'20px'}
        mt={'20px'}
      >
        <Link to={APP_KEYS.ROUTER_KEYS.LOGIN}>Login</Link>
      </Box>
      <Box
        border={'1px solid tomato'}
        padding={'5px'}
        borderRadius="5px"
        display={'block'}
        width={'150px'}
        textAlign={'center'}
        mb={'20px'}
      >
        <Link to={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD}>Change password</Link>
      </Box>
      <Box
        padding={'5px'}
        display={'inline-block'}
        borderBottom={'1px solid tomato'}
        color={'tomato'}
        width={'150px'}
        textAlign={'center'}
        mb={'20px'}
      >
        <Link to={APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD}>Forget Password?</Link>
      </Box>
    </Box>
  );
};

export default HomePageContainer;
