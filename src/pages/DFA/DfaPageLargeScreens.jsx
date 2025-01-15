import {  Box, Typography, Stack, Button, Card, CardHeader, CardContent, CardMedia, CardActions, Grid, Skeleton, Divider, Menu, MenuItem, Paper, FormControl, Select, InputLabel } from '@mui/material'

import theme from '../../css/theme';

import GetDFA from "../../modules/DFA/AllDfaData";

import NavBar from '../../components/homePage/NavBar'
import DfaArticles from "../../components/DFAPage/DfaArticles";
import Video from "../../components/Video";

import FeaturedPlayer from '../../components/homePage/FeaturedPlayer';





const DfaPageLargeScreens = () => {

  // GetDFA()


  
  
  return (

    <Box>
      <NavBar />


      <Box width={{ sm: 800, md: 1200}} margin='auto'>

        <Box sx={{display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center'}}>
          
          <Typography style={{ color: `var(--color-color2, ${theme.colors.color2})`}} marginTop={{xs: 2}} marginBottom={{xs: 2}} variant="h5" sx={{ textAlign: 'center', fontWeight: 900}}>Dominica Football Association</Typography>

          <Box width={{xs: 100}} height={{xs: 100}}>

            <img src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" width='100%' />

          </Box>


        </Box>

        {/* <MainNews /> */}
        <Box marginTop={2} />
        <DfaArticles level='first' />

        <Divider sx={{ marginTop: 2}} />
        
        <Box 
        style={{ backgroundColor: `var(--color-color3, ${theme.colors.color3})`}} paddingBottom={3} 
        marginTop={2} 
        textAlign='center'
        >

          <Typography variant="h5" style={{ textDecoration: 'underline', color: 'white'}}>
            Weekend Highlights
          </Typography>

          <Video VideoLocation='Dfa1'/>

        </Box>
        <Divider sx={{ marginTop: 2}} />

        <Box marginY={1.5} />
        {/* <Points_Table page='Homepage'/> */}
        <DfaArticles level='second' />
        <Box marginY={1.5} />
        {/* <FixturesData /> */}
        <DfaArticles level='third' />
        {/* <Video VideoLocation='Dfa2'/> */}
        <Box height={{xs:50}} marginY={1} />
        {/* <BottomNav /> */}

        </Box>

    </Box>
  )
}

export default DfaPageLargeScreens