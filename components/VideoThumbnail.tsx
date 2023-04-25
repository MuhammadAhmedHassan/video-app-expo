import { StyleSheet, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

interface IProps {
  url: string;
}

export const VideoThumbnail = React.memo(({ url }: IProps) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        console.log('https://sandbox.tripscon.com/contest/public/' + url);
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          // 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          'https://sandbox.tripscon.com/contest/public/' + url,
          {
            time: 15000,
          }
        );
        setImage(uri);
      } catch (e) {
        console.warn(e);
      }
    };
    generateThumbnail();
  }, []);

  return image ? <Image source={{ uri: image }} style={styles.image} /> : null;
});

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
});
