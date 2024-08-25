import { useEffect, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import CommandPalette, {
  filterItems,
  getItemIndex,
  JsonStructureItem,
  useHandleOpenCommandPalette,
} from 'react-cmdk';
import { Link, useDispatch, useSelector } from 'umi';
import 'react-jinke-music-player/assets/index.css';
import './index.css';
import 'react-cmdk/dist/cmdk.css';
import { ALBUM, PLAY_LIST_SONG, SINGLE, SONG } from '@/type';
import { fetchLyrics } from '@/apis/album';
export default function Layout({ children, location }) {
  const [active, setActive] = useState('all');
  const [page, setPage] = useState<'root' | 'albums'>('root');
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  //已经加载过歌词的专辑列表
  const [loadedAlbums, setLoadedAlbums] = useState<string[]>([]);
  // 播放器配置
  const [options, setOptions] = useState<{
    audioLists: PLAY_LIST_SONG[];
    theme: string;
    locale: string;
    showMediaSession: boolean;
    autoPlay: boolean;
    toggleMode: boolean;
    mode: string;
    showLyric: boolean;
    showThemeSwitch: boolean;
    showReload: boolean;
    showDownload: boolean;
  }>({
    audioLists: [], // 初始时为空数组
    theme: 'dark',
    locale: 'zh_CN',
    showMediaSession: false,
    autoPlay: false,
    toggleMode: false,
    mode: 'full',
    showLyric: true,
    showThemeSwitch: false,
    showReload: false,
    showDownload: !window.location.href.includes('from=pake'),
  });
  const [nowAlbum, setNowAlbum] = useState('');
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.music.currentSong); //当前点击歌曲
  const albums = useSelector((state) => state.music.albums); //专辑列表
  const singles = useSelector((state) => state.music.singles); //单曲列表
  useHandleOpenCommandPalette(setOpen);

  // 格式化为播放器要求的歌单列表
  const albumToPlayList = async (album: ALBUM): Promise<PLAY_LIST_SONG[]> => {
    // 使用 Promise.all 来等待所有 fetchLyrics 的 Promise 完成
    const songsWithLyrics = await Promise.all(
      album.songs.map(async (v) => {
        const lyric = await fetchLyrics(v.lyric); // 等待 fetchLyrics 完成
        return {
          name: `${v.title} · ${album.album}`,
          musicSrc: v.url,
          cover: album.cover.replace(/ /g, '%20'),
          singer: v.artist,
          lyric: lyric, // 添加 lyric 到返回的对象中
        } as PLAY_LIST_SONG;
      }),
    );

    return songsWithLyrics;
  };
  const clearPlayList = () => {
    var deleteButton = document.querySelector(
      '.audio-lists-panel-header-delete-btn',
    );
    // 检查是否找到了元素
    if (deleteButton) {
      // 模拟点击事件
      deleteButton.click();
    } else {
      console.log('没有找到具有指定类名的元素');
    }
  };
  //切歌
  const changeSong = (song: SONG) => {
    const name = song.title;
    console.log(`切换到歌曲 ${name}`);
    //如果歌单被清空，需要重新设置列表到为此专辑
    if (song.album != nowAlbum) {
      changeAlbum(song);
      setNowAlbum(song.album);
    }
    const array = document.querySelectorAll('.audio-item');
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const target = element.querySelector('.player-name');
      if (target?.title.split(' · ')[0] === name) {
        target.click();
      }
    }
  };
  const changeAlbum = (song: SONG) => {
    console.log(loadedAlbums);
    //如果专辑没加载过，需要先加载
    if (!loadedAlbums.includes(song.album)) {
      const album = albums.find((v: SONG) => v.album === song.album);
      albumToPlayList(album).then((list) => {
        setOptions((prevOptions) => ({
          ...prevOptions,
          audioLists: list || [],
        }));
        setNowAlbum(song.album);
        loadedAlbums.push(song.album);
      });
    } else {
      console.log(`专辑${song.album}已经加载过，无需重新请求歌词`);
      setNowAlbum(song.album);
    }
  };
  const changeAlbumAndSong = (song: SONG) => {
    changeAlbum(song);
    //歌曲要延迟一下，不然播放列表可能没更新
    setTimeout(() => {
      changeSong(song);
    }, 500);
  };
  const addSingleToPlayList = (song: SINGLE) => {
    const target: SINGLE = singles.find((v: SINGLE) => v.title === song.title);
    fetchLyrics(target.lyric).then((lyric) => {
      const single: PLAY_LIST_SONG[] = [
        {
          name: target.title,
          singer: target.artist,
          cover: target.cover,
          musicSrc: target.url,
          lyric: lyric,
        },
      ];
      setOptions((prevOptions) => ({
        ...prevOptions,
        audioLists: single || [],
      }));
      setTimeout(() => {
        changeToSingle(song);
      }, 500);
    });
  };
  //切换单曲
  const changeToSingle = (single: SINGLE) => {
    const name = single.title;
    const array = document.querySelectorAll('.audio-item');
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const target = element.querySelector('.player-name');
      if (target?.title.split(' · ')[0] === name) {
        target.click();
      }
    }
  };
  //获取专辑列表
  const fetchAlbums = () => {
    dispatch({
      type: 'music/fetchAlbums',
    });
  };
  //获取专辑列表
  const fetchSingles = () => {
    dispatch({
      type: 'music/fetchSingles',
    });
  };
  useEffect(() => {
    if (currentSong) {
      // 歌曲变更
      console.log(`Now playing: ${currentSong.album}`);
      //是专辑歌曲
      if (currentSong.intro === undefined) {
        //专辑不变化
        if (currentSong.album === nowAlbum) {
          changeSong(currentSong);
        } else {
          //专辑发生变化
          console.log(`播放专辑从${nowAlbum}变更为${currentSong.album}`);
          changeAlbumAndSong(currentSong);
        }
      } else {
        //是单曲
        addSingleToPlayList(currentSong);
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (albums.length > 0) {
      albumToPlayList(albums[0]).then((list) => {
        //已经加载过专辑歌词
        loadedAlbums.push(albums[0].album);
        setOptions((prevOptions) => ({
          ...prevOptions,
          audioLists: list,
        }));
      });
    }
  }, [albums]);

  useEffect(() => {
    fetchAlbums();
    fetchSingles();
    // 清空播放列表绑定事件
    document.addEventListener('DOMContentLoaded', function () {
      var clearPlayListButton = document.querySelector(
        '.audio-lists-panel-header-delete-btn',
      );
      clearPlayListButton?.addEventListener('click', function () {
        // 按钮被点击时执行的代码
        setLoadedAlbums([]);
      });
    });
    document
      .querySelector('.music-player-panel')
      .classList.add('backdrop-blur-md');
    document
      .querySelector('.audio-lists-panel')
      .classList.add('backdrop-blur-md');
  }, []);

  const albumsCommandItems = albums.map((v: ALBUM) => {
    return {
      id: v.album,
      children: v.album,
      icon: 'MapIcon',
      closeOnSelect: true,
      href: `/#/album/${v.album}`,
    };
  });

  const backHome = [
    {
      id: 'home',
      children: '首页',
      icon: 'HomeIcon',
      href: '/',
    },
  ];

  const albumItems = filterItems(
    [
      {
        heading: 'Albums',
        id: 'albums',
        items: backHome.concat(albumsCommandItems) as JsonStructureItem[],
      },
    ],
    search,
  );

  const filteredItems = filterItems(
    [
      {
        heading: 'Home',
        id: 'home',
        items: [
          {
            id: 'home',
            children: '首页',
            icon: 'HomeIcon',
            href: '/',
          },
          {
            id: 'single',
            children: '单曲',
            icon: 'LifebuoyIcon',
            href: '/#/single',
          },
          {
            id: 'live',
            children: 'Live',
            icon: 'SunIcon',
            href: '/#/video',
          },
          {
            id: 'albums',
            icon: 'MapIcon',
            closeOnSelect: false,
            children: '专辑',
            onClick: () => {
              setPage('albums');
            },
          },
        ],
      },
      {
        heading: 'Other',
        id: 'advanced',
        items: [
          {
            id: 'developer',
            children: '参与贡献',
            icon: 'CodeBracketIcon',
            target: '_blank',
            href: 'https://github.com/EternalDung/ang',
          },
          // {
          //   id: 'star',
          //   children: '赞助我们',
          //   icon: 'StarIcon',
          //   href: '/#/star',
          // },
        ],
      },
    ],
    search,
  );

  return (
    <div className="w-screen h-screen bg-black text-white pl-64">
      {/* 左侧导航区 */}
      <div className="fixed top-0 left-0 w-64 h-screen p-10 pb-0 flex flex-col justify-between">
        <div>
          <h2 className="text-white text-3xl mb-4 font-bold">张韶涵</h2>

          {/* 搜索框 */}
          <div
            onClick={() => setOpen(true)}
            className="bg-gray-900 relative pointer-events-auto cursor-pointer"
          >
            <div className="w-full flex items-center text-sm leading-6 text-gray-400 rounded-md ring-1 ring-gray-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-gray-600 bg-gray-800 highlight-white/5 hover:bg-gray-700">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-3 flex-none"
              >
                <path
                  d="m19 19-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
              Search...
              <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                ⌘K
              </span>
            </div>
          </div>

          <h3 className="text-gray-500 text-sm py-1"></h3>
          <div className="space-y-4">
            <Link
              to="/"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname === '/' &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              💿<span className="pl-4">专辑</span>
            </Link>
            <Link
              to="/single"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname.startsWith('/single') &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              🎸<span className="pl-4">单曲</span>
            </Link>
            <Link
              to="/video"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname.startsWith('/video') &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              🔥<span className="pl-4">Live</span>
            </Link>
            {/* <Link
              to="/"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname.startsWith('/about') &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              🧑<span className="pl-4">自传</span>
            </Link> */}
            <Link
              to="/download"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer 
              ${
                location.pathname.startsWith('/download') &&
                'bg-green-500 shadow shadow-green-500/50'
              } ${window.location.href.includes('from=pake') && 'hidden'}`}
              onClick={() => setActive('download')}
            >
              📦<span className="pl-4">APP</span>
            </Link>
            <Link
              to="/"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer 
              ${
                location.pathname.startsWith('/star') &&
                'bg-green-500 shadow shadow-green-500/50'
              } ${window.location.href.includes('from=pake') && 'hidden'}`}
              onClick={() => setActive('star')}
            >
              🌟<span className="pl-4">赞助</span>
            </Link>
          </div>

          {/* <br />

          <h3 className="text-gray-500 text-sm mt-8 mb-4">友情赞助</h3>
          <div className="space-y-2">
            <Link
              to="/star"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer ${
                location.pathname.startsWith('/star') &&
                'bg-gradient-to-t from-green-700 to-green-500 shadow shadow-green-500/50'
              }`}
              onClick={() => setActive('star')}
            >
              🧡<span className="pl-4">好物</span>
            </Link>
          </div> */}
        </div>

        <img
          className="w-36 opacity-50"
          src={require('@/assets/ang.png')}
          alt=""
        />
      </div>
      {/* 右侧路由区 */}
      <div className="w-[100% - 256px] h-screen overflow-y-auto px-8 py-10">
        {children}
      </div>
      {/* 播放器组件 */}
      <ReactJkMusicPlayer {...options} />
      <a
        id="github-link"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'white',
        }}
        href="https://github.com/EternalDung/ang"
        title="Follow me on GitHub"
        aria-label="Follow me on GitHub"
        rel="noopener"
        target="_blank"
      >
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
            className="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>

      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
        page={page}
      >
        <CommandPalette.Page id="root">
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>

        <CommandPalette.Page id="albums">
          {albumItems.length ? (
            albumItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(albumItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>
      </CommandPalette>
    </div>
  );
}
