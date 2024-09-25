import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const calculators = [
    {
      name: 'Health & Fitness Calculator',
      description: 'The Health and Fitness Calculator is an all-in-one tool designed to help you monitor and improve your physical well-being. Whether you are tracking your body metrics, calculating your daily caloric needs, or assessing your overall fitness, this calculator provides a comprehensive suite of features.',
      link: '/Health'
    },
    {
      name: 'Conversion Calculator',
      description: 'The Conversion Calculator is a versatile tool designed to simplify a wide range of everyday calculations. Whether you’re dealing with measurements, time, or even currency, this calculator provides quick and accurate conversions, making it an essential resource for students, professionals, and anyone who frequently works with different units.',
      link: '/conversion'
    },
    {
      name: 'Financial Calculator',
      description: 'The Financial Calculator is a comprehensive tool designed to assist with various financial computations, whether you’re managing personal finances, planning investments, or calculating loans. This calculator serves as an invaluable resource for anyone who wants to make informed financial decisions by providing precise calculations for a wide range of financial scenarios.',
      link: '/Financial'
    },
    {
      name: 'Geometry Calculator',
      description: 'The Geometry Calculator is an essential tool designed to assist students, teachers, and professionals with a wide range of geometric computations. Whether you’re solving basic problems or tackling complex geometric shapes, this calculator offers accurate and quick solutions, making it an indispensable resource for anyone dealing with geometry.',
      link: '/GeoMatery'
    },
    {
      name: 'Math & Algebra Calculator',
      description: 'The Math & Algebra Calculator is a powerful and versatile tool designed to assist students, teachers, and professionals in solving a wide range of mathematical and algebraic problems. From basic arithmetic to advanced algebraic equations, this calculator provides quick and accurate solutions, making it an essential resource for anyone working with mathematics.',
      link: '/Maths'
    },
    {
      name: 'Scientific Calculator',
      description: 'The Scientific Calculator is an advanced tool designed to handle complex mathematical functions that go beyond basic arithmetic. It is essential for students, engineers, scientists, and professionals who require precise calculations in fields such as physics, chemistry, engineering, and higher mathematics. With a wide range of functions, the Scientific Calculator is capable of solving everything from simple equations to intricate scientific computations.',
      link: '/scientific'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-700">
            Welcome to our All-in-One Calculator website! We aim to provide you with a suite of calculators designed to simplify various aspects of your daily life. Below is a brief description of each calculator we offer.
          </p>
        </header>

        {/* Calculator Descriptions Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {calculators.map((calculator, index) => (
            <div key={index} className="bg-white hover:bg-green-50 p-8 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{calculator.name}</h2>
              <p className="text-gray-600 mb-6">{calculator.description}</p>
              <Link
                to={calculator.link}
                className="inline-block text-lg text-cyan-600 hover:text-cyan-700 font-medium underline transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
