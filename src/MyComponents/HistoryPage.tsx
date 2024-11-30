import { getDatabase, onValue, ref as refDB} from "firebase/database";
import app from "../fireconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";



export const History =()=>{
 
  
    const datab = getDatabase(app)
    const auth = getAuth(app)
    const nameAdvRef = refDB(datab , "Completed")

    const nameUserRef = refDB(datab , "Users")
    const [namelogin , setnameogin] = useState<string>();
    const [findRo , setFindRo] = useState<number>();
    const [finddate , setFindDate] = useState<any>();
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



<input type="number" placeholder="Search RO" onChange={(e)=>setFindRo(parseInt(e.target.value))} />

<input type="date" onChange={(e)=>setFindDate(e.target.value)}  />





{ros.map((index:any)=>{

let informationarray:any =[]
const refdatesinfo = refDB(datab , 'Completed/' + index + "/"+ 'Information' )
onValue(refdatesinfo ,snap =>{
    snap.forEach(snap2 =>{
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





 for (let n = 0; n <= index.length; n++) {

        if (index.substring(0, n) == findRo ||  finddate == yy+"-"+mm+"-"+dd ) {

            return(





<div>



        <button className="bg-opacity-80 bg-orange-300 rounded p-3 w-full" onClick={()=>{
                            toggleVisibility(index)


        }}>{index}</button>
<br /> <br />
        {visible == index ? <div>
  <table>
    INFORMATION
<tr>
    <th>Name</th>
    <th>LastName</th>
    <th>Phone</th>
    <th>Date </th>

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
    <th>State</th>
    <th>City</th>
    <th>Street</th>
    <th>zip</th>
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
    <th>Vehicle</th>
    <th>Model</th>
    <th>Year</th>
    <th>Plate</th>
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
    <th>Advisor</th>
    <th>Technician</th>
    <th>Milage in</th>
    <th>Vin</th>
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