import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const FUNCTION_URL = 'https://api-uylfn4ivta-uc.a.run.app/articles';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                console.log('Fetching articles from Firebase Function...');
                const response = await fetch(FUNCTION_URL);

                if (!response.ok) throw new Error(`Function responded with status ${response.status}`);

                const data = await response.json();

                if (data.articles && data.articles.length > 0) {
                    console.log(`Successfully received ${data.articles.length} articles.`);
                    setArticles(data.articles);
                } else {
                    console.warn('No articles returned from function.');
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(true);
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
                            className="glass overflow-hidden rounded-2xl flex flex-col h-full hover:border-portfolio-gold transition-colors duration-500 group"
                        >
                            {article.image && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            )}
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-portfolio-gold text-sm font-medium mb-2">{article.date}</span>
                                <h3 className="text-xl font-bold mb-4 leading-snug group-hover:text-portfolio-gold transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-portfolio-ivory text-opacity-70 mb-8 flex-grow">
                                    {article.summary}
                                </p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-portfolio-gold hover:underline font-semibold mt-auto"
                                >
                                    Read Article <ExternalLink size={16} />
                                </a>
                            </div>
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
