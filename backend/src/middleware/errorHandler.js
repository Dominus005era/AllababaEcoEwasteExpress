const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  console.error('[Error]:', err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.errors
    });
  }

  // Handle specific application errors here
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // Generic fallback error
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

module.exports = errorHandler;
