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

歌单索引 [list.js](https://testingcf.jsdelivr.net/gh/nj-lizhi/song@master/audio/list-v2.js)，会前端开发的小伙伴可以基于曲库资源 DIY 你自己的播放器 ！

```js
[
  {
    name: "不想懂得",
    artist: "专辑-Ang 5.0",
    url: "https://testingcf.jsdelivr.net/gh/EternalDung/song@main/audio/Ang 5.0/不想懂得.mp3",
    cover:
      "https://testingcf.jsdelivr.net/gh/EternalDung/song@main/audio/Ang 5.0/cover.png",
  },
  {
    name: "不想懂得（钢琴弦乐演奏版）",
    artist: "专辑-Ang 5.0",
    url: "https://testingcf.jsdelivr.net/gh/EternalDung/song@main/audio/Ang 5.0/不想懂得(钢琴弦乐演奏版).mp3",
    cover:
      "https://testingcf.jsdelivr.net/gh/EternalDung/song@main/audio/Ang 5.0/cover.png",
  }]
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
- [ ] 更换更小的封面，加快加载速度
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
