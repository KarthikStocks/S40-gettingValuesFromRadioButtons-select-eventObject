import React, { useRef, useState, useEffect } from "react";

function StockSignup() {
  const usernameInputRef = useRef();
  const stockNameInputRef = useRef();
  const sharesPurchasedRef = useRef();
  const purchasePriceRef = useRef();
  const currentPriceRef = useRef();
  const investmentTypeSelectRef = useRef();
  const riskToleranceSelectRef = useRef();
  const maleRBRef = useRef();
  const femaleRBRef = useRef();
  const singleRBRef = useRef();
  const marriedRBRef = useRef();
  const [userGender, setUserGender] = useState("");
  const [userMS, setUserMS] = useState(""); // Marital Status (single/married)
  const [userRiskTolerance, setUserRiskTolerance] = useState(""); // Risk Tolerance
  const [userInvestmentType, setUserInvestmentType] = useState(""); // Investment Type
  const [gainLossText, setGainLossText] = useState(""); // Text for gain/loss
  const [gainLossColor, setGainLossColor] = useState(""); // Color for gain/loss
  const [gainLossPercentage, setGainLossPercentage] = useState(""); // Percentage for gain/loss
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For controlling dialog visibility
  const [userSalutation, setUserSalutation] = useState(""); // Salutation (Mr./Miss./Mrs.)

  const onButtonClick = () => {
    let salutation = "";

    if (userGender === "male") {
      salutation = "Mr.";
    } else if (userGender === "female") {
      salutation = userMS === "single" ? "Miss." : "Mrs.";
    }

    setUserSalutation(salutation); // Update salutation state

    // Check if refs are not null/undefined before accessing .value
    const sharesPurchased = sharesPurchasedRef.current?.value
      ? parseInt(sharesPurchasedRef.current.value)
      : 0;
    const purchasePrice = purchasePriceRef.current?.value
      ? parseFloat(purchasePriceRef.current.value)
      : 0;
    const currentPrice = currentPriceRef.current?.value
      ? parseFloat(currentPriceRef.current.value)
      : 0;

    const investmentType = investmentTypeSelectRef.current?.value || "";
    const riskTolerance = riskToleranceSelectRef.current?.value || "";

    if (sharesPurchased === 0 || purchasePrice === 0 || currentPrice === 0) {
      alert("Please provide valid input values.");
      return;
    }

    const totalInvestment = sharesPurchased * purchasePrice;
    const gainLoss = (currentPrice - purchasePrice) * sharesPurchased;
    const gainLossPercentage = ((gainLoss / totalInvestment) * 100).toFixed(2);

    // Determine gain or loss text and color
    if (gainLoss > 0) {
      setGainLossText(`Gain: $${gainLoss.toFixed(2)}`);
      setGainLossColor("green");
    } else if (gainLoss < 0) {
      setGainLossText(`Loss: $${Math.abs(gainLoss).toFixed(2)}`);
      setGainLossColor("red");
    } else {
      setGainLossText("No Gain/Loss");
      setGainLossColor("black");
    }

    setGainLossPercentage(gainLossPercentage); // Update the percentage state
    setUserInvestmentType(investmentType); // Store the investment type
    setUserRiskTolerance(riskTolerance); // Store the risk tolerance

    // Show the dialog
    setIsDialogOpen(true);
  };

  // Close the dialog when the user clicks the "Close" button
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const dialogElement = document.getElementById("investment-dialog");

    if (isDialogOpen) {
      dialogElement.showModal(); // Open the dialog
    } else {
      dialogElement.close(); // Close the dialog
    }
  }, [isDialogOpen]);

  return (
    <div>
      <div className="signup-container">
        <h1 className="main-heading">Plan Your Investments</h1>
        <form className="signup-form">
          <div className="form-group">
            <label>Investor Name</label>
            <input
              ref={usernameInputRef}
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Stock Name</label>
            <input
              ref={stockNameInputRef}
              type="text"
              placeholder="Enter company name"
            />
          </div>
          <div className="form-group">
            <label>Shares Purchased</label>
            <input
              ref={sharesPurchasedRef}
              type="number"
              min="1"
              placeholder="Enter number of shares"
            />
          </div>
          <div className="form-group">
            <label>Purchase Price per Share ($)</label>
            <input
              ref={purchasePriceRef}
              type="number"
              min="0"
              placeholder="Enter purchase price"
            />
          </div>
          <div className="form-group">
            <label>Current Price per Share ($)</label>
            <input
              ref={currentPriceRef}
              type="number"
              min="0"
              placeholder="Enter current price"
            />
          </div>
          <div className="form-group">
            <label>Investment Type</label>
            <select ref={investmentTypeSelectRef}>
              <option>Select the investment type</option>
              <option>Stocks</option>
              <option>Bonds</option>
              <option>ETFs</option>
              <option>Mutual Funds</option>
            </select>
          </div>
          <div className="form-group">
            <label>Risk Tolerance</label>
            <select
              ref={riskToleranceSelectRef}
              onChange={(e) => setUserRiskTolerance(e.target.value)} // Set risk tolerance
            >
              <option>Select your risk tolerance level</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div>
              <input
                type="radio"
                ref={maleRBRef}
                name="gender"
                onChange={() => setUserGender("male")}
              />
              <label className="optionLabel">Male</label>
              <input
                type="radio"
                ref={femaleRBRef}
                name="gender"
                onChange={() => setUserGender("female")}
              />
              <label className="optionLabel">Female</label>
            </div>
          </div>
          {userGender === "female" && (
            <div className="form-group">
              <label>Marital Status</label>
              <div>
                <input
                  type="radio"
                  ref={singleRBRef}
                  name="ms"
                  onChange={() => setUserMS("single")}
                />
                <label className="optionLabel">Single</label>
                <input
                  type="radio"
                  ref={marriedRBRef}
                  name="ms"
                  onChange={() => setUserMS("married")}
                />
                <label className="optionLabel">Married</label>
              </div>
            </div>
          )}
          <div className="form-group">
            <button type="button" onClick={onButtonClick}>
              Confirm Investment
            </button>
          </div>
        </form>
      </div>

      {/* Dialog Box for Investment Summary */}
      <dialog id="investment-dialog">
        <div className="dialog-content">
          <h3>Investment Summary</h3>
          <p>
            <strong>Investor:</strong> {userSalutation}{" "}
            {usernameInputRef.current?.value}
          </p>
          <p>
            <strong>Stock Name:</strong> {stockNameInputRef.current?.value}
          </p>
          <p>
            <strong>Shares Purchased:</strong>{" "}
            {sharesPurchasedRef.current?.value}
          </p>
          <p>
            <strong>Purchase Price per Share:</strong> $
            {purchasePriceRef.current?.value}
          </p>
          <p>
            <strong>Current Price per Share:</strong> $
            {currentPriceRef.current?.value}
          </p>
          <p>
            <strong>Total Investment:</strong> $
            {sharesPurchasedRef.current?.value *
              purchasePriceRef.current?.value}
          </p>
          <p>
            <strong>Investment Type:</strong> {userInvestmentType}
          </p>
          <p>
            <strong>Risk Tolerance:</strong> {userRiskTolerance}
          </p>
          <p>
            {/* <strong>Gain/Lose:</strong>{" "} */}
            <span style={{ color: gainLossColor }}>
              {gainLossText} ({gainLossPercentage}%)
            </span>
          </p>
          <button onClick={closeDialog}>Close</button>
        </div>
      </dialog>
      <div className="form-footer">
        <footer>
          <p>
            By proceeding, you agree to our <a href="#">Terms and Conditions</a>{" "}
            and acknowledge our <a href="#">Privacy Policy</a>.
          </p>
          <p>
            Need help? Visit our <a href="#">Help Center</a> or{" "}
            <a href="#">Contact Support</a> for assistance.
          </p>
          <p>© 2024 Stock Market Investor. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default StockSignup;
