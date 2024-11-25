import {  getAuth, onAuthStateChanged } from "firebase/auth";
import { set, ref as refDb, getDatabase, onValue  } from "firebase/database";
import { getDownloadURL, getStorage, ref as refSto, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import app from "../fireconfig";





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
    const refNames = refDb(datab , "Completed")
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

    // Vehicle data
    const [make , setmake]=useState<any>();
    const [model , setmodel]=useState<any>();
    const [yearCar , setYearCar]=useState<any>();
    const [plate , setplate]=useState<any>();
    const [vin , setVin]=useState<any>();
    const [ro , setRo]=useState<number>();
    const [state , setstate]=useState<number>(0);
    const [millage , setMillsge]=useState<number>();

    const [urls , setUrls]=useState<any[]>([])

    const [loged , setloged]=useState()



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


let namesArrays:any=[]
onValue(refNames , snap=>{
    snap.forEach(snap2 =>{
snap2.child('Information').forEach(snap3=>{
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
    millage:snap3.child('millage').val(),
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

 

},[])

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

    if (custName == null||custLast == null||cusPhone == null||custState == null||custcity == null||custStreet == null||custZip == null||make == null||model == null||yearCar == null||plate == null||vin == null||srvSelected == null||techSelected == null || ro==null||millage==null) {
        
alert('please check fields')
    } else {

  
    
     
set(refDb(datab , "NewSet/" + ro   ) , {
    
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
    alert('Success')
    window.location.reload();
}).catch((err)=>alert(err))



    }
    
}



    return(
        <div>

<div className="Customers">
<div >
Customer exist?


<input type="text" placeholder="Search Name" />

{allNames.map((i:any)=>{
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
})}

<hr />


<br /> <br />
<div className="grid md:grid-cols-3 lg:grid-cols-4 justify-center ">

<input type="text" value={custName} placeholder="First Name" onChange={(e)=>setCustName(e.target.value)} /> <br /> <br />
<input type="text"  value={custLast} placeholder="Last Name" onChange={(e)=>setCustLast(e.target.value)} /> <br /> <br />
<input type="number" value={cusPhone} placeholder="Phone" onChange={(e)=>setCustPhone(parseInt(e.target.value))} /> <br /> <br />

<input type="text" value={custState} placeholder="State" onChange={(e)=>setCustState(e.target.value)} /> <br /> <br />
<input type="text" value={custcity} placeholder="City" onChange={(e)=>setCuscity(e.target.value)} /> <br /> <br />
<input type="text" value={custStreet} placeholder="Street" onChange={(e)=>setCustStreet(e.target.value)} /> <br /> <br />
<input type="text" value={custZip} placeholder="ZipCode" onChange={(e)=>setCustZip(e.target.value)} /> <br /> <br />


<h2>Vehicle</h2>
<hr />



<input type="text" value={make} placeholder="Make" onChange={(e)=>setmake(e.target.value)} /> <br /> <br />
<input type="text"  value={model} placeholder="Model" onChange={(e)=>setmodel(e.target.value)} /> <br /> <br />
<input type="number" value={yearCar} placeholder="Year" onChange={(e)=>setYearCar(e.target.value)} /> <br /> <br />
<input type="text" value={plate} placeholder="Plate" onChange={(e)=>setplate(e.target.value)} /> <br /> <br />
<input type="text" value={vin} placeholder="Vin" onChange={(e)=>setVin(e.target.value)} /> <br /> <br />
<input type="number"   placeholder="Ro Number" onChange={(e)=>setRo(parseInt(e.target.value))} /> <br /> <br />
<input type="number" value={millage} placeholder="Millage" onChange={(e)=>setMillsge(parseInt(e.target.value))} /> <br /> <br />
<input type="file"  accept="*image/jpeg" capture={true} className="camera"  onChange={handleFiles}  /> <br /> <br />

</div>

 
{urls.map((i:any)=>{
    return(
        <div>
            <img src={i} width={100} />
<br />
        </div>
        
    )
})}       

<hr />
</div>
<h2>Service</h2>

<div className="bg-stone-600 w-full h-72 overflow-scroll rounded p-4">


{services.map(index=>{
    return(
        <li>{index.name}- ({index.flat}) <button className="btnBar" onClick={()=>{
            
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

{srvSelected.map((index:any)=>{
    return(

        <table key={index.name}>{index.name} - ({index.flat})
        
        <button className="btnBar" onClick={()=>{
        
setSvcSelected( srvSelected.filter((e:any) => e!=index) )

        }}>Delete</button></table>
    )
})}

<br /> <br />
    <textarea placeholder="Other Servise"  onChange={(e)=>setOther(e.target.value)}/>
        <br />
        <input type="number" placeholder="Flat Rate" onChange={(e)=>setOtherValue(e.target.value)}/>
    <br /> <br />

    <button className="btnBar" onClick={()=>{
if (other==null ||otherValue==null) {
    alert('Please check Servise')
} else {
      setSvcSelected([...srvSelected ,{
                name:other,
                flat:otherValue
             } ])
}
           
            }} >Add</button>

    <br /> <br />

    <select className="btnBar" onChange={(e)=>setTechSelected(e.target.value)}>
        <option>Select Tech </option>

{techs.map(index=>{
    return(
        <option>
            {index}
        </option>
    )
})}

    </select>
    <br /> <br />

<button className="btnBar" onClick={()=>assign()} >Set</button>

</div>



        </div>
    )


}