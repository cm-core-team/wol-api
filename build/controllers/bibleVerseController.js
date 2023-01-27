import getHTML from "../utils/getHTML.js";
import catchAsync from "../utils/catchAsync.js";
const getVerse = catchAsync(async (req, res, next) => {
    const idString = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;
    const html = await getHTML(`https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.book}:${req.params.chapter}:${req.params.verse}`);
    const verse = html
        .getElementById(idString)
        .text.replace(/[0-9+*]/g, "")
        .trim();
    if (!verse) {
        res.status(400).json({
            error: "Invalid entry, please check your request and retry.",
        });
        next(new Error("Result is undefined!"));
    }
    res.status(200).json({ data: verse });
});
const getVersesAmount = catchAsync(async (req, res, next) => {
    const html = await getHTML(`https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`);
    if (!html)
        next(new Error("There seems to be an issue. Please try again later"));
    const amount = html.querySelectorAll(".v").length;
    res.status(200).json({ data: amount });
});
const getNumberOfChapters = catchAsync(async (req, res, next) => {
    const html = await getHTML(`https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty/${req.params.book}`);
    if (!html)
        next(new Error("Server is not responding"));
    const amount = html.querySelectorAll(".chapter").length;
    res.status(200).json({ data: amount });
});
export { getVerse, getVersesAmount, getNumberOfChapters };
