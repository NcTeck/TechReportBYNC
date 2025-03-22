import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue,  ref as refDB, set } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../fireconfig";
import upper from './imgs/thumb-up.png'
import downer from './imgs/thumb-down.png'
import exit from './imgs/exit.png'





export function ResponseA() {

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yy = today.getFullYear();
  let hh = today.getHours();
  let mins = today.getMinutes();

  const datab = getDatabase(app)
  const auth = getAuth(app)
  
  const nameAdvRef = refDB(datab , "PreAprobal")
  const nameUserRef = refDB(datab , "Users")
  const promiseref = refDB(datab , "Promise")

  const [ros , setros] = useState<number[]>([]);
const [namelogin , setnameogin] = useState<string>();

const [ros2 , setros2] = useState<any[]>([]);
const [visible , setvisible] = useState<any>();

const [hvac , sethvac] = useState<any[]>([]);
const [interior , setinterior] = useState<any[]>([]);
const [exterior , setexterior] = useState<any[]>([]);
const [underh , setunderh] = useState<any[]>([]);
const [battery , setBattery] = useState<any[]>([]);
const [fluids , setFluids] = useState<any[]>([]);
const [tires , settires] = useState<any[]>([]);
const [brakes , setBrakes] = useState<any[]>([]);
const [steering , setsteering] = useState<any[]>([]);
const [fsus , setfsus] = useState<any[]>([]);
const [rsus , setrsus] = useState<any[]>([]);
const [service , setservice] = useState<any[]>([]);

const [info , setInfo] = useState<any[]>([])



useEffect(()=>{
  document.getElementById("resPanel")!.style.width = "0";

onAuthStateChanged(auth , (user)=>{
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


let arrayros:any =[]
onValue(nameAdvRef , snap=>{
    snap.forEach(snap2=>{
        snap2.child("Information").forEach(snap3 =>{
          if ( namelogin == snap3.child("emp").val() || namelogin == snap3.child("advisor").val()   ) {
            arrayros.push(snap2.key)
          }  
          setros(arrayros)

        })

        })
    })

    
let array2:any =[]
onValue(promiseref , snap =>{
  snap.forEach(snap2=>{
    snap2.child("Information").forEach(snap3 =>{
      if ( namelogin == snap3.child("emp").val() || namelogin == snap3.child("advisor").val()  ) {
        array2.push(snap2.key)
setros2(array2)

     
      }  
      

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
<h2>Responses</h2>
<button className="rows" onClick={()=>{
        document.getElementById("resPanel")!.style.width = "250px";

}}>Unattended</button>
<div className="sidepanel" id="resPanel">

<button onClick={()=>{
      document.getElementById("resPanel")!.style.width = "0";


}}><img src={exit} width={30} /></button>

{
  ros.map((index:any)=>{
    return(
      <li >
       <b className="text-green-700">{index} </b>  NO-A
      </li>
    )
  })
}

  </div>

{ros2.map((index:any)=>{

let arrayInfo:any =[]
let totalInfo:any=[]
let marca:string =''
let modelo:string =''
let ano:string =''
const refInfo = refDB(datab , 'Promise/'+index+"/"+"Information")
onValue(refInfo , snap =>{
snap.forEach(snap2=>{
totalInfo.push(snap2.val())
marca = snap2.child('make').val();
modelo = snap2.child('model').val();
ano = snap2.child('yearcar').val();

snap2.child('srvSelected').forEach(snap3 =>{
 
    arrayInfo.push({
      nameSRV: snap3.child('name').val(),
      flat: snap3.child('flat').val()
    })
  
  

})

})
  
   
})


// ROAD TEST

let roadTest:any;
let stiker:any;
const refRoad = refDB(datab , 'Promise/'+index+"/"+"RoadTest")
onValue(refRoad , snap =>{

   roadTest = snap.child("road").val()
   stiker = snap.child("stike").val()
})

// HVAC
let hvacArray:any =[]

const refHvac = refDB(datab , 'Promise/'+index+"/"+"HVAC")
onValue(refHvac , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        hvacArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

// Interior
let interiorArry:any =[]

const refInterior = refDB(datab , 'Promise/'+index+"/"+"Interior")
onValue(refInterior , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        interiorArry.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// exterior
let exteriorArray:any =[]

const refExterior = refDB(datab , 'Promise/'+index+"/"+"Exterior")
onValue(refExterior , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        exteriorArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// Battery
let batteryAray:any =[]

const refBattery = refDB(datab , 'Promise/'+index+"/"+"Battery")
onValue(refBattery , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        batteryAray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// Underh
let undehArray:any =[]

const refunderh = refDB(datab , 'Promise/'+index+"/"+"Underhood")
onValue(refunderh , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        undehArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// Fluids
let FluidsArray:any =[]

const refFluids = refDB(datab , 'Promise/'+index+"/"+"UnderhoodFluids")
onValue(refFluids , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        FluidsArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// tires
let tiresArray:any =[]

const refTirees = refDB(datab , 'Promise/'+index+"/"+"Tires")
onValue(refTirees , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        tiresArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

//llantasssssssss

let llantasArray:any=[]
const reftires = refDB(datab , 'Promise/'+index+"/"+"Tires" + "/" + "llantass")
onValue(reftires , snap =>{
    snap.forEach(snap2=>{
       llantasArray.push({
         tire1:snap2.child('tire1').val(),
         tire2:snap2.child('tire2').val(),
         tire3:snap2.child('tire3').val(),
         tire4:snap2.child('tire4').val(),
        })
   
    
    })
    
    
    
})

// frenos
let brakeArray:any =[]

const refBrakes = refDB(datab , 'Promise/'+index+"/"+"Brakes")
onValue(refBrakes , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        brakeArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val()
        })
    })
})
  
   
})


let frenosArray:any=[]
const refFrenos = refDB(datab , 'Promise/'+index+"/"+"Brakes" + "/" + "frenos")

onValue(refFrenos , snap =>{
    
        snap.forEach(snap2=>{
          frenosArray.push({
            pad1:snap2.child('pad1').val(),
    pad2:snap2.child('pad2').val(),
    pad3:snap2.child('pad3').val(),
    pad4:snap2.child('pad4').val(),
        
        })
      
        })
    
   
    
    
    
})


// Steering
let steeringarray:any =[]

const refSteering = refDB(datab , 'Promise/'+index+"/"+"Steering")
onValue(refSteering , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        steeringarray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

// Fsus
let fsusArraay:any =[]

const reffsus = refDB(datab , 'Promise/'+index+"/"+"FrontSuspension")
onValue(reffsus , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        fsusArraay.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})


//Rsus
let rsusArraay:any =[]

const refrsus = refDB(datab , 'Promise/'+index+"/"+"RearSuspension")
onValue(refrsus , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        rsusArraay.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})



//Services
let servicesArray:any =[]

const refServices = refDB(datab , 'Promise/'+index+"/"+"Services")

onValue(refServices , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        servicesArray.push({
    flat:snap3.child('resp').val(),
    note:snap3.child('notr').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})

















const toSend =(index:any)=>{
let total:number = 0


let infoSUM:number = 0
info.forEach(n=>{

if(n.completed == true){

  infoSUM = infoSUM +parseFloat(n.flat)
  
}

})



let hvacSuma:number = 0
hvac.forEach(n=>{

if(n.completed == true){

  hvacSuma = hvacSuma +parseFloat(n.flat)
  
}

})



let interiorSUMA:number = 0
interior.forEach(n=>{

if(n.completed == true){

  interiorSUMA = interiorSUMA +parseFloat(n.flat)
  
}

})



let exteriorSuma:number = 0
exterior.forEach(n=>{

if(n.completed == true){

  exteriorSuma = exteriorSuma +parseFloat(n.flat)
  
}

})

let batterySuma:number = 0
battery.forEach(n=>{

if(n.completed == true){

  batterySuma = batterySuma +parseFloat(n.flat)
  
}

})

let underhSuma:number = 0
underh.forEach(n=>{

if(n.completed == true){

  underhSuma = underhSuma +parseFloat(n.flat)
  
}

})

let fluidSuma:number = 0
fluids.forEach(n=>{

if(n.completed == true){

  fluidSuma = fluidSuma +parseFloat(n.flat)
  
}

})

let llantasSuma:number = 0
tires.forEach(n=>{

if(n.completed == true){

  llantasSuma = llantasSuma +parseFloat(n.flat)
  
}

})

let brakeSuma:number = 0
brakes.forEach(n=>{

if(n.completed == true){

  brakeSuma = brakeSuma +parseFloat(n.flat)
  
}

})


let steeringSuma:number = 0
steering.forEach(n=>{

if(n.completed == true){

  steeringSuma = steeringSuma +parseFloat(n.flat)
  
}

})

let fsusSuma:number = 0
fsus.forEach(n=>{

if(n.completed == true){

  fsusSuma = fsusSuma +parseFloat(n.flat)
  
}

})

let rsusSuma:number = 0
rsus.forEach(n=>{

if(n.completed == true){

  rsusSuma = rsusSuma +parseFloat(n.flat)
  
}

})

let serrvicesSuma:number = 0
service.forEach(n=>{

if(n.completed == true){

  serrvicesSuma = serrvicesSuma +parseFloat(n.flat)
  
}

})




 total =infoSUM + hvacSuma + interiorSUMA + exteriorSuma + batterySuma+ underhSuma + fluidSuma + llantasSuma + brakeSuma + steeringSuma + fsusSuma + rsusSuma + serrvicesSuma




  try {
  
      set(refDB(datab , "Toclose/"+ index +"/"+"RoadTest" ) ,{
  
          road:roadTest,
          stike:stiker,
             
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"HVAC" ) ,{
  
  hvac
         
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Interior" ) ,{
  
      interior
      
      } )
      
  
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Exterior" ) ,{
  
  exterior
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Battery" ) ,{
  
      battery
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Underhood" ) ,{
  
  underh
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"UnderhoodFluids" ) ,{
  
  fluids
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Tires" ) ,{
  
  tires,
  llantasArray
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Brakes" ) ,{
  
   brakes,
   frenosArray
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Steering" ) ,{
  
  steering
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"FrontSuspension" ) ,{
  
    fsus
  
  } )
  
  set(refDB(datab , "Toclose/"+ index +"/"+"RearSuspension" ) ,{
  
  rsus
  
  } )
  
  
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Services" ) ,{
  
      service
      
      } )
      set(refDB(datab , "Toclose/"+ index +"/"+"Total" ) ,{
  
        total
        
        } )

      set(refDB(datab , "Toclose/"+ index +"/"+"Time" ) ,{
  
        yy:yy,
        mm:mm,
        dd:dd,
        hh:hh,
        mins:mins
          
          } )
  
  //set(refDB(datab, "Promise/"+ index +"/"+"Estado"  ) , "NOAP")
  
  
  set(refDB(datab , "Toclose/"+ index +"/"+"Information" ), totalInfo )

  {totalInfo.map((op:any)=>{

    set(refDB(datab , "ALLCUSTOMERS/" + op.phone ), totalInfo )


  })}


  set(refDB(datab , "Toclose/"+ index +"/"+"Infoflat" ), info )
      alert("COMPLETED")
  
   // set(refDB(datab , "Promise/"+index),null)
  
      window.location.reload();

  } catch (error) {
      alert(error)
  }
  
  
     
  }
  
















  



  return(
    <div>

<table className="cursor-pointer" onClick={()=>{
                toggleVisibility(index)
sethvac(hvacArray)
setinterior(interiorArry)
setexterior(exteriorArray)
setunderh(undehArray)
setBattery(batteryAray)
setFluids(FluidsArray)
settires(tiresArray)
setBrakes(brakeArray)
setsteering(steeringarray)
setfsus(fsusArraay)
setrsus(rsusArraay)
setservice(servicesArray)
setInfo(arrayInfo)

    }}>

<tr>
  <th   className="bg-indigo-300 text-gray-100">RO</th>
<th  className="bg-indigo-300 text-gray-100">Vehicle</th>
</tr>

<tr >
  <td>{index}</td>
  <td>{marca} {modelo} {ano}</td>
</tr>

</table>



{visible == index ? <div>

<table>
  INFORMATION
<tr>
  <th>
    Service description
  </th>
  <th>
    Flat rate
  </th>
  <th>
    Completed
  </th>
</tr>


{info.map(k =>{
  return(
    <tr>
      <td>{k.nameSRV}</td>
      <td>{k.flat}</td>
      <td><input  type="radio" onClick={()=>{

k.completed = true

      }} /> </td>
    </tr>
  )

})}


</table>

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
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{hvac.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty" || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">INTERIOR</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{interior.map((ind:any)=>{
  return(
    <tr>
      <td>{ind.valor}</td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ? <span> <img src={upper} width={30} /> </span> : <span>  { ind.flat == "Declined" ? <span>  <img src={downer} width={30} /> </span> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">EXTERIOR</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{exterior.map((ind:any)=>{
  return(
    <tr>
      <td>{ind.valor}</td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ? <span> <img src={upper} width={30} /> </span> : <span>  { ind.flat == "Declined" ? <span>  <img src={downer} width={30} /> </span> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>
    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">Battery / Wiper Blades</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{battery.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "Good"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">UNDERHOOD</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{underh.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">FLUIDS</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{fluids.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">TIRES</h3> <hr />
    <table> 
      {llantasArray.map((i:any)=>{
        return(
          <div>
           Left front : {i.tire1} <br />
           Right front : {i.tire2} <br />
           Left Rear : {i.tire3} <br />
           Right Rear : {i.tire4} <br />
          </div>
        )
      })}
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{tires.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">BRAKES</h3> <hr />
    <table> 

{frenosArray.map((i:any)=>{
  return(
    <div>
        Left front : {i.pad1} <br />
           Right front : {i.pad2} <br />
           Left Rear : {i.pad3} <br />
           Right Rear : {i.pad4} <br />
    </div>
  )
})}

    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{brakes.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />


<h3 className="text-gray-300 text-2xl">STEERING</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{steering.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty"  || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">FRONT SUSPENSION</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{fsus.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty" || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />


<h3 className="text-gray-300 text-2xl">REAR SUSPENSION</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{rsus.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty" || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">SERVICES</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
    <th>Actions </th>
</tr>

{service.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} width={50} /> </td>
      <td> {ind.note} </td>
      <td> {ind.flat}  {ind.flat == parseFloat(ind.flat)   ?  <img src={upper} width={30} />  : <span>  { ind.flat == "Declined" ?   <img src={downer} width={30} /> :null }    </span> }     </td>
      <td> {(ind.flat == "Declined" || ind.flat == "Empty" || ind.flat == null ) || ind.valor == "All OK"   ? null : <div> Completed: <input type="radio" onClick={()=>{

ind.completed = true

      }} /> </div> } 
         </td>

    </tr>
  )
})}
    
 </table>
<br />


<button className="btnBar" onClick={()=>toSend(index)}>Send</button>
</div>
 : null }

<br />

    </div>
  )
})}



    </div>
  );
}