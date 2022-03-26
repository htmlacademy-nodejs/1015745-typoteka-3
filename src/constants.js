'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const EXIT_CODE = {
  ERROR: 1,
  SUCCESS: 0,
};

const DATA_PATH = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  EXIT_CODE,
  DATA_PATH
};
