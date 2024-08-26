import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Filters from '@/components/Filters';

const DynamicMapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false // Desactiva la renderización del lado del servidor para este componente
});

export default function Home() {

  const [countryName, setCountryName] = useState<string>('');
  const [isoName, setIsoName] = useState<string>('');

  return (
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
  );
}
