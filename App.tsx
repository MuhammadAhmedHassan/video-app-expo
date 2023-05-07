import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import { VideoPlayer } from './components';
import data from './data.json';

const keyExtractor = (item: IVideo) => item.id.toString();

export default function VideoApp() {
  const [current, setCurrent] = useState(data[0].id);

  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const getVideos = useCallback(
    async (page = 0) => {
      const limit = 2;
      const start = page * limit;
      const end = start + limit;
      console.log('getVideos', page, start, end);
      if (start >= data.length) return;
      setVideos(videos.concat(data.slice(start, end)));
      setPageNumber(page + 1);
      // try {
      //   const response = await fetch('', {
      //     body: JSON.stringify({
      //       page,
      //       limit: 2,
      //     }),
      //   });
      //   const data = await response.json();
      //   videos.push(data.data);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    [pageNumber, videos]
  );

  useEffect(() => {
    getVideos();
    return () => {
      // Can Cleanup the cached videos
    };
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: IVideo; index: number }) => {
      return (
        <VideoPlayer
          id={item.id}
          videoUri={item.sources}
          title={item.title}
          description={item.description}
          showThumbnail={current === item.id}
          thumbnail={item.thumb}
          playVideo={current === item.id}
        />
      );
    },
    [current]
  );

  const onViewableItemsChanged = useCallback(
    async ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrent(viewableItems[0].item.id);
      }
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        maxToRenderPerBatch={2}
        // initialNumToRender={2}
        scrollEventThrottle={16}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
        ListFooterComponent={<ListFooterComponent loading={true} />}
        onEndReached={() => getVideos(pageNumber)}
        onEndReachedThreshold={0.5} // Call onEndReached when the last item is within half a screen height of being visible
      />
    </SafeAreaView>
  );
}

var viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 80,
  // itemVisiblePercentThreshold: 100,
  // waitForInteraction: true,
  // minimumViewTime: 50,
};

function ListFooterComponent({ loading }) {
  if (!loading) return null;
  return (
    <View
      style={{
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <ActivityIndicator size='large' color='white' />
    </View>
  );
}

// export default function App() {
//   <Provider store={store}>
//     <VideoApp />
//   </Provider>;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    height: '100%',
    width: '100%',
  },
});
