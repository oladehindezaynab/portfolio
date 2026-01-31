import https from 'https';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

/**
 * Enhanced Unit Test / Verification Script for Article Extraction
 * Uses JSDOM for robust parsing as requested.
 * Supports live fetching and local file testing.
 */

async function extractArticles(html) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Target the specific container requested by the user
    const container = doc.querySelector('.jnews_author_content_wrapper');
    if (!container) {
        throw new Error("Could not find '.jnews_author_content_wrapper' in the HTML.");
    }

    const articleElements = Array.from(container.querySelectorAll('article.jeg_post')).slice(0, 10);

    return articleElements.map(article => {
        const titleLink = article.querySelector('.jeg_post_title a');
        const dateEl = article.querySelector('.jeg_meta_date');
        const excerptEl = article.querySelector('.jeg_post_excerpt p');
        const imgEl = article.querySelector('.jeg_thumb img');

        // Robust cleanup helper for messy HTML text
        const cleanText = (text) => {
            if (!text) return '';
            // Match any sequence of newlines or whitespace and replace with a single space
            return text.replace(/[\r\n\s]+/g, ' ').trim();
        };

        const title = cleanText(titleLink?.textContent) || "Untitled";
        const link = titleLink ? titleLink.getAttribute('href') : "#";
        const date = cleanText(dateEl?.textContent) || "Recent";
        const summary = cleanText(excerptEl?.textContent) || "No summary available.";
        const image = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : null;

        return { title, link, date, summary, image };
    });
}

async function runVerification() {
    const args = process.argv.slice(2);
    const localFile = args.find(arg => arg.startsWith('--file='))?.split('=')[1];

    if (localFile) {
        console.log(`--- Verifying Extraction from Local File: ${localFile} ---`);
        try {
            const html = fs.readFileSync(path.resolve(localFile), 'utf8');
            const articles = await extractArticles(html);
            console.log("SUCCESS: Extracted articles from local file:");
            console.log(JSON.stringify(articles, null, 2));
            console.log(`\nTotal articles extracted: ${articles.length}`);
        } catch (error) {
            console.error(`FAIL: Error reading or parsing local file. ${error.message}`);
        }
        return;
    }

    console.log("--- Starting Live Article Fetch Verification (Direct) ---");
    const targetUrl = 'https://oguntoday.com.ng/author/zainab/';

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html'
        }
    };

    https.get(targetUrl, options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', async () => {
            try {
                if (res.statusCode !== 200) {
                    console.error(`FAIL: Server returned status ${res.statusCode}`);
                    return;
                }
                const articles = await extractArticles(data);
                console.log("SUCCESS: Extracted live articles:");
                console.log(JSON.stringify(articles, null, 2));
                console.log(`\nTotal articles found: ${articles.length}`);
            } catch (e) {
                console.error(`FAIL: Error parsing live content. ${e.message}`);
            }
        });
    }).on('error', (e) => {
        console.error(`FAIL: Connection error. ${e.message}`);
    });
}

runVerification();
