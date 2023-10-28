import { Console } from '@woowacourse/mission-utils';

class App {
  constructor() {
    this.racingResult = new Map();
  }

  static isVaildCarList(input, carList) {
    const overMaxLengthReg = /[^,]{6,}/;

    if (input.match(overMaxLengthReg)) {
      throw new Error('[ERROR] 자동차 이름은 최대 5자까지 가능합니다!');
    } else if (carList.includes('')) {
      throw new Error('[ERROR] 자동차 이름은 최소 1자 이상 적어주세요!');
    } else if (carList.length !== new Set(carList).size) {
      throw new Error('[ERROR] 자동차 이름은 중복될 수 없습니다!');
    } else if (carList.length === 1) {
      throw new Error(
        '[ERROR] 참여자가 한 명뿐이라 경주가 열리지 않았습니다..🤔',
      );
    }
  }

  static isValidCount(count) {
    if (!(Number.isInteger(count) && count > 0)) {
      throw new Error('[ERROR] 1 이상의 정수를 입력해주세요!');
    }
  }

  initializeDistance(carList) {
    carList.forEach((car) => this.racingResult.set(car, ''));
  }

  async play() {
    const inputCarList = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );
    const carList = inputCarList.split(',');
    App.isVaildCarList(inputCarList, carList);

    const inputCount = await Console.readLineAsync(
      '시도할 횟수는 몇 회인가요?\n',
    );
    const count = Number(inputCount);
    App.isValidCount(count);

    this.initializeCarDistance(carList);
  }
}

export default App;
