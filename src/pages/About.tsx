import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="space-y-8">
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        >
          <Card className="bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.5 }}
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-800"
              >
                <img 
                  src="/pfp.jpg" 
                  alt="Abhinav Nath" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold">Abhinav Nath</CardTitle>
                <CardDescription className="text-lg">He/Him</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg leading-relaxed"
              >
                I'm a passionate developer with a keen interest in creating elegant solutions to complex problems. 
                My journey in technology is driven by curiosity and a desire to build tools that make a difference.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold">Interests</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Web Development</li>
                  <li>UI/UX Design</li>
                  <li>Problem Solving</li>
                  <li>Open Source Projects</li>
                  <li>Learning New Technologies</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-4 pt-4"
              >
                <Button asChild variant="outline" className="gap-2">
                  <a href="https://github.com/abhinavnath02" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    Portfolio (Coming Soon)
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center"
        >
          <Button asChild>
            <Link to="/">Back to Calculator</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;