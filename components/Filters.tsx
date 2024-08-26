import { Button, Grid, TextField } from "@mui/material";
import styles from '../styles/filters.module.css';

const Filters = ({
  setIsoName,
  setCountryName,
  isoName,
  countryName
}: any) => {

  return (
    <>
      <Grid item xs={6} sm={4} md={2} className={styles.filterContainer}>
        <Grid container spacing={2} display={'flex'} justifyContent={'center'} className='mt-4'>
          <Grid item xs={10}>
            <TextField
              label='Nombre'
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCountryName(event.target.value);
              }}
              value={countryName}
            />
          </Grid>         
          <Grid item xs={10}>
            <TextField
              label='Código ISO'
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsoName(event.target.value);
              }}
              value={isoName}
            />
          </Grid>  
          <Button variant="contained" className='mt-4'
            onClick={() => {
              setCountryName('');
              setIsoName('');
            }}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Filters;