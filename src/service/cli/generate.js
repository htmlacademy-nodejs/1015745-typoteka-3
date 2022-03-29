'use strict';

const chalk = require(`chalk`);
const {writeFile, readFile} = require(`fs`).promises;
const {EXIT_CODE, DATA_PATH, MOCKS_OUTPUT_FILENAME} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  getRandomDate
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const MAX_PAST_DATE_INTERVAL = 90;
const ANNOUNCE_RESTRICT = {
  MIN: 1,
  MAX: 5
};

const currentTime = Date.now();
const maxPastTime = new Date(currentTime).setDate(new Date(currentTime).getDate() - MAX_PAST_DATE_INTERVAL);

const readFileContent = async (filePath) => {
  try {
    const fileContent = await readFile(filePath, `utf-8`);
    return fileContent.trim().split(`\n`);
  } catch (error) {
    console.error(chalk.red(`Reading file Error`));
    console.error(error);
    return [];
  }
};

const createPost = ({titles, sentences, categories}) => (
  {
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, getRandomInt(ANNOUNCE_RESTRICT.MIN, ANNOUNCE_RESTRICT.MAX)).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(` `),
    createdDate: getRandomDate(maxPastTime, currentTime),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length))
  }
);

const generatePosts = (count, data) => {
  try {
    return Array.from({length: count}, () => (createPost(data)));
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const getCategories = readFileContent(DATA_PATH.CATEGORIES);
    const getSentences = readFileContent(DATA_PATH.SENTENCES);
    const getTitles = readFileContent(DATA_PATH.TITLES);

    const [categories, sentences, titles] = await Promise.all([
      getCategories,
      getSentences,
      getTitles
    ]);

    const [count] = args;
    const countPosts = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPosts > MAX_POSTS) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(EXIT_CODE.ERROR);
    }

    const content = JSON.stringify(generatePosts(countPosts, {categories, sentences, titles}));

    try {
      await writeFile(MOCKS_OUTPUT_FILENAME, content);
      console.log(chalk.green(`Mock file created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(EXIT_CODE.ERROR);
    }
  }
};
