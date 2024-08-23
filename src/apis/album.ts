export const getAlbumListAPI = async () => {
  try {
    const response = await fetch(
      'https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/audio/list-1.2.js',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getSingleList = async () => {
  try {
    const response = await fetch(
      'https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/single/list.js',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const fetchLyrics = async (lyricUrl: string) => {
  try {
    // 发送GET请求到lyricUrl
    const response = await fetch(lyricUrl);

    // 检查响应是否成功（状态码在200-299之间）
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 读取响应体为文本（假设歌词是文本格式）
    const lyrics = await response.text();

    // 返回歌词文本
    return lyrics;
  } catch (error) {
    // 处理错误
    console.error('Error fetching lyrics:', error);
    throw error; // 可以选择重新抛出错误，或者返回一个错误消息
  }
};
