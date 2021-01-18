const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    let data = [];

    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.goto('https://juejin.cn/');

    let names = await page.$$eval(
        '#juejin > div.view-container.container > main > div > div > div > div > div > div > ul > div > li > div > div > div > div > div > div.info-row.meta-row > ul > li.item.username.clickable > div > a',
        (links) => links.map((x) => x.innerText)
    );
    let titles = await page.$$eval(
        '.title',
        (links) => links.map((x) => x.innerText)
    );
    let likes = await page.$$eval(
        '.count',
        (links) => links.map((x) => x.innerText)
    );
    let res = {
        names: [],
        titles: [],
        likes: []
    }
    for(let i=0;i<20;i++) {
        res.names[i] = names[i]
        res.titles[i] = titles[i]
        res.likes[i] = likes[i]
    }
    data = data.concat([res]);
    fs.writeFile("data.js", JSON.stringify(data, null, "\t"), function (err) {
        if (err) {
            console.log(err);
        }
    });
})();
