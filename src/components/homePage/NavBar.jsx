// import { AppBar, Box, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Grow } from '@mui/material'
// import SportsIcon from '@mui/icons-material/Sports';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LoginIcon from '@mui/icons-material/Login';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import { Link } from 'react-router-dom';

// import { useState, useEffect } from 'react';
// import theme from '../../css/theme';

// // Firebase
// import { auth } from '../../config/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth'

// import '../../css/PointTable.css'




// const NavBar = () => {

//   // Handling the menu for smart-phones
//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)

//   const menuDisplay = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const closeMenu = () => {
//     setAnchorEl(null);
//   };
//   // End of menu display for smart phones

//   // Larger displays menu setup
//   const [anchorEl_Large, setAnchorEl_Large] = useState(null);
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   // Google Authentication
//   const [userSignedIn, setUserSignedIn] = useState(null)


  
//   const handleClick = (event, button) => {
//     setAnchorEl_Large(event.currentTarget);
//     setSelectedButton(button);
//   };

//   const handleClose = () => {
//     setAnchorEl_Large(null);
//     setSelectedButton(null);
//   };

//   const buttonData = [
//     { id: 2, label: 'FIXTURES', menuItems: ['Premier', 'Division One' , 'Women' ,'Under 20', 'Under 16'] },
//     { id: 3, label: 'Tables', menuItems: ['Home', 'Teams', 'Stats'] },
//     { id: 4, label: 'Teams', menuItems: ['Home', 'Teams', 'Stats'] },
    
//   ];

//   // End of larger display set up

  

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       const isScrolledDown = prevScrollPos < currentScrollPos;

//       setVisible(!isScrolledDown || currentScrollPos < 10);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [prevScrollPos]);


//   useEffect(()=>{

//     onAuthStateChanged(auth, (user) =>{

//       if(user){
//         setUserSignedIn(true)
//       }
//       else{
//         setUserSignedIn(false)
//       }
//     })


//   }, [])



//   return (

//     <Box >

//       <AppBar elevation={2} sx={{backgroundColor: '#222629', position: 'fixed', top: 0, width: {xs:'100%'},  display: visible ? 'block' : 'none' }} >

//         <Toolbar 
//         sx={{ 
//           display: {xs: 'flex'}, 
//           justifyContent: {xs:'space-between', sm: 'space-evenly'}}}
//           >

//           <Link to='/'>

//               {/* <SportsIcon sx={{ color: '#86C232', fontSize: {xs:'40px'}, padding: 0}}/> */}

//               <Box width={{xs: 42}} >

//                 <img src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" width='100%' />

//               </Box>

//           </Link>


//           <Stack direction='row' sx={{ display: {xs: 'none', sm: 'flex'}}} spacing={2}>

//             <Link to='/'>
//               <Button>
//                 Home
//               </Button>
//             </Link>

//             <Link to='/DFA/Fixtures'>
//               <Button>
//                 Fixtures
//               </Button>
//             </Link>

//             <Link to='/DFA/Table'>
//               <Button>
//                 Tables
//               </Button>
//             </Link>

//             <Link to='/DFA/Teams'>
//               <Button>
//                 Clubs
//               </Button>
//             </Link>

//             <Link to='/DFA/Stats'>
//               <Button>
//                 Stats
//               </Button>
//             </Link>

//             <Link to='http://www.dominicafa.com/' target="_blank">
//               <Button>
//                 DFA
//               </Button>
//             </Link>



//           </Stack>

//           <Stack>

//             <IconButton sx={{ marginLeft: {xs: '0'}}}>
              
//               {userSignedIn == true? <AccountCircleIcon style={{ color: 'white'}} sx={{ fontSize: {xs:'30px'}, padding: 0, display: {xs:'none', sm: 'initial'} }}/>: 

//               <Link to='/Login' style={{ textDecoration: 'none'}}>
              
//                 <LoginIcon color='success' />
              
//               </Link>
              
              
//               }

//             </IconButton>
            
//           </Stack>

//           <Button 
//           id='menu-button'
//           aria-controls={open ? 'basic-menu': undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true': undefined}
//           onClick={menuDisplay}
//           sx={{ display: {sm: 'none'}}}
//           >
//             <MenuIcon style={{ color: '#86C232', fontSize: '28px'}}/>

//           </Button>

//           <Menu
//           id='menu-button'
//           anchorEl={anchorEl}
//           open={open}
//           onClose={closeMenu}
//           TransitionComponent={Grow}
//           transitionDuration={250}
//           MenuListProps={{
//             'aria-labelledby': 'menu-button',
//             style: {
//               width: '120px'
//             }
//           }}
                   
//           >
//             <Link to='/' style={{ textDecoration: 'none'}}><MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>Home</MenuItem></Link>

//             <Link to='/' style={{ textDecoration: 'none'}}><MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>CLUBS</MenuItem></Link>


//             <Link to='/' style={{ textDecoration: 'none'}}><MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>MEDIA</MenuItem></Link>

//             <Link to='/' style={{ textDecoration: 'none'}}><MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>STAFF</MenuItem></Link>

//             <Link to='http://www.dominicafa.com/' target="_blank" style={{ textDecoration: 'none'}}><MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>DFA</MenuItem></Link>

//             <Link to={userSignedIn?'/Profile': '/Login'} style={{ textDecoration: 'none'}}>
            
//               <MenuItem style={{ fontSize: '18px', color: `var(--color-color4, ${theme.colors.color4})` }} onClick={closeMenu}>{userSignedIn?'PROFILE': 'LOGIN'}
              
//               </MenuItem>
            
//             </Link>

//           </Menu>


//         </Toolbar>
//       </AppBar>
//       <Box marginTop={7} />



//     </Box>
//   )
// }

// export default NavBar








import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Stack, 
  Button, 
  Menu, 
  MenuItem, 
  Grow,
  Container,
  Avatar,
  Badge
} from '@mui/material'
import SportsIcon from '@mui/icons-material/Sports'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import TableChartIcon from '@mui/icons-material/TableChart'
import GroupsIcon from '@mui/icons-material/Groups'
import BarChartIcon from '@mui/icons-material/BarChart'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from '../../config/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'

// Navigation items configuration
const navItems = [
  { id: 1, label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 1 }} /> },
  { id: 2, label: 'Fixtures', path: '/DFA/Fixtures', icon: <EventIcon sx={{ mr: 1 }} /> },
  { id: 3, label: 'Tables', path: '/DFA/Table', icon: <TableChartIcon sx={{ mr: 1 }} /> },
  { id: 4, label: 'Clubs', path: '/DFA/Teams', icon: <GroupsIcon sx={{ mr: 1 }} /> },
  { id: 5, label: 'Stats', path: '/DFA/Stats', icon: <BarChartIcon sx={{ mr: 1 }} /> },
  { 
    id: 6, 
    label: 'DFA', 
    path: 'http://www.dominicafa.com/', 
    external: true,
    icon: <SportsIcon sx={{ mr: 1 }} />
  },
]

const NavBar = () => {
  const location = useLocation()
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [userSignedIn, setUserSignedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  const mobileMenuOpen = Boolean(mobileMenuAnchor)

  // Handle mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrolledDown = prevScrollPos < currentScrollPos

      setVisible(!isScrolledDown || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserSignedIn(!!user)
      if (user) {
        setUserProfile({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      } else {
        setUserProfile(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth)
      handleMobileMenuClose()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Check if link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <Box>
      <AppBar 
        elevation={4} 
        sx={{
          backgroundColor: 'rgba(34, 38, 41, 0.95)',
          backdropFilter: 'blur(10px)',
          position: 'fixed',
          top: 0,
          width: '100%',
          display: visible ? 'block' : 'none',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(90deg, #FFD700 0%, #FF6B00 50%, #FFD700 100%) 1',
          zIndex: 1200
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Box sx={{ width: 50, height: 50, mr: 1 }}>
                <img 
                  src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" 
                  alt="Dominica Football League Logo"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                DOMINICA FOOTBALL LEAGUE
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Stack 
              direction="row" 
              spacing={1}
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center'
              }}
            >
              {navItems.map((item) => {
                if (item.external) {
                  return (
                    <Button
                      key={item.id}
                      component="a"
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={item.icon}
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: '20px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 107, 0, 0.1)',
                          color: '#FFD700',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                }

                return (
                  <Button
                    key={item.id}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: isActiveLink(item.path) ? '#FFD700' : 'white',
                      fontWeight: 600,
                      borderRadius: '20px',
                      px: 2,
                      py: 1,
                      backgroundColor: isActiveLink(item.path) ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                      border: isActiveLink(item.path) ? '1px solid #FF6B00' : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 0, 0.1)',
                        color: '#FFD700',
                        border: '1px solid #FF6B00',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Stack>

            {/* User/Auth Section */}
            <Stack direction="row" spacing={1} alignItems="center">
              {userSignedIn ? (
                <>
                  <IconButton
                    component={Link}
                    to="/Profile"
                    sx={{
                      color: '#FFD700',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 215, 0, 0.1)'
                      }
                    }}
                  >
                    {userProfile?.photoURL ? (
                      <Avatar
                        src={userProfile.photoURL}
                        alt={userProfile.displayName || 'User'}
                        sx={{ 
                          width: 40, 
                          height: 40,
                          border: '2px solid #FF6B00'
                        }}
                      />
                    ) : (
                      <AccountCircleIcon sx={{ fontSize: 32 }} />
                    )}
                  </IconButton>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/Login"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: '#FFD700',
                    borderColor: '#FFD700',
                    borderRadius: '20px',
                    px: 3,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      borderColor: '#FFED4E',
                      color: '#FFED4E',
                      transform: 'translateY(-2px)'
                    },
                    display: { xs: 'none', sm: 'flex' }
                  }}
                >
                  LOGIN
                </Button>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{
                  color: '#86C232',
                  display: { md: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(134, 194, 50, 0.1)'
                  }
                }}
              >
                <MenuIcon fontSize="medium" />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        TransitionComponent={Grow}
        transitionDuration={250}
        MenuListProps={{
          'aria-labelledby': 'mobile-menu-button',
          sx: { 
            backgroundColor: '#222629',
            minWidth: 200,
            py: 0,
            borderRadius: 1,
            border: '1px solid #FF6B00'
          }
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            backgroundColor: '#222629',
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        {/* Logo in mobile menu */}
        <MenuItem
          component={Link}
          to="/"
          onClick={handleMobileMenuClose}
          sx={{
            backgroundColor: 'rgba(255, 107, 0, 0.1)',
            borderBottom: '1px solid #FF6B00',
            py: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 0, 0.2)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: 40, height: 40, mr: 2 }}>
              <img 
                src="https://res.cloudinary.com/djrkottjd/image/upload/v1711418501/Dominica_national_football_team_600e878744.png" 
                alt="Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Typography
              sx={{
                color: '#FFD700',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              DOMINICA FOOTBALL
            </Typography>
          </Box>
        </MenuItem>

        {/* Navigation items */}
        {navItems.map((item) => (
          <MenuItem
            key={item.id}
            component={item.external ? 'a' : Link}
            href={item.external ? item.path : undefined}
            to={!item.external ? item.path : undefined}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onClick={handleMobileMenuClose}
            sx={{
              color: isActiveLink(item.path) ? '#FFD700' : 'white',
              backgroundColor: isActiveLink(item.path) ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              borderLeft: isActiveLink(item.path) ? '3px solid #FF6B00' : 'none',
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 0, 0.1)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
              <Typography sx={{ fontWeight: isActiveLink(item.path) ? 600 : 400 }}>
                {item.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}

        {/* Separator */}
        <Box sx={{ 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          my: 1 
        }} />

        {/* Auth section in mobile menu */}
        {userSignedIn ? (
          <>
            <MenuItem
              component={Link}
              to="/Profile"
              onClick={handleMobileMenuClose}
              sx={{
                color: '#FFD700',
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 0, 0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ mr: 2 }} />
                <Typography>PROFILE</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout()
                handleMobileMenuClose()
              }}
              sx={{
                color: '#FF6B6B',
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 0, 0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ExitToAppIcon sx={{ mr: 2 }} />
                <Typography>LOGOUT</Typography>
              </Box>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            component={Link}
            to="/Login"
            onClick={handleMobileMenuClose}
            sx={{
              color: '#FFD700',
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 0, 0.1)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LoginIcon sx={{ mr: 2 }} />
              <Typography>LOGIN</Typography>
            </Box>
          </MenuItem>
        )}
      </Menu>

      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: { xs: 70, md: 80 } }} />
    </Box>
  )
}

export default NavBar