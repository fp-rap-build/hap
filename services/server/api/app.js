const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const jsdocConfig = require('../config/jsdoc');
const authRequired = require('./middleware/authRequired');
const { lowerCaseEmail } = require('./routes/auth/validators');

const config_result = dotenv.config();
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

// ###[  Routers ]###
const indexRouter = require('./routes/index/indexRouter');
const userRouter = require('./routes/users/userRouter');
const dsRouter = require('./routes/dsService/dsRouter');
const orgRouter = require('./routes/organizations/org-router');
const addrRouter = require('./routes/addresses/addr-router');
const authRouter = require('./routes/auth/authRouter');
const requestsRouter = require('./routes/requests/requestsRouter');
const commentsRouter = require('./routes/comments/commentsRouter');
const documentsRouter = require('./routes/documents');
const analyticsRouter = require('./routes/analytics/analytics.router');
const programsRouter = require('./routes/programs');
const subscriptionsRouter = require('./routes/subscriptions');
const notificationsRouter = require('./routes/notifications');
const incomesRouter = require('./routes/incomes/incomes-router');
const paymentsRouter = require('./routes/payments');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Lower case all email addresses passed through the hap
app.use(lowerCaseEmail);

// application routes
app.use('/', indexRouter);
app.use('/programs', programsRouter);
app.use('/auth', authRouter);
app.use(['/user', '/users'], userRouter);
app.use('/data', dsRouter);
app.use('/orgs', orgRouter);
app.use('/addrs', addrRouter);
app.use('/requests', authRequired, requestsRouter);
app.use('/comments', authRequired, commentsRouter);
app.use('/documents', authRequired, documentsRouter);
app.use('/analytics', authRequired, analyticsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/notifications', notificationsRouter);
app.use('/incomes', incomesRouter);
app.use('/payments', paymentsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }

  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
