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
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // Reset form and status when closing
    if (isOpen) {
      setSubmitStatus({ type: null, message: "" });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset form after successful submission
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
              {/* Status Messages */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 rounded-lg p-3 text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "border border-green-600 bg-green-900/50 text-green-200"
                      : "border border-red-600 bg-red-900/50 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

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
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white placeholder:text-gray-400 focus:border-white"
                    required
                    disabled={isLoading}
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
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white placeholder:text-gray-400 focus:border-white"
                    required
                    disabled={isLoading}
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
                    className="resize-vertical w-full rounded-lg border border-gray-400 bg-transparent p-3 text-base text-white placeholder:text-gray-400 focus:border-white"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg border border-gray-400 bg-transparent p-3 font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
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
