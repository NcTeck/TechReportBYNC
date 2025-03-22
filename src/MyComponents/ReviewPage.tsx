import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../fireconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";



export const Review =()=>{
   
    const datab = getDatabase(app)
    const auth = getAuth(app)

    const refComplete = ref(datab , "Completed")
const [ date1 , setdate1 ]=useState<any>();
const [ date2 , setdate2 ]=useState<any>();
const [ datedef , setdatedef ]=useState<any[]>([]);


const [ nameUser , setnameUser ]=useState<number>();
const nameUserRef = ref(datab , "Users")

let total:number =0;



useEffect(()=>{

    onAuthStateChanged(auth , (user)=>{

if (user != null) {
        
    
    onValue(nameUserRef , snap =>{
            snap.forEach(snap2=>{
                snap2.forEach(snap3=>{
                    if (user?.email ==snap3.child("email").val() ) {
                        setnameUser(snap3.child("name").val())
                    }
                })
            })
        })
    
        
        var fechaInicio = new Date(date1.toString().padStart(2, '0'));
        var fechaFin    = new Date(date2.toString().padStart(2, '0'));
        let arraydates:any=[]
     


        onValue(refComplete , snap =>{
snap.forEach(snap2=>{
snap2.child("Information").forEach(snap3=>{

    if (snap3.child("emp").val() == nameUser || snap3.child("advisor").val() == nameUser ) {

        while(fechaFin.getTime() >= fechaInicio.getTime()){
   
            fechaInicio.setDate(fechaInicio.getDate() + 1);


            arraydates.push({
                date:fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1).toString().padStart(2, '0') + '/' +fechaInicio.getDate().toString().padStart(2, '0')
            })
            setdatedef(arraydates)





           
        }
  


     



    }
})
})
        })
}

    })



},[date1 , date2 , nameUser ])










    return(
        <div>
<h2>See Dates</h2>



{/* dates */}
<div className="flex justify-between">
    <div>

 <h3 className="text-2xl text-blue-900 font-extrabold">Start</h3>
<input type="date" onChange={(e)=>setdate1(e.target.value)} /> 
    </div>

<div>
<h3 className="text-2xl text-blue-900 font-extrabold">End</h3>
<input type="date" onChange={(e)=>setdate2(e.target.value)} />
</div>



</div>


<table>

<tr>
    <th>
        DATE
    </th>
    <th>
        RO
    </th>
    <th>
        EARNED
    </th>
</tr>




{datedef.map((index:any)=>{

let array1:any=[]
 onValue(refComplete ,snap=>{
    snap.forEach(snap2=>{
        
snap2.child("Information").forEach(snap3=>{

if (snap3.child("emp").val() == nameUser || snap3.child("advisor").val() == nameUser  ) {
    
if(index.date == snap2.child("Time").child('yy').val()+"/"+snap2.child("Time").child('mm').val()+"/"+snap2.child("Time").child('dd').val()){

    array1.push({
        ros:snap2.key,
        flat:snap2.child("Total").child('total').val()
    })
}


}

})


        
    })
 })



    return(
    
    <tr>
        <td>

        {index.date}  
        </td>

    <td>

            {array1.map((ind:any)=>{
                return(
                    <td>
                        {ind.ros} /

                       
                    </td>
                )
            })}
           </td> 


   <td>

            {array1.map((ind:any)=>{
                total=total+ ind.flat
                return(
                    <td>
                        {ind.flat} /

                       
                    </td>
                )
            })}
           </td> 

    </tr>
    )
})}

TOTAL: <b>{total}</b>
</table>

        </div>
    )

}