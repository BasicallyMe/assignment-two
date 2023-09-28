import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function App() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [displayedValue, setDisplayedValue] = useState(0);
  let typingTimeout;

  const validateNumber = (value) => {
    if (!isNaN(value)) {
      // Check if the value is a valid number (integer or floating-point)
      if (parseFloat(value) >= 0) {
        setError(null);
        return true; // Return true if the value is valid and greater than or equal to 1
      } else {
        setError("Enter a number equal to or greater than 1.");
      }
    } else {
      setError("Enter a valid number.");
    }
    return false; // Return false if the value is not valid
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (validateNumber(value)) {
      setAmount(value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    // Clear any previous timers
    clearTimeout(typingTimeout);

    // Set a new timer to update the displayed value
    typingTimeout = setTimeout(() => {
      setDisplayedValue(amount);
    }, 1500);

    return () => {
      // Cleanup the timer on unmount or when the input value changes
      clearTimeout(typingTimeout);
    };
  }, [amount]);

  return (
    <div className="h-screen px-7 py-4">
      <nav className="h-fit py-5 border-b bg-slate-950 border-slate-800 bg-opacity-60 flex flex-row justify-between items-center">
        <ul className="flex flex-row bg-white bg-opacity-10 w-fit rounded-full">
          <li>
            <button className="w-36 text-white py-2 rounded-full font-medium hover:bg-white hover:text-black text-sm transition-colors">
              Open
            </button>
          </li>
          <li>
            <button className="w-36 text-white py-2 rounded-full font-medium hover:bg-white hover:text-black text-sm transition-colors">
              Close
            </button>
          </li>
          <li>
            <button className="w-36 text-white py-2 rounded-full font-medium hover:bg-white hover:text-black text-sm transition-colors">
              Boost
            </button>
          </li>
        </ul>
        <div className="w-72 h-10 bg-black" />
      </nav>
      <div className="h-4/5 py-4 grid grid-cols-2 grid-rows-3 gap-4">
        <div className="row-span-3 border border-slate-800 rounded-md flex flex-col justify-center px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="token" className="text-sm font-medium py-2">
              Select Asset
            </label>
            <button className="w-full flex flex-row justify-between text-white text-sm p-2 bg-transparent border border-slate-800 rounded-md">
              <span>ETH</span>
              <span>
                <ChevronDown strokeWidth={1.25} size={20} />
              </span>
            </button>
            <label
              htmlFor="amount"
              className="flex flex-row justify-between text-sm font-medium py-2 mt-3"
            >
              <span>Borrow Amount</span>
              <span className="text-xs border border-slate-800 py-1 px-2 rounded-md bg-slate-500 bg-opacity-20 font-normal">
                Max Held Amount: 200
              </span>
            </label>
            <input
              name="amount"
              id="amount"
              type="text"
              value={amount}
              onChange={handleInputChange}
              className="border border-slate-800 placeholder:text-sm bg-transparent rounded-md py-2 px-3"
              placeholder="Enter supply amount"
            />
            {error !== null && (
              <span className="text-sm text-red-400 py-2">{error}</span>
            )}
            <button
              type="submit"
              className="py-2 px-3 text-center text-sm text-black font-medium mt-4 bg-white self-end rounded-md"
            >
              Execute
            </button>
          </form>
        </div>
        <div className="row-span-2 border border-slate-800 rounded-md px-6 py-4 flex flex-col justify-center">
          <div>
            <span className="text-sm text-slate-500">Currency: </span>
            <span className="font-semibold ml-2">ETH</span>
          </div>
          <div>
            <span className="text-sm text-slate-500">Amount: </span>
            <span className="font-semibold ml-2">{displayedValue}</span>
          </div>
        </div>
        <div className="border border-slate-800 rounded-md px-6 py-4"></div>
      </div>
    </div>
  );
}

export default App;
