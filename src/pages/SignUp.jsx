import { AppBar, Box, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Grow, Hidden, Card, CardHeader, CardContent, CardMedia, CardActions, Paper, TextField, Divider } from '@mui/material'

import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'

import { auth, googleProvider } from '../config/firebaseConfig'

import { useState, useEffect } from 'react'

import theme from '../css/theme'
import { useNavigate } from 'react-router'




const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigate()
  


  const signUpWithGoogle = async () => {

    try{
      await signInWithPopup(auth, googleProvider).then((userCredentials)=>{

        console.log(userCredentials);
        navigation('/')
      })
    }
    catch(err){
      console.log(err);
    }
  }

  const signUp = async () => {

    try{
      await createUserWithEmailAndPassword(auth, email, password).then((userCredentials)=>{

        console.log(userCredentials);
        navigation('/')
      })
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <Box display='flex' justifyContent='center' alignContent='center'  width='100%' height='100vh' sx={{ backgroundColor: `var(--color-color1, ${theme.colors.color1})`}}> 

      <Paper style={{ width: '90%', height: 400, margin: 'auto', textAlign: 'center'}}>

        <Card style={{height: '100%', width: '100%'}}>
          <CardContent>

            <Typography variant="h5" align="center">
              Create an Account
            </Typography>
            
            <form onSubmit={signUp}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2}}
              >
                SignUp
              </Button>
            </form>

            <Divider>OR</Divider>

            <Button onClick={signUpWithGoogle} variant='contained' sx={{ marginTop: 2 }}>Signup with Google</Button>

          </CardContent>
        </Card>

      </Paper>

    </Box>
  )
}

export default Signup