import { motion } from "framer-motion";

const items = [
  "ML & Predictive Systems", // Includes Anomaly Detection & fraud classification [cite: 19, 20, 22, 23, 25, 26]
  "Full Stack Development", // Includes MERN and React Native projects [cite: 4, 13, 28, 32]
  "RESTful API Design",     // Includes backend architecture and role-based access 
  "Data Pipelines & ETL",   // Includes GPS telemetry and feature engineering [cite: 26, 27]
  "Cloud & VPS Deployment", // Includes Linux server management and Nginx [cite: 10, 17]
  "Performance Engineering" // Includes LightGBM models and production debugging [cite: 17, 30]
];

const ServiceSummary = () => {
  return (
    <section className="px-4 py-20 sm:px-6 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.35rem] text-black/45"
        >
          What I Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-3xl font-light uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
        >
          ML Systems & Scalable Web Products
        </motion.h2>

        <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-black/[0.02] p-4 sm:p-5 md:mt-12 md:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="flex min-h-[56px] items-center justify-center rounded-full border border-black/10 bg-white/80 px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18rem] text-black/75 shadow-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;