import { getDatabase, onValue, ref as refDB} from "firebase/database";
import app from "../fireconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet , PDFDownloadLink} from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      color: "black",
 
    },
    section: {
      margin: 20,
      padding: 20,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    imgs: {
      marginVertical:15,
      marginHorizontal:100,
    },
    viewer: {
      width: "95%", //the pdf viewer will take up all of the width and height
      height: 500,
    },
  });

export const History =()=>{
 
  
    const datab = getDatabase(app)
    const auth = getAuth(app)
    const nameAdvRef = refDB(datab , "Completed")

    const nameUserRef = refDB(datab , "Users")
    const [namelogin , setnameogin] = useState<string>();
    const [findRo , setFindRo] = useState<number>();
    const [finddate , setFindDate] = useState<any>();
    const [findName , setfindname] = useState<any>();
    const [ros , setros] = useState<number[]>([]);
    const [visible , setvisible] = useState<any>();

let dd:any
let mm:any
let hh:any
let yy:any
let horas:any
let mins:any

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


    let arrayros:any =[]
    onValue(nameAdvRef , snap=>{
        snap.forEach(snap2=>{
          
    arrayros.push(snap2.key)
    setros(arrayros)
    

                    
            
           
            
    
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



    return(
        <div>




<h2>History</h2>

<div className="grid grid-cols-3 justify-center">



<input type="number" className="w-4/5" placeholder="Search RO" onChange={(e)=>setFindRo(parseInt(e.target.value))} />

<input type="date" className="w-4/5" placeholder="Date Out" onChange={(e)=>setFindDate(e.target.value)}  />
<input type="text" className="w-4/5" placeholder="Customer Name" onChange={(e)=>setfindname(e.target.value)}  />

</div>




{ros.map((index:any)=>{

let marca:string =''
let modelo:string =''
let ano:string =''
let fecha:string=''
let nameCUstomer=''
let informationarray:any =[]
const refdatesinfo = refDB(datab , 'Completed/' + index + "/"+ 'Information' )
onValue(refdatesinfo ,snap =>{
    snap.forEach(snap2 =>{
        marca = snap2.child('make').val();
modelo = snap2.child('model').val();
ano = snap2.child('yearcar').val();
nameCUstomer = snap2.child('name').val()+" "+snap2.child('last').val();
fecha = snap2.child('currentMonth').val()+"/"+snap2.child('currentDay').val()+"/"+snap2.child('currentYear').val();
        informationarray.push(snap2.val())
      
        
    })
} )

//let arrayInfo:any =[]
let totalInfo:any=[]
const refInfo = refDB(datab , 'Completed/'+index+"/"+"Infoflat")
onValue(refInfo , snap =>{
snap.forEach(snap2=>{
totalInfo.push(snap2.val())


})
})

// Time

const reftime = refDB(datab , 'Completed/'+index+"/"+"Time")
onValue(reftime , snap =>{

  
        dd=snap.child('dd').val(),
        mm=snap.child('mm').val(),
        hh=snap.child('hh').val(),
        mins=snap.child('mins').val(),
        yy=snap.child('yy').val()
    

})

//ROADTEST
let roadTest:any;
let stiker:any;
const refRoad = refDB(datab , 'Completed/'+index+"/"+"RoadTest")
onValue(refRoad , snap =>{

   roadTest = snap.child("road").val()
   stiker = snap.child("stike").val()
})

//Flat

const refhoras = refDB(datab , 'Completed/'+index+"/"+"Total")
onValue(refhoras , snap =>{

   horas = snap.child("total").val()
})


// HVAC
let hvacArray:any =[]

const refHvac = refDB(datab , 'Completed/'+index+"/"+"HVAC")
onValue(refHvac , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        hvacArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})


// INTERIOR
let interiorarray:any =[]

const refInter = refDB(datab , 'Completed/'+index+"/"+"Interior")
onValue(refInter , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        interiorarray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

// EXTERIOR
let exterirArray:any =[]

const refExe = refDB(datab , 'Completed/'+index+"/"+"Exterior")
onValue(refExe , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        exterirArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

// Batter
let batteryArray:any =[]

const refBatt = refDB(datab , 'Completed/'+index+"/"+"Battery")
onValue(refBatt , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        batteryArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})


// underh
let underhArray:any =[]

const refunder = refDB(datab , 'Completed/'+index+"/"+"Underhood")
onValue(refunder , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        underhArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

// Fluids
let arrayfluids:any =[]

const refFluids = refDB(datab , 'Completed/'+index+"/"+"UnderhoodFluids")
onValue(refFluids , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        arrayfluids.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})


// TIREs
let tiresArray:any =[]

const reftires = refDB(datab , 'Completed/'+index+"/"+"Tires")
onValue(reftires , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        tiresArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

//llantasssssssss

let llantasArray:any=[]
const refllanta = refDB(datab , 'Completed/'+index+"/"+"Tires" + "/" + "llantasArray")
onValue(refllanta , snap =>{
    snap.forEach(snap2=>{
       llantasArray.push({
         tire1:snap2.child('tire1').val(),
         tire2:snap2.child('tire2').val(),
         tire3:snap2.child('tire3').val(),
         tire4:snap2.child('tire4').val(),
        })
   
    
    })
    
    
    
})

// BRAKES
let brakesArray:any =[]

const refBrakes = refDB(datab , 'Completed/'+index+"/"+"Brakes")
onValue(refBrakes , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        brakesArray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

let frenosArray:any=[]
const refFrenos = refDB(datab , 'Completed/'+index+"/"+"Brakes" + "/" + "frenosArray")

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


// STEERING
let steringarray:any =[]

const refstteri = refDB(datab , 'Completed/'+index+"/"+"Steering")
onValue(refstteri , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        steringarray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})

// fsus
let fsusarray:any =[]

const reffsus = refDB(datab , 'Completed/'+index+"/"+"FrontSuspension")
onValue(reffsus , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        fsusarray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})


// rsus
let rsusarray:any =[]

const refrsus = refDB(datab , 'Completed/'+index+"/"+"RearSuspension")
onValue(refrsus , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        rsusarray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})



// services
let servicesarray:any =[]

const refserv = refDB(datab , 'Completed/'+index+"/"+"Services")
onValue(refserv , snap =>{
snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
        servicesarray.push({
    flat:snap3.child('flat').val(),
    note:snap3.child('note').val(),
    status:snap3.child('status').val(),
    url:snap3.child('url').val(),
    valor:snap3.child('valor').val(),
    completed:""
        })
    })
})
  
   
})





 for (let n = 0; n <= nameCUstomer.length; n++) {

        if (index.substring(0, n) == findRo ||  finddate == yy+"-"+mm+"-"+dd || findName == nameCUstomer.substring(0, n)  ) {

            return(





<div>



<table className="cursor-pointer" onClick={()=>{
                            toggleVisibility(index)


        }} >








<tr>
  <th   className="bg-slate-400 text-gray-100">RO</th>
<th  className="bg-slate-400 text-gray-100">Vehicle</th>
<th  className="bg-slate-400 text-gray-100">Date in</th>
</tr>

<tr >
  <td>{index}</td>
  <td>{marca} {modelo} {ano}</td>
  <td>{fecha}</td>
</tr>

</table>



        
<br /> 
        {visible == index ? <div>



  



<PDFDownloadLink document={    

<Document>
<Page style={styles.page}>

<View style={styles.section}>
    {informationarray.map((i:any)=>{
return(
<View>




<Text>RO:  <Text style={{color:"purple"}}>  {index}  </Text>     </Text> 


<Text style={styles.text}>Vehicle: <Text style={{color:"purple"}}>   {i.make} - {i.model} - {i.year}   </Text>  Millage:  <Text style={{color:"purple"}}>  {i.millage}  </Text>   </Text>
 


{/* {i.fotos.map((x:any)=>{
return(
<img src={x} width={50} />
)
})} */}

<Text style={styles.text}>
Vin:  <Text style={{color:"purple"}}>  {i.vin}  </Text> - 
Technician:   <Text style={{color:"purple"}}>{i.tech}</Text> -
Advisor:   <Text style={{color:"purple"}}>{i.advisor}</Text>
</Text>
<Text style={styles.text}>
in:   <Text style={{color:"purple"}}>{i.currentMonth}/{i.currentDay}/{i.currentYear}-{i.currentHour}</Text> -
finish:   <Text style={{color:"purple"}}>{mm}/{dd}/{yy} - {hh}:{mins}</Text>
</Text>
<Text> --------------------------------------------------------------------------------------------  </Text>
<Text style={styles.text}>
Name:  <Text style={{color:"purple"}}>  {i.name}  {i.last}  </Text> - 
Phone:   <Text style={{color:"purple"}}>{i.phone}</Text>
</Text>
<Text style={styles.text}>
State:  <Text style={{color:"purple"}}>  {i.state}  </Text> - 
City:   <Text style={{color:"purple"}}>{i.city}</Text> -
Street:   <Text style={{color:"purple"}}>{i.street}</Text> -
Zip:   <Text style={{color:"purple"}}>{i.zip}</Text> 
</Text>



<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Services</Text>

<View >
{totalInfo.map((n:any)=>{
return(
<Text style={styles.text}>* {n.nameSRV}  -  <Text style={{color:"green"}}>{n.flat}</Text>  </Text>


)
})}
</View>

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Road Test</Text>
<Text style={styles.text}>* Road Test -  <Text style={{color:"green"}}>{roadTest}</Text> * Stiker -  <Text style={{color:"green"}}>{stiker}</Text>      </Text>

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>HVAC</Text>

{hvacArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>INTERIOR</Text>

{interiorarray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>EXTERIOR</Text>

{exterirArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>BATTERY</Text>

{batteryArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text >UNDER HOOD</Text>

{underhArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>FLUIDS</Text>

{arrayfluids.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>TIRES</Text>

{tiresArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

{llantasArray.map((l:any)=>{
return(
<View>

<Text style={styles.text}>*LF  : {l.tire1}</Text>
<Text style={styles.text}>*RF  : {l.tire2}</Text>
<Text style={styles.text}>*LR  : {l.tire3}</Text>
<Text style={styles.text}>*RR  : {l.tire4}</Text>
</View>
)
})}



<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>BRAKES</Text>

{brakesArray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}


{frenosArray.map((l:any)=>{
return(
<View>

<Text style={styles.text}>*LF  : {l.pad1}</Text>
<Text style={styles.text}>*RF  : {l.pad2}</Text>
<Text style={styles.text}>*LR  : {l.pad3}</Text>
<Text style={styles.text}>*RR  : {l.pad4}</Text>
</View>
)
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>STEERING</Text>

{steringarray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>FRONT SUSPENSION</Text>

{fsusarray.map((k:any)=>{
return(
  <View>
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>

  </View>
)
})}

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>REAR SUSPENSION</Text>

{rsusarray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}


<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>OTHERS</Text>

{servicesarray.map((k:any)=>{
return(
<Text style={styles.text}>* {k.valor} ( {k.note} ) / {k.status} /  <Text style={{color:"green"}}>{k.comp}  </Text> <Text style={{color:"green"}}>{k.flat}  </Text> </Text>
)
})}





</View>




)
})}

  </View>


  
</Page>
</Document>

} fileName={"RO:"+index}>



{({loading})=> loading ? "WAIT" : <button className="btn">Download PDF</button> }

</PDFDownloadLink>





  <table>
<tr>
    <th className="bg-teal-700 text-white">Name</th>
    <th className="bg-teal-700 text-white">LastName</th>
    <th className="bg-teal-700 text-white">Phone</th>
    <th className="bg-teal-700 text-white">Date </th>

</tr>


{informationarray.map((l:any)=>{
return(
    <tr>
        <td> <b>{l.name}</b> </td>
        <td> <b>{l.last}</b> </td>
        <td> <b>{l.phone}</b> </td>
        <td> <b>{l.currentMonth}/{l.currentDay}/{l.currentYear}-{l.currentHour}</b> <br /> to <br /> {mm}/{dd}/{yy}-{hh}:{mins}  </td>
    </tr>
)
})}

<tr>
    <th className="bg-teal-700 text-white">State</th>
    <th className="bg-teal-700 text-white">City</th>
    <th className="bg-teal-700 text-white">Street</th>
    <th className="bg-teal-700 text-white">zip</th>
</tr>

{informationarray.map((l:any)=>{
return(
    <tr>
        <td> <b>{l.state}</b> </td>
        <td> <b>{l.city}</b> </td>
        <td> <b>{l.street}</b> </td>
        <td> <b>{l.zip}</b> </td>
    </tr>
)
})}

<tr>
    <th className="bg-teal-700 text-white">Vehicle</th>
    <th className="bg-teal-700 text-white">Model</th>
    <th className="bg-teal-700 text-white">Year</th>
    <th className="bg-teal-700 text-white">Plate</th>
</tr>

{informationarray.map((l:any)=>{
return(
    <tr>
        <td> <b>{l.make}</b> </td>
        <td> <b>{l.model}</b> </td>
        <td> <b>{l.yearcar}</b> </td>
        <td> <b>{l.plate}</b> </td>
    </tr>
)
})}




<tr>
    <th className="bg-teal-700 text-white">Advisor</th>
    <th className="bg-teal-700 text-white">Technician</th>
    <th className="bg-teal-700 text-white">Milage in</th>
    <th className="bg-teal-700 text-white">Vin</th>
</tr>

{informationarray.map((l:any)=>{
return(
    <tr>
        <td> <b>{l.advisor}</b> </td>
        <td> <b>{l.emp}</b> </td>
        <td> <b>{l.millage}</b> </td>
        <td> <b>{l.vin}</b> </td>
    </tr>
)
})}

{informationarray.map((l:any)=>{
return(
    <td>

        <img src={l.url} width={180} onClick={()=>window.open(l.url)} className="cursor-pointer" />
    </td>
)
})}


    </table>          





<br />
TOTAL LABOR: <b> {horas} </b> 

     <h2>Servives</h2>
<table>
<tr>
    <th>
        Description
    </th>
    <th>
        FLat Rate
    </th>
    <th>
        Status
    </th>
</tr>

{totalInfo.map((idx:any) =>{
    return(
        <tr>
            <td>{idx.nameSRV}</td>
            <td>{idx.flat}</td>
            <td>{idx.completed ? <span>COMPLETED</span> : null }  </td>
         
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
</tr>

{hvacArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{interiorarray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{exterirArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

    </tr>
  )
})}
    
 </table>
<br />
            


<h3 className="text-gray-300 text-2xl">BATTERY</h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
</tr>

{batteryArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{underhArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{arrayfluids.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
           Left Rear : {i.tire4} <br />
          </div>
        )
      })}
        
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
</tr>

{tiresArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
           Left Rear : {i.pad4} <br />
          </div>
        )
      })}
        
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
</tr>

{brakesArray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{steringarray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{fsusarray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

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
</tr>

{rsusarray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

    </tr>
  )
})}
    
 </table>
<br />

<h3 className="text-gray-300 text-2xl">SERVICES </h3> <hr />
    <table> 
    <tr>
    <th>Description</th>
    <th>Media</th>
    <th>Note</th>
    <th>Status</th>
</tr>

{servicesarray.map((ind:any)=>{

  return(
    <tr >

      <td> {ind.valor} </td>
      <td> <img src={ind.url} onClick={()=>window.open(ind.url)} width={50} /> </td>
      <td> {ind.note} </td>
<td>{ind.flat} </td>    

    </tr>
  )
})}
    
 </table>
<br />





             </div> : null }

</div>


            )
            
        }
        
    }


})}






        </div>
    )

}