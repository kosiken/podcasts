export const setTitle = (title: string, maxlen: number) => {
  if (title.length > maxlen) return title.slice(0, maxlen - 6) + '...';
  return title;
}

export const durationToStr = (dur: number) => {
  let n = (Math.floor(dur / 60)) + ":";
  let b = (dur % 60).toString();
  b = b.length < 2 ? ('0' + b) : b
  return n + b;
}

