import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue,  ref as refDB, set } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../fireconfig";
import { Page, Text, View, Document, StyleSheet,   PDFViewer} from '@react-pdf/renderer';



export default function Toclose (){


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



let arrayROS:any =[]
    const datab = getDatabase(app)
    const auth = getAuth(app)
    const rosRef = refDB(datab , "Toclose")


const [ros , setros ] = useState<any[]>([])


useEffect(()=>{


    onAuthStateChanged(auth , user =>{
if (user != null) {
    
onValue(rosRef ,snap =>{
    snap.forEach(snap2=>{

arrayROS.push(snap2.key)



})




setros(arrayROS)
})


}


    })






},[])


    return(
        <div>
            <h2>Close tickets</h2>


<table>

<tr>
    <th>RO</th>
    <th>INFORMATION</th>
</tr>


{ros.map((indx:any)=>{
let hh:any
let min:any
let dd:any
let mm:any
let yy:any

let road:any
let stike:any
let total:any

let infoROS:any=[]
let totalInfo:any=[]
let infoflat:any=[]
let hvac:any=[]
let interior:any=[]
let exterior:any=[]
let battery:any=[]
let underh:any=[]
let fluids:any=[]
let tires:any=[]
let brakes:any=[]
let steering:any=[]
let fsus:any=[]
let rsus:any=[]
let service:any=[]
let llantasArrray:any=[]
let frenosArray:any=[]





const refONE = refDB(datab , "Toclose/" + indx)

onValue(refONE , snap =>{



snap.child("Infoflat").forEach(snap2 =>{
  infoflat.push(snap2.val())

})


snap.child("Information").forEach(snap2 =>{

  totalInfo.push(snap2.val())

  infoROS.push({
    model:snap2.child("model").val(),
    make:snap2.child("make").val(),
    year:snap2.child("yearcar").val(),
    tech:snap2.child("emp").val(),
    vin:snap2.child("vin").val(),
    fotos:snap2.child("url").val(),
    name:snap2.child("name").val(),
    last:snap2.child("last").val(),
    phone:snap2.child("phone").val(),
    city:snap2.child("city").val(),
    state:snap2.child("state").val(),
    street:snap2.child("street").val(),
    cdd:snap2.child("currentDay").val(),
    cmm:snap2.child("currentMonth").val(),
    cyy:snap2.child("currentYear").val(),
    chour:snap2.child("currentHour").val(),
    svc:snap2.child("srvSelected").val(),
    zip:snap2.child("zip").val(),
    millage:snap2.child("millage").val(),
    advisor:snap2.child("advisor").val(),
  })
  



    // console.log(snap2.child("advisor").val());
})

snap.child("HVAC").child("hvac").forEach(snap2=>{

hvac.push({
  valor:snap2.child("valor").val(),
  note:snap2.child("note").val(),
  status:snap2.child("status").val(),
  comp:snap2.child("completed").val(),
  flat:snap2.child("flat").val(),
})

})

snap.child("Interior").child("interior").forEach(snap2=>{

  interior.push({
    valor:snap2.child("valor").val(),
    note:snap2.child("note").val(),
    status:snap2.child("status").val(),
    comp:snap2.child("completed").val(),
    flat:snap2.child("flat").val(),

  })
  
  })
  snap.child("Exterior").child("exterior").forEach(snap2=>{

    exterior.push({
      valor:snap2.child("valor").val(),
      note:snap2.child("note").val(),
      flat:snap2.child("flat").val(),

      status:snap2.child("status").val(),
      comp:snap2.child("completed").val(),
    })
    
    })
    snap.child("Battery").child("battery").forEach(snap2=>{

      battery.push({
        valor:snap2.child("valor").val(),
        note:snap2.child("note").val(),
        status:snap2.child("status").val(),
        flat:snap2.child("flat").val(),

        comp:snap2.child("completed").val(),
      })
      
      })

      snap.child("UnderhoodFluids").child("fluids").forEach(snap2=>{

        fluids.push({
          valor:snap2.child("valor").val(),
          note:snap2.child("note").val(),
          status:snap2.child("status").val(),
          flat:snap2.child("flat").val(),

          comp:snap2.child("completed").val(),
        })
        
        })


        snap.child("Underhood").child("underh").forEach(snap2=>{

          underh.push({
            valor:snap2.child("valor").val(),
            note:snap2.child("note").val(),
            flat:snap2.child("flat").val(),

            status:snap2.child("status").val(),
            comp:snap2.child("completed").val(),
          })
          
          })
          snap.child("Tires").child("tires").forEach(snap2=>{

            tires.push({
              valor:snap2.child("valor").val(),
              note:snap2.child("note").val(),
              flat:snap2.child("flat").val(),
  
              status:snap2.child("status").val(),
              comp:snap2.child("completed").val(),
            })
            
            })
            snap.child("Tires").child("llantasArray").forEach(snap2=>{

              llantasArrray.push({
       tire1:snap2.child("tire1").val(),
       tire2:snap2.child("tire2").val(),
       tire3:snap2.child("tire3").val(),
       tire4:snap2.child("tire4").val(),
              })
              
              })

            snap.child("Brakes").child("brakes").forEach(snap2=>{

              brakes.push({
                valor:snap2.child("valor").val(),
                note:snap2.child("note").val(),
                flat:snap2.child("flat").val(),
    
                status:snap2.child("status").val(),
                comp:snap2.child("completed").val(),
              })
              
              })
              snap.child("Brakes").child("frenosArray").forEach(snap2=>{

                frenosArray.push({
                  pad1:snap2.child("pad1").val(),
                  pad2:snap2.child("pad2").val(),
                  pad3:snap2.child("pad3").val(),
                  pad4:snap2.child("pad4").val(),
                })
                
                })

              snap.child("Steering").child("steering").forEach(snap2=>{

                steering.push({
                  valor:snap2.child("valor").val(),
                  note:snap2.child("note").val(),
                  flat:snap2.child("flat").val(),
      
                  status:snap2.child("status").val(),
                  comp:snap2.child("completed").val(),
                })
                
                })
                snap.child("FrontSuspension").child("fsus").forEach(snap2=>{

                  fsus.push({
                    valor:snap2.child("valor").val(),
                    note:snap2.child("note").val(),
                    flat:snap2.child("flat").val(),
        
                    status:snap2.child("status").val(),
                    comp:snap2.child("completed").val(),
                  })
                  
                  })
                  snap.child("RearSuspension").child("rsus").forEach(snap2=>{

                    rsus.push({
                      valor:snap2.child("valor").val(),
                      note:snap2.child("note").val(),
                      flat:snap2.child("flat").val(),
          
                      status:snap2.child("status").val(),
                      comp:snap2.child("completed").val(),
                    })
                    
                    })
                    snap.child("Services").child("service").forEach(snap2=>{

                      service.push({
                        valor:snap2.child("valor").val(),
                        note:snap2.child("note").val(),
                        flat:snap2.child("flat").val(),
            
                        status:snap2.child("status").val(),
                        comp:snap2.child("completed").val(),
                      })
                      
                      })



road=snap.child("RoadTest").child("road").val()
stike=snap.child("RoadTest").child("stike").val()
total=snap.child("Total").child("total").val()

    hh=snap.child("Time").child("hh").val()
    mm=snap.child("Time").child("mm").val()
    min=snap.child("Time").child("mins").val()
    dd=snap.child("Time").child("dd").val()
    yy=snap.child("Time").child("yy").val()

})



    return(







        <tr>
           <td>
           {indx}
            </td> 


<td>




            <PDFViewer  style={styles.viewer}>
      {/* Start of the document*/}
      <Document >
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
    
          <View style={styles.section}>
            {infoROS.map((i:any)=>{
    return(
        <View>




<Text>RO:  <Text style={{color:"purple"}}>  {indx}  </Text>     </Text> 


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
in:   <Text style={{color:"purple"}}>{i.cmm}/{i.cdd}/{i.cyy} - {i.chour}</Text> -
finish:   <Text style={{color:"purple"}}>{mm}/{dd}/{yy} - {hh}:{min}</Text>
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



<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Services</Text>

<View>
    {i.svc.map((n:any)=>{
        return(
<Text  style={styles.text}>* {n.name}  -  <Text style={{color:"green"}}>{n.flat}</Text> </Text>


        )
    })}
</View>

<Text> --------------------------------------------------------------------------------------------  </Text>

<Text>Road Test</Text>
<Text  style={styles.text}>* Road Test -  <Text style={{color:"green"}}>{road}</Text> * Stiker -  <Text style={{color:"green"}}>{stike}</Text>      </Text>

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

{llantasArrray.map((l:any)=>{
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
      </Document>
    </PDFViewer>
    <br />


    <button className="decline"  onClick={()=>{



try {
  
  set(refDB(datab , "Completed/"+ indx +"/"+"RoadTest" ) ,{

      road:road,
      stike:stike,
         
} )

set(refDB(datab , "Completed/"+ indx +"/"+"HVAC" ) ,{

hvac
     
} )

set(refDB(datab , "Completed/"+ indx +"/"+"Interior" ) ,{

  interior
  
  } )
  


set(refDB(datab , "Completed/"+ indx +"/"+"Exterior" ) ,{

exterior

} )

set(refDB(datab , "Completed/"+ indx +"/"+"Battery" ) ,{

  battery

} )

set(refDB(datab , "Completed/"+ indx +"/"+"Underhood" ) ,{

underh

} )

set(refDB(datab , "Completed/"+ indx +"/"+"UnderhoodFluids" ) ,{

fluids

} )

set(refDB(datab , "Completed/"+ indx +"/"+"Tires" ) ,{

tires,
llantasArrray

} )

set(refDB(datab , "Completed/"+ indx +"/"+"Brakes" ) ,{

brakes,
frenosArray

} )

set(refDB(datab , "Completed/"+ indx +"/"+"Steering" ) ,{

steering

} )

set(refDB(datab , "Completed/"+ indx +"/"+"FrontSuspension" ) ,{

fsus

} )

set(refDB(datab , "Completed/"+ indx +"/"+"RearSuspension" ) ,{

rsus

} )



set(refDB(datab , "Completed/"+ indx +"/"+"Services" ) ,{

  service
  
  } )
  set(refDB(datab , "Completed/"+ indx +"/"+"Total" ) ,{

    total
    
    } )

  set(refDB(datab , "Completed/"+ indx +"/"+"Time" ) ,{

    yy:yy,
    mm:mm,
    dd:dd,
    hh:hh,
    mins:min
      
      } )

//set(refDB(datab, "Promise/"+ index +"/"+"Estado"  ) , "NOAP")


set(refDB(datab , "Completed/"+ indx +"/"+"Information" ), totalInfo )




set(refDB(datab , "Completed/"+ indx +"/"+"Infoflat" ), infoflat )
  alert("COMPLETED")

set(refDB(datab , "Toclose/"+indx),null)

  window.location.reload();

} catch (error) {
  alert(error)
}




    }} >CLOSE TICKET</button>


</td>



            
        </tr>

      

    )
})}



</table>




        </div>
    )
}