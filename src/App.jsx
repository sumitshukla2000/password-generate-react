import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(false);
  const passRef = useRef(null);
  const visRef = useRef(null);
  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    passRef.current.select();
    setMsg(true)
  }

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // short hand property
    if (numberAllowed) str += '1234567890';
    if (charAllowed) str += '!@#$%^&*';

    for (let i = 0; i < length; i++) {
      // random number for string charater
      // it will run accordin to the range length 
      // per number it will generate a random number and a character
      const ranNumber = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ranNumber);
    }
    setMsg(false)
    setPassword(pass);
  }, [length, numberAllowed, charAllowed])
  // here this hook is used to re render the function whenever [length,charAllowed,numberAllowed] will change
  useEffect(() => {
    generatePassword();
    // setMsg(false)
  }, [length, numberAllowed, charAllowed])
  return (
    <div className="w-full h-screen bg-slate-600">
      {
        msg && (<div
          ref={visRef}
          className="w-full absolute duration-700 -translate-y-24 pt-12"
          style={{ transform: msg ? "translateY(-3rem)" : "translateY(-6rem)" }}>
          <p className="text-white text-2xl text-center py-2">
            Copied to clipboard!!
          </p>
        </div>)
      }
      <div className="max-w-sm mx-auto pt-12 md:max-w-lg">
        <div className="shadow-2xl p-4 rounded-xl">
          <div className="flex items-center rounded-lg overflow-hidden justify-center">
            <input type="text"
              placeholder="Password"
              readOnly
              value={password}
              ref={passRef}
              className="py-2 px-1 outline-none w-full" />
            <button
              onClick={copyToClipboard}
              className="bg-indigo-700 py-2 text-white px-4">
              Copy
            </button>
          </div>

          <div className="w-full flex items-center flex-wrap  justify-center py-4">
            <div className="flex items-center justify-center gap-x-1">
              <input type="range"
                className="cursor-pointer"
                min={6}
                max={15}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="" className="px-4 py-2 text-white">Length : {length}</label>
            </div>

            <div className="flex items-center justify-center gap-x-1">
              <input type="checkbox"
                defaultChecked={numberAllowed}
                className="py-2 px-1 outline-none"
                id="number"
                onChange={() => setNumberAllowed(prev => !prev)} />
              <label htmlFor="number" className="text-white px-2">Number</label>
            </div>

            <div className="flex items-center justify-center gap-x-1">
              <input type="checkbox"
                defaultChecked={charAllowed}
                className="py-2 px-1 outline-none"
                id="character"
                onChange={() => setCharAllowed(prev => !prev)} />
              <label htmlFor="character" className="text-white px-2">Character</label>
            </div>
          </div>
        </div>
        <div className="px-2 grid place-items-center py-3 mx-auto overflow-hidden rounded-xl">
          <button
            onClick={generatePassword}
            className="text-white  bg-indigo-700 px-3 py-4 rounded-lg">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
