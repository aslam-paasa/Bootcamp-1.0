import { useId } from 'react'
import PropTypes from 'prop-types';
/**
 * InputBox Component - For entering amounts and selecting currencies
 * 
 * @param {object} props - The component props.
 * @param {string} props.label - The label text for the input box.
 * @param {number} props.amount - The value of the amount input.
 * @param {function} props.onAmountChange - Function to handle amount input changes.
 * @param {function} props.onCurrencyChange - Function to handle currency selection changes.
 * @param {array} props.currencyOptions - Array of currency options for the dropdown.
 * @param {string} props.selectCurrency - The currently selected currency.
 * @param {boolean} props.amountDisable - Disable the amount input if true.
 * @param {boolean} props.currencyDisable - Disable the currency dropdown if true.
 * @param {string} props.className - Additional CSS classes for styling.
*/
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {

  /**
   * useId:
   * - Generating unique IDs that can be passed to accessibility attributes.
   * - Unique ID for the amount input & bind label with input. 
  */ 
  const amountInputId = useId(); 

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>

      {/* 1. Input Section */}      
      <div className="w-1/2">
        {/* 1.a. Label for the amount input */}
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">{label}</label>
        
        {/* 1.b. Amount Input */}
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisable} // Disable input if amountDisable is true
          value={amount} // Current amount value
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          // Trigger onAmountChange when input changes
        />
      </div>


      {/* 2. Currency Selector Section */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        
        {/* 2.a. Label for the dropdown */}
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        
        {/* 2.b. Currency Dropdown */}
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency} // Current selected currency
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Trigger onCurrencyChange when selection changes
          disabled={currencyDisable} // Disable dropdown if currencyDisable is true
        >

          {/* 2.b.i. Render currency options dynamically */}
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}

        </select>
      </div>
    </div>
  );
}

// Define PropTypes
InputBox.propTypes = {
  label: PropTypes.string.isRequired, // Label text must be a string and is required
  amount: PropTypes.number, // Amount must be a number
  onAmountChange: PropTypes.func, // Function to handle amount input changes
  onCurrencyChange: PropTypes.func, // Function to handle currency selection changes
  currencyOptions: PropTypes.arrayOf(PropTypes.string), // Array of strings for currency options
  selectCurrency: PropTypes.string, // Selected currency must be a string
  amountDisable: PropTypes.bool, // Boolean to disable the amount input
  currencyDisable: PropTypes.bool, // Boolean to disable the currency dropdown
  className: PropTypes.string, // Additional CSS classes
};

export default InputBox;