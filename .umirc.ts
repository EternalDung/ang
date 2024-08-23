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

  scripts: [
    `
    if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      window.alert('暂不支持移动端，请用电脑端！');
    }
    `,
    ,
  ],
  fastRefresh: {},
});
