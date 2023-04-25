import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const [videoStatus, setVideoStatus] = useState(null);

  useEffect(() => {
    async function loadVideo() {
      const video = Expo.FileSystem.cacheDirectory + 'video.mp4';
      const file = await Expo.FileSystem.getInfoAsync(video);
      if (file.exists) {
        setVideoStatus(video);
      } else {
        const downloadResumable = Expo.FileSystem.createDownloadResumable(
          'https://example.com/video.mp4',
          video
        );
        const { uri } = await downloadResumable.downloadAsync();
        setVideoStatus(uri);
      }
    }
    loadVideo();
  }, []);

  return (
    <View style={styles.container}>
      {videoStatus && (
        <Video
          source={{ uri: videoStatus }}
          resizeMode='cover'
          shouldPlay={true}
          isLooping={true}
          style={styles.video}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
