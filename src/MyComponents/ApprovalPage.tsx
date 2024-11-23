import { getDatabase, onValue, ref, ref as refDB, set } from "firebase/database";
import app from "../fireconfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";




export function Approval() {

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


const [ros , setros] = useState<number[]>([]);
const [namelogin , setnameogin] = useState<string>();
const [visible , setvisible] = useState<any>();
const [hiddenInfo , setHiddeninfo] = useState<boolean>(true);


//Responses

const [hvacFlat , sethvacFlat] = useState<any>();
const [hvacExtra , sethvacExtra] = useState<any>();
const [hvacDef , sethvacDef] = useState<any[]>([]);
const [hvac , sethvac] = useState<any[]>([]);

const [interiorFlat , setinteriorFlat] = useState<any>();
const [interiorDef , setinteriorDef] = useState<any[]>([]);
const [interior , setinterior] = useState<any[]>([]);
const [interiorExtra , setInteriorExtra] = useState<any>();


const [exteriorFlat , setexteriorFlat] = useState<any>();
const [exteriorDef , setexteriorDef] = useState<any[]>([]);
const [exterior , setexterior] = useState<any[]>([]);
const [exteriorExtra , setExteriorExtra] = useState<any>();


const [batteryFlat , setbatteryFlat] = useState<any>();
const [batteryDef , setbatteryDef] = useState<any[]>([]);
const [battery , setbattery] = useState<any[]>([]);
const [BatteryExtra , setBatteryExtra] = useState<any>();


const [underhFlat , setunderhFlat] = useState<any>();
const [underDef , setunderDef] = useState<any[]>([]);
const [underh , setunderh] = useState<any[]>([]);
const [underhExtra , setUnderhExtra] = useState<any>();


const [fluidFlat , setfluidFlat] = useState<any>();
const [fluidDef , setfluidDef] = useState<any[]>([]);
const [fluids , setFluids] = useState<any[]>([]);
const [fluidsExtra , setFluidsExtra] = useState<any>();



const [tireFlat , settireFlat] = useState<any>();
const [tireDef , settireDef] = useState<any[]>([]);
const [tires , setTires] = useState<any[]>([]);
const [llantass , setLLantas] = useState<number[]>([]);
const [tiresExtra , setTiresExtra] = useState<any>();





const [brakeFlate , setbrakeFlate] = useState<any>();
const [brakeDef , setbrakeDef] = useState<any[]>([]);
const [brakes , setBrakes] = useState<any[]>([]);
const [frenos , setFrenos] = useState<number[]>([]);
const [brakesExtra , setBrakesExtra] = useState<any>();



const [steerinFlat , setsteerinFlat] = useState<any>();
const [steerinDef , setsteerinDef] = useState<any[]>([]);
const [steering , setSteering] = useState<any[]>([]);
const [steeringExtra , setSteeringExtra] = useState<any>();



const [fsusFlat , setfsusFlat] = useState<any>();
const [fsusDef , setfsusDef] = useState<any[]>([]);
const [fsus , setfsus] = useState<any[]>([]);
const [fsusExtra , setFsusExtra] = useState<any>();



const [rsusFlat , setrsusFlat] = useState<any>();
const [rsusDef , setrsusDef] = useState<any[]>([]);
const [rsus , setrsus] = useState<any[]>([]);
const [rsusExtra , setrsusExtra] = useState<any>();


const [serviceFlat , setserviceFlat] = useState<any>();
const [serviceDef , setserviceDef] = useState<any[]>([]);
const [service , setService] = useState<any[]>([]);
const [serviceExtra , setServiceExtra] = useState<any>();


const [info , setInfo] = useState<any[]>([])


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






},[namelogin , hvacFlat])


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

//INFO

let arrayInfo:any =[]

const refInfo = refDB(datab , 'PreAprobal/'+item+"/"+"Information")
onValue(refInfo , snap =>{
snap.forEach(snap2=>{
   arrayInfo.push(snap2.val())
})
  
   
})


// ROAD TEST

let roadTest:any;
let stiker:any;
const refRoad = refDB(datab , 'PreAprobal/'+item+"/"+"RoadTest")
onValue(refRoad , snap =>{

   roadTest = snap.child("road").val()
   stiker = snap.child("stike").val()
})

//HVAC

let hvacArray:any =[]

const refHvac = refDB(datab , 'PreAprobal/'+item+"/"+"HVAC")
onValue(refHvac , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        hvacArray.push({
    color:snap3.child('color').val(),
    notr:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    
        })
    })
})
  
   
})




let interiorArrya:any =[]

//interior
const refInterior = refDB(datab , 'PreAprobal/'+item+"/"+"Interior")
onValue(refInterior , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            interiorArrya.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
        })
    })
      
       
    })



//Exterior
let exteroirArray:any=[]
const refExterior = refDB(datab , 'PreAprobal/'+item+"/"+"Exterior")
onValue(refExterior , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            exteroirArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
        })
    })
      
       
    })


    //battery
let batteryArray:any=[]
const refBattery = refDB(datab , 'PreAprobal/'+item+"/"+"Battery")
onValue(refBattery , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            batteryArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
        })
    })
      
       
    })



    
//Front Suspension
let fsusArray:any=[]
const refFsus = refDB(datab , 'PreAprobal/'+item+"/"+"FrontSuspension")
onValue(refFsus , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            fsusArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

//UnderHood
let underHoodArray:any=[]
const refUnderhood = refDB(datab , 'PreAprobal/'+item+"/"+"Underhood")
onValue(refUnderhood , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            underHoodArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

//Fluids
let fluidArray:any=[]
const refFluids = refDB(datab , 'PreAprobal/'+item+"/"+"UnderhoodFluids")
onValue(refFluids , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            fluidArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

//tires




let llantasArray:any=[]
const reftires = refDB(datab , 'PreAprobal/'+item+"/"+"Tires")
onValue(reftires , snap =>{
    
    llantasArray.push({
        tire1:snap.child('tirefl').val(),
tire2:snap.child('tirefr').val(),
tire3:snap.child('tirelr').val(),
tire4:snap.child('tirerr').val(),
    
    })
    
    
    
})


let tiresArray:any=[]
onValue(reftires , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
       //  settirefl(llantafl)  
            tiresArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})




//Brakes
let brakesArrya:any=[]
const refBrakes = refDB(datab , 'PreAprobal/'+item+"/"+"Brakes")
onValue(refBrakes , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            brakesArrya.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

let frenosArray:any=[]
onValue(refBrakes , snap =>{
    
        
    
    frenosArray.push({
        pad1:snap.child('pad1').val(),
pad2:snap.child('pad2').val(),
pad3:snap.child('pad3').val(),
pad4:snap.child('pad4').val(),
    
    })
    
    
    
})



//Steering
let steeringArray:any=[]
const refSteerin = refDB(datab , 'PreAprobal/'+item+"/"+"Steering")
onValue(refSteerin , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            steeringArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

//Rear Suspension
let rsusArray:any=[]
const refrsus = refDB(datab , 'PreAprobal/'+item+"/"+"RearSuspension")
onValue(refrsus , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            rsusArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

//Services
let servicesArray:any=[]
const refServices = refDB(datab , 'PreAprobal/'+item+"/"+"Services")
onValue(refServices , snap =>{
    snap.forEach(snap2=>{
        snap2.forEach(snap3=>{
            servicesArray.push({
        color:snap3.child('color').val(),
        notr:snap3.child('note').val(),
        status:snap3.child('status').val(),
        url:snap3.child('url').val(),
        valor:snap3.child('valor').val(),
            })
            
        })
    })
    
    
    
})

const toSend =(index:any)=>{


    try {
    
        set(refDB(datab , "Promise/"+ index +"/"+"RoadTest" ) ,{
    
            road:roadTest,
            stike:stiker,
               
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"HVAC" ) ,{
    
    hvac
           
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Interior" ) ,{
    
        interior
        
        } )
        
    
    
    set(refDB(datab , "Promise/"+ index +"/"+"Exterior" ) ,{
    
    exterior
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Battery" ) ,{
    
        battery
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Underhood" ) ,{
    
    underh
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"UnderhoodFluids" ) ,{
    
    fluids
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Tires" ) ,{
    
    tires,
    llantass
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Brakes" ) ,{
    
     brakes,
     frenos
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"Steering" ) ,{
    
    steering
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"FrontSuspension" ) ,{
    
      fsus
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"RearSuspension" ) ,{
    
    rsus
    
    } )
    
    set(refDB(datab , "Promise/"+ index +"/"+"RearSuspension" ) ,{
    
    rsus
    
    } )
    
    
    set(refDB(datab , "Promise/"+ index +"/"+"Services" ) ,{
    
        service
        
        } )
    
        set(refDB(datab , "Promise/"+ index +"/"+"Time" ) ,{
    
          yy:yy,
          mm:mm,
          dd:dd,
          hh:hh,
          mins:mins
            
            } )
    
    set(refDB(datab, "Promise/"+ index +"/"+"Estado"  ) , "NOAP")
    
    
    set(refDB(datab , "Promise/"+ index +"/"+"Information" ), info )
        alert("SENT")
    
       set(ref(datab , "PreAproval/"+index),null)
    
        window.location.reload();
    } catch (error) {
        alert(error)
    }
    
    
       
    }
    


    return(
        <div key={index} >





            <button className="bg-opacity-50 bg-slate-700 rounded p-3 w-full" onClick={()=>{
                toggleVisibility(index)
                setfsus(fsusArray)
                setrsus(rsusArray)
                setexterior(exteroirArray)
                setinterior(interiorArrya)
                sethvac(hvacArray)
                setbattery(batteryArray)
                setunderh(underHoodArray)
                setFluids(fluidArray)
                setTires(tiresArray)
                setBrakes(brakesArrya)
                setSteering(steeringArray)
                setService(servicesArray)
                setInfo(arrayInfo)
                setLLantas(llantasArray)
                setFrenos(frenosArray)

            }} >{item}</button>
            {visible == index  ? <div>







<button className="btnBar" onClick={()=>{

if(hiddenInfo){
    setHiddeninfo(false)
}else{setHiddeninfo(true)}

}}>INFO</button>

            
                <div hidden={hiddenInfo} className="infoBloq">



{info.map((id:any)=>{

let arraysvcs:any=[]
const refSvcs = ref(datab , 'PreAprobal/'+item+"/"+"Information")
onValue(refSvcs , snap =>{
    snap.forEach(snap2 =>{
        snap2.forEach(snap3 =>{
            snap3.forEach(snap4=>{

                arraysvcs.push({
                flat:snap4.child('flat').val(),
                name:snap4.child('name').val()
                })
            })
            
        })
        
        
    })
})

    return(
        <div>
               <h4 className="text-xl font-bold">SERVICES</h4>
               <hr />
      {
        arraysvcs.map((i:any)=>{

            return(
                <div>
                    Service: <b>{i.name}</b>
                    Flat Rate: <b>{i.flat}</b>
                </div>
            )
        })
      }
               

            <br />
            <h4 className="text-xl font-bold">INFORMATION</h4>
<hr />
            Name: <b>{id.name}</b>  -   LastName: <b>{id.last}</b> <br />
            Phone: <b>{id.phone}</b>  -   Techician: <b>{id.emp}</b> <br />
            Advisor: <b>{id.advisor}</b> <br />
            State: <b>{id.state}</b>  -   City: <b>{id.city}</b> - Street: <b>{id.street}</b>  -   Zip: <b>{id.zip}</b> <br />
            State: <b>{id.state}</b>  -   City: <b>{id.city}</b> - Street: <b>{id.street}</b>  -   Zip: <b>{id.zip}</b> <br />
     
     <br />
            <h4 className="text-xl font-bold">Vehicle</h4>
            <hr />

            Make: <b>{id.make}</b>  -   Model: <b>{id.model}</b> <br />
            Plate: <b>{id.plate}</b>  -   Vin: <b>{id.vin}</b> <br />
            Year: <b>{id.yearcar}</b>  -   Millage: <b>{id.millage}</b> <br />
            
            <br />
            <h4 className="text-xl font-bold">Date sumbited</h4>
            <hr />

            Date: <b>{id.currentMonth}/{id.currentDay}/{id.currentYear}</b>  -   Hour: <b>{id.currentHour}</b> <br />
            Plate: <b>{id.plate}</b>  -   Vin: <b>{id.vin}</b> <br />
            Year: <b>{id.yearcar}</b>  -   Millage: <b>{id.millage}</b> <br />

     
        </div>
    )
})}





</div>

<div>



<div >

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


<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>sethvacExtra(e.target.value)} /> <button className="btn" onClick={()=>{

sethvac([...hvac , {
    valor:hvacExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 <table> 

<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>sethvacFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{hvac.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>

        <button className="approve" onClick={()=>{

if (hvacFlat != null || hvacFlat == 0) {

    ind.resp = hvacFlat

    sethvacDef([...hvacDef , hvacFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

sethvacDef([...hvacDef , "Declined"])

                }} > Decline </button>

            </div> : null }

          
                
            
             
<hr />
            </td>

            <td>{ind.resp}
                
                {(ind.resp != "Declined" && hvacDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>

        </tr>
    )
})}
    
    
 </table>

<br />
<hr />
<br />



<h3 className="text-gray-300 text-2xl">INTERIOR / DASH</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setInteriorExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setinterior([...interior , {
    valor:interiorExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setinteriorFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>


{interior.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div> 

            <button className="approve" onClick={()=>{

if (interiorFlat != null || interiorFlat == 0) {

    ind.resp = interiorFlat

    setinteriorDef([...interiorDef , interiorFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setinteriorDef([...interiorDef , "Declined"])

                }} > Decline </button>
                
            </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && interiorDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>
        </tr>
    )
})}
    
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">EXTERIOR</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setExteriorExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setexterior([...exterior , {
    valor:exteriorExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setexteriorFlat(e.target.value)} />
    </th><th>Status</th>
</tr>


{exterior.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div> 

            <button className="approve" onClick={()=>{

if (exteriorFlat != null || exteriorFlat == 0) {

    ind.resp = exteriorFlat

    setinteriorDef([...exteriorDef , exteriorFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setexteriorDef([...exteriorDef , "Declined"])

                }} > Decline </button>
                
              </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && exteriorDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>

        </tr>
    )
})}
    
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">BATTERY / WIPER BLADES</h3> <hr />
<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setBatteryExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setbattery([...battery , {
    valor:BatteryExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 
<table> 


<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setbatteryFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>


{battery.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />


            {ind.status != "good" ? <div> 

            <button className="approve" onClick={()=>{

if (batteryFlat != null || batteryFlat == 0) {

    ind.resp = batteryFlat

    setbatteryDef([...batteryDef , batteryFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setbatteryDef([...batteryDef , "Declined"])

                }} > Decline </button>
                
              </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && batteryDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>


        </tr>
    )
})}
    
    
 </table>

<br />
<hr />
<br />


<h3 className="text-gray-300 text-2xl">Underhood</h3> <hr />
<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setUnderhExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setunderh([...underh , {
    valor:underhExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 


<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setunderhFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{underh.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>   

            <button className="approve" onClick={()=>{

if (underhFlat != null || underhFlat == 0) {

    ind.resp = underhFlat

    setunderDef([...underDef , underhFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setunderDef([...underDef , "Declined"])

                }} > Decline </button>
                
            </div> : null }
             
<hr />
            </td>
            
            <td >  {ind.resp}
                
                {(ind.resp != "Declined" && underDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>
      
        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl"> Fluids</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setFluidsExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setFluids([...fluids , {
    valor:fluidsExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setfluidFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{fluids.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All Fluids Good" ? <div>   

            <button className="approve" onClick={()=>{

if (fluidFlat != null || fluidFlat == 0) {

    ind.resp = fluidFlat

    setfluidDef([...fluidDef , fluidFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setfluidDef([...fluidDef , "Declined"])

                }} > Decline </button>
                
            </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && fluidDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />


<h3 className="text-gray-300 text-2xl">Tires</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setTiresExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setTires([...tires , {
    valor:tiresExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 

{llantass.map((n:any)=>{
    return(
        <div>
            
            FRONT LEFT : <b> {n.tire1}</b> <br />
            FRONT RIGHT : <b> {n.tire2}</b> <br />
            REAR LEFT : <b> {n.tire3}</b> <br />
            REAR RIGHT : <b> {n.tire4}</b> <br />
            
            </div>
    )
})}



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>settireFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{tires.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>   


            <button className="approve" onClick={()=>{

if (tireFlat != null || tireFlat == 0) {

    ind.resp = tireFlat

    settireDef([...tireDef , tireFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

settireDef([...tireDef , "Declined"])

                }} > Decline </button>
                
            </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && tireDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">Brakes</h3> <hr />
<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setBrakesExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setBrakes([...brakes , {
    valor:brakesExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 

{frenos.map((n:any)=>{
    return(
        <div>
            
            FRONT LEFT : <b> {n.pad1}</b> <br />
            FRONT RIGHT : <b> {n.pad2}</b> <br />
            REAR LEFT : <b> {n.pad3}</b> <br />
            REAR RIGHT : <b> {n.pad4}</b> <br />
            
            </div>
    )
})}




<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setbrakeFlate(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{brakes.map((ind:any ,x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr} </td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div> 

            <button className="approve" onClick={()=>{

if (brakeFlate != null || brakeFlate == 0) {

    ind.resp = brakeFlate

    setbrakeDef([...brakeDef , brakeFlate])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setbatteryDef([...brakeDef , "Declined"])

                }} > Decline </button>
                
              </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && brakeDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>

        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">Steering</h3> <hr />
<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setSteeringExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setSteering([...steering , {
    valor:steeringExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 


<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setsteerinFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{steering.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>  

            <button className="approve" onClick={()=>{

if (steerinFlat != null || steerinFlat == 0) {

    ind.resp = steerinFlat

    setsteerinDef([...steerinDef , steerinFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setsteerinDef([...steerinDef , "Declined"])

                }} > Decline </button>
                
             </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && steerinDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">FRONT SUSPENSION</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setFsusExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setfsus([...fsus , {
    valor:fsusExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setfsusFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{fsus.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div> 
          
            <button className="approve" onClick={()=>{

if (fsusFlat != null || fsusFlat == 0) {

    ind.resp = fsusFlat

    setfsusDef([...fsusDef , fsusFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setfluidDef([...fsusDef , "Declined"])

                }} > Decline </button>
                
              </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && fsusDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">REAR SUSPENSION</h3> <hr />
<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setrsusExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setrsus([...rsus , {
    valor:rsusExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 


<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setrsusFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{rsus.map((ind:any , x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>  

            <button className="approve" onClick={()=>{

if (rsusFlat != null || rsusFlat == 0) {

    ind.resp = rsusFlat

    setrsusDef([...rsusDef , rsusFlat])


}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setrsusDef([...rsusDef , "Declined"])

                }} > Decline </button>
                
             </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && rsusDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>



        </tr>
    )
})}
    
 </table>

<br />
<hr />
<br />

<h3 className="text-gray-300 text-2xl">Services</h3> <hr />

<div className=" float-right "><input type="text" placeholder="Add" onChange={(e)=>setServiceExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setService([...service , {
    valor:serviceExtra,
    color:"bg-green-300"
}])

}}>Add</button> </div>
 

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input id="campo" type="number" placeholder="Flat Rate" onChange={(e)=>setserviceFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>

{service.map((ind:any ,x)=>{
    return(
        <tr>
            <td className={ind.color} >{ind.valor}</td>
            <td className={ind.color}> <img src={ind.url} width={50} onClick={()=>window.open(ind.url)} /></td>
            <td className={ind.color}>{ind.notr}</td>
            <td>

            <br />

            {ind.valor != "All OK" ? <div>  

            <button className="approve" onClick={()=>{

if (serviceFlat != null || serviceFlat == 0) {

    ind.resp = parseFloat(serviceFlat)

    setserviceDef([...serviceDef , serviceFlat])

  //  document.getElementById('campo').value =0;

}else{alert("Check Flat rate")}

        }} > Approve  </button>
             <button className="decline" onClick={()=>{

ind.resp = "Declined"

setserviceDef([...serviceDef , "Declined"])

                }} > Decline </button>
                
             </div> : null }
             
<hr />
            </td>
            
            <td>{ind.resp}
                
                {(ind.resp != "Declined" && serviceDef[x] != null  ) ? <div>Approved</div>  : null }

                 </td>



        </tr>
    )
})}
    


 </table>

<br />
<hr />
<br />

</div>



<button className="btnBar" onClick={()=>toSend(item)}>Send</button>

</div>
    
   











</div> : null }


<br /> <br />

        </div>
    )
})}


    </div>
  );
}