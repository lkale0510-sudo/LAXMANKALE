export const buildUploadUrl = (req, fileName) => {
  if (!fileName) return "";
  return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
};

export const getFileNameFromUrl = (url = "") => {
  if (!url) return "";
  const segments = url.split("/");
  return segments[segments.length - 1] || "";
};
