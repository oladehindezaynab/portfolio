import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const PROXY_URL = 'https://api.allorigins.win/get?url=';
const TARGET_URL = 'https://oguntoday.com.ng/author/zainab/';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Use a timestamp to bust the AllOrigins cache
                const cacheBust = `&_cb=${new Date().getTime()}`;
                const response = await fetch(`${PROXY_URL}${encodeURIComponent(TARGET_URL)}${cacheBust}`);
                const data = await response.json();

                if (data.contents) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data.contents, 'text/html');

                    // Improved selector logic matching 'jnews_author_content_wrapper' structure
                    const container = doc.querySelector('.jnews_author_content_wrapper');
                    const articleNodes = container ? container.querySelectorAll('article.jeg_post') : doc.querySelectorAll('article');

                    if (articleNodes.length > 0) {
                        const fetched = Array.from(articleNodes).slice(0, 10).map(article => {
                            const titleEl = article.querySelector('.jeg_post_title a');
                            const dateEl = article.querySelector('.jeg_meta_date');
                            const excerptEl = article.querySelector('.jeg_post_excerpt p');

                            // Helper to clean up excessive whitespace and newlines from the scrappy HTML
                            const cleanText = (text) => text ? text.replace(/[\r\n\s]+/g, ' ').trim() : '';

                            return {
                                title: cleanText(titleEl?.textContent) || 'Untitled',
                                date: cleanText(dateEl?.textContent) || 'Recent',
                                summary: cleanText(excerptEl?.textContent) || 'No summary available.',
                                link: titleEl?.href || TARGET_URL
                            };
                        });
                        setArticles(fetched);
                    }
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <section id="work" className="py-24 px-4 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Latest Contributions</h2>
                <div className="w-20 h-1 bg-portfolio-gold"></div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-portfolio-gold opacity-50">
                    <Loader2 className="animate-spin mb-4" size={40} />
                    <p>Fetching latest articles from Ogun Today...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-2xl flex flex-col h-full hover:border-portfolio-gold transition-colors duration-500"
                        >
                            <span className="text-portfolio-gold text-sm font-medium mb-2">{article.date}</span>
                            <h3 className="text-xl font-bold mb-4 leading-snug">{article.title}</h3>
                            <p className="text-portfolio-ivory text-opacity-70 mb-8 flex-grow">
                                {article.summary}
                            </p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-portfolio-gold hover:underline font-semibold"
                            >
                                Read Article <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="mt-16 text-center">
                <a
                    href="https://oguntoday.com.ng/author/zainab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-portfolio-gold text-portfolio-gold rounded-full hover:bg-portfolio-gold hover:text-portfolio-navy font-bold transition-all"
                >
                    View All Articles on Ogun Today <ExternalLink size={18} />
                </a>
            </div>
        </section>
    );
};

export default Articles;
