import { defineConfig } from 'umi';

export default defineConfig({
  title: '张韶涵音乐作品播放器',
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: '/favico.png',
  hash: true,
  history: {
    type: 'hash',
  },
  metas: [
    {
      name: 'keywords',
      content: '张韶涵，音乐作品集，专辑，播放器',
    },
    {
      name: 'description',
      content: '张韶涵音乐作品专属播放器',
    },
  ],
  // analytics: {
  //   baidu: '023e4ef604935de6708edb9e61f17191',
  // },
  scripts: [
    `
    if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      window.alert('暂不支持移动端，请用电脑端！');
    }
    `,
    'https://testingcf.jsdelivr.net/gh/EternalDung/song@a10/audio/list.js',
    `
    const groupBy = (arr, fn) =>
      arr
        .map(typeof fn === 'function' ? fn : val => val[fn])
        .reduce((acc, val, i) => {
          acc[val] = (acc[val] || []).concat(arr[i]);
          return acc;
        }, {});
    const obj = groupBy(window.list, 'artist');
    window.album = Object.keys(obj).map(a => ({
      id: a,
      name: a.replace('专辑-', ''),
      cover: obj[a][1]['cover']
    }));
    `,
  ],
  fastRefresh: {},
});
