// Config cors options
const allowedOrigins = process.env.ACCEPTABLE_ORIGINS.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    // Mobile apps, curl and postman do not have origin, so they will be blocked
    if (!origin) {
      return callback(
        new Error('Only requests with origin are accepted.'),
        false
      );
    }

    // Mind the ! below: the conditional is true if NOT included
    if (!allowedOrigins.includes(origin)) {
      const msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true,
};

module.exports = corsOptions;
