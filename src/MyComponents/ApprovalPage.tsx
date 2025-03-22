import { getDatabase, onValue, ref, ref as refDB, set, update } from "firebase/database";
import app from "../fireconfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Page, Text,  Document , PDFDownloadLink, View, StyleSheet } from '@react-pdf/renderer';




export function Approval() {

    
// Create styles
const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      color: "black",
      margin: 10,
      padding: 10,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: "100%", //the pdf viewer will take up all of the width and height
      height: 500,
    },
  });

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

const [grade , setGrade] = useState<string>();

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
                setGrade(snap3.child('condition').val())
            }
        })
    })
})






let arrayros:any = []
onValue(nameAdvRef , snap=>{
    snap.forEach(snap2=>{
        snap2.child("Information").forEach(snap3 =>{
          if (namelogin == snap3.child("advisor").val() || namelogin == snap3.child("emp").val()  ) {
            arrayros.push({
                ros:snap2.key,
                redux:snap2.child('Estado').val()
            })
          }  
          setros(arrayros)

        })

        })
    })
}







})


if (grade=="Admin") {
    true

}else{false}



},[namelogin ,grade , mins , visible , info  ])


const toggleVisibility =(itm:any)=>{
    
    if (itm != visible) {
         setvisible(itm)
    }else{setvisible(-1)}


 }



  return (
    <div>




<h2>Approval</h2>

{ros.map((item:any , index )=>{


let arrayInfo:any =[]
let servicios:any =[]
let marca:string =''
let modelo:string =''
let ano:string =''

const refInfo = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Information")
onValue(refInfo , snap =>{
snap.forEach(snap2=>{


   arrayInfo.push(snap2.val())

   marca = snap2.child('make').val();
modelo = snap2.child('model').val();
ano = snap2.child('yearcar').val();

snap2.child("srvSelected").forEach(snap3=>{
servicios.push({
    name:snap3.child("name").val(),
    flat:snap3.child("flat").val()
})

})


})
})




// ROAD TEST

let roadTest:any;
let stiker:any;
const refRoad = refDB(datab , 'PreAprobal/'+item.ros+"/"+"RoadTest")
onValue(refRoad , snap =>{

   roadTest = snap.child("road").val()
   stiker = snap.child("stike").val()
})

//HVAC

let hvacArray:any =[]

const refHvac = refDB(datab , 'PreAprobal/'+item.ros+"/"+"HVAC")
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
const refInterior = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Interior")
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
const refExterior = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Exterior")
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
const refBattery = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Battery")
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
const refFsus = refDB(datab , 'PreAprobal/'+item.ros+"/"+"FrontSuspension")
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
const refUnderhood = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Underhood")
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
const refFluids = refDB(datab , 'PreAprobal/'+item.ros+"/"+"UnderhoodFluids")
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
const reftires = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Tires")
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
const refBrakes = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Brakes")
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
const refSteerin = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Steering")
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
const refrsus = refDB(datab , 'PreAprobal/'+item.ros+"/"+"RearSuspension")
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
const refServices = refDB(datab , 'PreAprobal/'+item.ros+"/"+"Services")
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
    
       set(ref(datab , "PreAprobal/"+index),null)
    
        window.location.reload();
    } catch (error) {
        alert(error)
    }
    
    
       
    }
    
    

    return(
        <div key={index} >


<table className="cursor-pointer" onClick={()=>{
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


update(refDB(datab , "PreAprobal/"+item.ros) ,{
    Estado:"SEEN"

} )

            }} >

<tr>
  <th   className="bg-teal-600 text-gray-100">RO</th>
<th  className="bg-teal-600 text-gray-100">Vehicle</th>
</tr>

<tr >
  <td>{item.ros} {item.redux == "NOAP" ?  <span className="text-orange-700 m-20">*NEW</span> : <span>v</span> }  </td>
  <td>{marca} {modelo} {ano}</td>
</tr>

</table>


            {visible == index  ? <div>


<button className="btn" onClick={()=>{

if(hiddenInfo){
    setHiddeninfo(false)
}else{setHiddeninfo(true)}

}}>SEE INFORMATION</button>




<PDFDownloadLink document={
    
    <Document>


  <Page size="A4" style={styles.page}>
    
          <View style={styles.section}>
            {info.map((i:any)=>{
    return(
        <View>




<Text>RO:  <Text style={{color:"purple"}}>  {item.ros}  </Text>     </Text> 


 <Text style={styles.text}>Vehicle: <Text style={{color:"purple"}}>   {i.make} - {i.model} - {i.year}   </Text>  Millage:  <Text style={{color:"purple"}}>  {i.millage}  </Text>   </Text>
         


{/* {i.fotos.map((x:any)=>{
    return(
        <img src={x} width={50} />
    )
})} */}

<Text  style={styles.text}>
Vin:  <Text style={{color:"purple"}}>  {i.vin}  </Text> - 
Technician:   <Text style={{color:"purple"}}>{i.tech}</Text> -
Advisor:   <Text style={{color:"purple"}}>{i.advisor}</Text>
</Text>
<Text  style={styles.text}>


{info.map((f:any)=>{
    return(
        <Text> Date In {f.currentMonth}/{f.currentDay}/{f.currentYear}-{f.currentHour}</Text> 
    )
})}

</Text>
<Text> --------------------------------------------------------------------------------------------  </Text>
<Text  style={styles.text}>
Name:  <Text style={{color:"purple"}}>  {i.name}  {i.last}  </Text> - 
Phone:   <Text style={{color:"purple"}}>{i.phone}</Text>
</Text>
<Text  style={styles.text}>
State:  <Text style={{color:"purple"}}>  {i.state}  </Text> - 
City:   <Text style={{color:"purple"}}>{i.city}</Text> -
Street:   <Text style={{color:"purple"}}>{i.street}</Text> -
Zip:   <Text style={{color:"purple"}}>{i.zip}</Text> 
</Text>



{/* <Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Services</Text>

<View>
    {i.svc.map((n:any)=>{
        return(
<Text  style={styles.text}>* {n.name}  -  <Text style={{color:"green"}}>{n.flat}</Text> </Text>


        )
    })}
</View> */}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Road Test</Text>
<Text  style={styles.text}>* Road Test -  <Text style={{color:"green"}}>{roadTest}</Text> * Stiker -  <Text style={{color:"green"}}>{stiker}</Text>      </Text>

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>HVAC</Text>

{hvac.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>INTERIOR</Text>

{interior.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>EXTERIOR</Text>

{exterior.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>BATTERY</Text>

{battery.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>UNDER HOOD</Text>

{underh.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>FLUIDS</Text>

{fluids.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>TIRES</Text>

{tires.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

{llantasArray.map((l:any)=>{
  return(
    <View>

    <Text  style={styles.text}>*LF  : {l.tire1}</Text>
    <Text  style={styles.text}>*RF  : {l.tire2}</Text>
    <Text  style={styles.text}>*LR  : {l.tire3}</Text>
    <Text  style={styles.text}>*RR  : {l.tire4}</Text>
    </View>
  )
})}



<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>BRAKES</Text>

{brakes.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}


{frenosArray.map((l:any)=>{
  return(
    <View>

    <Text  style={styles.text}>*LF  : {l.pad1}</Text>
    <Text  style={styles.text}>*RF  : {l.pad2}</Text>
    <Text  style={styles.text}>*LR  : {l.pad3}</Text>
    <Text  style={styles.text}>*RR  : {l.pad4}</Text>
    </View>
  )
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>STEERING</Text>

{steering.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>FRONT SUSPENSION</Text>

{fsus.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>REAR SUSPENSION</Text>

{rsus.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>OTHERS</Text>

{service.map((k:any)=>{
  return(
    <Text  style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
  )
})}











        </View>
    )
})}

          </View>
        </Page>

</Document> } fileName={"RO:"+item.ros}>

{({loading})  =>  (loading ? "Wait" : <button className="btn"> Get Report</button> )}


</PDFDownloadLink>

                <div hidden={hiddenInfo} className="infoBloq">


                    <table>
<tr>
    <th className="bg-teal-700 text-white">Name</th>
    <th className="bg-teal-700 text-white">LastName</th>
    <th className="bg-teal-700 text-white">Phone</th>
    <th className="bg-teal-700 text-white">Date </th>

</tr>
{info.map((id:any)=>{

    return(

<tr>
        <td> <b>{id.name}</b> </td>
        <td> <b>{id.last}</b> </td>
        <td> <b>{id.phone}</b> </td>
        <td> <b>{id.currentMonth}/{id.currentDay}/{id.currentYear}-{id.currentHour}</b>  </td>
    </tr>

    )
})}

<tr>
    <th className="bg-teal-700 text-white">State</th>
    <th className="bg-teal-700 text-white">City</th>
    <th className="bg-teal-700 text-white">Street</th>
    <th className="bg-teal-700 text-white">zip</th>
</tr>
{info.map((id:any)=>{

    return(

<tr>
        <td> <b>{id.state}</b> </td>
        <td> <b>{id.city}</b> </td>
        <td> <b>{id.street}</b> </td>
        <td> <b>{id.zip}</b> </td>
    </tr>

    )
})}


<tr>
    <th className="bg-teal-700 text-white">Vehicle</th>
    <th className="bg-teal-700 text-white">Model</th>
    <th className="bg-teal-700 text-white">Year</th>
    <th className="bg-teal-700 text-white">Plate</th>
</tr>

{info.map((id:any)=>{

return(

<tr>
    <td> <b>{id.make}</b> </td>
    <td> <b>{id.model}</b> </td>
    <td> <b>{id.yearcar}</b> </td>
    <td> <b>{id.plate}</b> </td>
</tr>

)
})}

<tr>
    <th className="bg-teal-700 text-white">Advisor</th>
    <th className="bg-teal-700 text-white">Technician</th>
    <th className="bg-teal-700 text-white">Milage in</th>
    <th className="bg-teal-700 text-white">Vin</th>
</tr>

{info.map((id:any)=>{




return(

<tr>
    <td> <b>{id.advisor}</b> </td>
    <td> <b>{id.emp}</b> </td>
    <td> <b>{id.millage}</b> </td>
    <td> <b>{id.vin}</b> </td>
</tr>

)
})}

<tr>
    <th className="bg-teal-700 text-white">Service</th>
    <th className="bg-teal-700 text-white">flat</th>
</tr>

{servicios.map((id:any)=>{
    return(
        <tr>
            <td>{id.name}</td>
            <td>{id.flat}</td>
        </tr>
    )
})}

</table>



</div>


<table>


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



<hr />
 <h3 className="text-gray-300 text-2xl">HVAC</h3> 


<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>sethvacExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{hvac.map((ind:any )=>{
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
                

                 </td>

        </tr>
    )
})}
    
    
 </table>

<br />
 <hr />
<h3 className="text-gray-300 text-2xl">INTERIOR / DASH</h3>

<div className=" float-right ">
    
    <input type="text" placeholder="Description" onChange={(e)=>setInteriorExtra(e.target.value)} /> <button className="btn" onClick={()=>{

setinterior([...interior , {
    valor:interiorExtra,
    color:"bg-green-300"
}])

}}>Add</button> 

</div>
 

<table> 



<tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Actions <br />             <input type="number" placeholder="Flat Rate" onChange={(e)=>setinteriorFlat(e.target.value)} />
    </th>
    <th>Status</th>
</tr>


{interior.map((ind:any )=>{
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
                

                 </td>
        </tr>
    )
})}
    
    
 </table>


<hr />
<h3 className="text-gray-300 text-2xl">EXTERIOR</h3>

<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setExteriorExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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


{exterior.map((ind:any )=>{
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
                

                 </td>

        </tr>
    )
})}
    
    
 </table>
<br />
<hr />

<h3 className="text-gray-300 text-2xl">BATTERY / WIPER BLADES</h3>
<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setBatteryExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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


{battery.map((ind:any )=>{
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
                

                 </td>


        </tr>
    )
})}
    
    
 </table>

<br />
<hr />



<h3 className="text-gray-300 text-2xl">UNDERHOOD</h3> 
<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setUnderhExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{underh.map((ind:any )=>{
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
                

                 </td>
      
        </tr>
    )
})}
    
 </table>

<br />
<hr />


<h3 className="text-gray-300 text-2xl"> FLUIDS</h3> 

<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setFluidsExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{fluids.map((ind:any )=>{
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
                

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />


<h3 className="text-gray-300 text-2xl">TIRES</h3> 

<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setTiresExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{tires.map((ind:any)=>{
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
                

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />

<h3 className="text-gray-300 text-2xl">BRAKES</h3> 
<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setBrakesExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{brakes.map((ind:any)=>{
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
                

                 </td>

        </tr>
    )
})}
    
 </table>

<br />
<hr />

<h3 className="text-gray-300 text-2xl">STEERING</h3>
<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setSteeringExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{steering.map((ind:any )=>{
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
                

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />


<h3 className="text-gray-300 text-2xl">FRONT SUSPENSION</h3>

<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setFsusExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{fsus.map((ind:any)=>{
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
                

                 </td>


        </tr>
    )
})}
    
 </table>

<br />
<hr />

<h3 className="text-gray-300 text-2xl">REAR SUSPENSION</h3> 
<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setrsusExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{rsus.map((ind:any )=>{
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
                

                 </td>



        </tr>
    )
})}
    
 </table>

<br />
<hr />


<h3 className="text-gray-300 text-2xl">Services</h3> 

<div className=" float-right "><input type="text" placeholder="Description" onChange={(e)=>setServiceExtra(e.target.value)} /> <button className="btn" onClick={()=>{

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

{service.map((ind:any)=>{
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
                

                 </td>



        </tr>
    )
})}
    


 </table>

<br />
<hr />
<br />

</div>

</table>


<button className="btnBar" onClick={()=>{

let msj = confirm("Confirm sumbit?")

if(msj){
    toSend(item.ros)
}

}
    
    }>Send</button>


    










</div> : null }


<br /> 

        </div>
    )
})}


    </div>
  );
}