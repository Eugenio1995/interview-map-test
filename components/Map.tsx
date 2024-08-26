"use client";
import { useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Grid, Modal, Typography } from '@mui/material';
import { getCountries } from '@/services';
import { CountryResponse } from '@/interfaces';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ isoName, countryName }: any) => {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryResponse[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMarkerClick = (info: any) => {
    setSelectedInfo(info);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    try {
      const fetchCountries = async () => {
        const data = await getCountries();
        setCountries(data);
        setFilteredCountries(data);
      };
      fetchCountries();
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching countries", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const newFilteredCountries = countries.filter((item) => {
      return (
        item.Country.toLowerCase().includes(countryName.toLowerCase()) &&
        item.ISO_Code.toLowerCase().includes(isoName.toLowerCase())
      )
    })

    setFilteredCountries(newFilteredCountries);

  }, [countryName, isoName]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <MapContainer center={[0, -68.0000]} zoom={3} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredCountries.map((location, index) => (
            <Marker
              key={index}
              position={[location.Latitude, location.Longitude]}
              icon={L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                shadowSize: [51, 41]
              })}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(location)
                  setOpenModal(true);
                }
              }}
            >
              <Popup>{location.Country}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="body2" color={'black'} textAlign={'center'} fontWeight={600}>
                Country
              </Typography>
              <Typography id="modal-modal-description" color={'black'} textAlign={'center'}>
                {selectedInfo.Country}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="body2" color={'black'} textAlign={'center'} fontWeight={600}>
                Capital
              </Typography>
              <Typography id="modal-modal-description" color={'black'} textAlign={'center'}>
                {selectedInfo.capital}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="body2" color={'black'} textAlign={'center'} fontWeight={600}>
                Currency
              </Typography>
              <Typography id="modal-modal-description" color={'black'} textAlign={'center'}>
                $ {selectedInfo.currency}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className='mt-4' justifyContent={'center'}>
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="body2" color={'black'} textAlign={'center'} fontWeight={600}>
                Phone
              </Typography>
              <Typography id="modal-modal-description" color={'black'} textAlign={'center'}>
                +{selectedInfo.phone}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="body2" color={'black'} textAlign={'center'} fontWeight={600}>
                Flag
              </Typography>
              <Typography id="modal-modal-description" color={'black'} textAlign={'center'}>
                {selectedInfo.emoji}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Map;