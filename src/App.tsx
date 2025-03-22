
import { useEffect, useState } from 'react'
import './App.css'
import app from './fireconfig'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
import { createRoot } from 'react-dom/client'
import { Today } from './MyComponents/TodayPage'
import { Review } from './MyComponents/ReviewPage'
import { Config } from './MyComponents/ConfigPage'
import { History } from './MyComponents/HistoryPage'
import { getDatabase, onValue, ref as refDB } from 'firebase/database'
import { Approval } from './MyComponents/ApprovalPage'
import { ResponseA } from './MyComponents/ResponsePage'
import exit from './MyComponents/imgs/exit.png'
import unno from './MyComponents/imgs/1.jpeg'
import dos from './MyComponents/imgs/2.jpeg'
import tres from './MyComponents/imgs/3.jpeg'
import cuatro from './MyComponents/imgs/4.jpeg'
import cinco from './MyComponents/imgs/5.jpeg'
import seis from './MyComponents/imgs/6.jpeg'
import siete from './MyComponents/imgs/7.jpeg'
import ocho from './MyComponents/imgs/8.jpeg'
import nueve from './MyComponents/imgs/9.jpeg'
import diez from './MyComponents/imgs/10.jpeg'

import userI from './MyComponents/imgs/account.png'
import Toclose from './MyComponents/TClosePage'
//import appMain from './firebaseMain'

function App() {
  const auth = getAuth(app)
 // const authMAin = getAuth(appMain)
  const datab = getDatabase(app)
  const refUsers = refDB(datab , "Users/")
  const reflogo = refDB(datab , "MYLOGO/")
  const refCustomer = refDB(datab , "PreAprobal")


const [showLogin, setShowLogin] = useState<boolean>(true)
const [showAdmin, setaAdmin] = useState<boolean>(true)
const [shoAll, setshoAll] = useState<boolean>(true)
//const [showTech, setTech] = useState<boolean>()
const [grade , setGrade] = useState<string>();

const [emailuser, setemailuser] = useState<any>()
const [passuser, setpassuser] = useState<any>()
const [nameUser , setname] = useState<any>()
const [mylogo , setmylogo] = useState<string>()


const [field , setfield] = useState<any>();
const [howtouse , setHowToUSe] = useState<boolean>(true);
const [hvac , sethvac] = useState<any[]>([]);
const [interior , setinterior] = useState<any[]>([]);
const [exterior , setExterior] = useState<any[]>([]);
const [battery , setbattery] = useState<any[]>([]);
const [underh , setunderh] = useState<any[]>([]);
const [fluids , setfluids] = useState<any[]>([]);
const [tires , settires] = useState<any[]>([]);
const [brakes , setBrakes] = useState<any[]>([]);
const [steerinf , setSteering] = useState<any[]>([]);
const [fsus , setfsus] = useState<any[]>([]);
const [rsus , setrsus] = useState<any[]>([]);
const [seerv , setseerv] = useState<any[]>([]);


let arrayHvac:any =[]
let arrayext:any =[]
let arrayinterior:any =[]
let arrayBattery:any =[]
let arrayUnderh:any =[]
let arrayFluids:any =[]
let arraytires:any =[]
let arraybrakes:any =[]
let arraysteering:any =[]
let arrayfsus:any =[]
let arrayrsus:any =[]
let arraysvc:any =[]



useEffect(()=>{
  document.getElementById("mySidepanel")!.style.width = "0";


  onAuthStateChanged(auth , (user)=>{

if (user == null) {
  setname(null)



  onValue(refCustomer, snap=>{
snap.forEach(snap2=>{
  snap2.child("Information").forEach(snap3=>{


    if (snap3.child("phone").val() == field) {

      snap2.child("HVAC").child("hvacArray").forEach(snap4=>{

              arrayHvac.push({
                valor:  snap4.child("valor").val(),
                url:  snap4.child("url").val(),
                note:  snap4.child("note").val(),
                status:  snap4.child("status").val(),
                color:  snap4.child("color").val(),

      })
sethvac(arrayHvac)

      })

      snap2.child("Interior").child("interiorArray").forEach(snap4=>{

        arrayinterior.push({
          valor:  snap4.child("valor").val(),
          url:  snap4.child("url").val(),
          note:  snap4.child("note").val(),
          status:  snap4.child("status").val(),
          color:  snap4.child("color").val(),

})
setinterior(arrayinterior)

})

snap2.child("Exterior").child("exteriorArray").forEach(snap4=>{

  arrayext.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setExterior(arrayext)

})

snap2.child("Battery").child("batteryArray").forEach(snap4=>{

  arrayBattery.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setbattery(arrayBattery)

})

snap2.child("Underhood").child("underHArray").forEach(snap4=>{

  arrayUnderh.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setunderh(arrayUnderh)

})

snap2.child("UnderhoodFluids").child("fluidsArray").forEach(snap4=>{

  arrayFluids.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setfluids(arrayFluids)

})

snap2.child("Tires").child("tiresArray").forEach(snap4=>{

  arraytires.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
settires(arraytires)

})

snap2.child("Brakes").child("brakesArray").forEach(snap4=>{

  arraybrakes.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setBrakes(arraybrakes)

})

snap2.child("Steering").child("steeringArray").forEach(snap4=>{

  arraysteering.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setSteering(arraysteering)

})

snap2.child("Services").child("serviceArray").forEach(snap4=>{

  arraysvc.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setseerv(arraysvc)

})

snap2.child("FrontSuspension").child("fSuspeArray").forEach(snap4=>{

  arrayfsus.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setfsus(arrayfsus)

})

snap2.child("RearSuspension").child("rSuspeArray").forEach(snap4=>{

  arrayrsus.push({
    valor:  snap4.child("valor").val(),
    url:  snap4.child("url").val(),
    note:  snap4.child("note").val(),
    status:  snap4.child("status").val(),
    color:  snap4.child("color").val(),

})
setrsus(arrayrsus)

})



    }


  })
})
  })

}else{

setshoAll(false)
  // setname("Admin: "+ nameUser)
onValue(refUsers , snap=>{
  snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
      if(user?.email == snap3.child('email').val()){
        setname(snap3.child('name').val())
        if(snap3.child('condition').val() == "Admin"){
setGrade(snap3.child('condition').val())
setaAdmin(false)

        }
        if(snap3.child('condition').val() == "Tech"){

          setGrade(snap3.child('condition').val())
        }
      }
    })
    
  })
})





}




  })

 
  onValue(reflogo, snap=>{
    setmylogo(snap.val())
  })

},[ shoAll,showAdmin, grade , nameUser , field])



  return (
  <body>
    
    <div  className='bg-neutral-200'>

 <div className='htsbloq' hidden={howtouse}>

<button onClick={()=>{
  setHowToUSe(true)
}} className='decline'>X</button>

<h2>How to use</h2>

<img src={unno} width={800} /> <br />
<img src={dos} width={800} /> <br />
<img src={tres} width={800} /> <br />
<img src={cuatro} width={800} /> <br />
<img src={cinco} width={800} /> <br />
<img src={seis} width={800} /> <br />
<img src={siete} width={800} /> <br />
<img src={ocho} width={800} /> <br />
<img src={nueve} width={800} /> <br />
<img src={diez} width={800} /> <br />

 </div>

<header className='md:flex grid grid-cols-3  justify-between'>
 
  <div><img src={mylogo} alt="Logo" className='w-40 h-16 lg:w-80 lg:h-20' /> </div> 



<span className=' text-sm' >login: maria@ncteck.com  <br />

password: 111000
 </span>

  <div className='grid grid-cols-2 justify-between'> 



  
<span >

<button className='btnLog2 flex' onClick={()=>{

if (showLogin) {
  setShowLogin(false)
}else{setShowLogin(true)}

}}  >In</button>
</span>


<span >
  <button className='btnLog flex' onClick={()=>{

signOut(auth).then(()=>{
  setaAdmin(true)
  alert('Good bye')
  setGrade("None")

setshoAll(true)
  const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Today/>)

}).catch((err)=>alert(err))

 }}>Out</button>

 <button className='bg-emerald-100 p-2 rounded-lg text-emerald-700 font-extrabold float-right' onClick={()=>{

if (howtouse) {
  setHowToUSe(false)
}else{setHowToUSe(true)}



 }

 }>?</button>

</span>


  </div>






</header>

<div className='flex justify-between'>

<div className="box md:hidden m-2" onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "250px";

}}>
            <div className="divmenu"></div>
            <div className="divmenu"></div> 
            <div className="divmenu"></div> 
          
        </div>

  <span className='text-green-500 float-right  font-extrabold'> {nameUser == "No USER" ? <span>N/U</span> : <span>{nameUser?.toUpperCase()} <img src={userI} width={30} /> </span> }  </span>



</div>

 



{/* login here */}
<div className="loginbloq" hidden={showLogin}>


 <input type="email" placeholder='User Email' onChange={(e)=>setemailuser(e.target.value)} /> <br /> <br />
<input type="password" placeholder='User password' onChange={(e)=>setpassuser(e.target.value)} />
<button className='btn' onClick={()=>{


if (emailuser ==null || passuser == null) {
  alert("Please check field")
}else{
  signInWithEmailAndPassword(auth , emailuser , passuser).then(()=>{

  alert('Success')
 

  if(showLogin){
    setShowLogin(false)
  }else{setShowLogin(true)}

}).catch((err)=>{alert(err)})
}




}}>Enter</button>

</div>

<div hidden={shoAll}>

{/* Main bar */}
<div className=' hidden md:flex  justify-between '>

<button className='btnLabel' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Today/>)

}}>
  Inspection
</button >



{/* Admin Access */}
<span hidden={showAdmin}>
<button className='btnLabel' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Approval/>)

}}>
  Approval
</button >



</span>
<button className='btnLabel' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<ResponseA/>)

}}>
  Response
</button >

<button hidden={showAdmin}  className='btnLabel' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Toclose/>)

}}>
  To Close
</button>

<button className='btnLabel' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<History/>)

}} >
History
</button>

<button className='btnLabel' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Review/>)

}}>
  See Dates
</button>




<button hidden={showAdmin} className='btnLabel' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Config/>)

}}  >
  Config
</button>

</div>



{/* Main bar */}
<div id='mySidepanel'  className='sidepanel grid md:hidden'>

<button onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

}}><img src={exit} width={30} /></button>

<button className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Today/>)

}}>
  Inspection
</button >




{/* Admin Access */}


<button hidden={showAdmin}  className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Approval/>)

}}>
  Approval
</button >


<button className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<ResponseA/>)

}}>
  Response
</button >

<button hidden={showAdmin}  className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Toclose/>)

}}>
  Close Tickets
</button>
<button className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<History/>)

}} >
History
</button>
<button className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Review/>)

}}>
  See Dates
</button>
<button hidden={showAdmin} className='btnSide' onClick={()=>{
    document.getElementById("mySidepanel")!.style.width = "0";

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Config/>)

}}  >
  Config
</button>

</div>




</div>


    </div>






<div id='forRender'>

<Today></Today>
</div>

{!nameUser ? <div>


<input type="number" className='w-72' placeholder='Phone Number 12346579' onChange={(e)=>setfield(e.target.value)} />


<div className='customerTAble'>

<h2>HVAC</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{hvac.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}>  <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>INTERIOR / DASH</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{interior.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>EXTERIOR</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{exterior.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>BATTERY</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{battery.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>


<h2>UNDERHOOD</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{underh.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>FLUIDS</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{fluids.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>TIRES</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{tires.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>


<h2>BRAKES</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{brakes.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>STEERINNG</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{steerinf.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>

<h2>FRONT SUSPENSION</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{fsus.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>


<h2>REAR SUSPENSION</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{rsus.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>


<h2>SERVICES EXTRA</h2>
<hr />

<table>
<tr>
  <th>Description</th>
  <th>Note</th>
  <th>Media</th>

</tr>


{seerv.map((i:any)=>{
  return(
<tr>

  <td className={i.color}> {i.valor} </td>
  <td className={i.color}> {i.note} </td>
  <td className={i.color}> <img src={i.url} width={50} onClick={()=>window.open(i.url)} /> </td>


</tr>

  )
})}

</table>












</div>

</div> : null }



  </body>
  )
}

export default App
