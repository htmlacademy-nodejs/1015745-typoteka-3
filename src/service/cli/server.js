'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {readFile} = require(`fs`).promises;
const {
  DEFAULT_SERVER_PORT,
  MOCKS_OUTPUT_FILENAME
} = require(`../../constants`);

const app = express();
app.use(express.json());


app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await readFile(MOCKS_OUTPUT_FILENAME);
    const mocks = JSON.parse(fileContent);

    res.json(mocks);
  } catch (err) {
    res.send([]);
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_SERVER_PORT;

    app
      .listen(port, () => {
        return console.info(chalk.green(`Server connected on port ${port}`));
      })
      .on(`error`, ({message}) => {
        return console.error(chalk.red(`Server error:`, message));
      });
  }
};
