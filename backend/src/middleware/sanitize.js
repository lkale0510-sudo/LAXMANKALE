const trimObjectStrings = (value) => {
  if (Array.isArray(value)) {
    return value.map(trimObjectStrings);
  }

  if (value && typeof value === "object") {
    Object.keys(value).forEach((key) => {
      value[key] = trimObjectStrings(value[key]);
    });
    return value;
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return value;
};

export const sanitizeBody = (req, _res, next) => {
  if (req.body) {
    req.body = trimObjectStrings(req.body);
  }
  next();
};
