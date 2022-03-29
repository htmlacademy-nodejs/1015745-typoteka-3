'use strict';

const chalk = require(`chalk`);
const {createServer} = require(`http`);
const {readFile} = require(`fs`).promises;
const {
  HTTP_CODE,
  DEFAULT_SERVER_PORT,
  MOCKS_OUTPUT_FILENAME
} = require(`../../constants`);

const getHTMLTemplate = (statusCode, content) => {
  let htmlContent = ``;

  if (statusCode === HTTP_CODE.SUCCESS) {
    htmlContent = `<ul>${content}</ul>`;
  }

  if (statusCode === HTTP_CODE.NOT_FOUND) {
    htmlContent = `<p>${content}</p>`;
  }

  return (
    `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <title>Node Server Example</title>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `
  );
};

const sendResponce = (res, code, content) => {
  const htmlResponce = getHTMLTemplate(code, content);

  res.writeHead(code, {
    'Content-Type': `text/html; charset=UTF-8`
  });

  res.statusCode = code;
  res.end(htmlResponce);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await readFile(MOCKS_OUTPUT_FILENAME);
        const responceContent = JSON.parse(fileContent).map((post) => `<li>${post.title}</li>`).join(``);

        sendResponce(res, HTTP_CODE.SUCCESS, responceContent);
      } catch (err) {
        sendResponce(res, HTTP_CODE.NOT_FOUND, `Not found`);
      }
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_SERVER_PORT;

    const server = createServer(onClientConnect)
    .listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Server connection error`, err));
      }

      return console.info(chalk.green(`Server connected on port ${port}`));
    });

    server.on(`error`, ({message}) => {
      return console.error(chalk.red(`Server error`, message));
    });
  }
};
