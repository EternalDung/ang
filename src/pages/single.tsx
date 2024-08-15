import { Link } from 'umi';
import { useState } from 'react';

export default function Single(props) {
  const [currDownloadingName, setcurrDownloadingName] = useState('');
  const artist = props.match.params.id;

  const albumList = window.list.filter((v) => v.artist === artist);

  const onClick = (name: string) => {
    const array = document.querySelectorAll('.audio-item');
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const target = element.querySelector('.player-name');
      if (target?.title.split(' · ')[0].includes(name)) {
        target.click();
      }
    }
  };

  return (
    <>
      <div className="text-3xl font-bold">单曲</div>
      <div className="text-xl py-4">听见张韶涵的声音</div>

      <div className="flex flex-wrap">
        <Link className="mr-6 mb-8 hover:text-white text-white" to={`/`}>
          <div className="block text-white w-[410px] h-48 rounded-xl overflow-hidden">
            {/* <video className='w-full' poster='https://www.lizhi334.com/wp-content/uploads/2022/08/lizhi-20-scaled.jpeg' loop muted autoPlay>
                  <source src="https://www.lizhi334.com/wp-content/uploads/2022/03/%E9%A6%96%E9%A1%B5.mp4" type='video/mp4' />
                </video> */}
            <img
              className="object-cover w-full h-48 rounded-xl transition transform hover:scale-105 cursor-pointer"
              src="/post/angela-1.jpg"
              alt="cover"
            />
          </div>
          <div className="pt-4 text-center">
            人都会随着时间变老 · 心态不老就好了
          </div>
        </Link>
        {(window.album as IAlbumList).map((v, i) => (
          <div
            className="mr-6 mb-8 hover:text-white text-white"
            key={v.id}
            onClick={() => onClick(v.name)}
          >
            <img
              className="w-48 h-48 rounded-xl transition transform hover:scale-105 cursor-pointer"
              src={v.cover}
              alt="cover"
            />
            <div className="pt-4 text-center">{v.name}</div>
          </div>
        ))}
      </div>

      <br />

      <br />
      <br />
    </>
  );
}
