import { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import Hls from 'hls.js';

const videoList = [
  {
    name: '有形的翅膀 MV',
    url: 'https://mvwebfs.tx.kugou.com/202408152039/4e8f8a85b89c557e1d515777f9c812e9/v2/becec101ead43b22d1831bd95359712b/G087/M01/0B/14/N5QEAFiIGE2Afi1UAd3LgCtKSTU526.mp4',
  },
  {
    name: '淋雨一直走',
    url: '',
  },
  {
    name: '阿刁',
    url: '',
  },
  {
    name: '破茧',
    url: '',
  },
];

function Video() {
  const ref = useRef<HTMLMediaElement>();

  const hls = useRef(null);

  const [index, setIndex] = useState(2);

  useEffect(() => {
    document.querySelector('.music-player-audio')?.pause();
    const video = ref.current;
    const videoSrc = videoList[index].url;
    if (Hls.isSupported()) {
      hls.current = new Hls();
      hls.current.loadSource(videoSrc);
      hls.current.attachMedia(video);
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  }, []);

  const handleSelect = (index) => {
    setIndex(index);
    hls.current.loadSource(videoList[index].url);
    hls.current.attachMedia(ref.current);
  };

  return (
    <>
      <Link
        className="fixed flex items-center group hover:text-white cursor-pointer text-white"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition transform group-hover:-translate-x-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="pl-2">Back</span>
      </Link>

      <div className="text-3xl font-bold mt-6">Live</div>
      <div className="text-xl py-4">欣赏盛世美颜</div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          {/* <div className="text-3xl font-bold pb-4">Live 现场</div> */}
          <div className="w-[800px] border-solid border-white/5 border shadow-xl">
            <video
              className="w-full"
              controls
              autoplay="autoplay"
              ref={ref}
            ></video>
          </div>
          <div className="pt-10 grid grid-cols-2 gap-2">
            {videoList.map((v, k) => (
              <div
                key={k}
                className={`col-span-1 py-2 bg-white/10 px-4 cursor-pointer hover:bg-white/20 transition ${
                  index === k && 'text-green-500'
                }`}
                onClick={() => handleSelect(k)}
              >
                VOL . {v.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
