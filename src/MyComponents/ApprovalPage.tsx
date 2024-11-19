import { getDatabase, onValue, ref as refDB } from "firebase/database";
import app from "../fireconfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";




export function Approval() {

const datab = getDatabase(app)
const auth = getAuth(app)

const nameAdvRef = refDB(datab , "PreAprobal")
const nameUserRef = refDB(datab , "Users")

const [green , setgreen] =useState<string>()
const [red , setred] =useState<string>('bg-red-400')
const [yellow , setyellow] =useState<string>('bg-yellow-400')
const [slate , setslate] =useState<string>('bg-slate-200')

const [ros , setros] = useState<number[]>([]);
const [namelogin , setnameogin] = useState<string>();
const [visible , setvisible] = useState<any>();


//Responses
const [hvacR , setHvacR] = useState<any>("N/A");
const [hvacFlat , setHvacFlat] = useState<number>(0);

const [dashR , setDashR] = useState<any>("N/A");
const [dashFlat , setdashFlat] = useState<number>(0);

const [otherInR , setotherInR] = useState<any>("N/A");
const [otherIntFlat , setotherIntFlat] = useState<number>(0);


useEffect(()=>{

    console.log(dashFlat + otherIntFlat);
    

    setgreen('bg-green-400')
    setred('bg-red-400')
    setyellow('bg-yellow-400')
    setslate('bg-slate-400')

    onAuthStateChanged(auth , user =>{

if (user != null) {
    onValue(nameUserRef , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            if (user?.email ==snap3.child("email").val() ) {
                setnameogin(snap3.child("name").val())
                
            }
        })
    })
})




let arrayros:any = []
onValue(nameAdvRef , snap=>{
    snap.forEach(snap2=>{
        snap2.child("Information").forEach(snap3 =>{
          if (namelogin == snap3.child("advisor").val() || namelogin == snap3.child("emp").val()  ) {
            arrayros.push(snap2.key)
          }  
          setros(arrayros)

        })

        })
    })
}







})






},[namelogin])


const toggleVisibility =(itm:any)=>{
    
    if (itm != visible) {
         setvisible(itm)
    }else{setvisible(-1)}


 }

  return (
    <div>

<h2>Aproval</h2>
Ro
{ros.map((item:any , index )=>{

// ROAD TEST

let roadTest:any;
let stiker:any;
const refRoad = refDB(datab , 'PreAprobal/'+item+"/"+"RoadTest")
onValue(refRoad , snap =>{

   roadTest = snap.child("road").val()
   stiker = snap.child("stike").val()
})

//HVAC

let hvac:any;
let hvacStatus:any;
let hvacUrls:any;
let hvacolor:any;

const refHvac = refDB(datab , 'PreAprobal/'+item+"/"+"HVAC")
onValue(refHvac , snap =>{

   hvac = snap.child("hvac").val()
   if (snap.child("status").val() == "ml") {
       hvacStatus = "Moderate";
       hvacolor = yellow;
   }
   if (snap.child("status").val() == "bad") {
    hvacolor = red;
    hvacStatus = snap.child("status").val()
}
if (snap.child("status").val() == "good") {
    hvacolor = green;
    hvacStatus = snap.child("status").val()

}
if (snap.child("status").val() == "No Selected") {
    hvacolor = slate;
    hvacStatus = snap.child("status").val();

}
   hvacUrls = snap.child("hvacurl").val()
   
})

//interior

let interiorall:any;
let interiorallStatus:any;
let interiorallColor:any;
console.log(interiorallColor);

let dash:any;
let dashStatus:any;
let dashUrl:any;
let dashColor:any;

let otherinterior:any;
let otherinteriorStatus:any;
let otherInteriotUrl:any;
let otherinteriorColor:any;


const refInterior = refDB(datab , 'PreAprobal/'+item+"/"+"Interior")


onValue(refInterior , snap =>{
    

   interiorall = snap.child("allLight").val()
   if (snap.child("status").val() == "ml") {
       interiorallStatus = "Moderate";
       interiorallColor = yellow;

   }
   if (snap.child("status").val() == "bad") {
    interiorallColor = red;
    interiorallStatus = snap.child("status").val()
}
if (snap.child("status").val() == "good") {
    interiorallColor = green;
    interiorallStatus = snap.child("status").val()

}
if (snap.child("status").val() == "No Selected") {
    interiorallColor = slate;
    interiorallStatus = snap.child("status").val();

}

dash = snap.child("das").val()
if (snap.child("dashstatus").val() == "ml") {
    dashStatus = "Moderate";
    dashColor = yellow;
}
if (snap.child("dashstatus").val() == "bad") {
    dashColor = red;
 dashStatus = snap.child("dashstatus").val()
}
if (snap.child("dashstatus").val() == "good") {
    dashColor = green;
 dashStatus = snap.child("dashstatus").val()

}
if (snap.child("status").val() == "No Selected") {
    dashColor = slate;
 dashStatus = snap.child("dashstatus").val();

}
dashUrl = snap.child("dashUrls").val()


otherinterior = snap.child("interiorOther").val()
if (snap.child("interiorOtherStatus").val() == "ml") {
    otherinteriorStatus = "Moderate";
    otherinteriorColor = yellow;
}
if (snap.child("interiorOtherStatus").val() == "bad") {
    otherinteriorColor = red;
    otherinteriorStatus = snap.child("interiorOtherStatus").val()
}
if (snap.child("interiorOtherStatus").val() == "good") {
    otherinteriorColor = green;
    otherinteriorStatus = snap.child("interiorOtherStatus").val()

}
if (snap.child("interiorOtherStatus").val() == "No Selected") {
    otherinteriorColor = slate;
    otherinteriorStatus = snap.child("interiorOtherStatus").val();

}
otherInteriotUrl = snap.child("interiorUrls").val()



   
})





    return(
        <div key={index} >
            <button className="bg-opacity-70 bg-yellow-900 p-3 w-full" onClick={()=>toggleVisibility(index)} >{item}</button>
            {visible == index  ? <div>



    
    <h3 className="text-gray-300 text-2xl">ROAD TEST</h3> <hr />
<table> 
<tr>
<th>Road Test :</th>
<th> {roadTest} </th>
</tr>

<tr>
    <th>Stiker</th>
    <th>{stiker}</th>
</tr>

    
 </table>




 <h3 className="text-gray-300 text-2xl">HVAC</h3> <hr />
<table> 

<tr>
    <th>   HVAC</th>
    <th>   {hvac}</th>
</tr>
<tr >
    <th> STATUS</th>
    <th className={hvacolor}>{hvacStatus}</th>

</tr>
<tr>
       <th >
     <img src={hvacUrls} width={250} className="cursor-pointer" onClick={()=> window.open(hvacUrls)} />
    </th> 
    <th className={hvacolor}>
         { ( (hvacStatus == "good" || hvacStatus == "No Selected" )  ) ? null  : <div> 
        
        Approve? <br />
      YES  <input type="radio" name="hvac" onChange={()=>setHvacR("Approved")}  />
       NO <input type="radio" name="hvac" onChange={()=>setHvacR("Declined")}  />
       <br />
       {hvacR == "Approved" ? <div> Flat Rate : <input type="number" onChange={(e)=>setHvacFlat(parseFloat(e.target.value))} /> </div> : null }

         </div>  }
    </th>
</tr>


    
 </table>

<br />
<hr />
<br />


<h3 className="text-gray-300 text-2xl">Interior</h3> <hr />
<table> 

<tr>
    <th>   All Interior</th>
    <th>   {interiorall}</th>
</tr>
<tr >
    <th> Status</th>
    <th className={hvacolor}>{interiorallStatus}</th>
</tr>


{/* Dash */}

<tr>
    <br />
</tr>

<tr>
    <th>Dash</th>
    <th>   {dash}</th>
</tr>
<tr >
    <th> STATUS</th>
    <th className={dashColor}>{dashStatus}</th>

</tr>
<tr>
       <th >
     <img src={dashUrl} width={250} className="cursor-pointer" onClick={()=> window.open(dashUrl)} />
    </th> 
    <th className={dashColor}>
         { ( (dashStatus == "good" || dashStatus == "No Selected" )  ) ? null  : <div> 
        
        Approve? <br />
      YES  <input type="radio" name="dass" onChange={()=>setDashR("Approved")}  />
       NO <input type="radio" name="dass" onChange={()=>setDashR("Declined")}  />
       <br />
       {dashR == "Approved" ? <div> Flat Rate : <input type="number" onChange={(e)=>setdashFlat(parseFloat(e.target.value))} /> </div> : null }

         </div>  }
    </th>
</tr>


{/* Other interior */}
<tr>
    <br />
</tr>

<tr>
    <th>   Other Issue Internal</th>
    <th>   {otherinterior}</th>
</tr>
<tr >
    <th> STATUS</th>
    <th className={otherinteriorColor}>{otherinteriorStatus}</th>

</tr>
<tr>
       <th >
     <img src={otherInteriotUrl} width={250} className="cursor-pointer" onClick={()=> window.open(otherInteriotUrl)} />
    </th> 
    <th className={otherinteriorColor}>
         { ( (otherinteriorStatus == "good" || otherinteriorStatus == "No Selected" )  ) ? null  : <div> 
        
        Approve? <br />
      YES  <input type="radio" name="otint" onChange={()=>setotherInR("Approved")}  />
       NO <input type="radio" name="otint" onChange={()=>setotherInR("Declined")}  />
       <br />
       {otherInR == "Approved" ? <div> Flat Rate : <input type="number" onChange={(e)=>setotherIntFlat(parseFloat(e.target.value))} /> </div> : null }

         </div>  }
    </th>
</tr>





    
 </table>

<br />
<hr />
<br />








<br />
<br />
<br />



<button onClick={()=>{
alert(item + " - " + hvacR + " flat is "+ hvacFlat )
window.location.reload()
}}>Ver</button>
</div> : null }


<br /> <br />

        </div>
    )
})}


    </div>
  );
}