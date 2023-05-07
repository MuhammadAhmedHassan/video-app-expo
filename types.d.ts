declare module '*.mp4';

interface IVideo {
  id: number;
  description: string;
  sources: string;
  subtitle: string;
  thumb: string;
  title: string;
}

interface IVideoOld {
  id: number;
  contest_id: string;
  user_id: string;
  title: string;
  media_path: string;
  description: null | string;
  votes: string;
  status: string;
  winner: string;
  created_at: string;
  updated_at: string;
  phone: string;
  location: string;
  thumbnail: string;
}

interface IPlaylistComponent {
  showVideo: boolean;
  playbackInstanceName: string;
  loopingType: number;
  muted: boolean;
  playbackInstancePosition: number | null;
  playbackInstanceDuration: number | null;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  isLoading: boolean;
  fontLoaded: boolean;
  shouldCorrectPitch: boolean;
  volume: number;
  rate: number;
  videoWidth: number;
  videoHeight: number;
  poster: boolean;
  useNativeControls: boolean;
  fullscreen: boolean;
  throughEarpiece: boolean;
}
