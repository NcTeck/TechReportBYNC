import {  getAuth, onAuthStateChanged } from "firebase/auth";
import { set, ref as refDb, getDatabase, onValue  } from "firebase/database";
import { getDownloadURL, getStorage, ref as refSto, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import app from "../fireconfig";
import removeAccents from 'remove-accents';





export const SetCustomer =()=>{

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mins = today.getMinutes();


    //References
    const datab = getDatabase(app);
    const auth = getAuth(app)
    const store = getStorage(app);
    const refdataEmp = refDb(datab , "Users")
    const refSvc = refDb(datab , "Services")
    const refNames = refDb(datab , "ALLCUSTOMERS")
    const refROS = refDb(datab , "ROS")
    // Customer Data
    const [allNames , setallnames]=useState<string[]>([]);



    const [custName , setCustName]=useState<string>();
    const [custLast , setCustLast]=useState<string>();
    const [cusPhone , setCustPhone]=useState<number>();
 
    const [custState , setCustState]=useState<any>();
    const [custcity , setCuscity]=useState<any>();
    const [custStreet , setCustStreet]=useState<any>();
    const [custZip , setCustZip]=useState<any>();
    const [techs , setTechs] = useState<any[]>([])
    const [services , setServises] = useState<any[]>([])
    const [techSelected , setTechSelected] =useState<any>()
    const [srvSelected , setSvcSelected] =useState<any>([])
    const [other ,setOther]=useState<any>()
    const [otherValue ,setOtherValue]=useState<any>()
    const [findName ,setfindName]=useState<string>()

    // Vehicle data
    const [make , setmake]=useState<any>();
    const [model , setmodel]=useState<any>();
    const [yearCar , setYearCar]=useState<any>();
    const [plate , setplate]=useState<any>();
    const [vin , setVin]=useState<any>();
    const [ro , setRo]=useState<number>(0);
    const [state , setstate]=useState<number>(0);
    const [millage , setMillsge]=useState<number>();

    const [urls , setUrls]=useState<any[]>([])

    const [loged , setloged]=useState()

    // const vinSCaner = vinDecoder("dwdd")


useEffect(()=>{

    onAuthStateChanged(auth,(user)=>{

        if (user == null) {
         
        }else{
let arrayTechs =[]
            onValue(refdataEmp , snap=>{
                snap.forEach(snap2 =>{
                    snap2.forEach(snap3=>{

                        if (user.email == snap3.child('email').val()) {
                            setloged(snap3.child('name').val())
                        }

                      if (snap3.child('condition').val()=='Tech') {
                        arrayTechs.push(snap3.child('name').val())
                        setTechs(arrayTechs)
                      }
                    })
                })
            })
        }


onValue(refROS , snap =>{
    snap.forEach(snap2 =>{
        setRo(parseInt(snap2.val()))
    })
})

let namesArrays:any=[]
onValue(refNames , snap=>{
    snap.forEach(snap2 =>{
snap2.forEach(snap3=>{

  namesArrays.push({
    name:snap3.child('name').val(),
    last:snap3.child('last').val(),
    phone:snap3.child('phone').val(),
    zip:snap3.child('zip').val(),
    state:snap3.child('state').val(),
    city:snap3.child('city').val(),
    street:snap3.child('street').val(),
    make:snap3.child('make').val(),
    model:snap3.child('model').val(),
    vin:snap3.child('vin').val(),
    plate:snap3.child('plate').val(),
    yearcar:snap3.child('yearcar').val(),
  }) 
setallnames(namesArrays)
})
    })
    
})

let arraySvc =[]
onValue(refSvc , snap=>{
    snap.forEach(snap2=>{
           arraySvc.push({
            name:snap2.key,
            flat:snap2.val(),
           })
setServises(arraySvc)
    })
 
})
    
    })

 

},[ro])

const handleFiles = async ( e:any)=>{

    if (ro!=null) {

    let element = e.target.files[0];
    const refMediaNewSvc = refSto(store , "MediaNewSvc/" +yy+"/"+mm+"/"+dd+"/"+ro+"/"+element.name+state)
  
    await uploadBytes(refMediaNewSvc , element )
    getDownloadURL(refMediaNewSvc)
    .then((url) => {
setUrls([...urls , url])
    }
    )

setstate(state+1)


    }else{alert('Check RO first')}



}

function assign() {
    setRo(ro+1)

    if (custName == null||custLast == null||cusPhone == null||custState == null||custcity == null||custStreet == null||custZip == null||make == null||model == null||yearCar == null||plate == null||vin == null||srvSelected == null||techSelected == null || ro==null||millage==null) {
        
alert('please check fields')
    } else {

        
  

     
set(refDb(datab , "NewSet/" + ro ) , {
    estado:"NOAP",
    phone:cusPhone,
    currentYear:yy,
    currentMonth:mm,
    currentDay:dd,
    currentHour:hh+":"+mins,
    millage:millage,
    name:custName,
    last:custLast,
   
    state:custState,
    city:custcity,
    street:custStreet,
    zip:custZip,
    make:make,
    model:model,
    yearcar:yearCar,
    plate:plate,
    vin:vin,
    emp:techSelected,
    url:urls,
    advisor:loged,
    srvSelected

}).then(()=>{
    set(refDb(datab , "ROS/" +ro+1 ) , ro+1)
    alert('Success')
    window.location.reload();
}).catch((err)=>alert(err))


    }
    
}


    return(
        <div className="bloq1">

<div>

Customer exist?


<input type="text" placeholder="Search Name" onChange={(e:any)=>setfindName(e.target.value)} />







{allNames.map((i:any)=>{
let fullname:any = i.name+" "+i.last;
for (let m = 0; m < fullname.length; m++) {

    if (fullname.substring(0,m) == findName ) {
        
     
    return(
        <li>
{i.name} {i.last} <button className="btnBar" onClick={()=>{
setCustName(i.name)
setCustLast(i.last)
setCustPhone(i.phone)
setCustState(i.state)
setCuscity(i.city)
setCustStreet(i.street)
setMillsge(i.millage)
setmake(i.make)
setYearCar(i.yearcar)
setmodel(i.model)
setplate(i.plate)
setVin(i.vin)
setCustZip(i.zip)
}}>Select</button>
        </li>
    )


    }
    
    
}



})}

<hr />


<br /> <br />
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center justify-center ">
<span>
{custName != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={custName} placeholder="First Name" onChange={(e)=>setCustName(e.target.value)} /> <br /> <br />
</span>
    <span>
{custLast != null ?null: <span className="text-red-600">*Required</span> }<input type="text"  value={custLast} placeholder="Last Name" onChange={(e)=>setCustLast(e.target.value)} /> <br /> <br />
    </span>
    <span>
{cusPhone != null ?null: <span className="text-red-600">*Required</span> }<input type="number" value={cusPhone} placeholder="Phone" onChange={(e)=>setCustPhone(parseInt(e.target.value))} /> <br /> <br />
    </span>
<span>

{custState != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={custState} placeholder="State" onChange={(e)=>setCustState(e.target.value)} /> <br /> <br />
</span>
<span>

{custcity != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={custcity} placeholder="City" onChange={(e)=>setCuscity(e.target.value)} /> <br /> <br />
</span>
<span>

{custStreet != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={custStreet} placeholder="Street" onChange={(e)=>setCustStreet(e.target.value)} /> <br /> <br />
</span>
<span>

{custZip != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={custZip} placeholder="ZipCode" onChange={(e)=>setCustZip(e.target.value)} /> <br /> <br />
</span>

</div>

<h2>Vehicle</h2>
<hr />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center justify-center ">

<span>

{make != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={make} placeholder="Make" onChange={(e)=>setmake(e.target.value)} /> <br /> <br />
</span>
<span>

{model != null ?null: <span className="text-red-600">*Required</span> }<input type="text"  value={model} placeholder="Model" onChange={(e)=>setmodel(e.target.value)} /> <br /> <br />
</span>
<span>

{yearCar != null ?null: <span className="text-red-600">*Required</span> }<input type="number" value={yearCar} placeholder="Year" onChange={(e)=>setYearCar(e.target.value)} /> <br /> <br />
</span>
<span>

{plate != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={plate} placeholder="Plate" onChange={(e)=>setplate(e.target.value)} /> <br /> <br />
</span>
<span>



{vin != null ?null: <span className="text-red-600">*Required</span> }<input type="text" value={vin} placeholder="Vin" onChange={(e)=>setVin(e.target.value)} /> <br /> <br />
</span>
<span>







<input type="number" value={ro} onChange={(e)=>setRo(parseInt(e.target.value))} /> <br /> <br />
</span>
<span>

{millage != null ?null: <span className="text-red-600">*Required</span> }<input type="number"  placeholder="Millage" onChange={(e)=>setMillsge(parseInt(e.target.value))} /> <br /> <br />
</span>
<span>

<input type="file"  accept="*image/jpeg" capture={true} className="camera"  onChange={handleFiles}  /> <br /> <br />
</span>

</div>

 <div className="flex">

{urls.map((i:any)=>{
    return(
        <span>
            <img src={i} width={100} />

        </span>
        
    )
})}       
 </div>

<hr />
</div>
<h2>Services</h2>

<div className="rows h-80 overflow-scroll">


{services.map(index=>{
    return(
        <li>{index.name}- ({index.flat}) <button className="approve" onClick={()=>{
            
            setSvcSelected([...srvSelected , {
name:index.name,
flat:index.flat
            }

        ])

}} >+</button>
        </li>

    )
})}

</div>



<br /> <br />
    <textarea className="w-full" placeholder="Other Servise"  onChange={(e)=>setOther(e.target.value)}/>
        <br />
        <input className="w-full" type="number" placeholder="Flat Rate" onChange={(e)=>setOtherValue(e.target.value)}/>
    <br /> <br />
<span className="grid justify-center">
    <button className="approve w-64" onClick={()=>{
if (other==null ||otherValue==null) {
    alert('Please check Servise')
} else {
      setSvcSelected([...srvSelected ,{
                name:other,
                flat:otherValue
             } ])
}
           
            }} >Add</button>
 </span>
    <br /> <br />
   <table>

    <tr>
        <th>
            Description
        </th>
        <th>
            Flat rate
        </th>
        <th>
            Action
        </th>
    </tr>

    {srvSelected.map((index:any)=>{
    return(
<tr>
    <td>{index.name}</td>
         <td>{index.flat} </td> 
        <td>
                    <button className="decline" onClick={()=>{
        
setSvcSelected( srvSelected.filter((e:any) => e!=index) )

        }}>Delete</button>
        </td>


   </tr>
    )
})}

   
   </table>

<br /><br />
    <select className="btnBar w-64" onChange={(e)=>setTechSelected(e.target.value)}>
        <option >Select Tech </option>

{techs.map(index=>{

    
    return(
        <option>
            {removeAccents(index)
            }
        </option>
    )
})}

    </select>
    <br /> <br />

<button className="btnBar w-full m-2 font-bold" onClick={()=>assign()} >SET</button>



<br /><br /><br /><br />



        </div>
    )


}