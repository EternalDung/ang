<h1 align="center">张韶涵·Angela</h1>

<p align="center">开箱即用，一个珍藏了张韶涵音乐作品集的在线播放器</p>

<div align="center">

[//]: # (  <a href="https://github.com/EternalDung/ang" target="_blank">：：：✨ Live Demo ✨ ：：：</a>)
</div>

<br/>

![logos](https://testingcf.jsdelivr.net/gh/EternalDung/ang@main/screenshot-v1.png)


## 🌏 永久托管

所有资源托管于 Github 仓库, 使用 [jsdelivr](https://www.jsdelivr.com/) CDN 全球加速，你可以这样下载一首歌：

```
https://testingcf.jsdelivr.net/gh/EternalDung/song@master/audio/${专辑名称}/${歌名}.mp3
```

专辑歌单索引 [list.js](https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/list-1.2.js)，会前端开发的小伙伴可以基于曲库资源 DIY 你自己的播放器 ！

```js
[
  //A10
 {
    "artist": "张韶涵",
    "album": "？",
    "publish": "2019-12-18",
    "company": "心喜文化",
    "cover": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/cover.png",
    "intro": "手工完善",
    "songs": [
      {
        "title": "作势装腔",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/作势装腔.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/作势装腔.lrc"
      },
      {
        "title": "别",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/别.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/别.lrc"
      },
      {
        "title": "因“我”而起",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/因“我”而起.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/因“我”而起.lrc"
      },
      {
        "title": "常",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/常.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/常.lrc"
      },
      {
        "title": "引路的风筝",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/引路的风筝.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/引路的风筝.lrc"
      },
      {
        "title": "我",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/我.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/我.lrc"
      },
      {
        "title": "无度",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/无度.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/无度.lrc"
      },
      {
        "title": "河",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/河.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/河.lrc"
      },
      {
        "title": "给还没出现的你",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/给还没出现的你.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/给还没出现的你.lrc"
      },
      {
        "title": "还",
        "artist": "张韶涵",
        "album": "？",
        "url": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/还.mp3",
        "lyric": "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/？/还.lrc"
      }
    ]
  },
  //...其他专辑
]
```

## 📹 Live 现场

- null


## 💿 作品专辑

| :zap: **LIVE**           | 💿 **专辑**           |
| :------------------------: | :------------------------: |
|                          | Over The Rainbow         |
|                          | 欧若拉                    |
|                          | 潘朵拉                    |
|                          | 梦里花                    |
|                          | Ang 5.0                   |
|                          | 第5季                     |
|                          | 有形的翅膀                |
|                          | Angela Zhang             |
|                          | 全面沦陷                  |
|                          | ？                        |

## TODO
- [x] 修复专辑存在同名歌曲无法播放/封面不正常显示
- [x] 实现单曲功能
- [x] 适配歌词
- [ ] 换个favicon
- [ ] 补充单曲
- [ ] 调整专辑封面大小，加快加载速度
- [ ] 专辑歌曲增加索引
- [ ] Live
- [ ] MV

## 参与贡献

Installed the dependencies of project.

```bash
npm install
```

Run the app with npm script.

```bash
npm run start
```

## 跨平台

基于 [Pake](https://github.com/tw93/Pake) 打包的跨平台客户端应用 App，也支持车载系统中使用。


## 支持者


## 版权声明

版权全部归于张韶涵所有，本人仅从互联网搜集资源进行合并整理。

[MIT](./LICENSE) & Copyright © 1998 - 2024 Angela. All Rights Reserveds.
