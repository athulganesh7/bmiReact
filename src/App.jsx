import { useState } from 'react'
import './App.css'
import { Col, Row } from 'react-bootstrap'
import Button from './Button'
import AgePicker from './AgePicker'

function App() {

 

  
  const [category, setCategory] = useState('');
  const [bmiResult, setBmiResult] = useState('');     // ✅ Store BMI result
  const [showAge, setShowAge] = useState(true);       // ✅ Control age div visibility

  const [input, setInput] = useState({
    weight: '',
    height: '',
    age: '',        // Store the selected age here
    gender: ''
  })


         //calculate
         const calculateBMI = (event) => {
          event.preventDefault();  
          const { weight, height } = input;
        
          // Validate the input
          if (!weight || !height || isNaN(weight) || isNaN(height)) {
            return "Please enter valid weight and height";
          }
        
          const heightInMeters = height / 100;  // Convert height from cm to meters
          const bmi = (weight / (heightInMeters ** 2)).toFixed(2);  // BMI formula
        
          // Determine BMI category
         
          let category = '';
          if (bmi < 18.5) {
            category = "Underweight";
          } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal weight";
          } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
          } else if (bmi >= 30 && bmi < 34.9) {
            category = "Obesity (Class 1)";
          } else if (bmi >= 35 && bmi < 39.9) {
            category = "Obesity (Class 2)";
          } else {
            category = "Extreme obesity";
          }
      
          setCategory(category);
          // const result = `BMI: ${bmi}, Category: ${category}`;
          setBmiResult(bmi);  
          // console.log('result',result);
                  // ✅ Store the BMI result
          setShowAge(false);             // ✅ Hide the age div
        };

        const handleReset=()=>{
          setCategory('')
         setInput('')
         setInput({weight:0})
          setBmiResult('')
          setShowAge(true)
        }
  

  
  console.log(input);
  console.log(category);
  

  return (
    <>
      <div className='container border rounded shadow' style={{ minHeight: '600px', background: `url('https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2563.jpg?semt=ais_hybrid') no-repeat center/cover` }}>
        <Row>
          <Col md={6}>
            <img src="spinbike-unscreen.gif" alt="" />
          </Col>
          <Col md={6}>
            <form  onSubmit={calculateBMI} className='border border-light shadow rounded-4xl p-5 mt-2'>
              <h1 className='text-primary fw-bold' style={{ fontFamily: 'cursive' }}>BMI CALCULATOR</h1>
              
              <div className='d-flex border rounded p-3 gap-5 justify-content-evenly'>
                <div onClick={() => setInput((prev) => ({ ...prev, gender: 'male' }))} 
                     className={`border rounded cursor-pointer p-2 ${input.gender === "male" && 'shadow-2xl border-black text-xl fw-bold'}`} 
                     style={{ width: '100px' }}>
                  Male
                </div>

                <div onClick={() => setInput((prev) => ({ ...prev, gender: 'female' }))} 
                     className={`border rounded cursor-pointer p-2 ${input.gender === "female" && 'shadow-2xl border-black text-xl fw-bold'}`} 
                     style={{ width: '100px' }}>
                  Female
                </div>

                <div onClick={() => setInput((prev) => ({ ...prev, gender: 'others' }))} 
                     className={`border rounded cursor-pointer p-2 ${input.gender === "others" && 'shadow-2xl border-black text-xl fw-bold'}`} 
                     style={{ width: '100px' }}>
                  Others
                </div>
              </div>

              <div className="w-full max-w-md mx-auto my-3">
                <label htmlFor="range" className="block text-2xl font-medium text-gray-700">Height</label>
                <input
                  onChange={(e) => setInput({ ...input, height: e.target.value })}
                  id="range"
                  type="range"
                  min={'100'}
                  max={"300"}
                  value={input.height}
                  className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                />
                <p className='text-black text-2xl'>{input.height} cm</p>
              </div>
              <div>
                <input value={input.weight}  onChange={(e) => setInput({ ...input, weight: e.target.value })} className='form-control' type="number" placeholder='weight' />
              </div>

            

                 {/* ✅ Conditionally show the AgePicker */}
                 {showAge && (
                <div className='mt-3 mb-4 d-flex justify-content-center align-items-center'>
                  <AgePicker setInput={setInput} />
                </div>
              )}

              {/* ✅ Display the BMI result in a div */}
              {!showAge && (
                <div  className='text-center mt-4 p-4 animate-pulse border rounded bg-light'>
                  <h2 className='text-black'>BMI: {bmiResult}</h2>
                <h2 className='text-sm'>Category: {category}</h2>
                </div>
              )}

              <div className='flex items-center  w-full justify-center gap-2'>
                <Button  input={input} calculateBMI={calculateBMI} />
                <button onClick={handleReset} className=' mt-3 btn btn-danger h-10 border outline'>Clear</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default App;
