import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import DATA from './chat-data.json';
import { MaterialIcons } from '@expo/vector-icons';
import profilePic from './assets/profile-pic.png';

const keyboardType =
  Platform.OS === 'android' && Platform.Version >= 19 ? 'emoji' : 'default';

type IItem = {
  to: boolean;
  comment: string;
};

const App = () => {
  const [inputHeight, setInputHeight] = useState(45);
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        showsVerticalScrollIndicator={false}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.item,
              alignItems: item.to ? 'flex-end' : 'flex-start',
            }}
          >
            {item.comments.map((c, idx) => {
              const containerStyles =
                idx === 0
                  ? {
                      borderTopRightRadius: item.to ? 0 : 8,
                      borderTopLeftRadius: item.to ? 8 : 0,
                    }
                  : {};

              return (
                <View
                  key={`${item.id}-${c.id}-${c.comment}`}
                  style={{
                    ...styles.msgContainer,
                    ...containerStyles,
                    backgroundColor: item.to
                      ? 'darkblue'
                      : 'rgb(112, 128, 144)',
                  }}
                >
                  <Text style={styles.title}>{c.comment}</Text>
                </View>
              );
            })}
          </View>
        )}
        // renderSectionHeader={({ section: { title } }) => (
        //   <Text style={styles.header}>{title}</Text>
        // )}
        renderSectionFooter={({ section: { title } }) => (
          <View style={styles.center}>
            <Text style={styles.header}>
              {format(new Date(title), 'MMMM dd, yyyy')}
            </Text>
          </View>
        )}
        inverted
      />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: inputHeight,
            marginRight: 8,
            borderRadius: 4,
            backgroundColor: 'rgb(112, 128, 144)',
            color: 'white',
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
          numberOfLines={5}
          cursorColor='darkblue'
          returnKeyType='none'
          blurOnSubmit={true}
          multiline
          onContentSizeChange={(event) => {
            setInputHeight(
              Math.min(Math.max(event.nativeEvent.contentSize.height, 45), 120)
            );
          }}
          onChange={(event) => {
            // this.setState({
            //   text: event.nativeEvent.text,
            //   height: event.nativeEvent.contentSize.height,
            // });
          }}
        />
        <TouchableOpacity
          style={{
            ...styles.center,
            height: 45,
            width: 45,
            backgroundColor: 'darkblue',
            borderRadius: 45,
            paddingLeft: 4,
          }}
        >
          <MaterialIcons name='send' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: 'pink',
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    color: 'rgba(255,255,255, .8)',
    // backgroundColor: '#fff',
  },
  msgContainer: {
    // backgroundColor: 'darkblue',
    backgroundColor: 'rgb(112, 128, 144)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});
