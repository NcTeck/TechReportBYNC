import { useEffect, useState } from "react"
import { SetCustomer } from "./SetCustomerPage"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref,  set as setBD } from "firebase/database";
import app from "../fireconfig";
import { Forms } from "./FormsPage";
import './mas.css'



export const Today:React.FC =()=>{


    const auth = getAuth(app)
    const datab = getDatabase(app)
    const refGrade = ref(datab , "Users/")

const [showCustomer , setShowCustomer] = useState(true);
const [showButtonC , setButtonC] = useState(true);
const [grade , setGrade] = useState<string>();
const [nameUser , setNamrU] = useState<string>();

  //Active data
  const refDataAct = ref(datab , "NewSet")
  const [data , setdata] =useState<any[]>([])
  const [allVisible , setAllVisible] =useState<boolean>(true)
  const [showActButton , setActviveButton] =useState<boolean>(true)
  const [visibleItems , setVisibleItems]= useState<number>()

useEffect(()=>{

    onAuthStateChanged(auth,(user)=>{

        if (user == null) {
            setButtonC(true)
            setShowCustomer(true)
            setAllVisible(true)
        }else{
            setAllVisible(false)

            onValue(refGrade , snap=>{
                snap.forEach(snap2 =>{
                    snap2.forEach(snap3=>{
                        if (user.email ==snap3.child('email').val() ) {
                             if (snap3.child('condition').val() == "Admin") {
                            setGrade('Admin')
                        }
                        if (snap3.child('condition').val() == "Tech") {
                            setGrade('Tech')
                            setNamrU(snap3.child('name').val())
                        }
                        }
                       



                    })
                })
            })

            
            let arrayDataAct:any =[];
            onValue(refDataAct , snap=>{
                snap.forEach(snap2 => {
                    snap2.forEach(snap3 =>{
snap3.forEach(snap4 =>{
 console.log(snap4.val())

})

                    })
                    
                    if (nameUser ==  snap2.child('emp').val() || grade == "Admin") {
                            arrayDataAct.push({
                            ro:snap2.key,
                            phone:snap2.child('phone').val(),
                            currentYear:snap2.child('currentYear').val(),
                            currentMonth:snap2.child('currentMonth').val(),
                            currentDay:snap2.child('currentDay').val(),
                            currentHour:snap2.child('currentHour').val(),
                            millage:snap2.child('millage').val(),
                            name:snap2.child('name').val(),
                            last:snap2.child('last').val(),
                           
                            state:snap2.child('state').val(),
                            city:snap2.child('city').val(),
                            street:snap2.child('street').val(),
                            zip:snap2.child('zip').val(),
                            make:snap2.child('make').val(),
                            model:snap2.child('model').val(),
                            yearcar:snap2.child('yearcar').val(),
                            plate:snap2.child('plate').val(),
                            vin:snap2.child('vin').val(),
                            emp:snap2.child('emp').val(),
                            url:snap2.child('url').val(),
                            advisor:snap2.child('advisor').val(),
                        
                    })
                        setdata(arrayDataAct)
                }
                });
            })

      
            
        }
        
        
        
        
    })
    
    if (grade=="Admin") {
        setButtonC(false)
        setActviveButton(false)
    }if (grade=="Tech") {
        setButtonC(true)
        setActviveButton(true)

    }
    
},[grade , nameUser])


const toggleVisibility =(itm:any)=>{
    
    if (visibleItems == itm) {
        setVisibleItems(-1)
        
    } else {
        setVisibleItems(itm)
    }
    
   // setVisibleItems((prev)=>prev.map((visible , i)=>(i=== itm ? !visible : visible)))
//setVisibleItems2([...visibleItems2 , itm])
}

return(
    <div>


<h2>Today</h2>


{/* hidden Admin Functions */}
<button hidden={showButtonC} className="btnBar" onClick={()=>{
if (showCustomer) {
    setShowCustomer(false)
}else{setShowCustomer(true)}


}}> New Customer </button>
<div hidden={showCustomer}>
<SetCustomer />

</div>

<hr />
<div className="bg-gray-600" hidden={allVisible}>


    
       {data.map((index:any , item:any) =>{

let arraysvcs:any=[]
const refSvcs = ref(datab , 'NewSet/'+index.ro+"/"+"srvSelected")
onValue(refSvcs , snap =>{
    snap.forEach(snap2 =>{
        arraysvcs.push(snap2.val())
    })
})

let arrayMedia:any=[]
const refMedia = ref(datab , 'NewSet/'+index.ro+"/"+"url")
onValue(refMedia , snap =>{
    snap.forEach(snap2 =>{
        arrayMedia.push(snap2.val())
    })
})

return(




<div className="rows">
    

<table onClick={()=> toggleVisibility(item)}>


<tr>
    <th>RO</th>
    <th>Vehicle</th>
    <th>Model</th>
    <th>Date</th>
    <th>Team</th>
    <th>Actions</th>

</tr>

<tr>
 <td> {index.ro} </td>
        <td  style={{backgroundImage: `url(${index.url})` , backgroundSize:'cover' , backgroundRepeat:'no-repeat' , backgroundPosition:'center center'}} >    {index.make }    </td>
        <td> {index.model} </td>
        <td> {index.currentMonth}/{index.currentDay}/{index.currentYear} - {index.currentHour}  </td>
         <td>Advisor: <b>{index.advisor}</b>  <br />
        Tech: <b> {index.emp} </b>
            
             </td>
             <td>
                    <div hidden={showActButton}>
<button onClick={()=>{

setBD(ref(datab , "NewSet/" + index.ro) , null).then(()=>{
    alert('Deleted')
     window.location.reload()
    }).catch((err)=>alert(err))

}} >Erase</button>
<button>Modify</button>
       </div>
             </td>
                   

{/* 
// Show sub menu
   */}

 <br />
 </tr>
 </table>
       <table>


       {visibleItems === item  ? <div>

<br />

<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3">

<div >
 Customer: <b className="fields">{index.name} {index.last}</b> <br /><br /> <br />
</div>
<div>
Phone: <b className="fields"> {index.phone}</b> <br /> <br /> <br />
</div>
<div>
Vin: <b className="fields"> {index.vin}</b> <br /> <br /> <br />
</div>
<div>
Millage: <b className="fields"> {index.millage}</b> <br /> <br /> <br />
</div>
<div>
Plate: <b className="fields"> {index.plate}</b> <br /> <br /> <br />
</div>
<div>
State: <b className="fields"> {index.state}</b> <br /> <br /> <br />
</div>
<div>
City: <b className="fields"> {index.city}</b> <br /> <br /> <br />
</div>
<div>
Street: <b className="fields"> {index.street}</b> <br /> <br /> <br />
</div>
<div>
Zip: <b className="fields"> {index.zip}</b> <br /> <br /> <br />
</div>
<div>
State: <b className="fields"> {index.state}</b> <br /> <br /> <br />
</div>



</div>
{arrayMedia.map((i:any)=>{
    return(
        <img src={i} width={50} style={{display:'inline' , cursor:'pointer'}} onClick={()=>window.open(i)} />
    )
})}
 <table>
     <tr>
    <td>Description</td>
    <td>Flat Rate</td>
</tr>       
     { arraysvcs.map((idx:any)=>{
                return(
                    
                        <tr>
                                 <td>{idx.name}</td>
                    <td> {idx.flat}  </td>
                        </tr>
                       
                    
                
                )
            }) }

         </table>



<Forms test={index.ro} />

</div> : null }
   </table>  
   


</div>

        
    




)


})

}


    
    
  






</div>
        </div>
    )

}