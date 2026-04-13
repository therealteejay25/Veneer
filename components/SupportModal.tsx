'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  color="currentColor"
                  strokeWidth={2}
                />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold text-black/80 mb-3">
                  Support My Work
                </h2>
                
                <p className="text-black/60 text-sm mb-6 leading-relaxed">
                  I built Veneer with care and dedication to help you create beautiful bio cards effortlessly. 
                  If you find this app useful, consider supporting my work to keep it running and improving.
                </p>

                {/* Opay Section */}
                <div className="bg-black/3 rounded-2xl p-6 w-full mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#2ECC71] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">O</span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-black/50 font-medium">Send via Opay</p>
                      <p className="text-lg font-bold text-black/80">8086789876</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('8086789876');
                    }}
                    className="w-full bg-black/5 hover:bg-black/10 text-black/70 font-medium py-2.5 rounded-full transition-colors text-sm"
                  >
                    Copy Account Number
                  </button>
                </div>

                {/* Done Button */}
                <button
                  onClick={onClose}
                  className="w-full bg-black hover:bg-black/90 text-white font-medium py-3 rounded-full transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
