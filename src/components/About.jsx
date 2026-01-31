import { motion } from 'framer-motion';
import { BookOpen, Film, Globe, PenTool } from 'lucide-react';

const About = () => {
    const hobbies = [
        { icon: <BookOpen className="text-portfolio-gold" />, label: "Reading", description: "Diving into literature and educational research." },
        { icon: <Film className="text-portfolio-gold" />, label: "Watching Movies", description: "Exploring storytelling through the lens of cinema." },
        { icon: <Globe className="text-portfolio-gold" />, label: "Exploring", description: "Always seeking new things and diverse perspectives." },
        { icon: <PenTool className="text-portfolio-gold" />, label: "Writing", description: "Expressing thoughts and reporting on vital issues." },
    ];

    return (
        <section className="min-h-screen pt-32 px-8 max-w-6xl mx-auto space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h1 className="text-5xl md:text-6xl font-bold">About Me</h1>
                <div className="w-24 h-1 bg-portfolio-gold mx-auto"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-lg text-portfolio-ivory text-opacity-80 leading-relaxed"
                >
                    <p>
                        I am a dedicated student at <strong>Tai Solarin University of Education (TASUED)</strong>, specializing in <strong>Educational Technology</strong>. My academic journey is driven by a passion for creating innovative learning solutions that leverage modern tools.
                    </p>
                    <p>
                        Beyond the classroom, I am a <strong>Journalist for Ogun Today</strong>, where I use my voice to report on community developments, educational reforms, and industrial growth. I believe that effective communication and technology are the keys to a brighter future.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-8 rounded-3xl"
                >
                    <h2 className="text-2xl font-bold mb-6 text-portfolio-gold">Interests & Hobbies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hobbies.map((hobby, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="p-2 bg-white/5 rounded-lg">{hobby.icon}</div>
                                <div>
                                    <h3 className="font-bold">{hobby.label}</h3>
                                    <p className="text-sm text-opacity-60 text-portfolio-ivory">{hobby.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
