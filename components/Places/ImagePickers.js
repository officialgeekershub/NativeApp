import React, {useState} from 'react';
import {View, Button, Image, Text, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePickers() {
  const [pickedImage, setPickedImage] = useState();

  async function takeImageHandler() {
    try { const images = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setPickedImage(image.path);
    }); }
    catch(error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        return false;
      }
    }
    
  }
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = < Image style={styles.image} source={{uri: pickedImage}} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius:4,
  }, 
  image: {
    width: '100%',
    height: '100%',
  }
});

export default ImagePickers;
