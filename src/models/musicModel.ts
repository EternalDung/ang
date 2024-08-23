// src/models/musicModel.js
import { ALBUM, SINGLE } from '@/type';
import { getAlbumListAPI, getSingleList } from '../apis/album';
export default {
  namespace: 'music',
  state: {
    currentSong: null, // 当前播放的歌曲
    albums: [] as ALBUM[], //专辑列表
    singles: [] as SINGLE[], //单曲列表
  },
  reducers: {
    // 更新当前歌曲
    setCurrentSong(state, { payload }) {
      return { ...state, currentSong: payload };
    },
    setAlbums(state, { payload }) {
      return { ...state, albums: payload };
    },
    setSingles(state, { payload }) {
      return { ...state, singles: payload };
    },
  },
  effects: {
    *selectSong({ payload }, { put }) {
      // 这里可以添加额外的逻辑，比如播放歌曲
      yield put({
        type: 'setCurrentSong',
        payload,
      });
    },
    // 获取专辑列表
    *fetchAlbums({}, { call, put }) {
      try {
        const albums = yield call(getAlbumListAPI);
        yield put({
          type: 'setAlbums',
          payload: albums,
        });
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    },
    //获取单曲列表
    *fetchSingles({}, { call, put }) {
      try {
        const singles: SINGLE = yield call(getSingleList);
        yield put({
          type: 'setSingles',
          payload: singles,
        });
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    },
  },
};
