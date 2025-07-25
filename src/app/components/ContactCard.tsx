"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactCardProps {
  onClose?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can integrate with your form handling service here
  };

  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-400 bg-transparent p-4 backdrop-blur-lg">
      {/* Close Button */}
      {onClose && (
        <div className="mb-4 flex justify-end">
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 rounded-full border border-gray-400 bg-transparent text-white hover:bg-transparent"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </Button>
        </div>
      )}

      {/* Header with Contact title and toggle button */}
      <div className="flex items-center justify-between">
        <label className="text-[22px] font-bold text-white">Contact</label>

        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full border border-gray-400 bg-transparent text-white hover:bg-transparent"
          onClick={toggleOpen}
          aria-label={isOpen ? "Close" : "Open"}
        >
          {isOpen ? "−" : "+"}
        </Button>
      </div>

      {/* Animated Collapsible Contact Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-2"
              >
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-white"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-white"
                  >
                    Your Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-white"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-vertical w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 font-semibold text-white hover:bg-transparent"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactCard;
