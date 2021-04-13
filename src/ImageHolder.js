import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRANSITION_TIME_OPACITY_S = 1;

function ImageHolder({ img, className }) {
  return (
    <AnimatePresence>
      <motion.div
        key={img.src}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: TRANSITION_TIME_OPACITY_S
        }}
        className={className ? className : undefined}
      >
        <img src={img.src} alt={img.alt} />
      </motion.div>
    </AnimatePresence>
  );
}

export default ImageHolder;