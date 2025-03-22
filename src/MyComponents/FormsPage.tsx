import { getDatabase, onValue, ref, ref as refDB, set } from "firebase/database"
import app from "../fireconfig"
import {  useEffect, useState } from "react"
import { getDownloadURL, getStorage, ref as refSto, uploadBytes } from "firebase/storage"
import React from 'react';
import './mas.css'

interface propi{

test:string,

}


export const Forms:React.FC<propi> =({test})=>{

 

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mins = today.getMinutes();
    const storage = getStorage(app)

   const datab = getDatabase(app)

   const infoRef = ref(datab , "NewSet/" + test)
   const infoDone = ref(datab , "Completed")



   const [green , setgreen] =useState<string>('bg-green-400')
   const [red , setred] =useState<string>('bg-red-400')
   const [yellow , setyellow] =useState<string>('bg-yellow-400')

    
    const [roadCoor , setRoadColor] =useState<string>()
    const [roadShot , setRoadShow] =useState(true)
    const [hideROS , sethideROS] =useState(true)
    const [roadTest , setRoadTest] =useState<string>("NO")
    const [stikercolor , setstikerClor] =useState<string>()
    const [stiker , setStiker] =useState<string>("NO")


const [hvacArray , sethvacArray] =useState<any[]>([])
const [hvac , sethvac] =useState<any>("All OK")
const [hvacStatus , sethvacStatus] =useState<string>("Empty")
const [hvacUrls, setHvacUrls] =useState<any>("Empty")
const [acColor , setAcColor] =useState<string>()
const [hvacNotes , sethvacNotes] =useState<string>("Empty")
const [acShow , setAcShiw] =useState(true)

    
const [interiorArray , setinteriorArray] =useState<any[]>([])
const [interior , setinterior] =useState<any>("All OK")
const [interiorStatus , setinteriorStatus] =useState<string>("Empty")
const [interiorUrl, setinteriorUrl] =useState<any>("Empty")
const [interiorColor , setinteriorColor] =useState<string>()
const [interiorNotes , setinteriorNotes] =useState<string>("Empty")
const [interiorShow , setinteriorShow] =useState(true)
    

const [exteriorArray , setexteriorArray] =useState<any[]>([])
const [exterior , setexterior] =useState<any>("All OK")
const [exteriorStatus , setexteriorStatus] =useState<string>("Empty")
const [exteriorUrl, setexteriorUrl] =useState<any>("Empty")
const [exteriorColor , setexteriorColor] =useState<string>()
const [exteriorNotes , setexteriorNotes] =useState<string>("Empty")
const [exteriorShow , setexteriorShow] =useState(true)

 

const [batteryArray , setbatteryArray] =useState<any[]>([])
const [battery , setbattery] =useState<any>("Battery")
const [batteryStatus , setbatteryStatus] =useState<string>("Empty")
const [batteryUrl, setbatteryUrl] =useState<any>("Empty")
const [batteryColor , setbatteryColor] =useState<string>()
const [batteryNotes , setbatteryNotes] =useState<string>("Empty")
const [batteryShow , setbatteryShow] =useState(true)

const [underHArray , setunderHArray] =useState<any[]>([])
const [underH , setunderH] =useState<any>("All OK")
const [underHStatus , setunderHStatus] =useState<string>("Empty")
const [underHUrl, setunderHUrls] =useState<any>("Empty")
const [underHColor , setunderHColor] =useState<string>()
const [underHNotes , setunderHNotes] =useState<string>("Empty")
const [underHShow , setunderHShow] =useState(true)

const [fluidsArray , setfluidsArray] =useState<any[]>([])
const [fluids , setfluids] =useState<any>("All Fluids Good")
const [fluidsstatus , setfluidsstatus] =useState<string>("Empty")
const [fluidUrls, setfluidUrls] =useState<any>("Empty")
const [fluidColor , setfluidColor] =useState<string>()
const [fluidNotes , setfluidNotes] =useState<string>("Empty")
const [fluidShow , setfluidShow] =useState(true)


const [tiresArray , settiresArray] =useState<any[]>([])
const [tires , setTires] =useState<any>("All OK")
const [tiresStatus , settiresStatus] =useState<string>("Empty")
const [tiresUrl, settiresUrl] =useState<any>("Empty")
const [tiresColor , settiresColor] =useState<string>()
const [TiresNotes , setTiresNotes] =useState<string>("Empty")
const [tiresShow , settiresShow] =useState(true)
const [tirefr , settirefr] =useState<number>(-1)
const [tirefl , settirefl] =useState<number>(-1)
const [tirelr , settirelr] =useState<number>(-1)
const [tirerr , settirerr] =useState<number>(-1)





const [brakesArray , setbrakesArray] =useState<any[]>([])
const [brakes , setBrakes] =useState<any>("All OK")
const [brakesStatus , setbrakesStatus] =useState<string>("Empty")
const [brakesUrl, setbrakesUrl] =useState<any>("Empty")
const [brakesColor , setbrakesColor] =useState<string>()
const [brakeNotes , setbrakeNotes] =useState<string>("Empty")
const [brakeShow , setbrakeShow] =useState(true)
const [pad1 , setpad1] =useState<number>(-1)
const [pad2 , setpad2] =useState<number>(-1)
const [pad3 , setpad3] =useState<number>(-1)
const [pad4 , setpad4] =useState<number>(-1)
    
const [steeringArray , setSteeringArray] =useState<any[]>([])
const [steering , setsteering] =useState<any>("All OK")
const [steeringStatus , setsteeringStatus] =useState<string>("Empty")
const [steerinUrl, setsteerinUrl] =useState<any>("Empty")
const [steeringColor , setsteeringColor] =useState<string>()
const [steeringNotes , setsteeringNotes] =useState<string>("Empty")
const [steeringShow , setsteeringShow] =useState(true)

const [fSuspeArray , setfSuspeArray] =useState<any[]>([])
const [fSuspe , setffSuspe] =useState<any>("All OK")
const [fSuspeStatus , setfSuspeStatus] =useState<string>("Empty")
const [fSusspeUrl, setfSusspeUrl] =useState<any>("Empty")
const [fSuspeColor , setfSuspeColor] =useState<string>()
const [fSuspeNotes , setfSuspeNotes] =useState<string>("Empty")
const [fsuspeShow , setfsuspeShow] =useState(true)

const [rSuspeArray , setrSuspeArray] =useState<any[]>([])
const [rSuspe , setrSuspe] =useState<any>("All OK")
const [rSuspeStatus , setrSuspeStatus] =useState<string>("Empty")
const [rSusspeUrl, setrSusspeUrl] =useState<any>("Empty")
const [rSuspeColor , setrSuspeColor] =useState<string>()
const [rSuspeNotes , setrSuspeNotes] =useState<string>("Empty")
const [rsuspeShow , setrsuspeShow] =useState(true)

const [serviceArray , setserviceArray] =useState<any[]>([])
const [service , setservice] =useState<any>("All OK")
const [serviceStatus , setserviceStatus] =useState<string>("Empty")
const [serviceUrl, setserviceUrl] =useState<any>("Empty")
const [serviceColor , setserviceColor] =useState<string>()
const [serviceNotes , setserviceNotes] =useState<string>("Empty")
const [serviceShow , setserviceShow] =useState(true)


const [oldAC , setoldAc] =useState<any[]>([])
const [oldInterior , setoldInterior] =useState<any[]>([])
const [oldExterior , setoldExterior] =useState<any[]>([])
const [oldBattery , setoldBattery] =useState<any[]>([])
const [oldFluids , setOldFluids] =useState<any[]>([])
const [oldCapo , setoldCapo] =useState<any[]>([])
const [oldtires , setoldtires] =useState<any[]>([])
const [oldBrakes , setoldBrakes] =useState<any[]>([])
const [oldSteering , setoldSteering] =useState<any[]>([])
const [oldfsus , setoldfsus] =useState<any[]>([])
const [oldrsus , setoldrsus] =useState<any[]>([])
const [oldSVC , setoldSVC] =useState<any[]>([])
const [oldROS , setoldROS] =useState<any[]>([])

const [info , setInfo] = useState<any[]>([])


useEffect(()=>{


    setgreen('bg-green-300')
    setred('bg-red-300')
    setyellow('bg-yellow-300')
    
    
    
    let currentVin:any=''
    let arrayInfo:any[] =[];
    onValue(infoRef , snap =>{
        arrayInfo.push(snap.val())
        
        currentVin= snap.child('vin').val()
        
})
setInfo(arrayInfo)

let oldMillage:number=0
let arrOldRoS:any=[]
onValue(infoDone , snap=>{
    snap.forEach(snap2=>{
        snap2.child("Information").forEach(snap3=>{
            if(currentVin == snap3.child('vin').val()){
arrOldRoS.push(snap2.key)
                
                if (oldMillage < snap3.child("millage").val() ) {
                    oldMillage=snap3.child("millage").val();
                }
                
                
                
                
            }
            
        })
    })
})


let arrayoldhvac:any=[]
let arrayoldInterior:any=[]
let arrayoldExterior:any=[]
let OldunderH:any=[]
let arrayOldFluids:any=[]
let arrayoldBarrty:any=[]
let arrOldTires:any=[]
let arrOldBrakes:any=[]
let arrOldSteering:any=[]
let arrOldFsus:any=[]
let arrOldRsus:any=[]
let arrOldSVC:any=[]
onValue(infoDone ,snap=>{
    snap.forEach(snap2=>{
        
        snap2.child("Information").forEach(snap3=>{
            if(oldMillage == snap3.child('millage').val() && currentVin == snap3.child('vin').val() ){



                snap2.child('HVAC').child('hvac').forEach(snap3=>{
                    arrayoldhvac.push(snap3.val())
                    
                            })

                            snap2.child('Interior').child('interior').forEach(snap3=>{
                                arrayoldInterior.push(snap3.val())
                                
                                        })

                                        snap2.child('Exterior').child('exterior').forEach(snap3=>{
                                            arrayoldExterior.push(snap3.val())
                                            
                                                    })
                                                    snap2.child('Underhood').child('underh').forEach(snap3=>{
                                                        OldunderH.push(snap3.val())
                                                        
                                                                })

                                                                snap2.child('Battery').child('battery').forEach(snap3=>{
                                                                    arrayoldBarrty.push(snap3.val())
                                                                    
                                                                            })

                                                                            snap2.child('UnderhoodFluids').child('fluids').forEach(snap3=>{
                                                                                arrayOldFluids.push(snap3.val())
                                                                                
                                                                                        })

                                                                                        snap2.child('Tires').child('tires').forEach(snap3=>{
                                                                                            arrOldTires.push(snap3.val())
                                                                                            
                                                                                                    })

                                                                                                    snap2.child('Brakes').child('brakes').forEach(snap3=>{
                                                                                                        arrOldBrakes.push(snap3.val())
                                                                                                        
                                                                                                                })

                                                                                                                snap2.child('Steering').child('steering').forEach(snap3=>{
                                                                                                                    arrOldSteering.push(snap3.val())
                                                                                                                    
                                                                                                                            })
                                                                                                                            snap2.child('FrontSuspension').child('fsus').forEach(snap3=>{
                                                                                                                                arrOldFsus.push(snap3.val())
                                                                                                                                
                                                                                                                                        })

                                                                                                                                        snap2.child('RearSuspension').child('rsus').forEach(snap3=>{
                                                                                                                                            arrOldRsus.push(snap3.val())
                                                                                                                                            
                                                                                                                                                    })

                                                                                                                                                    snap2.child('Services').child('service').forEach(snap3=>{
                                                                                                                                                        arrOldSVC.push(snap3.val())
                                                                                                                                                        
                                                                                                                                                                })






            }
            
        })


   
        
      


    })
})





setoldCapo(OldunderH)
setoldAc(arrayoldhvac)
setoldInterior(arrayoldInterior)
setoldExterior(arrayoldExterior)
setOldFluids(arrayOldFluids)
setoldBattery(arrayoldBarrty)
setoldtires(arrOldTires)
setoldBrakes(arrOldBrakes)
setoldSteering(arrOldSteering)
setoldfsus(arrOldFsus)
setoldrsus(arrOldRsus)
setoldSVC(arrOldSVC)
setoldROS(arrOldRoS)
},[])



function toSend() {

try {

    set(refDB(datab , "PreAprobal/"+ test +"/"+"RoadTest" ) ,{

        road:roadTest,
        stike:stiker,
           
} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"HVAC" ) ,{

hvacArray
       
} )



set(refDB(datab , "PreAprobal/"+ test +"/"+"Exterior" ) ,{

exteriorArray

} )


set(refDB(datab , "PreAprobal/"+ test +"/"+"Interior" ) ,{

    interiorArray
    
    } )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Battery" ) ,{

    batteryArray

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Underhood" ) ,{

underHArray

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"UnderhoodFluids" ) ,{

fluidsArray

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Tires" ) ,{

tiresArray,
tirefl,
tirefr,
tirelr,
tirerr

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Brakes" ) ,{

 brakesArray,
 pad1,
pad2,
pad3,
pad4

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Steering" ) ,{

steeringArray

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"FrontSuspension" ) ,{

  fSuspeArray

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"RearSuspension" ) ,{

rSuspeArray

} )



set(refDB(datab , "PreAprobal/"+ test +"/"+"Services" ) ,{

    serviceArray
    
    } )

 

    set(refDB(datab , "PreAprobal/"+ test +"/"+"Time" ) ,{

      yy:yy,
      mm:mm,
      dd:dd,
      hh:hh,
      mins:mins
        
        } )

set(refDB(datab, "PreAprobal/"+ test +"/"+"Estado"  ) , "NOAP")


set(refDB(datab , "PreAprobal/"+ test +"/"+"Information" ), info )
    alert("SENT")

   set(ref(datab , "NewSet/"+test),null)

    window.location.reload();
} catch (error) {
    alert(error)
}


   
}




    return(
        <div>
            <button onClick={()=>{
                if (hideROS) {
                    sethideROS(false)
                }else{sethideROS(true)}
            }}>Previous Ro ↴</button> <br />
<span hidden={hideROS}>

{oldROS.map(x=>{
    return(
        <span> / <b>{x} </b>  </span>
    )
})}
</span>

            {/* ROAD TEST  */}
            <button className="btDiag"  onClick={()=>{
                if(roadShot){
                    setRoadShow(false)
                }else{setRoadShow(true)}
            }}>Road Test</button>



<div className="rows"  hidden={roadShot}>
    <tr>
    <td>Description</td>
    <td>Yes</td>
    <td>No</td>
</tr>

<tr>
    <td className={roadCoor}>Road Test</td>
<td  ><input type="radio" name="road"  onChange={()=>{
    setRoadColor('bg-green-500')
    setRoadTest("YES")
    }} /></td>
    <td><input type="radio"name="road" onChange={()=>{
    setRoadColor('bg-red-500')

       
    }
        
        } /></td>
</tr>



 <tr>
    <td className={stikercolor}>Has Stiker?</td>
    <td><input type="radio" name="stiker"  onChange={()=>{
        setstikerClor('bg-green-500')
        setStiker("YES")}} /></td>
    <td><input type="radio" name="stiker" onChange={()=>{
              setstikerClor('bg-red-500')

    }} /></td>
 </tr>
 
 <br />
 
 
</div>   





            {/* HVAC  */}

<button className="btDiagHvac"  onClick={()=>{
                if(acShow){
                    setAcShiw(false)
                }else{setAcShiw(true)}
            }}>    Ac / Heat  { hvacArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({hvacArray.length})</span> } </button>
<div className="rows" hidden={acShow}>

<span className=" font-extrabold">Last visit</span> <br />
{oldAC.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
            </div>
    )
})}


<hr />
<br /><br />


<select className="w-full"   onChange={(e)=>sethvac(e.target.value)}>
    <option>All OK</option>
    <option>No Heat</option>
    <option>No Cold</option>
    <option>Others</option>
</select>


    <td className={acColor}>Good<input type="radio" name="ac"  onChange={()=>{
        setAcColor(green)
        sethvacStatus("good")}} /></td>
  <td className={acColor}>Moderate<input type="radio" name="ac"  onChange={()=>{
        setAcColor(yellow)
        sethvacStatus("Moderate")}} /></td>
    <td className={acColor}>Bad<input type="radio" name="ac"  onChange={()=>{
        setAcColor(red)
        sethvacStatus("bad")}} /></td>

<br />

<input   className="w-full" type="text" placeholder="Notes" onChange={(e)=>sethvacNotes(e.target.value)} />
<br /><br />
            <input  type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"hvac"+"/"+hvac +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setHvacUrls(url)
  }
  )

} }   />


<br />
<img src={hvacUrls} width={50} />

<br />

<button className="btn" onClick={()=>{
    sethvacArray([...hvacArray , {
        note:hvacNotes,
        color:acColor,
        valor:hvac,
        url:hvacUrls,
        status:hvacStatus
    }])
setHvacUrls("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{hvacArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

sethvacArray( hvacArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>






</div>


            {/* INTERIOR Dash  */}

<button className="btnDash"  onClick={()=>{
                if(interiorShow){
                    setinteriorShow(false)
                }else{setinteriorShow(true)}
            }}>Interior / Dash  { interiorArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({interiorArray.length})</span> }</button>
<div  className="rows" hidden={interiorShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldInterior.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
            </div>
    )
})}




<hr />
<br />

    <div >

<select  className="w-full"  onChange={(e)=>setinterior(e.target.value)}>
    <option>All OK</option>
    <option>Bulb out</option>
    <option>Dash light</option>
    <option>Others</option>
</select>


<br />

    <td className={interiorColor}>Good<input type="radio" name="int"  onChange={()=>{
        setinteriorColor(green)
        setinteriorStatus("good")}} /></td>
  <td className={interiorColor}>Moderate<input type="radio" name="int"  onChange={()=>{
        setinteriorColor(yellow)
        setinteriorStatus("Moderate")}} /></td>
    <td className={interiorColor}>Bad<input type="radio" name="int"  onChange={()=>{
        setinteriorColor(red)
        setinteriorStatus("bad")}} /></td>

<br />
</div>
<input  className="w-full" type="text" placeholder="Notes" onChange={(e)=>setinteriorNotes(e.target.value)} />
<br />
<br />
            <input  type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"dash"+"/"+interior +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setinteriorUrl(url)
  }
  )

} }   />


<br />
<img src={interiorUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setinteriorArray([...interiorArray , {
        note:interiorNotes,
        color:interiorColor,
        valor:interior,
        url:interiorUrl,
        status:interiorStatus
    }])
setinteriorUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{interiorArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setinteriorArray( interiorArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>




</div>


            {/* Exteriors Lights  */}

            <button className="btnExt"  onClick={()=>{
                if(exteriorShow){
                    setexteriorShow(false)
                }else{setexteriorShow(true)}
            }}>Exterior / Lights  { exteriorArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({exteriorArray.length})</span> }</button>
<div  className="rows" hidden={exteriorShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldExterior.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
            </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full" onChange={(e)=>setexterior(e.target.value)}>
    <option>All OK</option>
    <option>High Beams</option>
    <option>Low Beams</option>
    <option>Fog Lights</option>
    <option>Front turn Lights</option>
    <option>Rear turn lights</option>
    <option>Front side Markers</option>
    <option>Rear side markers</option>
    <option>Brake lights</option>
    <option>Reverse light</option>
    <option>Tag lights</option>
    <option>Others</option>
</select>


<br />

    <td className={exteriorColor}>Good<input type="radio" name="ext"  onChange={()=>{
        setexteriorColor(green)
        setexteriorStatus("good")}} /></td>
  <td className={exteriorColor}>Moderate<input type="radio" name="ext"  onChange={()=>{
        setexteriorColor(yellow)
        setexteriorStatus("Moderate")}} /></td>
    <td className={exteriorColor}>Bad<input type="radio" name="ext"  onChange={()=>{
        setexteriorColor(red)
        setexteriorStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setexteriorNotes(e.target.value)} />
<br />
<br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"exte"+"/"+exterior +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setexteriorUrl(url)
  }
  )

} }   />


<br />
<img src={exteriorUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setexteriorArray([...exteriorArray , {
        note:exteriorNotes,
        color:exteriorColor,
        valor:exterior,
        url:exteriorUrl,
        status:exteriorStatus
    }])
setexteriorUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{exteriorArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setexteriorArray( exteriorArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>



</div>

            {/* Battery and Wipers  */}

            <button className="btnBattery"  onClick={()=>{
                if(batteryShow){
                    setbatteryShow(false)
                }else{setbatteryShow(true)}
            }}>Battery / Wiper Blades  { batteryArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({batteryArray.length})</span> }</button>
<div  className="rows" hidden={batteryShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldBattery.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "Battery" ? null : m.valor } - <span className=" font-extrabold text-orange-900"> {(m.flat >= 0  ) ? <span>Approved</span> : "Declined" }  </span> </span>
        </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setbattery(e.target.value)}>
    <option>Battery</option>
    <option>Front wiper blades</option>
    <option>Rear wiper blades</option>
    <option>Others</option>
</select>


<br />

    <td className={batteryColor}>Good<input type="radio" name="bat"  onChange={()=>{
        setbatteryColor(green)
        setbatteryStatus("good")}} /></td>
  <td className={batteryColor}>Moderate<input type="radio" name="bat"  onChange={()=>{
        setbatteryColor(yellow)
        setbatteryStatus("Moderate")}} /></td>
    <td className={batteryColor}>Bad<input type="radio" name="bat"  onChange={()=>{
        setbatteryColor(red)
        setbatteryStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setbatteryNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"batter"+"/"+battery +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setbatteryUrl(url)
  }
  )

} }   />


<br />
<img src={batteryUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setbatteryArray([...batteryArray , {
        note:batteryNotes,
        color:batteryColor,
        valor:battery,
        url:batteryUrl,
        status:batteryStatus
    }])
setbatteryUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{batteryArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setbatteryArray( batteryArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>




</div> 


            {/* Underhood things */}


<button className="btnUnderhood"  onClick={()=>{
                if(underHShow){
                    setunderHShow(false)
                }else{setunderHShow(true)}
            }}>Underhood  { underHArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({underHArray.length})</span> }</button>
<div  className="rows" hidden={underHShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldCapo.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setunderH(e.target.value)}>
    <option>All OK</option>
    <option>Timing belt</option>
    <option>Drive belt</option>
    <option>Upper Engine mount</option>
    <option>Air filter</option>
    <option>Cabin filter</option>
    <option>Others</option>
</select>


<br />

    <td className={underHColor}>Good<input type="radio" name="underh"  onChange={()=>{
        setunderHColor(green)
        setunderHStatus("good")}} /></td>
  <td className={underHColor}>Moderate<input type="radio" name="underh"  onChange={()=>{
        setunderHColor(yellow)
        setunderHStatus("Moderate")}} /></td>
    <td className={underHColor}>Bad<input type="radio" name="underh"  onChange={()=>{
        setunderHColor(red)
        setunderHStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setunderHNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"under"+"/"+underH +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setunderHUrls(url)
  }
  )

} }   />


<br />
<img src={underHUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setunderHArray([...underHArray , {
        note:underHNotes,
        color:underHColor,
        valor:underH,
        url:underHUrl,
        status:underHStatus
    }])
setunderHUrls("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{underHArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setunderHArray( underHArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>



</div>
 



            {/* Underhood Fluids */}


            <button className="btnFluids"  onClick={()=>{
                if(fluidShow){
                    setfluidShow(false)
                }else{setfluidShow(true)}
            }}>Underhood Fluids  { fluidsArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({fluidsArray.length})</span> }</button>
<div  className="rows" hidden={fluidShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldFluids.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setfluids(e.target.value)}>
    <option>All Fluids Good</option>
    <option>Engine Oil</option>
    <option>Transmission Oil</option>
    <option>Coolant / Antifreeze</option>
    <option>Power Steering</option>
    <option>Brake Fluid</option>
    <option>Others</option>
</select>


<br />

    <td  className={fluidColor}>Good<input type="radio" name="fluids"  onChange={()=>{
        setfluidColor(green)
        setfluidsstatus("good")}} /></td>
  <td  className={fluidColor}>Moderate<input type="radio" name="fluids"  onChange={()=>{
        setfluidColor(yellow)
        setfluidsstatus("Moderate")}} /></td>
    <td  className={fluidColor}>Bad<input type="radio" name="fluids"  onChange={()=>{
        setfluidColor(red)
        setfluidsstatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setfluidNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fluids"+"/"+fluids +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setfluidUrls(url)
  }
  )

} }   />


<br />
<img src={fluidUrls} width={50} />

<br />

<button className="btn" onClick={()=>{
    setfluidsArray([...fluidsArray , {
        note:fluidNotes,
        color:fluidColor,
        valor:fluids,
        url:fluidUrls,
        status:fluidsstatus
    }])
setfluidUrls("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{fluidsArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setfluidsArray( fluidsArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>



</div> 

         {/* TIRES */}


         <button className="btnTires"  onClick={()=>{
                if(tiresShow){
                    settiresShow(false)
                }else{settiresShow(true)}
            }}>Tires  { tiresArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({tiresArray.length})</span> }</button>
<div  className="rows" hidden={tiresShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldtires.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}
<hr />
<br /><br />

<div className="grid grid-cols-1 lg:grid-cols-2">


<span className="fields">
     Front left  <input type="number" onChange={(e)=>settirefl(parseInt(e.target.value))} /> 
    </span> 
    <span className="fields">
      Front right  <input type="number" onChange={(e)=>settirefr(parseInt(e.target.value))} />
    </span>
    <span className="fields">
      Rear left  <input type="number" onChange={(e)=>settirelr(parseInt(e.target.value))} />
    </span>
    <span className="fields">

      Rear right  <input type="number" onChange={(e)=>settirerr(parseInt(e.target.value))} />
    </span>

    </div>


    <div >

    
<select className="w-full"  onChange={(e)=>setTires(e.target.value)}>
    <option>All OK</option>
    <option>Spare</option>
    <option>Others</option>
</select>

<br />
<br />

    <td  className={tiresColor}>Good<input type="radio" name="tires"  onChange={()=>{
        settiresColor(green)
        settiresStatus("good")}} /></td>
  <td  className={tiresColor}>Moderate<input type="radio" name="tires"  onChange={()=>{
        settiresColor(yellow)
        settiresStatus("Moderate")}} /></td>
    <td  className={tiresColor}>Bad<input type="radio" name="tires"  onChange={()=>{
        settiresColor(red)
        settiresStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setTiresNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"tires"+"/"+tires +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   settiresUrl(url)
  }
  )

} }   />


<br />
<img src={tiresUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    settiresArray([...tiresArray , {
        note:TiresNotes,
        color:tiresColor,
        valor:tires,
        url:tiresUrl,
        status:tiresStatus
    }])
settiresUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{tiresArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

settiresArray( tiresArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>

</div>


         {/* Brkaes */}


         <button className="btnBrakes"  onClick={()=>{
                if(brakeShow){
                    setbrakeShow(false)
                }else{setbrakeShow(true)}
            }}>Brakes  { brakesArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({brakesArray.length})</span> }</button>
<div className="rows" hidden={brakeShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldBrakes.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}
 
<hr />
<br /><br />


<div className="grid grid-cols-1 lg:grid-cols-2">


<span className="fields">
Front left B.Pad  <input type="number" onChange={(e)=>setpad1(parseInt(e.target.value))} />
</span>
<span className="fields">
      Front right B.Pad  <input type="number" onChange={(e)=>setpad2(parseInt(e.target.value))} />
</span>
<span className="fields">
      Rear left B.Pad <input type="number" onChange={(e)=>setpad3(parseInt(e.target.value))} />
</span>
<span className="fields">

      Rear right B.Pad <input type="number" onChange={(e)=>setpad4(parseInt(e.target.value))} />
</span>



</div>


    <div >

<select className="w-full"  onChange={(e)=>setBrakes(e.target.value)}>
    <option>All OK</option>
    <option>Front Brakes</option>
    <option>Rear Brakes</option>
    <option>Caliper</option>
    <option>Disk</option>
    <option>Drump</option>
    <option>Others</option>
</select>


<br />

    <td className={brakesColor}>Good<input type="radio" name="brakes"  onChange={()=>{
        setbrakesColor(green)
        setbrakesStatus("good")}} /></td>
  <td className={brakesColor}>Moderate<input type="radio" name="brakes"  onChange={()=>{
        setbrakesColor(yellow)
        setbrakesStatus("Moderate")}} /></td>
    <td className={brakesColor}>Bad<input type="radio" name="brakes"  onChange={()=>{
        setbrakesColor(red)
        setbrakesStatus("bad")}} /></td>

<br />
</div>

<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setbrakeNotes(e.target.value)} />

<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"brakes"+"/"+brakes +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setbrakesUrl(url)
  }
  )

} }   />


<br />
<img src={brakesUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setbrakesArray([...brakesArray , {
        note:brakeNotes,
        color:brakesColor,
        valor:brakes,
        url:brakesUrl,
        status:brakesStatus
    }])
setbrakesUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{brakesArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setbrakesArray( brakesArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>


</div>


            {/* Steering */}


            <button className="btnSteering"  onClick={()=>{
                if(steeringShow){
                    setsteeringShow(false)
                }else{setsteeringShow(true)}
            }}>Steering  { steeringArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({steeringArray.length})</span> }</button>
<div className="rows" hidden={steeringShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldSteering.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setsteering(e.target.value)}>
    <option>All OK</option>
    <option>Steering box</option>
    <option>Outer Tie rod</option>
    <option>Inner Tie rod</option>
    <option>Steering boots</option>
    <option>Alignment</option>
    
    <option>Others</option>
</select>


<br />

    <td className={steeringColor}>Good<input type="radio" name="steering"  onChange={()=>{
        setsteeringColor(green)
        setsteeringStatus("good")}} /></td>
  <td className={steeringColor}>Moderate<input type="radio" name="steering"  onChange={()=>{
        setsteeringColor(yellow)
        setsteeringStatus("Moderate")}} /></td>
    <td className={steeringColor}>Bad<input type="radio" name="steering"  onChange={()=>{
        setsteeringColor(red)
        setsteeringStatus("bad")}} /></td>

<br />
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setsteeringNotes(e.target.value)} />
<br />
<br />
</div>
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"steering"+"/"+steering +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setsteerinUrl(url)
  }
  )

} }   />


<br />
<img src={steerinUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setSteeringArray([...steeringArray , {
        note:steeringNotes,
        color:steeringColor,
        valor:steering,
        url:steerinUrl,
        status:steeringStatus
    }])
setsteerinUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{steeringArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setSteeringArray( steeringArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>


</div>
 


         {/* Front Suspension */}


         <button className="btnFsuspesion"  onClick={()=>{
                if(fsuspeShow){
                    setfsuspeShow(false)
                }else{setfsuspeShow(true)}
            }}>Front Suspension  { fSuspeArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({fSuspeArray.length})</span> }</button>
<div className="rows" hidden={fsuspeShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldfsus.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}
<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setffSuspe(e.target.value)}>
    <option>All OK</option>
    <option>Shocks</option>
    <option>Control Arms</option>
    <option>Wheels Bearing</option>
    <option>Ball Join</option>
    <option>Axle</option>
    <option>Lower Engine mount</option>
    <option>Shield guard</option>
    <option>Others</option>
</select>


<br />

    <td> Status</td>
    <td className={fSuspeColor}>Good<input type="radio" name="fsus"  onChange={()=>{
        setfSuspeColor(green)
        setfSuspeStatus("good")}} /></td>
  <td className={fSuspeColor}>Moderate<input type="radio" name="fsus"  onChange={()=>{
        setfSuspeColor(yellow)
        setfSuspeStatus("Moderate")}} /></td>
    <td className={fSuspeColor}>Bad<input type="radio" name="fsus"  onChange={()=>{
        setfSuspeColor(red)
        setfSuspeStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setfSuspeNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fsus"+"/"+fSuspe +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setfSusspeUrl(url)
  }
  )

} }   />


<br />
<img src={fSusspeUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setfSuspeArray([...fSuspeArray , {
        note:fSuspeNotes,
        color:fSuspeColor,
        valor:fSuspe,
        url:fSusspeUrl,
        status:fSuspeStatus
    }])
setfSusspeUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{fSuspeArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setfSuspeArray( fSuspeArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>


</div>


         {/* Rear Suspension */}


         <button className="btnRsuspesion"  onClick={()=>{
                if(rsuspeShow){
                    setrsuspeShow(false)
                }else{setrsuspeShow(true)}
            }}>Rear Suspension  { rSuspeArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({rSuspeArray.length})</span> }</button>
<div className="rows" hidden={rsuspeShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldrsus.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}

<hr />
<br /><br />

    <div >

<select className="w-full" onChange={(e)=>setrSuspe(e.target.value)}>
    <option>All OK</option>
    <option>Shocks</option>
    <option>Control Arms</option>
    <option>Wheels Bearing</option>
    <option>Ball Join</option>
    <option>Axle</option>
    <option>Others</option>
</select>


<br />

    <td className={rSuspeColor}>Good<input type="radio" name="rsus"  onChange={()=>{
        setrSuspeColor(green)
        setrSuspeStatus("good")}} /></td>
  <td className={rSuspeColor}>Moderate<input type="radio" name="rsus"  onChange={()=>{
        setrSuspeColor(yellow)
        setrSuspeStatus("Moderate")}} /></td>
    <td className={rSuspeColor}>Bad<input type="radio" name="rsus"  onChange={()=>{
        setrSuspeColor(red)
        setrSuspeStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setrSuspeNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rsus"+"/"+rSuspe +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setrSusspeUrl(url)
  }
  )

} }   />


<br />
<img src={rSusspeUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setrSuspeArray([...rSuspeArray , {
        note:rSuspeNotes,
        color:rSuspeColor,
        valor:rSuspe,
        url:rSusspeUrl,
        status:rSuspeStatus
    }])
setrSusspeUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{rSuspeArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setrSuspeArray( rSuspeArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>


</div>



            {/* Services */}


            <button className="btnSvc"  onClick={()=>{
                if(serviceShow){
                    setserviceShow(false)
                }else{setserviceShow(true)}
            }}>Services  { serviceArray.length == 0 ? <span className="text-red-800 m-5 font-bold">*</span> : <span className="text-red-700 m-5">({serviceArray.length})</span> }</button>
<div className="rows" hidden={serviceShow}>
<span className=" font-extrabold">Last visit</span> <br />
{oldSVC.map((m:any)=>{
    return(
        <div className="rows">
            <span className=" text-gray-800"> {m.valor == "All OK" ? "All OK" : m.valor } - <span className=" font-extrabold text-orange-900">     { m.valor != "All OK" ? <span>    {(m.flat >= 0 ) ? <span>Approved</span> : "Declined"}  </span> : null } </span> </span>
        </div>
    )
})}
<hr />
<br /><br />

    <div >

<select className="w-full"  onChange={(e)=>setservice(e.target.value)}>
    <option>All OK</option>
    <option>Fuel Clean</option>
    <option>Induction Clean</option>
    <option>Smoke Test</option>
    <option>Others</option>
</select>


<br />

    <td className={serviceColor}>Good<input type="radio" name="scv"  onChange={()=>{
        setserviceColor(green)
        setserviceStatus("good")}} /></td>
  <td className={serviceColor}>Moderate<input type="radio" name="scv"  onChange={()=>{
        setserviceColor(yellow)
        setserviceStatus("Moderate")}} /></td>
    <td className={serviceColor}>Bad<input type="radio" name="scv"  onChange={()=>{
        setserviceColor(red)
        setserviceStatus("bad")}} /></td>

<br />
</div>
<input className="w-full" type="text" placeholder="Notes" onChange={(e)=>setserviceNotes(e.target.value)} />
<br /><br />
            <input type="file" accept="*image/jpeg" capture={true}  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"svc"+"/"+service +"/"+file.name  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



 getDownloadURL(refMediaDiag)
  .then((url) => {
   setserviceUrl(url)
  }
  )

} }   />


<br />
<img src={serviceUrl} width={50} />

<br />

<button className="btn" onClick={()=>{
    setserviceArray([...serviceArray , {
        note:serviceNotes,
        color:serviceColor,
        valor:service,
        url:serviceUrl,
        status:serviceStatus
    }])
setserviceUrl("Empty")
  
}}>add</button>




<table>


    <tr>

    <td>Description</td>
  <td>Status</td>
    <td>Media</td>
    <td>Note</td>
    <td>Action</td>
</tr>



{serviceArray.map((index:any)=>{
    return(
        <tr>
            <td className={index.color}>{index.valor}</td>
            <td className={index.color}>{index.status}</td>
            <td className={index.color}>

 <img src={index.url}   onClick={()=>{

if (!index.url || index.url == "Empty") {
    null
} else {
    
    window.open(index.url)
}


}} className="w-16 h-16" />


           
            </td>
            <td className={index.color}>
                {index.note}
            </td>
            <td className={index.color}>
                <button className="bg-red-600 rounded p-2 text-slate-100" onClick={()=>{

setserviceArray( serviceArray.filter((e:any) => e!=index) )


                }}>Delete</button>
            </td>
            
          </tr>
    )
  })}



</table>

</div>





<br />
<br /><br />
<span  className="grid justify-center">


<button className="approve w-36" onClick={()=>{
    
    
    let result = confirm("Ready to submit?");

if (result) {
  toSend()
}



}

}>SEND</button>
</span>

<br />
<br /><br />

<br />

        </div>
    )
}