import { FileSystem } from 'expo-file-system';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Clear the cache directory when the app is closed
const clearCache = async () => {
  try {
    await FileSystem.deleteAsync(FileSystem.cacheDirectory);
    console.log('Cache directory cleared');
  } catch (error) {
    console.log('Error clearing cache directory:', error);
  }
};

registerRootComponent(App);

// Register the app with a callback to clear the cache on app close
// AppRegistry.registerComponent('MyApp', () => App);
AppRegistry.registerHeadlessTask('AppRegistry', () => clearCache);
