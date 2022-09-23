const info = (...params: any) => {
  console.info('ℹ️', params);
};

const error = (...params: any) => {
  console.error('🟥 ', params);
};

export default {
  info,
  error,
};
