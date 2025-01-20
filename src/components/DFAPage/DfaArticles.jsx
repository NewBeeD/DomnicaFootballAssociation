
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'


// Function to fetch article data and structured data
import GetArticles from '../../modules/Homepage/TrendingSection/TrendingSectionDataFetch'

import HeadlineFeature from './Headline/HeadlineFeature'

import theme from '../../css/theme';

import { Link } from "react-router-dom";

// Redux
import { useSelector } from 'react-redux';




const DfaArticles = ({ level, size }) => {

  GetArticles()


  let players = useSelector((state) => state.DfaPlayers)
  

  const articles_raw = useSelector((state) => state.articles)
  let articles = articles_raw && articles_raw[0] ? articles_raw[0].filter(item => item.league == 'DFA' && item.headline != 'YES') : null;


  

  let articles_length = articles && articles_raw[0] ? articles.length: 0;
  let part_size = articles_length ? Math.ceil(articles_length/3): 0;


  // TODO: Set up articles in slices


  switch(level){


    case 'first':

      if(size == 'small'){articles = articles ? articles.slice(0, 3): null;}
      else{articles = articles ? articles.slice(0, 4): null;}
      break;
    
    case 'second':
      if(size == 'small'){articles = articles ? articles.slice(3, 7): null;}
      else{articles = articles ? articles.slice(4, 8): null;}
      break;
    
    case 'third':
      if(size == 'small'){articles = articles ? articles.slice(7, 11): null;}
      else{articles = articles ? articles.slice(8, 12): null;}
      break;

    case 'fourth':
      if(size == 'small'){articles = articles ? articles.slice(11, 13): null;}
      else{articles = articles ? articles.slice(12, 16): null;}
      break;

    case 'fifth':
      if(size == 'small'){articles = articles ? articles.slice(13, 16): null;}
      else{articles = articles ? articles.slice(16, 20): null;}      
      break;
  }



  return (
    
    <Box >

      <HeadlineFeature />

      <Box paddingY={2} />

      {articles_length > 0 ? 
      
      <Box
      direction={{ xs: 'column', sm: 'row' }} 
      sx={{ display: { sm: 'flex' }, flexDirection: 'row'}}
      >

              
              <Stack 
              display={{ sm:'none'}} 
              direction='column' 
              spacing={2} 
              width={{xs: '90%'}} 
              margin={{xs:'auto'}} 
              divider={<Divider orientation='horizontal' flexItem />} >

            

                {articles ? articles.map((item, idx) => {

                return (
                <Box key={idx} >

                  
                  <Card sx={{ boxShadow: 'none', backgroundColor: 'white', border: '1px solid #86C232'}}>

                    <CardActions>

                      <Stack>

                        {/* TODO: Link this page to the premiere league home page */}

                        <Link to='/DFA/Home'>
                        <Typography style={{ color: `var(--color-color5, ${theme.colors.color5})`}} sx={{ fontSize: {xs: 13}, textDecoration: 'underline', fontWeight: 900}}>{item.type}</Typography>
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

                      <CardMedia 
                      component='img' 
                      height={200} 
                      src={item.url[0]} 
                      alt={item.alt}
                      sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}/>
                    
                    </Link>

                    <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                      <CardContent>
                        <Typography sx={{ color: 'black', fontSize: {xs: 13}}}>
                          {item.body_content.length < 25? item.body_content: (item.body_content.substr(0, 40) + "...")}
                        </Typography>
                      </CardContent>
                    </Link>



                    
                  </Card>

                </Box>)

              }): <Skeleton variant="rectangular" width='100%' height={60} />}
                        

              </Stack>


                <Grid 
                display={{ xs:'none', sm: 'inherit'}}  
                container 
                spacing={1.5} 
                direction={{ sm: 'row' }} 
                justifyContent="left"  
                width='100%'
                >

                  

                  {articles ? articles.map((item, idx) => (

                    <Box
                    key={idx}
                    >

                    

                      <Box
                      display={{sm: 'none', md: 'inherit'}}
                      >       
                                          
                      
                        <Card 
                        sx={{ boxShadow: 'none', backgroundColor: 'white', border: '1px solid #86C232', height: {sm: '400px'}, maxWidth: 300, margin: 1}}
                        >

                          <CardActions >

                            <Stack>

                              {/* TODO: Change the league name to the article Category */}

                              <Link to='/'>

                                <Typography style={{ color: `var(--color-color5, ${theme.colors.color5})`}} sx={{ fontSize: {xs: 13}, textDecoration: 'underline', fontWeight: 900}}>{item.type}</Typography>

                              </Link>


                              {/* <Stack direction='row' spacing={0.5}>
                                <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 8}}}>{item.author}</Typography>
                                <Divider orientation='vertical' flexItem />
                                <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 8}}}>{item.time}</Typography>
                              </Stack> */}


                            </Stack>

                          </CardActions >

                          <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                            
                            <CardHeader 
                            titleTypographyProps={{variant:'body2', fontWeight: 900 }} title={item.title} 
                            style={{ color: `var(--color-color3, ${theme.colors.color3})`}}
                            sx={{ marginTop: 0, paddingTop: 0 }}
                            />

                          </Link>


                          <CardMedia 
                          component='img' 
                          height={200} 
                          src={item.url[0]} 
                          alt={item.alt}
                          sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                          />

                          <CardContent sx={{ marginTop: 0, paddingTop: 2 }}>
                            <Typography sx={{ color: 'black', fontSize: {xs: 13}}}>
                              {item.body_content.length < 25? item.body_content: (item.body_content.substr(0, 80) + "...")}
                            </Typography>
                          </CardContent>

                        </Card>

                      </Box>

                      {/* Set up the media horizontallly */}

                      <Box
                      key={idx}
                      display={{sm: 'inherit', md: 'none'}}>       
                                          
                      
                        <Card 
                        sx={{ boxShadow: 'none', backgroundColor: 'white', border: '1px solid #86C232', height: {sm: 'auto'}, maxWidth: 300, margin: 1}}
                        >

                          <Stack direction='column-reverse'>


                            <Stack>

                            </Stack>

                            <Link to={`/${item.id}`} style={{ textDecoration: 'none'}}>
                              
                              <CardHeader 
                              titleTypographyProps={{variant:'body2', fontWeight: 900 }} title={item.title} 
                              style={{ color: `var(--color-color3, ${theme.colors.color3})`}}
                              sx={{ marginTop: 0, paddingTop: 0, paddingLeft: 1 }}
                              />

                            </Link>

                            <CardActions >

                              <Stack>

                                {/* TODO: Change the league name to the article Category */}

                                <Link to='/'>

                                  <Typography style={{ color: `var(--color-color5, ${theme.colors.color5})`}} sx={{ fontSize: {xs: 13}, textDecoration: 'underline', fontWeight: 900}}>{item.league}</Typography>

                                </Link>


                                {/* <Stack direction='row' spacing={0.5}>
                                  <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 8}}}>{item.author}</Typography>
                                  <Divider orientation='vertical' flexItem />
                                  <Typography style={{ color: `var(--color-color3, ${theme.colors.color3})`}} sx={{ fontSize: {xs: 8}}}>{item.time}</Typography>
                                </Stack> */}


                              </Stack>

                            </CardActions >

                            



                         



                            <CardMedia 
                            component='img' 
                            height={200} 
                            src={item.url[0]} 
                            alt={item.alt}
                            sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                            />


                        </Stack>

                          {/* <CardContent sx={{ marginTop: 0, paddingTop: 2 }}>
                            <Typography sx={{ color: 'black', fontSize: {xs: 13}}}>
                              {item.body_content.length < 25? item.body_content: (item.body_content.substr(0, 80) + "...")}
                            </Typography>
                          </CardContent> */}

                        </Card>

                      </Box>

                    </Box>



                  )) : <Skeleton variant="rectangular" width={{xs: '60px', sm: '100px'}} height={60} />}

                </Grid>
              
      </Box>


      : <Skeleton width='100%' height='400px' />}

  </Box>
  )
}

export default DfaArticles