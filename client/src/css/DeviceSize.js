const size = {
  desktop: '1920px',
  laptopL: '1600px',
  laptopS: '1024px',
  // 모바일은 봐서 진행
  mobile: '425px'
}

export const devices = {
  desktop: `(max-width: ${size.desktop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  laptop: `(max-width: ${size.laptopS})`,
  mobile: `(max-width: ${size.mobile})`,
}