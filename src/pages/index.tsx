import { useEffect, useState } from 'react';
import { Link } from 'umi';

const LIVE = [
  {
    title: '张韶涵live',
    post: '/post/a7.jpg',
  },
];

interface IAlbum {
  id: string;
  cover: string;
  name: string;
}

interface IAlbumList extends Array<IAlbum> {}

interface ISong {
  artist: string;
  cover: string;
  name: string;
  url: string;
}

interface ISongList extends Array<ISong> {}

export default function IndexPage() {
  return (
    <>
      <div className="text-3xl font-bold">专辑</div>
      <div className="text-xl py-4">Hi 朋友，今日为你推荐</div>

      <div className="flex flex-wrap">
        <Link className="mr-6 mb-8 hover:text-white text-white" to={`/`}>
          <div className="block text-white w-[410px] h-48 rounded-xl overflow-hidden">
            <video
              className="w-full"
              poster="/post/angela-2.jpg"
              loop
              muted
              autoPlay
            >
              <source
                src="https://mvwebfs.hw.kugou.com/202408171812/7e680cc049bc97eb0c4d3d9f2e76dae6/v2/becec101ead43b22d1831bd95359712b/G087/M01/0B/14/N5QEAFiIGE2Afi1UAd3LgCtKSTU526.mp4"
                type="video/mp4"
              />
            </video>
            <img
              className="object-cover w-full h-48 rounded-xl transition transform hover:scale-105 cursor-pointer"
              src="/post/angela-2.jpg"
              alt="cover"
            />
          </div>
          <div className="pt-4 text-center">谢谢你们 · 丰富了我的人生</div>
        </Link>
        {(window.album as IAlbumList).map((v, i) => (
          <Link
            className="mr-6 mb-8 hover:text-white text-white"
            key={v.id}
            to={`/album/${v.id}`}
          >
            <img
              className="w-48 h-48 rounded-xl transition transform hover:scale-105 cursor-pointer"
              src={v.cover}
              alt="cover"
            />
            <div className="pt-4 text-center">{v.name}</div>
          </Link>
        ))}
      </div>

      <br />

      <div className="text-3xl font-bold py-6">Live 现场</div>
      {/* Live现场 */}
      <div className="flex flex-wrap">
        {LIVE.map((v, i) => (
          <Link
            className="mr-6 mb-8 hover:text-white text-white"
            key={v.title}
            to="/video"
          >
            <img
              className="w-48 h-48 rounded-xl transition transform hover:scale-110 cursor-pointer"
              src={v.post}
              alt="cover"
            />
            <div className="pt-4">{v.title}</div>
          </Link>
        ))}
      </div>

      <br />
      <br />
    </>
  );
}
