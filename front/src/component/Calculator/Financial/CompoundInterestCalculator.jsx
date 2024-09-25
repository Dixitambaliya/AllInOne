/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundings, setCompoundings] = useState('');
  const [amount, setAmount] = useState(null);

  const calculateCompoundInterest = (e) => {
    e.preventDefault();
    const principalValue = parseFloat(principal);
    const rateValue = parseFloat(rate) / 100;
    const timeValue = parseFloat(time);
    const compoundingsValue = parseFloat(compoundings);

    const compoundInterest = principalValue * Math.pow((1 + rateValue / compoundingsValue), compoundingsValue * timeValue);
    setAmount(compoundInterest.toFixed(2));
  };

  const clearFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundings('');
    setAmount(null);
  };

  const calcTitle = "Compound Intterest Calculator"
  const inputData= {principal: parseFloat(principal), rate: parseFloat(rate), time: parseFloat(time),compoundings: parseFloat(compoundings)}
  const resultData = amount
  const submitData = async () => {
    try {

      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:resultData,
        inputs:inputData
      }, {
        withCredentials: true, // Include credentials if necessary
      });
      alert('Result Saved successfully');
      clearFields();
    } catch (error) {
      console.error('Error submitting results:', error);
      alert('Error submitting results');
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-start lg:items-center relative">
      <BackButton className="absolute top-4 left-4 md:top-6 md:left-6" />
      <div className="flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]">
        <h2 className="text-2xl text-center font-semibold tracking-tight">Compound Interest Calculator</h2>
        <form onSubmit={calculateCompoundInterest} className="flex flex-col gap-4 w-full">
          <label className="block text-gray-700">Principal:</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
          />
          <label className="block text-gray-700">Rate of Interest (%):</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
          />
          <label className="block text-gray-700">Time (Years):</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in years"
          />
          <label className="block text-gray-700">Compoundings per Year:</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={compoundings}
            onChange={(e) => setCompoundings(e.target.value)}
            placeholder="Enter number of compoundings"
          />
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </form>
        {amount !== null && (
          <div className="mt-4">
            <h3 className="text-2xl">Amount:</h3>
            <p className="bg-white px-12 py-1 border border-green-500 rounded-md">
              ${amount}
            </p>
            <button
              onClick={submitData}
              className="bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md mt-4"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
