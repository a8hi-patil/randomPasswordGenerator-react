
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(6)
  const inputRef = useRef(null)
  const generatedPassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"
    let numbers = "0123456789"
    let charaters = "!@#$%^&*()"

    if (numberAllowed) str += numbers
    if (charAllowed) str += charaters
    for (let index = 1; index <= length; index++) {
      let charNumber = Math.floor(Math.random() * str.length)
      console.log(charNumber);
      pass += str.charAt(charNumber)
    }
    console.log(pass)
    setPassword(pass)
  }, [setPassword, numberAllowed, charAllowed, length])

  const copyOnClipBoard = () => {
    inputRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  useEffect(() => {
    generatedPassword()
  }, [numberAllowed, charAllowed, length])


  return (
    <>
      <h1>Password Generator</h1>
      <div className="container" >
        <div className="inputs">
          <input
            type="text"
            placeholder='password'
            readOnly
            value={password}
            ref={inputRef}
          />
          <button onClick={copyOnClipBoard} >Copy</button>
        </div>
        <div className="dependacies">
          <input type="range" min={6} max={36} onChange={(e) => { setLength(e.target.value) }} value={length} />
          <br />
          <label> Length {length}</label>
          <br />
          <div className="numchar">
            <div>
              <input type="checkbox" onClick={() => setNumberAllowed(prev => !prev)} />
              <label>Number {numberAllowed} </label>
            </div><div>
              <input type="checkbox" onClick={() => setCharAllowed(prev => !prev)} />
              <label>Charaters</label></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
