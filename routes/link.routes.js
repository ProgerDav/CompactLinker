const { Router } = require("express");
const Link = require("../models/Link");
const shortid = require("shortid");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const router = Router();
const getMetaTags = require("../helpers/LinkPreview");

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user._id });
    res.json(links);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occured. Try again later" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    const metaData = await getMetaTags(link.from);
    res.json({ link, metaData });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occured. Try again later" });
  }
});

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();
    const existing = await Link.findOne({ from, owner: req.user._id });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user._id,
    });

    await link.save();

    res.status(201).json(link);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occured. Try again later" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!link) return res.status(404).json({ message: "Link not found" });

    await link.delete();

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occured. Try again later" });
  }
});

module.exports = router;
