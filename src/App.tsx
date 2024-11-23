
import { useEffect, useState } from 'react'
import './App.css'
import app from './fireconfig'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth'
import { createRoot } from 'react-dom/client'
import { Today } from './MyComponents/TodayPage'
import { Review } from './MyComponents/ReviewPage'
import { Config } from './MyComponents/ConfigPage'
import { FlatRate } from './MyComponents/FlatRatePage'
import { History } from './MyComponents/HistoryPage'
import { getDatabase, onValue, ref as refDB } from 'firebase/database'
import { Approval } from './MyComponents/ApprovalPage'
import { ResponseA } from './MyComponents/ResponsePage'

function App() {
const auth = getAuth(app)
const datab = getDatabase(app)
const refUsers = refDB(datab , "Users/")

const [showLogin, setShowLogin] = useState<boolean>(true)
const [showAdmin, setaAdmin] = useState<boolean>(true)
//const [showTech, setTech] = useState<boolean>()
const [grade , setGrade] = useState<string>();

const [emailuser, setemailuser] = useState<any>()
const [passuser, setpassuser] = useState<any>()
const [nameUser , setname] = useState<string>()
const [stateuser , setstateuser] = useState<any>()

useEffect(()=>{
console.log(stateuser);

  onAuthStateChanged(auth , (user)=>{

if (user == null) {
  setname('No USER')
}else{


  // setname("Admin: "+ nameUser)
onValue(refUsers , snap=>{
  snap.forEach(snap2=>{
    snap2.forEach(snap3=>{
      if(user?.email == snap3.child('email').val()){
        setname(snap3.child('name').val())
        setstateuser(snap3.child('condition').val())
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

 


},[ grade])

  return (
  <body>
    
<header className='md:flex grid grid-cols-1 md:grid-cols-2 justify-between'>
  <div>logo</div> 


  <div>
<button className='btnMain' onClick={()=>{

if (showLogin) {
  setShowLogin(false)
}else{setShowLogin(true)}

}}>Login</button>
 <button className='btnMain' onClick={()=>{

signOut(auth).then(()=>{
  setaAdmin(true)
  alert('Good bye')
  setGrade("None")
  setname("NO USER")

  const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Today/>)

}).catch((err)=>alert(err))

 }}>Logout</button> 
<button className='btnMain'>Setting</button> 

  </div>







</header>


{/* login here */}
<div className="loginbloq" hidden={showLogin}>


 <input type="email" placeholder='User Email' onChange={(e)=>setemailuser(e.target.value)} /> <br /> <br />
<input type="password" placeholder='User password' onChange={(e)=>setpassuser(e.target.value)} />
<button className='btnMain' onClick={()=>{


if (emailuser ==null || passuser == null) {
  alert("Please check field")
}else{
  signInWithEmailAndPassword(auth , emailuser , passuser).then(()=>{

  alert('Success')
  if (emailuser == "ncteck@ncteck.com") {
    setaAdmin(false)
  }

  if(showLogin){
    setShowLogin(false)
  }else{setShowLogin(true)}

}).catch((err)=>{alert(err)})
}




}}>Enter</button>

</div>

{/* Main bar */}
<div className='bar'>

<button className='btnMain' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Today/>)

}}>
  Today
</button >

<button className='btnMain'onClick={()=>{

if (grade == "Admin") {
  const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Approval/>)
} 
if (grade == "Tech") {
  const container:any = document.getElementById('forRender')
  const root = createRoot(container)
  root.render(<ResponseA/>)
}



}}  >
  Aproval
</button>

<button className='btnMain' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Review/>)

}}>
  Review
</button>
<button className='btnMain' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<History/>)

}} >
History
</button>


{/* Admin Access */}
<span hidden={showAdmin}>




  <button className='btnMain'onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<FlatRate/>)

}}  >
  Set Hours
</button>
<button className='btnMain' onClick={()=>{

const container:any = document.getElementById('forRender')
const root = createRoot(container)
root.render(<Config/>)

}}  >
  Config
</button>

</span>


User:{nameUser?.toUpperCase()}
  
</div>




<div id='forRender'>
<Today></Today>
</div>





  </body>
  )
}

export default App
