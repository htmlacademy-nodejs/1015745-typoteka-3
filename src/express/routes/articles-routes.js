'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(req.originalUrl));
articlesRouter.get(`/add`, (req, res) => res.render(req.originalUrl));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(req.originalUrl));
articlesRouter.get(`/:id`, (req, res) => res.render(req.originalUrl));

module.exports = articlesRouter;
