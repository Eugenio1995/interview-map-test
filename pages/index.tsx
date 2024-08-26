import dynamic from 'next/dynamic';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import Filters from '@/components/Filters';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import styles from '../styles/filters.module.css';

const DynamicMapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false // Desactiva la renderización del lado del servidor para este componente
});

export default function Home() {

  const [countryName, setCountryName] = useState<string>('');
  const [isoName, setIsoName] = useState<string>('');

  return (

    <Box className={styles.fadeIn}>
      <ResponsiveAppBar />
      <>
        <Grid container>
          <Filters
            setCountryName={setCountryName}
            setIsoName={setIsoName}
            isoName={isoName}
            countryName={countryName}
          />
          <Grid item xs={6} sm={8} md={10}>
            <DynamicMapComponent countryName={countryName} isoName={isoName} />
          </Grid>
        </Grid>
      </>
    </Box>

  );
}
