import CardHeader from '@mui/material/CardHeader' // ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import RadioGroup from '@mui/material/RadioGroup'
import Hypothese from 'src/views/table/mui/Hypothese'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components

// ** Types

import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Impor
const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const Hypotheses = () => {
  const [openDialog, setOpenDialog] = useState(false)
  // Dialog open/close handlers
  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => setOpenDialog(false)

  return (
    <Grid container spacing={6}>
      <Grid container alignItems='center' justifyContent='space-between' sx={{ mt: 5, mb: 5 }}>
        <Grid item>
          <Typography variant='h5'>Créer un nouveau hypothèse</Typography>
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleDialogOpen}>
            Nouveau Hypothèse
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 10, textAlign: 'center' }}>
              <Card>
                <CardHeader title='Liste des hypothèses' />
                <Hypothese />
              </Card>
              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle sx={{ mt: 2, mb: 2 }}>Ajouter un hypothèse</DialogTitle>
                <DialogContent>
                  <Grid container spacing={11}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Nom d'Objectif" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        placeholder='Description'
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Catégories</InputLabel>
                        <Select defaultValue='Haute'>
                          <MenuItem value='Haute'>Serivice Client</MenuItem>
                          <MenuItem value='Moyenne'>Service Entreprise</MenuItem>
                          <MenuItem value='Basse'>Bénefice</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Valeur Associée" />
                    </Grid>
                 
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color='secondary'>
                    Annuler
                  </Button>
                  <Button variant='contained' color='primary' onClick={handleDialogClose}>
                    Créer
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
    </Grid>
  )
}

export default Hypotheses
