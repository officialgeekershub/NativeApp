import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

function LocationPicker() {
  const mapRef = useRef();
  const [region, setRegion] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation =  {
        latitude: route.params.pickedLat,
        longitude: route.params.pickedLng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(mapPickedLocation);
    }
  }, [route, isFocused, setRegion]);

  async function getLocationHandler() {
    //Current Location
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('location', position.coords);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 1000,
      },
    );
  }

  

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  return (
    <View>
      <View style={styles.preview}>
        {region  ? (
          <MapView
            ref={mapRef}
            //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.mapPreview}
            initialRegion={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          </MapView>
        ) : (
          <Text>No location taken yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.primary100,
  },
  preview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default LocationPicker;
