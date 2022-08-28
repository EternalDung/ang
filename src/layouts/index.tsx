import { useEffect, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import { Link } from 'umi';
import 'react-jinke-music-player/assets/index.css';
import './index.css';

const audioLists = window.list?.map((v) => {
  return {
    name: `${v.name} · ${v.artist}`.replace('专辑-', ''),
    musicSrc: v.url,
    cover: v.cover,
    singer: '李志',
  };
});

const options = {
  audioLists,
  theme: 'dark',
  locale: 'zh_CN',
  showMediaSession: true,
  autoPlay: false,
  toggleMode: false,
  mode: 'full',
  showLyric: true,
};

export default function Layout({ children, location }) {
  const [active, setActive] = useState('all');

  useEffect(() => {
    document
      .querySelector('.music-player-panel')
      .classList.add('backdrop-blur-md');
    document
      .querySelector('.audio-lists-panel')
      .classList.add('backdrop-blur-md');
  }, []);

  debugger;

  return (
    <div className="w-screen h-screen bg-black text-white pl-64">
      <div className="fixed top-0 left-0 w-64 h-screen p-10 pb-0 flex flex-col justify-between">
        <div>
          <h2 className="text-white text-3xl mb-4 font-bold">李志</h2>

          <div className="bg-gray-900 relative pointer-events-auto">
            <button
              type="button"
              className="w-full flex items-center text-sm leading-6 text-gray-400 rounded-md ring-1 ring-gray-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-gray-600 bg-gray-800 highlight-white/5 hover:bg-gray-700"
            >
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
            </button>
          </div>

          <h3 className="text-gray-500 text-sm mt-8 mb-4">所有作品</h3>
          <ul className="space-y-2">
            <Link
              to="/"
              className={`block hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer ${
                location.pathname === '/' &&
                'bg-gradient-to-t from-green-700 to-green-500 shadow shadow-green-500/50'
              }`}
            >
              🔢<span className="pl-4">全部</span>
            </Link>
            <Link
              to="/album/专辑-梵高先生"
              className={`block hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer ${
                location.pathname.startsWith('/album') &&
                'bg-gradient-to-t from-green-700 to-green-500 shadow shadow-green-500/50'
              }`}
            >
              💿<span className="pl-4">专辑</span>
            </Link>
            <Link
              to="/video"
              className={`block hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer ${
                location.pathname.startsWith('/video') &&
                'bg-gradient-to-t from-green-700 to-green-500 shadow shadow-green-500/50'
              }`}
            >
              ⚡<span className="pl-4">Live</span>
            </Link>
          </ul>

          <br />

          <h3 className="text-gray-500 text-sm mt-8 mb-4">友情赞助</h3>
          <ul className="space-y-2">
            <Link
              to="/star"
              className={`block hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer ${
                location.pathname.startsWith('/star') &&
                'bg-gradient-to-t from-green-700 to-green-500 shadow shadow-green-500/50'
              }`}
              onClick={() => setActive('star')}
            >
              🧡<span className="pl-4">打赏</span>
            </Link>
          </ul>
        </div>

        <img
          className="w-36 opacity-50"
          src={require('@/assets/lizhi.png')}
          alt=""
        />
      </div>
      <div className="w-[100% - 256px] h-screen overflow-y-auto p-10">
        {children}
      </div>
      <ReactJkMusicPlayer {...options} />
      <a
        id="github-link"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: 'white',
        }}
        href="https://github.com/turkyden/lizhi-app"
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
    </div>
  );
}
