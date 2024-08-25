import { Link, useDispatch, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import { SINGLE } from '@/type';

export default function Single() {
  const singles = useSelector((state) => state.music.singles) as SINGLE[];
  const dispatch = useDispatch();
  const onClick = (s: SINGLE) => {
    dispatch({
      type: 'music/setCurrentSong',
      payload: s,
    });
  };
  useEffect(() => {}, [singles]);
  return (
    <>
      <div className="text-3xl font-bold">单曲</div>
      <div className="text-xl py-4">听见张韶涵的声音</div>

      <div className="flex flex-wrap">
        <div className="mr-6 mb-8 hover:text-white text-white">
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
        </div>
        {singles?.map((v, i) => (
          <div
            className="mr-6 mb-8 hover:text-white text-white"
            key={v.title}
            onClick={() => onClick(v)}
          >
            <img
              className="w-48 h-48 rounded-xl transition transform hover:scale-105 cursor-pointer"
              src={v.cover}
              alt="cover"
            />
            <div className="pt-4 text-center">{v.title}</div>
          </div>
        ))}
      </div>

      <br />

      <br />
      <br />
    </>
  );
}
