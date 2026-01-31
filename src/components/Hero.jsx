import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative overflow-hidden px-8 py-20 gap-12">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-portfolio-gold opacity-20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full animate-pulse delay-700"></div>

            {/* Photo Column */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] flex-shrink-0"
            >
                <div className="absolute inset-0 border-2 border-portfolio-gold rounded-full translate-x-4 translate-y-4 -z-10"></div>
                <img
                    src="/images/zainab-photo.jpg"
                    alt="Oladehinde Zainab"
                    className="w-full h-full object-cover rounded-full border-4 border-white border-opacity-20 shadow-2xl"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-center lg:text-left space-y-6 z-10"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-portfolio-gold font-medium tracking-widest uppercase block"
                >
                    Educational Technologist & Journalist
                </motion.span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Shaping the Future <br />
                    <span className="text-portfolio-gold text-3xl md:text-5xl">Through Media & Education</span>
                </h1>
                <p className="text-lg text-portfolio-ivory text-opacity-80 max-w-2xl">
                    I am Oladehinde Zainab, a student of Tai Solarin University of Education, dedicated to bridging the gap between technology, learning, and impactful storytelling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-gold flex items-center justify-center gap-2"
                        onClick={() => {
                            const el = document.getElementById('work');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else window.location.href = '/#work';
                        }}
                    >
                        View My Work <ChevronRight size={20} />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
