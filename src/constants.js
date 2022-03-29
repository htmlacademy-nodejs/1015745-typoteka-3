'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const EXIT_CODE = {
  ERROR: 1,
  SUCCESS: 0,
};

const MOCKS_OUTPUT_FILENAME = `mocks.json`;

const DATA_PATH = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const DEFAULT_SERVER_PORT = 3000;

const HTTP_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  EXIT_CODE,
  DATA_PATH,
  MOCKS_OUTPUT_FILENAME,
  DEFAULT_SERVER_PORT,
  HTTP_CODE
};
