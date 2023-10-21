import React, { useState } from 'react';
import { toast } from 'react-toastify';
const Instruction = ({ onInstructionDataChange }) => {
  const [instructions, setInstructions] = useState([]);
  const [textinstruction, setTextInstruction] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleCheckboxChange = (event, label) => {
    if (event.target.checked) {
      setInstructions([...instructions, label]);
    } else {
      setInstructions(instructions.filter((item) => item !== label));
    }
  };

  console.log(
    instructions,
    '?????????',
    selectedRadio,
    '//////',
    paymentAmount,
    textinstruction
  );
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handleDataSubmit = () => {
    // Create a data object that includes all the values
    const data = {
      instructions,
      textinstruction,
      selectedRadio,
      paymentAmount,
    };

    // Call the callback function and pass the data object to the parent component
    onInstructionDataChange(data);
  };

  return (
    <div className="flex flex-wrap bg-slate-100">
      {/* Left Side: Instructions */}
      <div className=" w-full md:flex-1 p-6">
        <h3 className="text-2xl font-semibold mb-4">Instructions</h3>
        <div className="space-y-4">
          <div className="mb-4">
            <input
              id="readyToDrive"
              type="checkbox"
              value="Ready To Allow Drive"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleCheckboxChange(e, 'Ready To Allow Drive')}
            />
            <label
              htmlFor="readyToDrive"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Ready To Allow Drive
            </label>
          </div>
          <div className="mb-4">
            <input
              id="noMeetups"
              type="checkbox"
              value="No Other Meetups"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleCheckboxChange(e, 'No Other Meetups')}
            />
            <label
              htmlFor="noMeetups"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              No Other Meetups
            </label>
          </div>
          <div className="mb-4">
            <input
              id="noDrugs"
              type="checkbox"
              value="No drugs"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleCheckboxChange(e, 'No drugs')}
            />
            <label
              htmlFor="noDrugs"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              No drugs
            </label>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Add more Instructions
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(e) => setTextInstruction(e.target.value)}></textarea>
          </div>
        </div>
      </div>

      {/* Right Side: Payment */}
      <div className="flex-1 p-6">
        <h3 className="text-2xl font-semibold mb-4">Payment ways</h3>
        <div className="space-y-4">
          <div className="mb-4">
            <input
              id="freeDrive"
              type="radio"
              value="Free Drive"
              name="payment-method"
              checked={selectedRadio === 'Free Drive'}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="freeDrive"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Free Drive
            </label>
          </div>
          <div className="mb-4">
            <input
              id="shareExpenses"
              type="radio"
              value="Share Expenses"
              name="payment-method"
              checked={selectedRadio === 'Share Expenses'}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="shareExpenses"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Share Expenses
            </label>
          </div>
          <div className="mb-4">
            <input
              id="needPayment"
              type="radio"
              value="Need Payment"
              name="payment-method"
              checked={selectedRadio === 'Need Payment'}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="needPayment"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Need Payment
            </label>
          </div>
          {selectedRadio === 'Need Payment' && (
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Amount
              </label>
              <input
                id="amount"
                type="text"
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={handleAmountChange}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-stone-900 rounded-lg group"
        onClick={handleDataSubmit}>
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative">Submit Data</span>
      </button>
    </div>
  );
};

export default Instruction;
