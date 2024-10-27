import { getDatabase, onValue, ref as refDB } from "firebase/database";
import app from "../fireconfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";




export function Approval() {

const datab = getDatabase(app)
const auth = getAuth(app)

const nameAdvRef = refDB(datab , "PreAprobal")
const nameUserRef = refDB(datab , "Users")

const [ros , setros] = useState<number[]>([]);
const [namelogin , setnameogin] = useState<string>();
const [visible , setvisible] = useState<any>();


//Responses
const [hvacR , setHvacR] = useState<any>("N/A");





useEffect(()=>{


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
    // setVisibleItems((prev)=>prev.map((visible , i)=>(i=== itm ? !visible : visible)))


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
       hvacolor = "bg-yellow-400";
   }
   if (snap.child("status").val() == "bad") {
    hvacolor = "bg-red-400";
    hvacStatus = snap.child("status").val()
}
if (snap.child("status").val() == "good") {
    hvacolor = "bg-green-400";
    hvacStatus = snap.child("status").val()

}
if (snap.child("status").val() == "No Selected") {
    hvacolor = "bg-slate-100";
    hvacStatus = snap.child("status").val();

}



   hvacUrls = snap.child("hvacurl").val()
   
})



    return(
        <div key={index} >
            <button className="bg-opacity-70 bg-yellow-900 p-3 w-full" onClick={()=>toggleVisibility(index)} >{item}</button>
            {visible == index  ? <div>


    
    <h3 className="text-gray-300 text-2xl">ROAD TEST</h3> <hr />
<div> 
Road Test? : {roadTest} <br />
Stiker? : {stiker} <br />
    
 </div>




 <h3 className="text-gray-300 text-2xl">HVAC</h3> <hr />
<div className={hvacolor}> 
 <div>

    HVAC: {hvac} <br />
    STATUS: {hvacStatus} <br />

    <img src={hvacUrls} width={50} className="cursor-pointer" onClick={()=> window.open(hvacUrls)} />

    </div>

 { ( (hvacStatus == "good" || hvacStatus == "No Selected" )  ) ? null  : <div> 
        
        Approve? <br />
      YES  <input type="radio" name="hvac" onChange={()=>setHvacR("Approved")}  />
       NO <input type="radio" name="hvac" onChange={()=>setHvacR("Declined")}  />

         </div>  }
    
 </div>





<button onClick={()=>{
alert(item + " - " + hvacR)
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