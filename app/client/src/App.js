import React, {useState} from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [pH , setph] = useState('');
  const [Hardness , setHardness] = useState('');
  const [Solids , setSolids] = useState('');
  const [Chloramines , setChloramines] = useState('');
  const [Sulfate , setSulfate] = useState('');
  const [Conductivity , setConductivity] = useState('');
  const [Organic_carbon , setOrganic_carbon] = useState('');
  const [Trihalomethanes , setTrihalomethanes] = useState('');
  const [Turbidity , setTurbidity] = useState('');

  

  const handlepHChange =(e)=>{
    setph(e.target.value);
  }
  const handleHardnessChange =(e)=>{
    setHardness(e.target.value);
  }
  const handleSolidsChange =(e)=>{
    setSolids(e.target.value);
  }
  const handleChloraminesChange =(e)=>{
    setChloramines(e.target.value);
  }
  const handleSulfateChange =(e)=>{
    setSulfate(e.target.value);
  }
  const handleConductivityChange =(e)=>{
    setConductivity(e.target.value);
  }
  const handleOrganic_carbonChange =(e)=>{
    setOrganic_carbon(e.target.value);
  }
  const handleTrihalomethanesChange =(e)=>{
    setTrihalomethanes(e.target.value);
  }
  const handleTurbidityChange =(e)=>{
    setTurbidity(e.target.value);
  }


  const handleSubmit= async (pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity)=> {
    const res = await axios.post("/api/wml/score", {
      pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity
    });
    //setPredictions(res.predictions.fields.value);
    //console.log(Predictions);
    const predict = res['data'] 
    const a = predict[0]
    const p = JSON.stringify(a)
    
    const x = p.replace('[','')
    const y = x.replace(']','')
    const list = y.split(',')
    console.log("Front",list[0])
    //alert("Alert"+list[0])
    var list1 = parseFloat(list[1].replace('[',''))*100
    var list2 = parseFloat(list[2].replace(']',''))*100
    var ans = ""
    var conf = ""
    if (list1 > list2){ 
      conf = list1.toFixed(2);
    }
    else{ 
      conf = list2.toFixed(2);
    }
    if (list[0] === '0'){
       ans = "Water is not drinkable";
    }else{
       ans = "Water is drinkable";
    }
    const con = ans+" with confidence of "+conf+"%"
    alert(ans+" with confidence of "+conf+"%")

    document.getElementById('result').innerHTML= con
  };
  return (
      <div className="App">
        <header className="App-header">
          <form > 
             {/* onSubmit={() => {handleSubmit(pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity)}} */}
            {/*when user submit the form , handleSubmit()
        function will be called .*/}
            <h2> Water Quality Predictions </h2>
            <label >
              pH value:
            </label><br/>
            <input type="text" value={pH}  onChange={(e) => {handlepHChange(e)}} /><br/>
            { /*when user write in name input box , handlepHChange()
              function will be called. */}
            <label >
              Hardness:
            </label><br/>
            <input type="text" value={Hardness}  onChange={(e) => {handleHardnessChange(e)}} /><br/>
            { /*when user write in age input box , handleHardnessChange()
               function will be called. */}
            <label>
              Solids (Total dissolved solids - TDS):
            </label><br/>
            <input type="text" value={Solids}  onChange={(e) => {handleSolidsChange(e)}} /><br/>
            {/* when user write in email input box , handleSolidsChange()
              function will be called.*/}
            <label>
              Chloramines:
            </label><br/>
            <input type="text" value={Chloramines}  onChange={(e) => {handleChloraminesChange(e)}} /><br/>
            {/* when user write in password input box ,
                  handleChloraminesChange() function will be called.*/}
            <label>
              Sulfate:
            </label><br/>
            <input type="text" value={Sulfate}  onChange={(e) => {handleSulfateChange(e)}} /><br/>
            {/* when user write in confirm password  input box ,
                    handleSulfateChange() function will be called.*/}
            <label>
              Conductivity:
            </label><br/>
            <input type="text" value={Conductivity}  onChange={(e) => {handleConductivityChange(e)}} /><br/>
            {/* when user write in confirm password  input box ,
                    handleConductivityChange() function will be called.*/}
            <label>
              Organic Carbon:
            </label><br/>
            <input type="text" value={Organic_carbon}  onChange={(e) => {handleOrganic_carbonChange(e)}} /><br/>
            {/* when user write in confirm password  input box ,
                    handleOrganic_carbonChange() function will be called.*/}
            <label>
              Trihalomethanes:
            </label><br/>
            <input type="text" value={Trihalomethanes}  onChange={(e) => {handleTrihalomethanesChange(e)}} /><br/>
            {/* when user write in confirm password  input box ,
                    handleTrihalomethanesChange() function will be called.*/}
            <label>
              Turbidity:
            </label><br/>
            <input type="text" value={Turbidity}  onChange={(e) => {handleTurbidityChange(e)}} /><br/>
            {/* when user write in confirm password  input box ,
                    handleTurbidityChange() function will be called.*/}
            <button type="button" onClick={() => {handleSubmit(pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity)}}>
            Predict
          </button>
            <output name="Predictions"></output><br/>  

            <label id="result"></label>
          </form>
          
        </header>
      </div>
  );
}

export default App;