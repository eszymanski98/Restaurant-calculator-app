import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function CustomInput({ icon, label = "", error = "", value, onChange }) {
  return (
    <div className={"inpt" + (error != "" ? " error" : "")}>
      <div className="inpt-labels">
        <div className="inpt-label">{label}</div>
        <div className="errorStr">{error}</div>
      </div>
      <div className="inpt-whole-input">
        <FontAwesomeIcon icon={icon} className="inpt-icon" />
        <input type="number" className="inpt-input" value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function App() {
  const percentages = [5, 10, 15, 25, 50]
  const [perc, setPerc] = useState(0);
  const [bill, setBill] = useState(142.55);
  const [customTip, setCustomTip] = useState(0);
  const [useCustomTip, setUseCustomTip] = useState(false);
  const [numOfPpl, setNumOfPpl] = useState(1);
  const [numOfPplError, setNumOfPplError] = useState("");
  return (
    <div className="App">
      <div className="Header">
        <div className="half">SPLI</div>
        <div className="half">TTER</div>
      </div>
      <div className="Calc">
        <div className="Card">
          <div className="CalcHalf">
            <div className="CalcHalfInner">
              <div className="choiceWrap">
                <div className="choice">
                  <CustomInput icon={faDollarSign} label="Bill" value={bill} onChange={(e => setBill(e.target.value))} />
                  <div className="Tip">
                    <div className="label">Select Tip %</div>
                    <div className="TipChoice">
                      {percentages.map((v, i) => <div key={i} tabIndex='0' className={"Perc" + ((!useCustomTip && perc) == v ? " Selected" : "")} onClick={() => { setUseCustomTip(false); setPerc(v) }} onKeyDown={(e) => { if (e.which == 13) { setUseCustomTip(false); setPerc(v) } }}>{v}%</div>)}
                      <input type="number" className="CustomTip" value={customTip} onChange={e => setCustomTip(e.target.value)} onFocus={() => setUseCustomTip(true)} />
                    </div>
                  </div>
                  <CustomInput icon={faUser} label="Number of People" error={numOfPplError} value={numOfPpl} onChange={(e) => { setNumOfPpl(e.target.value); if (e.target.value == 0) setNumOfPplError("Can't be zero"); else setNumOfPplError("") }} />
                </div>
              </div>
            </div>
          </div>
          <div className="CalcHalf">
            <div className="CalcHalfInner">
              <div className="Summary">
                <div className="TotalTotal">
                  <div className="Total">
                    <div className="perPerson">
                      <div className="name">Tip Amount</div>
                      <div className="per">/ person</div>
                    </div>
                    <div className="Money">${(bill * ((useCustomTip ? customTip : perc) / 100) / numOfPpl).toFixed(2)}</div>
                  </div>
                  <div className="Total">
                    <div className="perPerson">
                      <div className="name">Total</div>
                      <div className="per">/ person</div>
                    </div>
                    <div className="Money">${(bill * (1 + (useCustomTip ? customTip : perc) / 100) / numOfPpl).toFixed(2)}</div>
                  </div>
                </div>
                <button className="Reset" onClick={() => {
                  setPerc(0);
                  setBill(0);
                  setCustomTip(0);
                  setUseCustomTip(false);
                  setNumOfPpl(1);
                  setNumOfPplError("");
                }}>RESET</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
