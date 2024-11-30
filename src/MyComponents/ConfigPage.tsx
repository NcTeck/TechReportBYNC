import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { set, ref as refDb, getDatabase  } from "firebase/database";
import {   useState } from "react"
import app from "../fireconfig";



export const Config =()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
  //  const token = useId();

    const auth = getAuth(app)
    const datab = getDatabase(app)
    
    

    //Employee details
    const [empName , setName]=useState<string>();
    const [empEmail , setEmail]=useState<string>();
    const [empPass , setPass]=useState<any>();
    const [empPhone , setPhone]=useState<any>();
    const [cond , setCond]=useState<any>();

 //Servise details
 const [svc , setSrv]=useState<any>();
 const [srvValue , setSrvVAlue]=useState<any>();



    function createEmp() {
  

if (empName == null ||empPhone == null ||empEmail == null ||empPass == null || cond == null || cond == "Please Select..."   ) {
    alert("Please check fields")
} else {
    createUserWithEmailAndPassword(auth , empEmail , empPass).then(()=>{

set(refDb(datab , "Users/"+"Employees"+"/"+ empPhone ), {
    email: empEmail?.toLowerCase(),
    pass:empPass,
    name:empName,
    date:mm+"-"+dd+"-"+yy,
    condition:cond
}).then(()=>{alert('Success Created')})


      }).catch((err)=>{alert(err)}) 
}

     



    }

function CreateSvc() {
    
if (svc == null || srvValue == null) {
    alert('Please check fields')
} else {
    set(refDb(datab , "Services/"+ svc  ), srvValue ).then(()=>alert("Success Created")).catch((err)=>alert(err))
 
}

  
}



    return(
        <div>



<div>Config</div>


<div className="CEmployee">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center justify-center " >


<input type="text" placeholder="Name Employee" onChange={(e)=>setName(e.target.value)} /> <br /> <br />
<input type="text" placeholder="Email Employee" onChange={(e)=>setEmail(e.target.value)} /> <br /> <br />
<input type="text" placeholder="Password Employee" onChange={(e)=>setPass(e.target.value)} /> <br /> <br />
<input type="number" placeholder="Phone Number Employee" onChange={(e)=>setPhone(e.target.value)} /> <br /> <br />
<select onChange={(e)=>setCond(e.target.value)}>
<option>
        Please Select...
    </option>
    <option value="Tech">
        Tech
    </option>
    <option value="Admin">
        Admin
    </option>
</select>

</div>


<br /> <br />

<button className="btn" onClick={()=>createEmp()} >Create Employee</button> <br /> <br />

    

</div>



<div className="CServises">
<input type="text" placeholder="A1-description , description ..." onChange={(e)=>setSrv(e.target.value)} /> <br /> <br />
<input type="text" placeholder="Service Price" onChange={(e)=>setSrvVAlue(e.target.value)} /> <br /> <br />
<button onClick={()=>CreateSvc()}>Create Service</button>



</div>

<br />








        </div>
    )

}