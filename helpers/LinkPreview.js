const { linkPreview } = require("link-preview-node");

const getMetaTags = async (link) => {
  try {
    return await linkPreview(link);
  } catch (e) {
    return {};
  }
};

module.exports = getMetaTags;
