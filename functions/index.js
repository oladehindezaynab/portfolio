const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.getArticles = onRequest({ cors: true }, async (req, res) => {
    const TARGET_URL = 'https://oguntoday.com.ng/author/zainab/';

    try {
        logger.info("Fetching articles from Ogun Today");

        // Fetch HTML directly from the source
        const response = await axios.get(TARGET_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            }
        });

        const html = response.data;
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Robust cleanup helper
        const cleanText = (text) => text ? text.replace(/[\r\n\s]+/g, ' ').trim() : '';

        const container = doc.querySelector('.jnews_author_content_wrapper');
        const articleNodes = container ? container.querySelectorAll('article.jeg_post') : [];

        const articles = Array.from(articleNodes).slice(0, 10).map(article => {
            const titleLink = article.querySelector('.jeg_post_title a');
            const dateEl = article.querySelector('.jeg_meta_date');
            const excerptEl = article.querySelector('.jeg_post_excerpt p');
            const imgEl = article.querySelector('.jeg_thumb img');

            let link = titleLink?.getAttribute('href') || TARGET_URL;
            if (link.startsWith('/')) {
                link = `https://oguntoday.com.ng${link}`;
            } else if (!link.startsWith('http')) {
                link = `https://oguntoday.com.ng/${link}`;
            }

            return {
                title: cleanText(titleLink?.textContent) || 'Untitled',
                date: cleanText(dateEl?.textContent) || 'Recent',
                summary: cleanText(excerptEl?.textContent) || 'No summary available.',
                link: link,
                image: imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : null
            };
        });

        logger.info(`Successfully extracted ${articles.length} articles`);
        res.json({ articles });

    } catch (error) {
        logger.error("Error in getArticles function", error);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});
