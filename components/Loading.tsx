// components/MoneyCountingLoader.tsx

"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="relative w-32 h-32">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 left-0 w-32 h-20 bg-green-500 rounded-sm shadow-md"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: [-10, -30, -50],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    >
                        <div className="flex items-center justify-center h-full text-white font-bold text-lg">
                            ₹100
                        </div>
                    </motion.div>
                ))}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-700 rounded-full opacity-30 blur-sm" />
            </div>
        </div>
    );
}
