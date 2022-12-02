import { img } from "../api";
/**
 * 이미지 가져오기
 * 
 * @param {string} imgUrl 
 */
export default function getImg(imgUrl) {
  if (imgUrl.startsWith("http")) {
    return imgUrl;
  } else {
    return img.getImg(imgUrl);
  }
}