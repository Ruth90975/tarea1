import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.anagramaApp.app',
  appName: 'AnagramaApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
