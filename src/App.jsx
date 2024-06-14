
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLHMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz"

    if (numbersAllowed) {
      str += "0123456789"
    }
    if (symbolsAllowed) {
      str += "!@#$%^&*()_+"
    }
   for (let i = 1; i < length ; i++) {
   const char = Math.floor( Math.random() * str.length + 1)
    pass += str.charAt(char)
   }
   setPassword(pass)

  },[length, numbersAllowed, symbolsAllowed])

  useEffect(() => {
     generatePassword()
  } , [length,numbersAllowed,symbolsAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password) 
    passwordRef.current.select()
  }
  return (
    <>
     <div className='flex items-center justify-center flex-col'>
      <h1 className='text-xl text-red-900 underline'>Password Generator</h1>
      <div className='border-2 border-blue-500 mt-5 p-2'>
        <input type="text"
        value={password}
        placeholder='Password'
        readOnly
        ref = {passwordRef}
        />
        <button className='border-2 border-green-400 rounded-md bg-green-400 text-black' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='border-2 border-black mt-5 p-2'>
        <div>
          <input type="range"
          min = {6}
          max= {20}
          value = {length}
          onChange={(e)=> setLength(e.target.value)}
          name="" id="" />
          <label htmlFor="Length">Length of the password : {length}</label>
        </div>
        <div>
          <input type="checkbox"
          defaultChecked = {numbersAllowed}
          onChange = {() => {
            setNumbersAllowed((prev) => !prev )
          }}
          name="" id="" />
          <label htmlFor="">Numbers</label>
        </div>
        <div>
          <input type="checkbox"
          defaultChecked = {symbolsAllowed}
          onChange = {() => {
            setSymbolsAllowed((prev) => !prev )
          }}
          name="" id="" />
          <label htmlFor="">Symbols</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
