import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/image',
  timeout: 4000,
  headers: {
    Authorization: `Client-ID bd9081c611b721f`,
  },
});

export const uploadImage = file => {
  const formData = new FormData();
  formData.append('image', file);
  return instance.post('', formData).then(res => {
    const { data: { data: result } } = res;
    return {
      uid: result.id,
      name: result.link,
      url: result.link,
      thumbUrl: result.link,
      status: 'done',
    }
  });
};
