import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contactus = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        'service_qr7wi14',      // Replace with your EmailJS service ID
        'template_j9a1e8a',     // Replace with your EmailJS template ID
        form.current,
        't6W8gC8k-G_HUoOH0'    // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setFormSubmitted(true);
        setError('');
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div>
      <section className="py-5 px-4 rounded-lg shadow-lg mt-12">
        {!formSubmitted && (
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Contact Us</h2>
        )}
        <div className="max-w-lg mx-auto">
          {!formSubmitted ? (
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name" // Match this with your emailjs template field names
                  className="w-full p-3 border bg-gray-200 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email" // Match this with your emailjs template field names
                  className="w-full p-3 border bg-gray-200 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message" // Match this with your emailjs template field names
                  rows="4"
                  className="w-full p-3 border bg-gray-200 border-gray-300 rounded-lg"
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center text-green-600 mt-6">
              <h3 className="text-2xl font-semibold">Thank you!</h3>
              <p className="text-lg">Your message has been sent successfully.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contactus;
