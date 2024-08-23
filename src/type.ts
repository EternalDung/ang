export interface ALBUM {
  artist: string;
  album: string;
  publish: string;
  company: string;
  cover: string;
  intro: string;
  songs: SONG[];
}
export interface SONG {
  title: string;
  artist: string;
  album: string;
  url: string;
  lyric: string;
}
// 播放列表歌曲指定格式
export interface PLAY_LIST_SONG {
  name: string;
  singer: string;
  cover: string;
  musicSrc: string;
  lyric?: string;
}

//单曲
export interface SINGLE {
  title: string;
  artist: string;
  album: string;
  publish: string;
  cover: string;
  intro: string;
  url: string;
  lyric: string;
}
