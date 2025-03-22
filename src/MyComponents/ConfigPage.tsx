import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { set, ref as refDb, getDatabase  } from "firebase/database";
import {   useState } from "react"
import app from "../fireconfig";
import { getDownloadURL, getStorage, ref as refST, uploadBytesResumable } from "firebase/storage";



export const Config =()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
  //  const token = useId();

    const auth = getAuth(app)
    const datab = getDatabase(app)
    const storage = getStorage(app)
    

    //Employee details
    const [empName , setName]=useState<string>();
    const [empEmail , setEmail]=useState<string>();
    const [empPass , setPass]=useState<any>();
    const [empPhone , setPhone]=useState<any>();
    const [cond , setCond]=useState<any>();
    const [prog , setprogress]=useState<any>();

 //Servise details
 const [svc , setSrv]=useState<any>();
 const [srvValue , setSrvVAlue]=useState<any>();
 const [imgsURL , setImages]=useState<any>();



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


const handlefiles =(e:any)=>{

    let file = e.target.files[0]
    const refGallery =  refST(storage , "myLOGO/" + file.name)


    let taskUp = uploadBytesResumable(refGallery , file)

    taskUp.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setprogress(progre)
      }, 
      (error) => {
     alert(error)
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(taskUp.snapshot.ref).then((downloadURL) => {
          setImages(downloadURL)
        });
      
    
      }
    
    )




}


    return(
        <div>



<h2>Settings</h2>


<div className="bloq1">

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

<button className="approve" onClick={()=>createEmp()} >Create Employee</button> <br /> <br />

    

</div>

<hr />

<div className="bloq1">
    <h2>Create Service</h2>
<input type="text" placeholder="A1-description , description ..." onChange={(e)=>setSrv(e.target.value)} /> <br /> <br />
<input type="text" placeholder="Service Flat Rate" onChange={(e)=>setSrvVAlue(e.target.value)} /> <br /> <br />
<button className="approve" onClick={()=>CreateSvc()}>Create Service</button>



</div>

<hr />
<div className="bloq1">

<input type="file" onChange={handlefiles} />
<br />
<br />


<progress value={prog}></progress>

<img src={imgsURL} width={150} />

<button className="approve" onClick={()=>{

set(refDb(datab , "MYLOGO") , imgsURL).then(()=>alert("Done")).catch((err)=>alert(err))

}}>Set Main logo</button>
</div>



<br />

<hr />
<h2>Contact us</h2>

<div >
<img width={30} src={"https://www.citypng.com/public/uploads/preview/outline-whatsapp-wa-watsup-green-logo-icon-symbol-sign-png-701751695124303npsmzlcjyh.png"} alt="" />
Phone: <span className=" font-extrabold">+1 2402666754</span><br />
Email: <span className=" font-extrabold">ncteckllc@gmail.com</span><br />
</div>





        </div>
    )

}