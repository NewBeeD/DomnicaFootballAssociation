import {  Box, Typography, Stack,  Card, CardHeader, CardContent, CardMedia, CardActions, Grid, Skeleton, Divider } from '@mui/material'

import Points_Table from '../homePage/Points_Table';


// Function to fetch article data and structured data
import GetArticles from '../../modules/Homepage/TrendingSection/TrendingSectionDataFetch'
import FixturesData from '../homePage/Fixtures';

import theme from '../../css/theme';

import { Link } from "react-router-dom";

// Redux
import { useSelector } from 'react-redux';
import FeaturedPlayer from '../homePage/FeaturedPlayer';



const DfaArticles = ({ level }) => {

  GetArticles()


  let players = useSelector((state) => state.DfaPlayers)
  

  const articles_raw = useSelector((state) => state.articles)
  let articles = articles_raw && articles_raw[0] ? articles_raw[0].filter(item => item.league == 'DFA' && item.headline != 'YES') : null;


  

  let articles_length = articles && articles_raw[0] ? articles.length: 0;
  let part_size = articles_length ? Math.ceil(articles_length/3): 0;


  // TODO: Set up articles in slices


  switch(level){

    case 'first':
      articles = articles ? articles.slice(0, part_size): null;
      break;
    
    case 'second':
      articles = articles ? articles.slice(part_size, 2*part_size): null;
      break;
    
    case 'third':
      articles = articles ? articles.slice(2*part_size): null;
  }



  return (
    
    <Box marginTop={2}>

      {articles_length > 0 ?  

        <Stack 
        direction='column' 
        spacing={2} 
        width={{xs: '95%'}} 
        margin={{xs:'auto'}} 
        divider={<Divider orientation='horizontal' flexItem />} 
        >


            <Box 
            direction={{ xs: 'column', sm: 'row' }} 
            sx={{ display: { sm: 'flex' }, flexDirection: 'row'}} 
            >

              {/* Side panel on DFA homepage */}
              {level === 'first'?
              
                <Stack 
                  width={{ sm:'300px', md: '380px' }} 
                  display={{xs:'none', sm:'inherit'}}            
                  height={{ sm: '400px'}}
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

                  
                </Stack>: ''
                }

              <Stack display={{ sm:'none'}} direction='column' spacing={2} width={{xs: '90%'}} margin={{xs:'auto'}} divider={<Divider orientation='horizontal' flexItem />} >

                {articles ? articles.map((item, idx) => {

                return (
                <Box key={idx}>
                  
                  <Card sx={{ boxShadow: 'none', backgroundColor: 'white', border: '1px solid #86C232'}}>

                    <CardActions>

                      <Stack>

                        {/* TODO: Link this page to the premiere league home page */}

                        <Link to='/DFA/Home'>
                        <Typography style={{ color: `var(--color-color5, ${theme.colors.color5})`}} sx={{ fontSize: {xs: 13}, textDecoration: 'underline', fontWeight: 900}}>{item.league}</Typography>
                        </Link>


                        <Stack direction='row' spacing={0.5}>
                          <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 9}}}>{item.author}</Typography>
                          <Divider orientation='vertical' flexItem />
                          <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 9}}}>{item.time}</Typography>
                        </Stack>


                      </Stack>

                    </CardActions>

                    <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                      <CardHeader titleTypographyProps={{variant:'body2', fontWeight: 900 }} title={item.title} style={{ color: `var(--color-color3, ${theme.colors.color3})`}}/>
                    </Link>


                    <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                    <CardMedia component='img' height={200} src={item.url[0]} alt={item.alt}/>
                    </Link>

                    <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                      <CardContent>
                        <Typography sx={{ color: 'black', fontSize: {xs: 13}}}>
                          {item.body_content.length < 25? item.body_content: (item.body_content.substr(0, 50) + "...")}
                        </Typography>
                      </CardContent>
                    </Link>



                    
                  </Card>

                </Box>)

              }): <Skeleton variant="rectangular" width='100%' height={60} />}
                        

              </Stack>


              <Grid display={{ xs:'none', sm: 'inherit'}}  container spacing={1.5} direction={{ xs: 'column', sm: 'row' }} justifyContent="center"   width={{sm:600, md:700, lg:1000}} 
              >

                {articles ? articles.map((item, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={5}>
                  
                    <Card sx={{ boxShadow: 'none', backgroundColor: 'white', border: '1px solid #86C232', height: {sm: '440px'}}}>

                      <CardActions>

                        <Stack>

                          {/* TODO: Link this page to the premiere league home page */}

                          <Link to='/DFA/Home'>
                          <Typography style={{ color: `var(--color-color5, ${theme.colors.color5})`}} sx={{ fontSize: {xs: 13}, textDecoration: 'underline', fontWeight: 900}}>{item.league}</Typography>
                          </Link>


                          <Stack direction='row' spacing={0.5}>
                            <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 9}}}>{item.author}</Typography>
                            <Divider orientation='vertical' flexItem />
                            <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 9}}}>{item.time}</Typography>
                          </Stack>


                        </Stack>

                      </CardActions>

                      <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                        <CardHeader titleTypographyProps={{variant:'body2', fontWeight: 900 }} title={item.title} style={{ color: `var(--color-color3, ${theme.colors.color3})`}}/>
                      </Link>


                      <CardMedia component='img' height={200} src={item.url[0]} alt={item.alt}/>

                      <CardContent>
                        <Typography sx={{ color: 'black', fontSize: {xs: 13}}}>
                          {item.body_content.length < 25? item.body_content: (item.body_content.substr(0, 90) + "...")}
                        </Typography>
                      </CardContent>

                    </Card>
                  </Grid>
                )) : <Skeleton variant="rectangular" width='100%' height={60} />}

              </Grid>

            </Box>

                  

        </Stack>
      
      : <Skeleton width='100%' height='400px' />}

  </Box>
  )
}

export default DfaArticles