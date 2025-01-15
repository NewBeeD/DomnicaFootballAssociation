import {  Box, Typography, Stack, Button, Card, CardHeader, CardContent, CardMedia, CardActions, Grid, Skeleton, Divider, Menu, MenuItem, Paper, FormControl, Select, InputLabel, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import qs from 'qs'
import axios from "axios";
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { queryParams_dfa_teams } from "../../modules/DFA/QueryParams";
import AllTeamsDataStructure from '../../components/DFAPage/AllTeamsPage/AllTeamsDataStructure';

import NavBar from "../../components/homePage/NavBar"
import Footer from '../../components/Footer/Footer';
import theme from '../../css/theme';

const AllTeamsPage = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState('DFA_Premier_League_Men');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (choice) => {
    setSelectedChoice(choice);
    handleClose();
  };



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
  
  
  return (

    <>
      <Box display='flex' justifyContent='center' marginBottom={5}>
        <NavBar />

        <Box width={{sm: 800, md: 900}}>

          <Box marginTop={10} display='flex' justifyContent='center'>

            <Button variant='contained' size='large' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon style={{ color: 'white'}} />} sx={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})` }}>
            {selectedChoice == 'DFA_Premier_League_Men'? 'Premier League': selectedChoice == 'DFA_Division_One'? 'Division One': 'Women Division'}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick("DFA_Premier_League_Men")}>Premier League</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("DFA_Division_One")}>Division One</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("DFA_Women")}>Women</MenuItem>
            </Menu>


          </Box>



          <Box marginTop={3}>

            <Grid container spacing={{xs:1, md: 2}} justify="center" alignItems="center">

              {data && data.filter(team => team.League == selectedChoice).map((item, idx) => {

                return(

                    <Grid  key={idx} item xs={6} sm={6} md={4}>

                      <Link to={`/DFA/Home/Team/${item.ID}`} style={{ textDecoration: 'none'}}>

                        <Card sx={{ height: {md: '270px', lg: '270px'}}}>

                          <Stack direction='column'>

                            <CardMedia component='img' height='200px' image={item.team_crest} />

                            <CardContent>
                              <Typography textAlign='center' sx={{ fontWeight: 900}}>{item.Team}</Typography>
                            </CardContent>

                          </Stack>

                        </Card>

                        </Link>

                    </Grid>

                )

              })}

            </Grid> 

          </Box>

        </Box>

      </Box>

      <Footer />
    
    </>

  )
}

export default AllTeamsPage