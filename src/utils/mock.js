import Mock from 'mockjs';
const Random = Mock.Random;

function getCarInfo() {
  let datalist = [];
  const provience = [
    '京',
    '津',
    '冀',
    '晋',
    '辽',
    '吉',
    '黑',
    '沪',
    '苏',
    '浙',
    '皖',
    '闽',
    '赣',
    '鲁',
    '豫',
    '鄂',
    '湘',
    '粤',
    '桂',
    '琼',
    '渝',
    '藏',
    '青',
    '宁',
    '新',
    '港',
    '澳',
    '台',
  ]; // 省份名
  const alpah = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // 字母表中的字
  for (let i = 0; i < 10; i++) {
    let newData = {
      car_id:
        Random.pick(provience) +
        alpah.charAt(Random.natural(0, 23)) +
        Random.natural(1, 9) +
        alpah.charAt(Random.natural(0, 23)) +
        Random.natural(10, 99),
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    datalist.push(newData);
  }
  return {
    data: datalist,
  };
}

const carInfo = Mock.mock('/getCarInfo', getCarInfo);
// const data1 = Mock.mock('/setMsg', setMsg);
export default { carInfo };
