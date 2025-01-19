
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import theme from '../../css/theme';

import GetDFA from "../../modules/DFA/AllDfaData";

import NavBar from '../../components/homePage/NavBar'
import DfaArticles from "../../components/DFAPage/DfaArticles";

import Points_Table from '../../components/homePage/Points_Table';
import FixturesData from '../../components/homePage/Fixtures';

import FeaturedPlayer from '../../components/homePage/FeaturedPlayer';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';






const DfaPageLargeScreens = () => {

  GetDFA()

  let players = useSelector((state) => state.DfaPlayers)


  const getVideoDimensions = () => {
    const windowWidth = window.innerWidth;


    // Adjust these values based on your layout and design preferences
    if (windowWidth < 900 ) {
      return {window_width: window.innerWidth}
    } 
    else {

      return {window_width: window.innerWidth}
    }
    
  };

  const { window_width } = getVideoDimensions(); 

  


  
  
  return (

    <Box paddingTop={10} >
      
      <NavBar />


      <Box 
      width={{ sm: 800, md: 1200}} 
      margin='auto' 
      >

        {/* <Box sx={{display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center'}}>
          
          <Typography style={{ color: `var(--color-color2, ${theme.colors.color2})`}} marginTop={{xs: 2}} marginBottom={{xs: 2}} variant="h5" sx={{ textAlign: 'center', fontWeight: 900}}>Dominica Football Association</Typography>

          <Box width={{xs: 100}} height={{xs: 100}}>

            <img src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" width='100%' />

          </Box>


        </Box> */}

        {/* <MainNews /> */}


        {/* Creating the side bar */}

        <Stack 
        direction={{xs: 'column', sm:'row'}} 
        spacing={2} 
        margin={{xs:'auto'}} 
        divider={<Divider orientation='horizontal' flexItem />} 
        
        >
          
          {/* Side Bar- Leftside */}
          <Box >
            
            <Stack 
              width={{ sm:'350px'}} 
              display={{xs:'none', sm:'inherit'}} 
              height={1000}     
            >

              <Points_Table page='DfaHomepage'/>

              <Box marginY={2}/>

              <FixturesData page='Dfahome' type="now" league='DFA'/>

              <Box marginY={2}/>

              <FeaturedPlayer players={players} />

              <Box marginY={2}/>

              <FeaturedPlayer players={players} />

              <Box  marginY={2} display={{ sm: 'none', lg: 'inherit'}}>
                <FeaturedPlayer players={players} />
              </Box>

              <Box  marginY={2} display={{ sm: 'none', lg: 'inherit'}}>
                <FeaturedPlayer players={players} />
              </Box>

              <Box  marginY={2} display={{ sm: 'none', lg: 'inherit'}}>
                <FeaturedPlayer players={players} />
              </Box>

              

                    
            </Stack>

          </Box>
          

          {/* Articles - Right Side */}
          <Stack 
           width='auto'
           padding={2}
           >
            
            <DfaArticles level='first' />
            <DfaArticles level='second' />
            <DfaArticles level='third' />
            <DfaArticles level='fourth' />
            <DfaArticles level='fifth' />

          </Stack>




        </Stack>






        {/* End of side bar */}


        

        <Divider sx={{ marginTop: 2}} />

        {/* <DfaArticles level='second' /> */}

        

        
        
        {/* <Box 
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

        {/* <DfaArticles level='second' /> 

        <Box marginY={1.5} />
        

        
        <DfaArticles level='second' />
        
        <Box marginY={1.5} />
        

        <DfaArticles level='third' />
        

        
        <Box height={{xs:50}} marginY={1} />
         */}


      </Box>

    </Box>
  )
}

export default DfaPageLargeScreens