"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactCardProps {
  onClose?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

      {/* Contact Title */}
      <div className="mb-4">
        <label className="text-[22px] font-bold text-white">Contact</label>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs font-bold text-white">
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
          <label htmlFor="email" className="text-xs font-bold text-white">
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
          <label htmlFor="message" className="text-xs font-bold text-white">
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
    </div>
  );
};

export default ContactCard;
