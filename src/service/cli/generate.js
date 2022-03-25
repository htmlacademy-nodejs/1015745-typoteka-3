'use strict';

const {writeFile} = require(`fs`);
const {promisify} = require(`util`);
const {EXIT_CODE} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  getRandomDate
} = require(`../../utils`);

const OUTPUT_FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const MAX_PAST_DATE_INTERVAL = 90;
const ANNOUNCE_RESTRICT = {
  MIN: 1,
  MAX: 5
};

const currentTime = Date.now();
const maxPastTime = new Date(currentTime).setDate(new Date(currentTime).getDate() - MAX_PAST_DATE_INTERVAL);

const createPost = () => (
  {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(0, getRandomInt(ANNOUNCE_RESTRICT.MIN, ANNOUNCE_RESTRICT.MAX)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length)).join(` `),
    createdDate: getRandomDate(maxPastTime, currentTime),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length))
  }
);

const generatePosts = (count) => (
  Array.from({length: count}, createPost)
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countPosts = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPosts > MAX_POSTS) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(EXIT_CODE.ERROR);
    }

    const content = JSON.stringify(generatePosts(countPosts));

    try {
      await promisify(writeFile)(OUTPUT_FILE_NAME, content);
      console.log(`Mock file created.`);
    } catch (error) {
      console.error(`Can't write data to file...`);
      process.exit(EXIT_CODE.ERROR);
    }
  }
};
