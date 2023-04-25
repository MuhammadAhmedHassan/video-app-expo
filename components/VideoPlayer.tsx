import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useValue,
  interpolate,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import localVideo from '../download.mp4';
import { VideoThumbnail } from './VideoThumbnail';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface IProps {
  id: number;
  videoUri: string;
  thumbnail: string;
  showThumbnail: boolean;
  playVideo: boolean;
}

export const VideoPlayer = React.memo(
  ({ id, showThumbnail, thumbnail, videoUri, playVideo }: IProps) => {
    const video = useRef<Video | null>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
    const [videoStatus, setVideoStatus] = useState(null);

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
      async function loadVideo() {
        const video = FileSystem.cacheDirectory + 'big_buck_bunny.mp4';
        const file = await FileSystem.getInfoAsync(video);

        if (file.exists) {
          setVideoStatus(video);
        } else {
          const downloadResumable = FileSystem.createDownloadResumable(
            'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            // 'https://example.com/video.mp4',
            video
          );
          const { uri } = await downloadResumable.downloadAsync();
          setVideoStatus(uri);
        }
      }
      loadVideo();
    }, []);

    useEffect(() => {
      if (!status?.isLoaded) return;
      if (!playVideo) video.current?.stopAsync();
      else video.current?.playAsync();

      return () => {
        console.log('unmount', id);
      };
    }, [playVideo, status?.isLoaded]);

    const toggleVideo = async () => {
      if (!status.isLoaded) return;
      if (status.isPlaying) await video.current.pauseAsync();
      else await video.current.playAsync();

      opacity.value = withSpring(1, {});
      scale.value = withSpring(1, {});
      setTimeout(() => {
        opacity.value = withSpring(0, {});
        scale.value = withSpring(0, {});
      }, 1000);

      // Use delay to wait for 1 second before hiding the icon
      opacity.value = withDelay(20, withSpring(1, {}));
      scale.value = withDelay(20, withSpring(1, {}));
    };

    const style = useAnimatedStyle(() => {
      return {
        // width: withTiming(randomWidth.value, config),
        position: 'absolute',
        top: '48%',
        left: '45%',
        transform: [
          { translateX: -12.5 },
          { translateY: -12.5 },
          { scale: scale.value },
        ],
        opacity: opacity.value,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 64,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
      };
    }, [opacity, scale]);

    return (
      <View style={styles.container}>
        {videoStatus && (
          <Video
            ref={video}
            source={{ uri: videoStatus }}
            resizeMode={ResizeMode.CONTAIN}
            // shouldPlay={playVideo}
            isLooping={true}
            style={styles.video}
            onPlaybackStatusUpdate={setStatus}
          />
        )}

        <TouchableOpacity
          style={{ ...StyleSheet.absoluteFillObject }}
          onPress={toggleVideo}
        >
          <Animated.View style={style}>
            {status?.isLoaded ? (
              status?.isPlaying ? (
                <MaterialIcons name='pause' size={48} color='white' />
              ) : (
                <Entypo name='controller-play' size={48} color='white' />
              )
            ) : (
              <ActivityIndicator size='large' color='white' />
            )}
          </Animated.View>
        </TouchableOpacity>

        {/* buttons */}
        <View style={styles.btnsContainer}>
          <IconBtn>
            <AntDesign name='like2' size={28} color='white' />
          </IconBtn>
          <IconBtn>
            <AntDesign name='dislike2' size={28} color='white' />
          </IconBtn>
          <IconBtn>
            <Entypo name='share' size={28} color='white' />
          </IconBtn>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.channel}>@channel</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of ...
          </Text>
        </View>
      </View>
    );
  }
  // (pp, np) => {
  //   // return true;
  //   return np.playVideo === true ? false : true;
  //   // return pp.playVideo !== np.playVideo;
  // }
);

function IconBtn({ children }) {
  return (
    <TouchableOpacity style={styles.iconContainer}>{children}</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'black',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  imgBg: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsContainer: {
    // height: '50%',
    // backgroundColor: 'pink',
    width: 60,
    position: 'absolute',
    top: '55%',
    right: 0,
    alignItems: 'center',
    // justifyContent: 'center',
    rowGap: 24,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channel: { fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  buttons: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  playBtn: {
    height: 45,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'lightblue',
  },
  btnText: { fontSize: 18 },
});

// 1- When we go to next video and if we come
// back it shows the thumbnail of the previous video
// 2- When we stop drag is stops the previous playing video
