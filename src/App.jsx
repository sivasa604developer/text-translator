import { useState } from "react"
import axios from 'axios';
import { Loader } from 'lucide-react';

function App(){
  const[textInput, setTextInput]=useState("")
  const[selectValue, setSelectValue]=useState("")
 const[result,setResult]=useState("")
 const[loading,setLoading]=useState(false)
  const handleTextTranslator= async() => {
setLoading(true)
    try{
const options = {
  method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': 'd448fd429dmsh194c47def256a25p16f1c2jsnc10eafc6ba31',
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    q: textInput,
    source: 'en',
    target: selectValue,
    format: 'text'
  }
};
	const response = await axios.request(options);
  setLoading(false)
	console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText);
  setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
} catch (error) {
  setLoading(false)
	console.log(error?.data)
}
}
console.log(textInput)
console.log(selectValue)
  return(
    <div className="h-screen w-screen bg-blue-200 flex items-center justify-center">
<div className=" flex items-center justify-center flex-col gap-y-3 " >
  <h1 className= "text-3xl text-red-700 font-bold">Text translator</h1>
 <div><textarea name="input-text" className="bg-white flex-col gap-y-3 w-80 h-30 border border-slate-700 outline-none rounded-lg  text-lg font-bold px-3 py-2" placeholder="type here....." onChange={(e) => setTextInput(e.target.value)}></textarea></div>
  <div> <label htmlFor="options" className="font-bold text-red-700 text-lg">CONVERTED INTO</label>
  <select name="value" className="bg-white rounded-lg text-lg text-bold border border-black cursor-pointer" onChange={(e) => setSelectValue(e.target.value)}>
  <option value="">Select</option>
 <option value="ta">tamil</option>
 <option value="hi">Hindi</option>
  <option value="bn">Bengali</option>
  <option value="de-DE">German</option>
  <option value="ja">japanese</option></select></div>
 <div><textarea name="input-text" className="bg-white flex-col gap-y-3 w-80 h-30 border border-slate-700 outline-none rounded-lg  text-lg font-bold px-3 py-2"value={result} readOnly >
  </textarea>
</div>
<button className="font-bold h-10 w-30 bg-slate-700 rounded-lg text-lg text-white cursor-pointer flex items-center justify-center"onClick={handleTextTranslator}>
  {
    loading? (<Loader className="animate-spin"/>): "TRANSLATE"
  }
</button>
 </div>
 </div>
  
  );
}
export default App;