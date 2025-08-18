import NavBar from "../../components/homePage/NavBar"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react"


import '../../css/DfaMainPage.css'

import { Link } from "react-router-dom";

import theme from "../../css/theme";


import qs from 'qs'
import axios from "axios";

import { queryParams_dfa_teams } from "../../modules/DFA/QueryParams";
import AllTeamsDataStructure from "../../components/DFAPage/AllTeamsPage/AllTeamsDataStructure";


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Redux
import { useSelector } from 'react-redux';
import {  Box, Typography, Stack, Button, Card, CardHeader, CardContent, CardMedia, CardActions, Grid, Skeleton, Divider, Menu, MenuItem, Paper, FormControl, Select, InputLabel, Tab  } from '@mui/material'

import { TabContext, TabList, TabPanel } from "@mui/lab";


import GetDFA from "../../modules/DFA/AllDfaData";

import DfaArticles from "../../components/DFAPage/DfaArticles";
import Points_Table from "../../components/homePage/Points_Table";


import FixturesData from "../../components/homePage/Fixtures"

import playStatCleanUp from '../../modules/DFA/PlayerStats/PlayerStatsCleanUp'
import TeamGoalsStructure from '../../modules/DFA/PlayerStats/MostTeamGoals'

// Icons

import NewspaperIcon from '@mui/icons-material/Newspaper'; //Articles
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; //Fixtures
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'; //Tables
import AssessmentIcon from '@mui/icons-material/Assessment'; //Stats
import GroupsIcon from '@mui/icons-material/Groups'; //Players
import HeadlineFeature from "../../components/DFAPage/Headline/HeadlineFeature";



// TODO: For fixtures, filter out ucoming fixtures


const DFA = () => {

  // GetDFA()

  let players = useSelector((state) => state.DfaPlayers)
  let player_stats = useSelector((state) => state.DfaPlayerStats)


  // Clubs Display

  const [anchorEl_Clubs, setAnchorEl_Clubs] = useState(null);
  const [selectedChoice_Clubs, setSelectedChoice_Clubs] = useState('DFA_Premier_League_Men');

  const handleClick_Clubs = (event) => {
    setAnchorEl_Clubs(event.currentTarget);
  };

  const handleClose_Clubs = () => {
    setAnchorEl_Clubs(null);
  };

  const handleMenuItemClick_Clubs = (choice) => {
    setSelectedChoice_Clubs(choice);
    handleClose_Clubs();
  };




  // End of Clubs Display


  



  let team_most_goals = player_stats && player_stats.length > 0 ? TeamGoalsStructure(player_stats[0]): []

  player_stats = player_stats && player_stats.length > 0 ? playStatCleanUp(player_stats[0]): [];


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate()  
  const [page, setPage] = useState('home')
  const [team, setTeam] = useState('CCCUL Dublanc FC');
  const [teamDivOne, setTeamDivOne] = useState('All Saints FC');

  const [type, setType] = useState('now')
  
  const handleChange = (event) => {

    setTeam(event.target.value);
  };

  const handleChangeDivOne = (event) => {

    setTeamDivOne(event.target.value);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState('Men');


  const handleClick = (event) => {

    // setPage('home')
    setAnchorEl(event.currentTarget); 

  };

  const handleMenuItemClick = (choice) => {
    setSelectedChoice(choice);
    setAnchorEl(null);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewsClick = () => {

    switch(selectedChoice){

      case 'Men':
        setPage('home');
        break;
      
      case 'Women':
        setPage('home')
        break;
      
      case 'Div 1':
        setPage('home')
        break;
      
    }
  }

  const handleFixturesClick = () => {

    switch(selectedChoice){

      case 'Men':
        setPage('fixtures_men');
        break;
      
      case 'Women':
        setPage('fixtures_women')
        break;
      
      case 'Div 1':
        setPage('fixtures_div_1')
        break;
      
    }
  }

  const handleTableClick = () => {

    switch(selectedChoice){

      case 'Men':
        setPage('tables_men');
        break;
      
      case 'Women':
        setPage('tables_women')
        break;
      
      case 'Div 1':
        setPage('tables_div_1')
      
    }
  }

  const handleStatsClick = () => {


    switch(selectedChoice){

      case 'Men':
        setPage('stats_men');
        break;
      
      case 'Women':
        setPage('stats_women')
        break;
      
      case 'Div 1':
        setPage('stats_div_1')
        break;
      
    }
  }
  const handlePlayersClick = () => {


    switch(selectedChoice){

      case 'Men':
        setPage('players_men');
        break;
      
      case 'Women':
        setPage('players_women')
        break;
      
      case 'Div 1':
        setPage('players_div_1')
        break;
      
    }
  }

  // Functions for tabs
  
  const [valueFixtures, setValueFixtures] = useState('1');

  const handleChangeTabsPrem = (event, newValue) => {
    setValueFixtures(newValue);
  };


  //
  const [valueDiv, setValueDiv] = useState('1');

  const handleChangeTabsDiv = (event, newValue) => {
    setValueDiv(newValue);
  };

  // 
  const [valueStats, setValueStats] = useState('1');

  const handleChangeTabsStats = (event, newValue) => {
    setValueStats(newValue);
  };
  
  // 
  const [valuePlayers, setValuePlayers] = useState('1');

  const handleChangeTabsPlayers = (event, newValue) => {
    setValuePlayers(newValue);


    switch (newValue) {
      case '1':
        setSelectedChoice_Clubs('DFA_Premier_League_Men');      
        break;

      case '2':
        setSelectedChoice_Clubs("DFA_Division_One");
        break;
      
      case '3':
        setSelectedChoice_Clubs("DFA_Women");
        break;
    
      default:
        break;
    }

    
  };


  const [value, setValue] = useState(1);

  const handleChangeTableFixtures = (event, newValue) => {
    setValue(newValue);
  };



  // Identifying window width
  const getVideoDimensions = () => {
    const windowWidth = window.innerWidth;

    // Adjust these values based on your layout and design preferences
    if (windowWidth >= 500) {
      return {window_width: 500}
    } else if (windowWidth >= 420) {
      return {window_width: 420}
    }else if (windowWidth >= 400) {
      return {window_width: 400}
    }else if (windowWidth >= 390) {
      return {window_width: 390}
    }else if (windowWidth >= 350) {
      return {window_width: 350}
    }
    else if (windowWidth >= 300) {
      return {window_width: 300}
    } 
    else {
      return {window_width: 280}
    }
    
  };

  const { window_width } = getVideoDimensions();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const queryString = qs.stringify(queryParams_dfa_teams);

        // Your API endpoint URL
        const apiUrl = `https://strapi-dominica-sport.onrender.com/api/dfa-teams?${queryString}`;


        // Make the fetch request
        const response = await axios.get(apiUrl);


        // Check if the request was successful (status code 2xx)
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON data
        const result = await response.data.data;
        let final_data = AllTeamsDataStructure(result)

        // Set the data state
        setData(final_data);
      } catch (error) {
        // Set the error state if there's an issue
        setError(error.message);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);





  
  if(page == 'home'){

    return (
      <>

      {/* <GetDFA /> */}
  
      <NavBar />

      {/* <Box sx={{display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center'}}>
        <Typography style={{ color: `var(--color-color2, ${theme.colors.color2})`}} marginTop={{xs: 2}} marginBottom={{xs: 2}} variant="h5" sx={{ textAlign: 'center', fontWeight: 900}}>Dominica Football Association</Typography>

        <Box width={{xs: 100}} height={{xs: 100}}>

          <img src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" width='100%' />

        </Box>


      </Box> */}

      

      {/* <HeadlineFeature /> */}
      
      <Box marginTop={{ sm: 7}} height='100%'>

        <TabContext value={value}>

          <TabList onChange={handleChangeTableFixtures} aria-label="tabs example" centered >
                    <Tab label='Table' value={1}  />
                    <Tab label='Fixtures' value={2}  />
          </TabList>


          <TabPanel  value={1}>

            <Points_Table page='Homepage'/>

          </TabPanel>

          <TabPanel  value={2}>

            <FixturesData page='home' type="now" league='DFA' />
            
          </TabPanel>

        </TabContext>

      </Box>

      {/* This is the extra space below the navbar */}
      {/* <Box paddingTop={4} /> */} 
      <DfaArticles level='first' size='small' />

      {/* <Divider sx={{ marginTop: 2}} /> */}


      <Divider sx={{ marginTop: 2, display: {xs: 'none'}}} />
      
      {/* <Box style={{ backgroundColor: `var(--color-color3, ${theme.colors.color3})`}} paddingBottom={3} marginTop={2} textAlign='center' sx={{ display: {xs: 'none'}}}>
        <Typography variant="h5" style={{ textDecoration: 'underline', color: 'white'}}>Weekend Highlights</Typography>
        
        <Video VideoLocation='Dfa1'/>


      </Box> */}

      {/* <Divider sx={{ marginTop: 2}} /> */}

      <Box marginY={1.5} />
      {/* <Points_Table page='Homepage'/> */}
      <DfaArticles level='second' />
      <Box marginY={1.5} />
      {/* <FixturesData /> */}
      <DfaArticles level='third' />

      {/* Removed video compnents till further notice */}

      {/* <Box display={{ xs: 'none'}}>
        <Video VideoLocation='Dfa2'/>

      </Box> */}


      <Box height={{xs:50}} marginY={1} />
      {/* <BottomNav /> */}
  
      <Paper style={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}} sx={{ width: '100%', height: '50px', position: 'fixed', bottom: 0, display: {xs: 'flex', sm: 'none'}, justifyContent: 'center'}}>
  
        <Stack justifyContent='center' alignItems='center' direction='row' spacing={window_width < 290? 1.8:window_width == 300? 2.5 : window_width == 350? 4: window_width == 390? 3.5: window_width == 400? 4.5: window_width == 420? 4.5: window_width == 500? 5: 2.5}>

  

          <Box>
            <Button onClick={() => handleNewsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<NewspaperIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>
  
          <Box>
            <Button 
            onClick={() => handleFixturesClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} 
            startIcon={<CalendarMonthIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          
  
          <Box>
            <Button onClick={() => handleTableClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<FormatListNumberedIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleStatsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<AssessmentIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          <Box>
            <Button onClick={() => handlePlayersClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<GroupsIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
  
        </Stack>
  
      </Paper>
      
      </>
    )

  }
  else if(selectedChoice == 'Men' && page == 'fixtures_men'){

    return (
      <>
  
      <NavBar />

      <Box paddingTop={2} />

      <Box>

        <TabContext value={valueFixtures}>

          <TabList onChange={handleChangeTabsPrem} aria-label="tabs example" centered>

            <Tab label='Premier' value='1' />
            <Tab label='First Division' value='2' />
            <Tab label='Women' value='3' />

          </TabList>

          <TabPanel value="1">

            <FixturesData page='dfa' type={type} league="DFA_Premier_League_Men"/>

          </TabPanel>

          <TabPanel value="2">

            <FixturesData page='div_1' type={type} league="DFA_Division_One"/>
            
          </TabPanel>

          <TabPanel value="3">

            <FixturesData page='dfa' type={type} league="DFA_Women"/>

          </TabPanel>

        </TabContext>
      </Box>     

      
      <Stack justifyContent='center' direction='row' marginTop={3} >

        {type != 'now' ? <Button variant="outlined" onClick={() => setType('now')} size="small">
          Upcoming Fixtures
        </Button>: ''}

        {type != 'past' ? <Button variant="outlined" onClick={() => setType('past')} size="small">
          Past Results
        </Button>: ''}
      </Stack>

      <Box marginTop={8} />
     
  
      <Paper style={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}} sx={{ width: '100%', height: '50px', position: 'fixed', bottom: 0, display: {xs: 'flex', sm: 'none'}, justifyContent: 'center'}}>
  
      <Stack justifyContent='center' alignItems='center' direction='row' spacing={window_width < 290? 1.8:window_width == 300? 2.5 : window_width == 350? 4: window_width == 390? 3.5: window_width == 400? 4.5: window_width == 420? 4.5: window_width == 500? 5: 2.5}>

  
          {/* <Box >
            <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            endIcon={<KeyboardArrowUpIcon style={{ color: 'white'}} />}
            style={{fontWeight: 900, textTransform: 'capitalize', color: `var(--color-color3, ${theme.colors.color3})`, padding: '0px'}}
            size='small'
            sx={{ fontSize: {xs: '13px', sm: '15px'}}}>
              {selectedChoice}
            </Button>
  
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top', // Position of the anchor element
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom', // Position of the menu
                horizontal: 'left',
              }}
            >
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Men')}>Men</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Women')}>Women</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Div 1')}>Division 1</MenuItem>
            </Menu>
          </Box> */}

          <Box>
            <Button onClick={() => handleNewsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<NewspaperIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>
  
          <Box>
            <Button onClick={() => handleFixturesClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<CalendarMonthIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          
  
          <Box>
            <Button onClick={() => handleTableClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<FormatListNumberedIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleStatsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<AssessmentIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          <Box>
            <Button onClick={() => handlePlayersClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<GroupsIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
  
        </Stack>
  
      </Paper>
      
      </>
    )

  }
  else if(selectedChoice == 'Men' && page == 'tables_men'){

    return (
      <>
  
      <NavBar />

      <Box >

        <TabContext value={valueDiv}>

          <TabList onChange={handleChangeTabsDiv} aria-label="tabs example" centered>

            <Tab label='Premier' value='1' />
            <Tab label='First Division' value='2' />
            <Tab label='Women' value='3' />

          </TabList>

          <TabPanel value="1">

            <Points_Table page='dfa' />

          </TabPanel>

          <TabPanel value="2">

            <Points_Table page='div_1' />
            
          </TabPanel>

          <TabPanel value="3">

          </TabPanel>

        </TabContext>
      </Box>

     
      
  
      <Paper style={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}} sx={{ width: '100%', height: '50px', position: 'fixed', bottom: 0, display: {xs: 'flex', sm: 'none'}, justifyContent: 'center'}}>
  
      <Stack justifyContent='center' alignItems='center' direction='row' spacing={window_width < 290? 1.8:window_width == 300? 2.5 : window_width == 350? 4: window_width == 390? 3.5: window_width == 400? 4.5: window_width == 420? 4.5: window_width == 500? 5: 2.5}>

  
          {/* <Box >
            <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            // onClick={handleClick}
            endIcon={<KeyboardArrowUpIcon style={{ color: 'white'}} />}
            style={{fontWeight: 900, textTransform: 'capitalize', color: `var(--color-color3, ${theme.colors.color3})`, padding: '0px'}}
            size='small'
            sx={{ fontSize: {xs: '13px', sm: '15px'}}}>
              {selectedChoice}
            </Button>
  
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top', // Position of the anchor element
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom', // Position of the menu
                horizontal: 'left',
              }}
            >
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Men')}>Men</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Women')}>Women</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Div 1')}>Division 1</MenuItem>
            </Menu>
          </Box> */}

          <Box>
            <Button onClick={() => handleNewsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<NewspaperIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>
  
          <Box>
            <Button onClick={() => handleFixturesClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<CalendarMonthIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          
  
          <Box>
            <Button onClick={() => handleTableClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<FormatListNumberedIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleStatsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<AssessmentIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          <Box>
            <Button onClick={() => handlePlayersClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<GroupsIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
  
        </Stack>
  
      </Paper>
      
      </>
    )

  }
  else if(selectedChoice == 'Men' && page == 'stats_men'){

    return (
      <>
  
      <NavBar />

      <Box >

        <TabContext value={valueStats}>

          <TabList onChange={handleChangeTabsStats} aria-label="tabs example" centered>

            <Tab label='Premier' value='1' />
            <Tab label='First Division' value='2' />
            <Tab label='Women' value='3' />

          </TabList>

          <TabPanel value="1" >

            {player_stats && player_stats.length > 0 ? 

              (<Box paddingTop={3} >

                {/* <Stack spacing={1} justifyContent='center' direction='row' paddingTop={2}>

                
                    <Paper sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: '100%'}} >

                      <Link to='/DFA/Home/PlayerGoals' style={{ textDecoration: 'none'}}>

                        <Card >
                          
                          <CardMedia
                          component="img"
                          image={player_stats[0].top_scorer_prem_url} 
                          sx={{ width:  window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145 }}
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography sx={{ fontWeight: 'bold'}}>
                              Goals
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {player_stats[0].top_scorer_prem_goals}
                            </Typography>

                          </CardContent>

                        </Card>

                      </Link>
                    
                    </Paper>


                    <Paper sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: '100%'}}>

                      <Link to='/DFA/Home/PlayerAssists' style={{ textDecoration: 'none'}}>
                        <Card>
                          
                          <CardMedia
                          component="img"
                          image={player_stats[0].top_assist_prem_url} 
                          sx={{ width:  window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145 }}
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography sx={{ fontWeight: 'bold'}}>
                              Assists
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {player_stats[0].top_assist_prem_assist}
                            </Typography>

                          </CardContent>

                        </Card>
                      
                      </Link>


                    </Paper>
                    
                </Stack> */}

                <Stack spacing={1} justifyContent='center' direction='row' paddingTop={2}>                              

                  <Card sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: 250}}>
                    
                    <Link to='/DFA/Home/PlayerGoals' style={{ textDecoration: 'none'}}>

                      <CardMedia
                      component="img"
                      image={player_stats[0].top_scorer_prem_url} 
                      sx={{ width:  '100%', objectFit: 'cover', objectPosition: "50% 50%", height: {xs: 170} }}
                      loading="lazy"
                      />

                      <CardContent style={{ textAlign: 'center'}}>

                        <Typography sx={{ fontWeight: 'bold'}}>
                          Goals
                        </Typography>

                        <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                          {player_stats[0].top_scorer_prem_goals}
                        </Typography>

                      </CardContent>

                    </Link>
                  </Card>

                  <Card sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: 250}}>
                    
                    <Link to='/DFA/Home/PlayerAssists' style={{ textDecoration: 'none'}}>
                    
                      <CardMedia
                      component="img"
                      image={player_stats[0].top_assist_prem_url} 
                      sx={{ width:  '100%', objectFit: 'cover', objectPosition: "50% 50%", height: {xs: 170} }}
                      loading="lazy"
                      />

                      <CardContent style={{ textAlign: 'center'}}>

                        <Typography sx={{ fontWeight: 'bold'}}>
                          Assists
                        </Typography>

                        <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                          {player_stats[0].top_assist_prem_assist}
                        </Typography>

                      </CardContent>

                    </Link>
                  </Card>

                </Stack>

                <Stack spacing={1} justifyContent='center' direction='row' marginTop={2} paddingBottom={1}>

                      
                      <Card sx={{ marginTop: {xs: 10}, width: {xs: 200}, height: 250}}>
                        
                        <Link to='/DFA/Home/TeamGoals' style={{ textDecoration: 'none'}}>
                          
                          <CardMedia
                          component="img"
                          image={player_stats[0].top_scorer_prem_url} 
                          sx={{ width:  '100%', objectFit: 'cover', objectPosition: "50% 50%", height: {xs: 170} }}
                          loading="lazy"
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography sx={{ fontWeight: 'bold'}}>
                              Team Goals
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {team_most_goals[0].totalGoals}
                            </Typography>

                          </CardContent>

                        </Link>
                      </Card>
                  
                      <Card sx={{ marginTop: {xs: 10}, width: {xs: 200}, height: 250}}>

                        <Link to='/DFA/Home/TeamCleanSheets' style={{ textDecoration: 'none'}}>

                          <CardMedia
                          component="img"
                          image={player_stats[0].top_clean_sheet_prem_url} 
                          sx={{ width:  '100%', objectFit: 'cover', objectPosition: "50% 50%", height: {xs: 170} }}
                          loading="lazy"
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography fontSize={{ xs: 15}} sx={{ fontWeight: 'bold'}}>
                              Clean Sheets
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {player_stats[0].top_clean_sheet_prem_clean_sheets}
                            </Typography>

                          </CardContent>

                        </Link>
                      </Card>

                </Stack>

                <Stack marginTop={4} marginX={2} >

                  <Stack justifyContent='center' direction='row'>

                    <Link to='/DFA/Stats' style={{ textDecoration: 'none', color: 'white', paddingBottom: '20px'}}>
                      <Typography variant="h6" sx={{ border: '1px solid green', padding: 1, backgroundColor: 'blue'}}>Season Stats</Typography>
                    </Link>

                    {/* <ArrowRightAltIcon /> */}

                  </Stack>
                </Stack>
                
                </Box>)

                :player_stats.length == 0 ? 
                (<Box display='flex' justifyContent='center' alignItems='center' height={{ xs: 400}}>
                  <Typography variant="h4" textAlign='center'>
                    Soon to be Populated with both stats on players and team as the league progresses.
                  </Typography>
                </Box>) 
                :<Skeleton width={300} height={300} sx={{ margin: 'auto'}}/>
            }

          </TabPanel>

          <TabPanel value="2" >

          {/* <Box textAlign='center' marginTop={10} >

            <Typography variant="h4">
              First division coverage will continue next season, as data collection for the league is inconsistent.  
            </Typography>

          </Box> */}

            {player_stats && player_stats.length > 0 ? 

              (<Box paddingTop={3} >

                <Stack spacing={1} justifyContent='center' direction='row' paddingTop={2}>

                
                    <Paper sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: '100%'}} >

                      <Link to='/DFA/Home/DivisionOnePlayerGoals' style={{ textDecoration: 'none'}}>

                        <Card >
                          
                          <CardMedia
                          component="img"
                          image={player_stats[0].top_scorer_div_1_url} 
                          sx={{ width:  window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145 }}
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography sx={{ fontWeight: 'bold'}}>
                              Goals
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {player_stats[0].top_scorer_div_1_goals}
                            </Typography>

                          </CardContent>

                        </Card>

                      </Link>
                    
                    </Paper>


                    <Paper sx={{ marginTop: {xs: 10}, width: window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145, height: '100%'}}>

                      <Link to='/DFA/Home/DivisionOnePlayerAssists' style={{ textDecoration: 'none'}}>
                        <Card>
                          
                          <CardMedia
                          component="img"
                          image={player_stats[0].top_Assister_div_1_url} 
                          sx={{ width:  window_width<290?130:window_width==300?145:window_width==350?168:window_width==390?182:window_width==400?192:window_width==420?200:window_width==500?240:145 }}
                          />

                          <CardContent style={{ textAlign: 'center'}}>

                            <Typography sx={{ fontWeight: 'bold'}}>
                              Assists
                            </Typography>

                            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
                              {player_stats[0].top_Assister_div_1_assist}
                            </Typography>

                          </CardContent>

                        </Card>
                      
                      </Link>


                    </Paper>
                    
                </Stack>

                

                <Stack marginTop={4} marginX={2} >

                  <Stack justifyContent='center' direction='row'>

                    <Link to='/DFA/DivisionOneStats' style={{ textDecoration: 'none', color: 'white', paddingBottom: '20px'}}>
                      <Typography variant="h6" sx={{ border: '1px solid green', padding: 1, backgroundColor: 'blue'}}>Season Stats</Typography>
                    </Link>

                  </Stack>
                </Stack>
                
                </Box>) 
                :player_stats.length == 0 ? 
                (<Box display='flex' justifyContent='center' alignItems='center' height={{ xs: 400}}>
                  <Typography variant="h4" textAlign='center'>
                    Soon to be Populated with both stats on players and team as the league progresses.
                  </Typography>
                </Box>) 
                :<Skeleton width={300} height={300} sx={{ margin: 'auto'}}/>
            } 

          </TabPanel>

          <TabPanel value="3">

          </TabPanel>

        </TabContext>
      </Box>  
       

        <Box marginTop={8} />


            
  
      <Paper style={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}} sx={{ width: '100%', height: '50px', position: 'fixed', bottom: 0, display: {xs: 'flex', sm: 'none'}, justifyContent: 'center'}}>

      <Stack justifyContent='center' alignItems='center' direction='row' spacing={window_width < 290? 1.8:window_width == 300? 2.5 : window_width == 350? 4: window_width == 390? 3.5: window_width == 400? 4.5: window_width == 420? 4.5: window_width == 500? 5: 2.5}>


          {/* <Box >
            <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            endIcon={<KeyboardArrowUpIcon style={{ color: 'white'}} />}
            style={{fontWeight: 900, textTransform: 'capitalize', color: `var(--color-color3, ${theme.colors.color3})`, padding: '0px'}}
            size='small'
            sx={{ fontSize: {xs: '13px', sm: '15px'}}}>
              {selectedChoice}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top', // Position of the anchor element
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom', // Position of the menu
                horizontal: 'left',
              }}
            >
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Men')}>Men</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Women')}>Women</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Div 1')}>Division 1</MenuItem>
            </Menu>
          </Box> */}

          <Box>
            <Button onClick={() => handleNewsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<NewspaperIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleFixturesClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<CalendarMonthIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>

          

          <Box>
            <Button onClick={() => handleTableClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<FormatListNumberedIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleStatsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<AssessmentIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>

          <Box>
            <Button onClick={() => handlePlayersClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<GroupsIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>


        </Stack>

      </Paper>
    
      </>
    )

  }
  else if(selectedChoice == 'Men' && page == 'players_men'){

    return (
      <>
  
      <NavBar />

      <Box>
        <TabContext value={valuePlayers}>

          <TabList onChange={handleChangeTabsPlayers} aria-label="tabs example" centered>

            <Tab label='Premier' value='1' />
            <Tab label='First Division' value='2' />
            <Tab label='Women' value='3' />

          </TabList>

          <TabPanel value="1">

  
            <Box display='flex' justifyContent='center' marginBottom={5}>

      
              <Box width={{sm: 800, md: 900}}>
      
                {/* <Box marginTop={10} display='flex' justifyContent='center'>
      
                  <Button variant='contained' size='large' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_Clubs} endIcon={<KeyboardArrowDownIcon style={{ color: 'white'}} />} sx={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})` }}>

                  {selectedChoice == 'DFA_Premier_League_Men'? 'Premier League': selectedChoice == 'DFA_Division_One'? 'Division One': 'Women Division'}
                  
                  </Button>



                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl_Clubs}
                    keepMounted
                    open={Boolean(anchorEl_Clubs)}
                    onClose={handleClose_Clubs}
                  >
                    <MenuItem onClick={() => handleMenuItemClick_Clubs("DFA_Premier_League_Men")}>Premier League</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick_Clubs("DFA_Division_One")}>Division One</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick_Clubs("DFA_Women")}>Women</MenuItem>
                  </Menu>
      
      
                </Box> */}
      
      
      
                <Box marginTop={3}>
      
                  {/* <Grid container spacing={{xs:1, md: 2}} justify="center" alignItems="center">
      
                    {data && data.filter(team => team.League == selectedChoice_Clubs).map((item, idx) => {
      
                      return(
      
                          <Grid  key={idx} item xs={6} sm={6} md={4}>
      
                            <Link to={`/DFA/Home/Team/${item.ID}`} style={{ textDecoration: 'none'}}>
      
                              <Card sx={{ height: {md: '270px', lg: '270px'}}}>
      
                                <Stack direction='column'>
      
                                  <CardMedia component='img' height='100px' image={item.team_crest} />
      
                                  <CardContent>
                                    <Typography textAlign='center' sx={{ fontWeight: 900}}>{item.Team}</Typography>
                                  </CardContent>
      
                                </Stack>
      
                              </Card>
      
                              </Link>
      
                          </Grid>
      
                      )
      
                    })}
      
                  </Grid>  */}


                  <Grid container spacing={{ xs: 1, md: 2 }} justify="center" alignItems="center">
                    {data && data.filter(team => team.League === selectedChoice_Clubs).map((item, idx) => (
                      <Grid key={idx} item xs={6} sm={6} md={4}>
                        <Link to={`/DFA/Home/Team/${item.ID}`} style={{ textDecoration: 'none' }}>
                          <Card sx={{ 
                            height: { xs: '200px', md: '270px' }, 
                            display: 'flex', 
                            flexDirection: 'column' 
                          }}>
                            {/* Image container with fixed aspect ratio */}
                            <Box sx={{ 
                              width: '100%', 
                              height: '70%', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <CardMedia
                                component="img"
                                sx={{ 
                                  maxHeight: '100%', 
                                  maxWidth: '100%', 
                                  objectFit: 'contain' 
                                }}
                                image={item.team_crest}
                                alt={item.Team}
                              />
                            </Box>

                            {/* Text container with fixed height */}
                            <CardContent sx={{ 
                              height: '30%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 900, 
                                  textAlign: 'center',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  fontSize: '13px'
                                }}
                              >
                                {item.Team}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
      
                </Box>
      
              </Box>
      
            </Box>

            

          </TabPanel>

          <TabPanel value="2">

            <Box marginTop={3}>
    
                  <Grid container spacing={{ xs: 1, md: 2 }} justify="center" alignItems="center">
                    {data && data.filter(team => team.League === selectedChoice_Clubs).map((item, idx) => (
                      <Grid key={idx} item xs={6} sm={6} md={4}>
                        <Link to={`/DFA/Home/Team/${item.ID}`} style={{ textDecoration: 'none' }}>
                          <Card sx={{ 
                            height: { xs: '200px', md: '270px' }, 
                            display: 'flex', 
                            flexDirection: 'column' 
                          }}>
                            {/* Image container with fixed aspect ratio */}
                            <Box sx={{ 
                              width: '100%', 
                              height: '70%', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <CardMedia
                                component="img"
                                sx={{ 
                                  maxHeight: '100%', 
                                  maxWidth: '100%', 
                                  objectFit: 'contain' 
                                }}
                                image={item.team_crest}
                                alt={item.Team}
                              />
                            </Box>

                            {/* Text container with fixed height */}
                            <CardContent sx={{ 
                              height: '30%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 900, 
                                  textAlign: 'center',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  fontSize: '13px'
                                }}
                              >
                                {item.Team}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
    
            </Box>
            
          </TabPanel>

          <TabPanel value="3">

            <Box marginTop={3}>
    
                   <Grid container spacing={{ xs: 1, md: 2 }} justify="center" alignItems="center">
                    {data && data.filter(team => team.League === selectedChoice_Clubs).map((item, idx) => (
                      <Grid key={idx} item xs={6} sm={6} md={4}>
                        <Link to={`/DFA/Home/Team/${item.ID}`} style={{ textDecoration: 'none' }}>
                          <Card sx={{ 
                            height: { xs: '200px', md: '270px' }, 
                            display: 'flex', 
                            flexDirection: 'column' 
                          }}>
                            {/* Image container with fixed aspect ratio */}
                            <Box sx={{ 
                              width: '100%', 
                              height: '70%', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <CardMedia
                                component="img"
                                sx={{ 
                                  maxHeight: '100%', 
                                  maxWidth: '100%', 
                                  objectFit: 'contain' 
                                }}
                                image={item.team_crest}
                                alt={item.Team}
                              />
                            </Box>

                            {/* Text container with fixed height */}
                            <CardContent sx={{ 
                              height: '30%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              p: 1
                            }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 900, 
                                  textAlign: 'center',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  fontSize: '13px'
                                }}
                              >
                                {item.Team}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
    
            </Box>

          </TabPanel>

        </TabContext>
      </Box>  



      <Box marginTop={7} />
      
  
      <Paper style={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}} sx={{ width: '100%', height: '50px', position: 'fixed', bottom: 0, display: {xs: 'flex', sm: 'none'}, justifyContent: 'center'}}>
  
      <Stack justifyContent='center' alignItems='center' direction='row' spacing={window_width < 290? 1.8:window_width == 300? 2.5 : window_width == 350? 4: window_width == 390? 3.5: window_width == 400? 4.5: window_width == 420? 4.5: window_width == 500? 5: 2.5}>

  
          {/* <Box >
            <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            endIcon={<KeyboardArrowUpIcon style={{ color: 'white'}} />}
            style={{fontWeight: 900, textTransform: 'capitalize', color: `var(--color-color3, ${theme.colors.color3})`, padding: '0px'}}
            size='small'
            sx={{ fontSize: {xs: '13px', sm: '15px'}}}>
              {selectedChoice}
            </Button>
  
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top', // Position of the anchor element
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom', // Position of the menu
                horizontal: 'left',
              }}
            >
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Men')}>Men</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Women')}>Women</MenuItem>
              <MenuItem style={{ color: `var(--color-color3, ${theme.colors.color3})`}} onClick={() => handleMenuItemClick('Div 1')}>Division 1</MenuItem>
            </Menu>
          </Box> */}

          <Box>
            <Button onClick={() => handleNewsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<NewspaperIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>
  
          <Box>
            <Button onClick={() => handleFixturesClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<CalendarMonthIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          
  
          <Box>
            <Button onClick={() => handleTableClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<FormatListNumberedIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />
          </Box>

          <Box>
            <Button onClick={() => handleStatsClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<AssessmentIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
          <Box>
            <Button onClick={() => handlePlayersClick()} size='small' style={{ textTransform: 'capitalize',  padding: 0, minWidth: 'inherit' }} startIcon={<GroupsIcon style={{ color: `var(--color-color4, ${theme.colors.color3})`, fontSize: '20px' }} />} />

          </Box>
  
  
        </Stack>
  
      </Paper>
      
      </>
    )

  }

 
}

export default DFA