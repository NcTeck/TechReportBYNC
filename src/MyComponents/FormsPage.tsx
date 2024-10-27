import { getDatabase, onValue, ref, ref as refDB, set } from "firebase/database"
import app from "../fireconfig"
import {  useEffect, useState } from "react"
import { getDownloadURL, getStorage, ref as refSto, uploadBytes } from "firebase/storage"
import React from 'react';

interface propi{

test:string,

}


export const Forms:React.FC<propi> =({test})=>{

 

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mins = today.getMinutes();
    const storage = getStorage(app)

   const datab = getDatabase(app)

   const infoRef = ref(datab , "NewSet/" + test)
    
    const [roadCoor , setRoadColor] =useState<string>()
    const [roadShot , setRoadShow] =useState(true)
    const [roadTest , setRoadTest] =useState<string>("NO")
    const [stikercolor , setstikerClor] =useState<string>()
    const [stiker , setStiker] =useState<string>("NO")


    
    const [acShow , setAcShiw] =useState(true)
    const [acColor , setAcColor] =useState<string>()
    const [hvac , setHvac] =useState<string>("No Selected")
    const [hvacIssue , setHvacissue] =useState<string>("Empty")
    const [hvacUrls, setHvacUrls] =useState<any>("Empty")
    
    const [interiorShow , setInteriorShow] =useState(true)
    const [interior , setInterior] =useState<any>("Empty")
    const [interiorStatus , setinteriorStatus] =useState<any>("No Selected")
    const [interiorcolor , setInteriorcolor] =useState<any>()

    const [interiorDash , setinteriorDash] =useState<string>("No Selected")
    const [dash , setDash] =useState<string>("Empty")
    const [dashColor , setDashColor] =useState<string>()
    const [dashUrls, setdashUrls] =useState<string>("Empty")
    
    const [interiorOther , setInteriorOther] =useState<any>("Empty")
    const [interiorOtherColor , setInteriorOtherColor] =useState<any>()
    const [interiorOtherStatus , setInteriorOtherStatus] =useState<string>("No Selected")
    const [interiorUrls, setInteriorOtherUrls] =useState<string>("Empty")

    const [ExteriorShow , setExteriorShow] =useState(true)
    const [exteriorStatus , setExteriorStatus] =useState<any>("No Selected")
    const [exteriorColor , setExteriorColor] =useState<any>()
    const [exteriorAllIssue , setExteriorAllIssue] =useState<string>("Empty")
   //const [exteriorAlUrls, setExteriorAllUrls] =useState<string>()

    const [higBeanStatus , setHighBeanStatus] =useState<any>("No Selected")
    const [highBeam , sethighbeam] =useState<string>("Empty")
   // const [higBeamCamera , setHigBeamCamera] =useState<boolean>(true)
    const [highBeamColor , sethighbeamColor] =useState<string>()
    const [highBeamUrls, setHightBeamUrls] =useState<string>("Empty")

    const [lowBeanStatus , setLowBeanStatus] =useState<any>("No Selected")
    const [lowBeam , setLowbeam] =useState<string>("Empty")
  //  const [lowBCamera , setLowBeamCamera] =useState<boolean>(true)
    const [lowBeamColor , setLowbeamColor] =useState<string>()
    const [lowBeamUrls, setLowBeamUrls] =useState<string>("Empty")

    const [fogLightStatius , setfogLightStatus] =useState<any>("No Selected")
    const [foglight , setfogLIght] =useState<string>("Empty")
 //   const [fogLigCamera , setForLighCamera] =useState<boolean>(true)
    const [foglightColor , setfogLIghtCOlor] =useState<string>()
    const [foglUrls, setFoglUrs] =useState<string>("Empty")

    const [fturnStatus , setFturnStatus] =useState<any>("No Selected")
    const [fturn , setfTurn] =useState<string>("Empty")
    //const [fturnCamera , setFronTurnCamera] =useState<boolean>(true)
    const [fturnCOlor , setfTurnCOlor] =useState<string>()
    const [fturnUrl, setfTurnUrls] =useState<string>("Empty")

    const [rturnStatus , setrturnStatus] =useState<any>("No Selected")
    const [rturn , setrTurn] =useState<string>("Empty")
//const [rturnCamera , setTurnCAmera] =useState<boolean>(true)
    const [rturnCOlor , setrTurnColor] =useState<string>()
    const [rturnUrl, setrTurnUrls] =useState<string>("Empty")

    const [fSideMarkStatus , setFsideMarkStatus] =useState<any>("No Selected")
    const [fSideMark , setFSidMark] =useState<string>("Empty")
  //  const [fsidemCamera , setFsideCamera] =useState<boolean>(true)
    const [fSideMarkColor , setFSidMarkCOlor] =useState<string>()
    const [fSideMakrUrl, setFsidemarkUrl] =useState<string>("Empty")

    const [rSideMarkStatus , setrsideMarkStatus] =useState<any>("No Selected")
    const [rSideMark , setrSidMark] =useState<string>("Empty")
  //  const [rSideCAmera , setrSideCamera] =useState<boolean>(true)
    const [rSideMarkCOlor , setrSidMarkColor] =useState<string>()
    const [rSideMakrUrl, setrsidemarkUrl] =useState<string>("Empty")

    const [brakeLightStatus , setBrakeLightStatus] =useState<any>("No Selected")
    const [brakeLIght , setBrakeLight] =useState<string>("Empty")
  //  const [brakeLigheCamera , setBrakeLightCAmera] =useState<boolean>(true)
    const [brakeLIghtcolor , setBrakeLightCOlor] =useState<string>()
    const [brakeLightUrls, setbrakeLIghtUrls] =useState<string>("Empty")

    const [reverseLightStatus , setReverseStatus] =useState<any>("No Selected")
    const [reverseLight , setreverseLight] =useState<string>("Empty")
//const [reverseCamera , setReverseCamera] =useState<boolean>(true)
    const [reverseLightCOlor , setreverseLightCOlor] =useState<string>()
    const [reverseUrls, setReverseUrls] =useState<string>("Empty")

    const [tagLightsStatus , setTagLIghtStatus] =useState<any>("No Selected")
    const [tagLights , setTagIghts] =useState<string>("Empty")
  //  const [taglCamera , setTaglCamera] =useState<boolean>(true)
    const [tagLightsColor , setTagIghtsCOlor] =useState<string>()
    const [tagLUrs, setTagLUrls] =useState<string>("Empty")

    const [batteryShow , setBatteryShow] =useState(true)
    const [batteryStaus , setBatteryStatus] =useState<any>("No Selected")
    const [battery , setBattery] =useState<string>("Empty")
 //   const [batteryCamera , setBatteryCamera] =useState<boolean>(true)
    const [batteryCOlor , setBatteryCOlor] =useState<string>()
    const [batteryUrl, setBatteryUrls] =useState<string>("Empty")

    const [fWIperStatus , setfWiperStatus] =useState<any>("No Selected")
    const [fwiper , setFWipers] =useState<string>("Empty")
   // const [fWiperCamera , setFwiperCamera] =useState<boolean>(true)
    const [fwiperCOlor , setFWipersColor] =useState<string>()
    const [fwiperUrls, setFwiperUrls] =useState<string>("Empty")

    const [rWIperStatus , setrWiperStatus] =useState<any>("No Selected")
    const [rwiper , setrWipers] =useState<string>("Empty")
   // const [rwipoerCamera , setRWiperCamera] =useState<boolean>(true)
    const [rwiperCOlor , setrWipersCOlor] =useState<string>()
    const [rwiperUrls, setRwiperUrls] =useState<string>("Empty")

    const [underHoodShow , setUnderHoodShow] =useState(true)
    const [underHIssueStatus , setUnderHIssueStatus] =useState<any>("No Selected")
    const [underHoodIssue , setunderHoodIssue] =useState<string>("Empty")
   // const [underhoodCamera , setUnderHoodCamera] =useState<boolean>(true)
    const [underHoodColor , setUnderHoodColor] =useState<string>()
    const [underHoodUrl, setUnderHUrls] =useState<string>("Empty")

    const [timmigBeltStatus , setTimmingbeltStatus] =useState<any>("No Selected")
   const [timingBelt , setTimmingBet] =useState<string>("Empty")
    const [timmingBeltColor , setTimingBColor] =useState<string>()

    const [driveBeltStatus , setdriveBeltStatus] =useState<any>("No Selected")
    const [driveBelt , setDriveBet] =useState<string>("Empty")
  //  const [driveBeltCamera , setDriveBCAmera] =useState<boolean>(true)
    const [driveBeltColor , setDriveBeltColor] =useState<string>()
    const [driveBeltUrl, setdriveBeltUrls] =useState<string>("Empty")

    const [airFilterStatus , setAirFIterStatus] =useState<any>("No Selected")
    const [airFilter , setAirFilter] =useState<string>("Empty")
 //   const [airFilterCamera , setAirFIlterCAmera] =useState<boolean>(true)
    const [airFilterColor , setAirFIlterColor] =useState<string>()
    const [airFIlterUrl, setAirFilterUrl] =useState<string>("Empty")
    
    const [cabinFilterStatus , setCAbinFilterStatus] =useState<any>("No Selected")
    const [cabinFilter , setCabinFilter] =useState<string>("Empty")
   // const [cabinFilterCamera , setCAbinFterCAmera] =useState<boolean>(true)
    const [cabinFilterCoLor , setcabinFilterColor] =useState<string>()
    const [cabinFilterUrl, setcabinFiterUrl] =useState<string>("Empty")

    const [fluidShow , setFluidShow] =useState(true)
    const [engineOilStatus , setEngineOiStatus] =useState<any>("No Selected")
    const [engineOIlColor , setengineOilColor] =useState<string>()
    const [engineOil , setEngineOIl] =useState<string>("Empty")
  //  const [enginmeOiCamera , setEngineOilCamera] =useState<boolean>(true)
    const [engineOilUrls, setEngineOilUrls] =useState<string>("Empty")

    const [transmissionOilStatus , setTransmissionOilStatus] =useState<any>("No Selected")
    const [transmOIlColor , setTransmOilColor] =useState<string>()
   // const [transmissionCAmera , setTransmissCamera] =useState<boolean>(true)
    const [transmissioneOil , setTransmissinOIl] =useState<string>("Empty")
    const [transmissionOilUrls, setTransmissionOilUrls] =useState<string>("Empty")

    const [coolantStatus , setcoolantStatus] =useState<any>("No Selected")
    const [coolantColor , setCoolantColor] =useState<string>()
    const [coolant , setcoolant] =useState<string>("Empty")
    const [coolantUrls, setCooantUrls] =useState<string>("Empty")

    const [powerSStatus , setPowerSStatus] =useState<any>("No Selected")
    const [powerSColor , setPowerSColor] =useState<string>()
    const [powerStering , setPowerSteering] =useState<string>("Empty")
 //   const [powerSCamera , setPowerSCamera] =useState<boolean>(true)
    const [powerSUrls, setPowerSUrls] =useState<string>("Empty")

    const [brakeFluidStatus , setbrakeFluidStatus] =useState<any>("No Selected")
    const [brakeFluidColor , setbrakeFluidColor] =useState<string>()
  //  const [brakeFluidCAmera , setBrakeFluidCamera] =useState<boolean>(true)
    const [brakeFluid , setbrakeFluid] =useState<string>("Empty")
    const [brakeFluidUrls, setbrakeFluidUrls] =useState<string>("Empty")

    const [tiresShow , setTiresShow] =useState(true)
    const [tiresStatus , setTiresStatus] =useState<string>("No Selected")
    const [tiresIssue , setTiresIssues] =useState<string>("Empty")
    const [tiresColor , settiresColor] =useState<string>()
    const [tiresUrl, setTiresUrl] =useState<string>("Empty")

    const [tirefr, settirefr] =useState<number>(-1)
    const [tirefl, settirefl] =useState<number>(-1)
    const [tirerr, settirerr] =useState<number>(-1)
    const [tirerl, settirerl] =useState<number>(-1)

    


    const [brakepadsShow , setBrakepadsShow] =useState(true)
    const [brakepadsssue , setBrakePdasIssues] =useState<string>("Empty")
    const [padsStatus , setpadsStatus] =useState<string>("No Selected")
    const [brakePadsColer , setBrakePadsColor] =useState<string>()
    const [BrakePadsUrl, setBrakePadsUrl] =useState<string>("Empty")

    const [rotorsStatus , setrotorsStatus] =useState<string>("Empty")
    const [rotors , setrotors] =useState<string>("No Selected")
    const [rotorsColor , setrotorsColor] =useState<string>()
    const [rotorsUrls, setrotorsUrls] =useState<string>("Empty")

    const [calipersStatus , setcalipersStatus] =useState<string>("Empty")
    const [calipers , setcalipers] =useState<string>("No Selected")
    const [caliperColors , setcaliperColors] =useState<string>()
    const [calipersUrls, setcalipersUrls] =useState<string>("Empty")

    const [padfr, setpadfr] =useState<number>(-1)
    const [padfl, setpadfl] =useState<number>(-1)
    const [padrr, setpadrr] =useState<number>(-1)
    const [padrl, setpadrl] =useState<number>(-1)

    const [steeringShow , setSteeringShow] =useState(true)
    const [steeringStatus , setsteeringStatus] =useState<string>("No Selected")
    const [steeringIssue , setSteeringIssue] =useState<string>("Empty")
    const [steeringColor , setSteeringColor] =useState<string>()

    const [tierotStatus , settierotStatus] =useState<string>("No Selected")
    const [tierot , settierot] =useState<string>("Empty")
    const [tierotColor , settierotColor] =useState<string>()
    const [tieRotUrls , settierotUrls] =useState<string>("Empty")

    const [tiebootStatus , settieBootStatus] =useState<string>("No Selected")
    const [tieBoot , setTieBoot] =useState<string>("Empty")
    const [tieBootCOor , setBootColor] =useState<string>()
    const [tieBootUrl , settiebootUrl] =useState<string>("Empty")
    
    const [alignmentStatus , setalignmentStatus] =useState<string>("No Selected")
    const [aliognment , setalignment] =useState<string>("Empty")
    const [alignmentColor , setAlignmentColor] =useState<string>()

    const [frontSusShow , setFrontSusShow] =useState(true)
    const [frontSusStatus , setFronSusStatus] =useState<string>("No Selected")
    const [fronSus , setfronSus] =useState<string>("Empty")
    const [frontSusColor , setfrontSusColor] =useState<string>()

    const [shocksFStatus , setshocksFStatus] =useState<string>("No Selected")
    const [shockF , setshockF] =useState<string>("Empty")
    const [shocksFColor , setshocksFColor] =useState<string>()
    const [shocksFUrl , setshocksFUrl] =useState<string>("Empty")

    const [controlArmsStatus , setControlArmStatus] =useState<string>("No Selected")
    const [controlArms , setcontrolArms] =useState<string>("Empty")
    const [ControlArmsColor , setControlArmColor] =useState<string>()
    const [controlArmUrls , setControlArmsurls] =useState<string>("Empty")

    const [AxleFStatus , setalxefStatus] =useState<string>("No Selected")
    const [axleF , setaxleF] =useState<string>("Empty")
    const [alxefColor , setalxefColor] =useState<string>()
    const [axlefUrls , setaxlefUrls] =useState<string>("Empty")

    const [swaybarfstatus , setSwayBarStatu] =useState<string>("No Selected")
    const [swayBar , setSawyBar] =useState<string>("Empty")
    const [swayBarColor , setSwayBArColor] =useState<string>()
    const [swayBarUrl , setswayBarUrl] =useState<string>("Empty")

    const [wheelBearingStatus , setWheelBearingStatus] =useState<string>("No Selected")
    const [wheelBear , setWheelbear] =useState<string>("Empty")
    const [wheelbearingCOlor , setWheelbearingColor] =useState<string>()
    const [wheelBearinUrls , setwheelBearUrls] =useState<string>("Empty")

    const [ballJoinStatus , setballJoinStatus] =useState<string>("No Selected")
    const [ballJjoint , setballJjoint] =useState<string>("Empty")
    const [ballJpinColor , setballJpinColor] =useState<string>()
    const [ballJointUrl , setballJointUrl] =useState<string>("Empty")


    const [lEngineMountStatus , setlEngineMountStatus] =useState<string>("No Selected")
    const [lengineMojnt , setlengineMojnt] =useState<string>("Empty")
    const [lengineMojntColor , setlengineMojntColor] =useState<string>()
    const [lengineMojnUrl , setlengineMojnUrl] =useState<string>("Empty")

    const [transMountstatus , settransMountstatus] =useState<string>("No Selected")
    const [transMount , settransMount] =useState<string>("Empty")
    const [transMountColor , settransMountColor] =useState<string>()
    const [transmountUrls , settransmountUrls] =useState<string>("Empty")





    const [rearSusShow , setrearSusShow] =useState(true)
    const [rearSusStatus , setrearSusStatus] =useState<string>("No Selected")
    const [rearSus , setrearSus] =useState<string>("Empty")
    const [rearSusColor , setrearSusColor] =useState<string>()

    const [uEngineMountStatus , setuEngineMountStatus] =useState<string>("No Selected")
    const [uengineMojnt , setuengineMojnt] =useState<string>("Empty")
    const [uengineMojntColor , setuengineMojntColor] =useState<string>()
    const [uengineMojnUrl , setuengineMojnUrl] =useState<string>("Empty")

    const [rballJoinStatus , setrballJoinStatus] =useState<string>("No Selected")
    const [rballJjoint , setrballJjoint] =useState<string>("Empty")
    const [rballJpinColor , setrballJpinColor] =useState<string>()
    const [rballJointUrl , setrballJointUrl] =useState<string>("Empty")

    const [rwheelBearingStatus , setrWheelBearingStatus] =useState<string>("No Selected")
    const [rwheelBear , setrWheelbear] =useState<string>("Empty")
    const [rwheelbearingCOlor , setrWheelbearingColor] =useState<string>()
    const [rwheelBearinUrls , setrwheelBearUrls] =useState<string>("Empty")

    const [rswaybarfstatus , setrSwayBarStatu] =useState<string>("No Selected")
    const [rswayBar , setrSawyBar] =useState<string>("Empty")
    const [rswayBarColor , setrSwayBArColor] =useState<string>()
    const [rswayBarUrl , setrswayBarUrl] =useState<string>("Empty")

    const [rcontrolArmsStatus , setrControlArmStatus] =useState<string>("No Selected")
    const [rcontrolArms , setrcontrolArms] =useState<string>("Empty")
    const [rControlArmsColor , setrControlArmColor] =useState<string>()
    const [rcontrolArmUrls , setrControlArmsurls] =useState<string>("Empty")

    const [shocksRStatus , setshocksRStatus] =useState<string>("No Selected")
    const [shockR , setshockR] =useState<string>("Empty")
    const [shocksRColor , setshocksRColor] =useState<string>()
    const [shocksRUrl , setshocksRUrl] =useState<string>("Empty")

    const [axleRStatus , setalxeRStatus] =useState<string>("No Selected")
    const [axleR , setaxleR] =useState<string>("Empty")
    const [alxeRColor , setalxeRColor] =useState<string>()
    const [axleRUrls , setaxleRUrls] =useState<string>("Empty")

    
    const [otherShow , setOtherShow] =useState(true)
    const [otherStatus , setOtherStatus] =useState<string>("No Selected")
    const [others , setothers] =useState<string>("Empty")
    const [otherColors , setotherColors] =useState<string>()
    const [othersUrls , setothersUrls] =useState<string>("Empty")

    const [exhausStatus , setexhausStatus] =useState<string>("No Selected")
    const [exhaust , setexhaus] =useState<string>("Empty")
    const [exhaustColor , setExhaustColor] =useState<string>()
    const [exahustUrl , setExhaustUrl] =useState<string>("Empty")

    const [leaksStatus , setLeaksStatus] =useState<string>("No Selected")
    const [leaks , setLeakrs] =useState<string>("Empty")
    const [leaksColor , setLeaksColor] =useState<string>()
    const [leaksUrls , setLeaksUrl] =useState<string>("Empty")

    const [serviceShow , setserviceShow] =useState(true)
    const [fuelService , setfuelService] =useState<string>("Empty")
    const [fuelServicestatus , setfuelServicestatus] =useState<string>("No Selected")
    const [fuelColor , setfuelColor] =useState<string>()
    const [fuelUrs , setfuelUrs] =useState<string>("Empty")

    const [emisionSvc , setemisionSvc] =useState<string>("Empty")
    const [emisionStatus , setemisionStatus] =useState<string>("No Selected")
    const [emisionColor , setemiemisionColor] =useState<string>()
    const [emisionUrls , setemisionUrls] =useState<string>("Empty")

    const [tcase , settcase] =useState<string>("Empty")
    const [tcaseStatus , settcaseStatus] =useState<string>("No Selected")
    const [tcaseColor , settcaseColor] =useState<string>()
    const [tcaseUrls , settcaseUrls] =useState<string>("Empty")

    const [inducton , setinduction] =useState<string>("Empty")
    const [inductionStatus , setinductionStatus] =useState<string>("No Selected")
    const [inductionColor , setinductionColor] =useState<string>()
    const [inductionUrls , setinductionUrls] =useState<string>("Empty")

const [info , setInfo] = useState<any[]>([])


useEffect(()=>{

let arrayInfo:any[] =[];
onValue(infoRef , snap =>{
   arrayInfo.push(snap.val())
    
})
setInfo(arrayInfo)

},[])



function toSend() {

try {

    set(refDB(datab , "PreAprobal/"+ test +"/"+"RoadTest" ) ,{

        road:roadTest,
        stike:stiker,
           
} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"HVAC" ) ,{

    hvac:hvacIssue,
   hvacurl:hvacUrls,
   status:hvac
       
} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Interior" ) ,{

    allLight:interior,
status:interiorStatus, 

das:dash,
dashstatus:interiorDash,
dashUrls:dashUrls,

interiorOther:interiorOther,
interiorOtherStatus:interiorOtherStatus,
interiorUrls:interiorUrls,
} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Exterior" ) ,{

    allLight:exteriorAllIssue,
status:exteriorStatus, 

highBeam:highBeam,
higBeanStatus:higBeanStatus,
highBeamUrls:highBeamUrls,

lowBeam:lowBeam,
lowBeanStatus:lowBeanStatus,
lowBeamUrls:lowBeamUrls,


foglight:foglight,
foglUrls:foglUrls,
fogLightStatius:fogLightStatius,

fturn:fturn,
fturnStatus:fturnStatus,
fturnUrl:fturnUrl,

rturn:rturn,
rturnStatus:rturnStatus,
rturnUrl:rturnUrl,

fSideMark:fSideMark,
fSideMarkStatus:fSideMarkStatus,
fSideMakrUrl:fSideMakrUrl,

rSideMark:rSideMark,
rSideMarkStatus:rSideMarkStatus,
rSideMakrUrl:rSideMakrUrl,

brakeLIght:brakeLIght,
brakeLightStatus:brakeLightStatus,
brakeLightUrls:brakeLightUrls,

reverseLight:reverseLight,
reverseLightStatus:reverseLightStatus,
reverseUrls:reverseUrls,

tagLights:tagLights,
tagLightsStatus:tagLightsStatus,
tagLUrs:tagLUrs,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Battery" ) ,{

    battery:battery,
   batteryStaus:batteryStaus,
   batteryUrl:batteryUrl,

   fwiper:fwiper,
   fWIperStatus:fWIperStatus,
   fwiperUrls:fwiperUrls,

   rwiper:rwiper,
   rWIperStatus:rWIperStatus,
   rwiperUrls:rwiperUrls, 
} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Underhood" ) ,{

    underHoodIssue:underHoodIssue,
underHIssueStatus:underHIssueStatus, 
underHoodUrl:underHoodUrl,

timingBelt:timingBelt,
timmigBeltStatus:timmigBeltStatus,


driveBelt:driveBelt,
driveBeltStatus:driveBeltStatus,
driveBeltUrl:driveBeltUrl,

uengineMojnt:uengineMojnt,
uEngineMountStatus:uEngineMountStatus,
uengineMojnUrl:uengineMojnUrl,

airFilter:airFilter,
airFilterStatus:airFilterStatus,
airFIlterUrl:airFIlterUrl,

cabinFilter:cabinFilter,
cabinFilterStatus:cabinFilterStatus,
cabinFilterUrl:cabinFilterUrl,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"UnderhoodFluids" ) ,{

    engineOil:engineOil,
engineOilStatus:engineOilStatus, 
engineOilUrls:engineOilUrls,

transmissioneOil:transmissioneOil,
transmissionOilStatus:transmissionOilStatus,
transmissionOilUrls:transmissionOilUrls,

coolant:coolant,
coolantStatus:coolantStatus,
coolantUrls:coolantUrls,

powerStering:powerStering,
powerSStatus:powerSStatus,
powerSUrls:powerSUrls,

brakeFluid:brakeFluid,
brakeFluidStatus:brakeFluidStatus,
brakeFluidUrls:brakeFluidUrls,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Tires" ) ,{

    tiresIssue:tiresIssue,
tiresUrl:tiresUrl, 

tirefl:tirefl,
tirefr:tirefr,
tirerl:tirerl,
tirerr:tirerr,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Brakes" ) ,{

    brakepadsssue:brakepadsssue,
BrakePadsUrl:BrakePadsUrl, 

padfl:padfl,
padfr:padfr,
padrl:padrl,
padrr:padrr,

calipers:calipers,
calipersStatus:calipersStatus,
calipersUrls:calipersUrls,

rotors:rotors,
rotorsStatus:rotorsStatus,
rotorsUrls:rotorsUrls,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Steering" ) ,{

    steeringIssue:steeringIssue,
steeringStatus:steeringStatus, 

tierot:tierot,
tierotStatus:tierotStatus,
tieRotUrls:tieRotUrls,

tieBoot:tieBoot,
tiebootStatus:tiebootStatus,
tieBootUrl:tieBootUrl,

alignmentStatus:alignmentStatus,
aliognment:aliognment,


} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"FrontSuspension" ) ,{

    fronSus:fronSus,
frontSusStatus:frontSusStatus, 


shockF:shockF,
shocksFStatus:shocksFStatus,
shocksFUrl:shocksFUrl,


controlArms:controlArms,
controlArmsStatus:controlArmsStatus,
controlArmUrls:controlArmUrls,

wheelBear:wheelBear,
wheelBearingStatus:wheelBearingStatus,
wheelBearinUrls:wheelBearinUrls,

ballJjoint:ballJjoint,
ballJoinStatus:ballJoinStatus,
ballJointUrl:ballJointUrl,

axleF:axleF,
AxleFStatus:AxleFStatus,
axlefUrls:axlefUrls,

lengineMojnt:lengineMojnt,
lEngineMountStatus:lEngineMountStatus,
lengineMojnUrl:lengineMojnUrl,

swayBar:swayBar,
swaybarfstatus:swaybarfstatus,
swayBarUrl:swayBarUrl,

transMount:transMount,
transMountstatus:transMountstatus,
transmountUrls:transmountUrls,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"RearSuspension" ) ,{

    rearSus:rearSus,
rearSusStatus:rearSusStatus, 


shockR:shockR,
shocksRStatus:shocksRStatus,
shocksRUrl:shocksRUrl,

rcontrolArms:rcontrolArms,
rcontrolArmsStatus:rcontrolArmsStatus,
rcontrolArmUrls:rcontrolArmUrls,

rwheelBear:rwheelBear,
rwheelBearingStatus:rwheelBearingStatus,
rwrheelBearinUrls:rwheelBearinUrls,

rballJjoint:rballJjoint,
rballJoinStatus:rballJoinStatus,
rballJointUrl:rballJointUrl,

axleR:axleR,
axleRStatus:axleRStatus,
axleRUrls:axleRUrls,



rswayBar:rswayBar,
rswaybarfstatus:rswaybarfstatus,
rswayBarUrl:rswayBarUrl,



} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"OtherExhaust" ) ,{

others:others,
otherStatus:otherStatus,
othersUrls:othersUrls,

exhaust:exhaust,
exhausStatus:exhausStatus,
exahustUrl:exahustUrl,

leaks:leaks,
leaksStatus:leaksStatus,
leaksUrls:leaksUrls,

} )

set(refDB(datab , "PreAprobal/"+ test +"/"+"Services" ) ,{

    fuelService:fuelService,
    fuelServicestatus:fuelServicestatus,
    fuelUrs:fuelUrs,
    
    emisionSvc:emisionSvc,
    emisionStatus:emisionStatus,
    emisionUrls:emisionUrls,
    
    inducton:inducton,
    inductionStatus:inductionStatus,
    inductionUrls:inductionUrls,

    tcase:tcase,
    tcaseStatus:tcaseStatus,
    tcaseUrls:tcaseUrls,
    
    } )

    set(refDB(datab , "PreAprobal/"+ test +"/"+"Time" ) ,{

      yy:yy,
      mm:mm,
      dd:dd,
      hh:hh,
      mins:mins
        
        } )

set(refDB(datab, "PreAprobal/"+ test +"/"+"Estado"  ) , "NOAP")


set(refDB(datab , "PreAprobal/"+ test +"/"+"Information" ), info )
    alert("SENT")

    set(ref(datab , "NewSet/"+test),null)

    window.location.reload();
} catch (error) {
    alert(error)
}


   
}




    return(
        <div>

            {/* ROAD TEST  */}
            <button className="btDiag"  onClick={()=>{
                if(roadShot){
                    setRoadShow(false)
                }else{setRoadShow(true)}
            }}>Road Test</button>
<div hidden={roadShot}>
    <table>
    <tr>
    <td>Description</td>
    <td>Yes</td>
    <td>No</td>
</tr>

<tr>
    <td className={roadCoor}>Road Test</td>
<td  ><input type="radio" name="road"  onChange={()=>{
    setRoadColor('bg-green-500')
    setRoadTest("YES")
    }} /></td>
    <td><input type="radio"name="road" onChange={()=>{
    setRoadColor('bg-red-500')

       
    }
        
        } /></td>
</tr>



 <tr>
    <td className={stikercolor}>Has Stiker?</td>
    <td><input type="radio" name="stiker"  onChange={()=>{
        setstikerClor('bg-green-500')
        setStiker("YES")}} /></td>
    <td><input type="radio" name="stiker" onChange={()=>{
              setstikerClor('bg-red-500')

    }} /></td>
 </tr>
 
 <br />
 
 
 </table>
</div>   

<br />
            {/* HVAC  */}

<button className="btDiagHvac"  onClick={()=>{
                if(acShow){
                    setAcShiw(false)
                }else{setAcShiw(true)}
            }}>Ac / Heat</button>
<div hidden={acShow}>

    <table>

    <tr>
    <td>Description</td>
    <td>Good</td>
    <td>Warning</td>
    <td>Bad</td>
</tr>


<tr>
    <td className={acColor}> Hvac Works?</td>
    <td><input type="radio" name="ac"  onChange={()=>{
        setAcColor('bg-green-500')
        setHvac("good")}} /></td>
  <td><input type="radio" name="ac"  onChange={()=>{
        setAcColor('bg-yellow-500')
        setHvac("ml")}} /></td>
    <td><input type="radio" name="ac"  onChange={()=>{
        setAcColor('bg-red-500')
        setHvac("bad")}} /></td>
</tr>

    
{(hvac == "bad" || hvac == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setHvacissue(e.target.value)} />




<input type="file"  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"hvac.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setHvacUrls(url)
  }
  )

} }  /><img src={hvacUrls} alt="hvacFile" id="hvac" onClick={()=>{

    window.open(hvacUrls)
    
    }} className="w-16 h-16" />
</div> : null}

</table>

</div>
<br />
            {/* INTERIOR Dash  */}

<button className="btnDash"  onClick={()=>{
                if(interiorShow){
                    setInteriorShow(false)
                }else{setInteriorShow(true)}
            }}>Interior / Dash</button>
<div hidden={interiorShow}>

<table>




<tr>
    <td>Description</td>
    <td>Good</td>
    <td>Warning</td>
    <td>Bad</td>
</tr>

<tr>
    <td className={interiorcolor}>All Light Works?</td>
    <td> <input type="radio" name="interior"  onChange={()=>{
        setInteriorcolor("bg-green-500")
        setinteriorStatus("good")}} /></td>
    <td> <input type="radio" name="interior"  onChange={()=>{
            setInteriorcolor("bg-yellow-500")
            setinteriorStatus("ml")}} /></td>
    <td> <input type="radio" name="interior"  onChange={()=>{
            setInteriorcolor("bg-red-500")
            setinteriorStatus("bad")}} /></td>
</tr>

{(interiorStatus == "bad" || interiorStatus == "ml" )? <div><input type="text" placeholder="Issue?" onChange={(e)=>setInterior(e.target.value)} /></div> : null}
<br />
<hr />
<br />





<tr >
    <td className={dashColor}>All DashBoard Works? </td>
    <td><input type="radio" name="dash"  onChange={()=>{
            setDashColor("bg-green-500")
        setinteriorDash("good")}} /> </td>
    <td><input type="radio" name="dash"  onChange={()=>{
                    setDashColor("bg-yellow-500")

        setinteriorDash("ml")}} /> </td>
    <td><input type="radio" name="dash"  onChange={()=>{
                    setDashColor("bg-red-500")

        setinteriorDash("bad")}} /> </td>
</tr>


<br />
{(interiorDash == "bad"||interiorDash == "ml" )? <div><input type='file' className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"dash.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setdashUrls(url)
  }
  )

} }  /><img src={dashUrls}  alt="dash file" id="dash" onClick={()=>{

window.open(dashUrls)

}}  className="w-16 h-16" />


<input type="text" placeholder="Issue?" onChange={(e)=>setDash(e.target.value)} /></div> : null}
<br />
<hr />
<br />



<tr>
    <td className={interiorOtherColor}>Interior light?</td>
    <td><input type="radio" name="otherInterior"  onChange={()=>{
        setInteriorOtherColor("bg-green-500")
        setInteriorOtherStatus("good")}} /></td>
    <td><input type="radio" name="otherInterior"  onChange={()=>{
                setInteriorOtherColor("bg-yellow-500")

        setInteriorOtherStatus("ml")}} /></td>
    <td><input type="radio" name="otherInterior"  onChange={()=>{
                setInteriorOtherColor("bg-red-500")

        setInteriorOtherStatus("bad")}} /></td>
</tr>

<br />
{(interiorOtherStatus == "bad" ||interiorOtherStatus=="ml" )? <div>
    <input type="file"    className="camera"  onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"otherInterior.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setInteriorOtherUrls(url)
  }
  )

} }  /><img  alt="Other" id="inteot"  src={interiorUrls} onClick={()=>{

    window.open(interiorUrls)
    
    }} className="w-16 h-16" />





<input type="text" placeholder="Issue?" onChange={(e)=>setInteriorOther(e.target.value)} /></div> : null}




</table>

</div> 
<br />
            {/* Exteriors Lights  */}

            <button className="btnExt"  onClick={()=>{
                if(ExteriorShow){
                    setExteriorShow(false)
                }else{setExteriorShow(true)}
            }}>Exterior / Lights</button>
<div hidden={ExteriorShow}>

<table>

<tr>
    <td>Description</td>
    <td>Good</td>
    <td>Warning</td>
    <td>Bad</td>
</tr>



<tr>
<td className={exteriorColor}> All Exteriors Light Works?</td>
<td><input type="radio"name="exteriorAl" onChange={()=>{
            setExteriorColor("bg-green-500")
    setExteriorStatus("Good")}} /></td>
<td><input type="radio"name="exteriorAl" onChange={()=>{
                setExteriorColor("bg-yellow-500")
    setExteriorStatus("ml")}} /></td>
<td><input type="radio"name="exteriorAl" onChange={()=>{
                setExteriorColor("bg-red-500")
    setExteriorStatus("Bad")}} /></td>

</tr>
{(exteriorStatus == "Bad" || exteriorStatus=="ml" )? <div><input type="text" placeholder="Issue?" onChange={(e)=>setExteriorAllIssue(e.target.value)} /></div> : null}
     
<br />
<hr />
<br />

<tr>
<td className={highBeamColor}>Hight Beams </td>
<td><input type="radio" name="hightB"  onChange={()=>{
                sethighbeamColor("bg-green-500")
                setHighBeanStatus("good")}} /></td>
<td><input type="radio" name="hightB"  onChange={()=>{
                    sethighbeamColor("bg-yellow-500")
                    setHighBeanStatus("ml")}} /></td>
<td><input type="radio" name="hightB"  onChange={()=>{
                    sethighbeamColor("bg-red-500")
                    setHighBeanStatus("bad")}} /></td>

</tr>

{(higBeanStatus == "bad" || higBeanStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"highean.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setHightBeamUrls(url)
  }
  )

} }  />
<img src={highBeamUrls} className="w-16 h-16"  alt="HB file" id="hb" onClick={()=>{

window.open(highBeamUrls)

}} />
<input type="text" placeholder="Issue?" onChange={(e)=>sethighbeam(e.target.value)} /></div> : null}
<br />
<hr />
<br />

<tr>
<td className={lowBeamColor}>Low Beams</td>
<td> <input type="radio" name="lowB"  onChange={()=>{
                    setLowbeamColor("bg-green-500")
                    setLowBeanStatus("good")}} /> </td>
<td> <input type="radio" name="lowB"  onChange={()=>{
                        setLowbeamColor("bg-yellow-500")
                        setLowBeanStatus("ml")}} /> </td>
<td> <input type="radio" name="lowB"  onChange={()=>{
                        setLowbeamColor("bg-red-500")
                        setLowBeanStatus("bad")}} /> </td>

</tr>

<br />
{(lowBeanStatus == "bad" || lowBeanStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"lowBean.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setLowBeamUrls(url)
  }
  )

} }  />
<img src={lowBeamUrls} className="w-16 h-16" alt="LB file" id="lw" onClick={()=>{

window.open(lowBeamUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setLowbeam(e.target.value)} /></div> : null}
<br />
<hr />
<br />

<tr>
    <td className={foglightColor}>Fog Lights</td>
    <td> <input type="radio" name="fogl"  onChange={()=>{
                            setfogLIghtCOlor("bg-green-500")
                            setfogLightStatus("good")}} /></td>
    <td> <input type="radio" name="fogl"  onChange={()=>{
                                    setfogLIghtCOlor("bg-yellow-500")
                                    setfogLightStatus("ml")}} /></td>
    <td> <input type="radio" name="fogl"  onChange={()=>{
                                    setfogLIghtCOlor("bg-red-500")
                                    setfogLightStatus("bad")}} /></td>
</tr>

<br />
{(fogLightStatius == "bad" || fogLightStatius== "ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fogl.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setFoglUrs(url)
  }
  )

} }   />

<img src={foglUrls} className="w-16 h-16"  alt="Fog file" id="fog" onClick={()=>{

window.open(foglUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setfogLIght(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


<tr>
    <td className={fturnCOlor}>Front Turn Light</td>
    <td><input type="radio" name="fturn"  onChange={()=>{
     setfTurnCOlor("bg-green-500")
     setFturnStatus("good")}} /></td>
<td> <input type="radio"name="fturn" onChange={()=>{
     setfTurnCOlor("bg-yellow-500")
     setFturnStatus("ml")}} /></td>
<td><input type="radio"name="fturn" onChange={()=>{
     setfTurnCOlor("bg-red-500")
    setFturnStatus("bad")}} /></td>
</tr>
<br />
{(fturnStatus == "bad"||fturnStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fturnligh.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setfTurnUrls(url)
  }
  )

} }  />

<img src={fturnUrl} className="w-16 h-16" alt="f-turn file" id="ft" onClick={()=>{

window.open(fturnUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setfTurn(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


<tr>
<td className={rturnCOlor}>Rear Turn Light  </td>
<td><input type="radio" name="rturn"  onChange={()=>{
     setrTurnColor("bg-green-500")
     setrturnStatus("good")}} /></td>
<td><input type="radio" name="rturn"  onChange={()=>{
     setrTurnColor("bg-yellow-500")
     setrturnStatus("ml")}} /></td>
<td><input type="radio" name="rturn"  onChange={()=>{
     setrTurnColor("bg-red-500")
     setrturnStatus("bad")}} /></td>

</tr>
<br />
{(rturnStatus == "bad"|| rturnStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rturnl.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrTurnUrls(url)
  }
  )

} }   />

<img src={rturnUrl} className="w-16 h-16" alt="R-Turn file" id="rt" onClick={()=>{

window.open(rturnUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setrTurn(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={fSideMarkColor}>Front Side Markers</td>
<td><input type="radio" name="fside"  onChange={()=>{
     setFSidMarkCOlor("bg-green-500")
    setFsideMarkStatus("good")}} /> </td>
<td><input type="radio" name="fside"  onChange={()=>{
         setFSidMarkCOlor("bg-yellow-500")
         setFsideMarkStatus("ml")}} /> </td>
<td><input type="radio" name="fside"  onChange={()=>{
         setFSidMarkCOlor("bg-red-500")
         setFsideMarkStatus("bad")}} /> </td>

</tr>
<br />
{(fSideMarkStatus == "bad" ||fSideMarkStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fsidem.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setFsidemarkUrl(url)
  }
  )

} }  />

<img src={fSideMakrUrl} className="w-16 h-16" alt="F-side file" id="fs" onClick={()=>{

window.open(fSideMakrUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setFSidMark(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


<tr>
    <td className={rSideMarkCOlor}>Rear Side Markers</td>
<td><input type="radio" name="rside"  onChange={()=>{
         setrSidMarkColor("bg-green-500")
         setrsideMarkStatus("good")}} /> </td>
<td><input type="radio" name="rside"  onChange={()=>{
         setrSidMarkColor("bg-yellow-500")
         setrsideMarkStatus("ml")}} /> </td>
<td><input type="radio" name="rside"  onChange={()=>{
         setrSidMarkColor("bg-red-500")
         setrsideMarkStatus("bad")}} /> </td>

</tr>
<br />
{(rSideMarkStatus == "bad" ||rSideMarkStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rsidem.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrsidemarkUrl(url)
  }
  )

} }  />

<img src={rSideMakrUrl} className="w-16 h-16" alt="R-side file" id="rside" onClick={()=>{

window.open(rSideMakrUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setrSidMark(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


<tr>
    <td className={brakeLIghtcolor}>Brake Lights</td>
<td><input type="radio" name="brakel"  onChange={()=>{
     setBrakeLightCOlor("bg-green-500")
    setBrakeLightStatus("good")}} /> </td>
<td><input type="radio" name="brakel"  onChange={()=>{
    setBrakeLightCOlor("bg-yellow-500")
    setBrakeLightStatus("ml")}} /> </td>
<td><input type="radio" name="brakel"  onChange={()=>{
    setBrakeLightCOlor("bg-red-500")
    setBrakeLightStatus("bad")}} /> </td>

</tr>
<br />
{(brakeLightStatus == "bad" ||brakeLightStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"brakelight.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setbrakeLIghtUrls(url)
  }
  )

} }  />

<img src={brakeLightUrls} className="w-16 h-16" alt="Brake L file" id="brakl" onClick={()=>{

window.open(brakeLightUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setBrakeLight(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={reverseLightCOlor}>Reverse Lights</td>
<td><input type="radio" name="reversel"  onChange={()=>{
    setreverseLightCOlor("bg-green-500")
    setReverseStatus("good")}} /> </td>
<td><input type="radio" name="reversel"  onChange={()=>{
     setreverseLightCOlor("bg-yellow-500")
     setReverseStatus("ml")}} /> </td>
<td><input type="radio" name="reversel"  onChange={()=>{
     setreverseLightCOlor("bg-red-500")
     setReverseStatus("bad")}} /> </td>

</tr>
<br />
{(reverseLightStatus == "bad" ||reverseLightStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"reverserlight.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setReverseUrls(url)
  }
  )

} }  />

<img src={reverseUrls} className="w-16 h-16" alt="Reverse L file" id="rev" onClick={()=>{

window.open(reverseUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setreverseLight(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={tagLightsColor}>Tag Lights</td>
<td><input type="radio" name="tagl"  onChange={()=>{
     setTagIghtsCOlor("bg-green-500")
     setTagLIghtStatus("good")}} /> </td>
<td><input type="radio" name="tagl"  onChange={()=>{
    setTagIghtsCOlor("bg-yellow-500")
    setTagLIghtStatus("ml")}} /> </td>
<td><input type="radio" name="tagl"  onChange={()=>{
    setTagIghtsCOlor("bg-red-500")
    setTagLIghtStatus("bad")}} /> </td>

</tr>
<br />
{(tagLightsStatus == "bad" ||tagLightsStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"taglight.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setTagLUrls(url)
  }
  )

} }   />

<img src={tagLUrs} className="w-16 h-16" alt="Tag L file" id="tag" onClick={()=>{

window.open(tagLUrs)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setTagIghts(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


</table>
</div> 
<br />

            {/* Battery and Wipers  */}

            <button className="btnBattery"  onClick={()=>{
                if(batteryShow){
                    setBatteryShow(false)
                }else{setBatteryShow(true)}
            }}>Battery / Wiper Blades</button>
<div hidden={batteryShow}>

<table>

<tr>
    <td>Description</td>
    <td>Good</td>
    <td>Warning</td>
    <td>Bad</td>
</tr>



<tr>
    <td className={batteryCOlor}>Battery Test</td>
<td><input type="radio" name="battery"  onChange={()=>{
    setBatteryCOlor("bg-green-500")
    setBatteryStatus("good")}} /> </td>
<td><input type="radio" name="battery"  onChange={()=>{
    setBatteryCOlor("bg-yellow-500")
    setBatteryStatus("ml")}} /> </td>
<td><input type="radio" name="battery"  onChange={()=>{
    setBatteryCOlor("bg-red-500")
    setBrakeLightStatus("bad")}} /> </td>

</tr>
<br />
{(batteryStaus == "bad" ||batteryStaus=="ml" ||batteryStaus=="good"  )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"batteryst.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setBatteryUrls(url)
  }
  )

} } />

<img src={batteryUrl} className="w-16 h-16" alt="Battery file" id="bat" onClick={()=>{

window.open(batteryUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setBattery(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={fwiperCOlor}>Front Wiper Blades</td>
<td><input type="radio" name="fWipers"  onChange={()=>{
    setFWipersColor("bg-green-500")
    setfWiperStatus("good")}} /> </td>
<td><input type="radio" name="fWipers"  onChange={()=>{
    setFWipersColor("bg-yellow-500")
    setfWiperStatus("ml")}} /> </td>
<td><input type="radio" name="fWipers"  onChange={()=>{
    setFWipersColor("bg-red-500")
    setfWiperStatus("bad")}} /> </td>

</tr>
<br />
{(fWIperStatus == "bad" ||fWIperStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fwipers.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setFwiperUrls(url)
  }
  )

} }  />

<img src={fwiperUrls} className="w-16 h-16" alt="Wiper F file" id="wiperf" onClick={()=>{

window.open(fwiperUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setFWipers(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={rwiperCOlor}>Rear Wiper Blades</td>
<td><input type="radio" name="rwipers"  onChange={()=>{
    setrWipersCOlor("bg-green-500")
    setrWiperStatus("good")}} /> </td>
<td><input type="radio" name="rwipers"  onChange={()=>{
    setrWipersCOlor("bg-yellow-500")
    setrWiperStatus("ml")}} /> </td>
<td><input type="radio" name="rwipers"  onChange={()=>{
    setrWipersCOlor("bg-red-500")
    setrWiperStatus("bad")}} /> </td>

</tr>
<br />
{(rWIperStatus == "bad" ||rWIperStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rwipers.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setRwiperUrls(url)
  }
  )

} }  />

<img src={rwiperUrls} className="w-16 h-16" alt="Wiper R file" id="wiperR" onClick={()=>{

window.open(rwiperUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setrWipers(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


</table>


</div> 
<br />

            {/* Underhood things */}


<button className="btnUnderhood"  onClick={()=>{
                if(underHoodShow){
                    setUnderHoodShow(false)
                }else{setUnderHoodShow(true)}
            }}>Underhood</button>
<div hidden={underHoodShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={underHoodColor}> Component </td>
<td><input type="radio" name="oc"  onChange={()=>{
    setUnderHoodColor('bg-green-500')
    setUnderHIssueStatus("good")}} /></td>
<td><input type="radio" name="oc"  onChange={()=>{
    setUnderHoodColor('bg-yellow-500')
    setUnderHIssueStatus("ml")}} /></td>
<td><input type="radio" name="oc"  onChange={()=>{
    setUnderHoodColor('bg-red-500')
    setUnderHIssueStatus("bad")}} /></td>
</tr>
{(underHIssueStatus == "bad" || underHIssueStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setunderHoodIssue(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"underhoodAny.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setUnderHUrls(url)
  }
  )

} }  /><img src={underHoodUrl} className="w-16 h-16" alt="Other file" id="other" onClick={()=>{

    window.open(underHoodUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />


<tr>
<td className={timmingBeltColor}>Timing Belt </td>
<td><input type="radio" name="timingb"  onChange={()=>{
    setTimingBColor('bg-green-500')
    setTimmingbeltStatus("good")}} /></td>
<td><input type="radio" name="timingb"  onChange={()=>{
    setTimingBColor('bg-yellow-500')
    setTimmingbeltStatus("ml")}} /></td>
<td><input type="radio" name="timingb"  onChange={()=>{
    setTimingBColor('bg-red-500')
    setTimmingbeltStatus("bad")}} /></td>
</tr>
{(timmigBeltStatus == "bad" || timmigBeltStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setTimmingBet(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={driveBeltColor}>Drive Belt</td>
<td><input type="radio" name="drivrb"  onChange={()=>{
    setDriveBeltColor('bg-green-500')
    setdriveBeltStatus("good")}} /></td>
<td><input type="radio" name="drivrb"  onChange={()=>{
    setDriveBeltColor('bg-yellow-500')
    setdriveBeltStatus("ml")}} /></td>
<td><input type="radio" name="drivrb"  onChange={()=>{
    setDriveBeltColor('bg-red-500')
    setdriveBeltStatus("bad")}} /></td>
</tr>
{(driveBeltStatus == "bad" || driveBeltStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setDriveBet(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"driveBelt.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setdriveBeltUrls(url)
  }
  )

} }  /><img src={driveBeltUrl} className="w-16 h-16" alt="Drive Belt file" id="db" onClick={()=>{

    window.open(driveBeltUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}



<tr>
<td className={uengineMojntColor}>Upper Engine Mount</td>
<td><input type="radio" name="uenginem"  onChange={()=>{
    setuengineMojntColor('bg-green-500')
    setuEngineMountStatus("good")}} /></td>
<td><input type="radio" name="uenginem"  onChange={()=>{
    setuengineMojntColor('bg-yellow-500')
    setuEngineMountStatus("ml")}} /></td>
<td><input type="radio" name="uenginem"  onChange={()=>{
    setuengineMojntColor('bg-red-500')
    setuEngineMountStatus("bad")}} /></td>
</tr>
{(uEngineMountStatus == "bad" || uEngineMountStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setuengineMojnt(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"upperEngineMount.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setuengineMojnUrl(url)
  }
  )

} }  /><img src={uengineMojnUrl} className="w-16 h-16" alt="U Engine Mount file" id="emu" onClick={()=>{

    window.open(uengineMojnUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}



<tr>
<td className={airFilterColor}>Air Filter</td>
<td><input type="radio" name="airf"  onChange={()=>{
    setAirFIlterColor('bg-green-500')
    setAirFIterStatus("good")}} /></td>
<td><input type="radio" name="airf"  onChange={()=>{
    setAirFIlterColor('bg-yellow-500')
    setAirFIterStatus("ml")}} /></td>
<td><input type="radio" name="airf"  onChange={()=>{
    setAirFIlterColor('bg-red-500')
    setAirFIterStatus("bad")}} /></td>
</tr>
{(airFilterStatus == "bad" || airFilterStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setAirFilter(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"airFilter.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setAirFilterUrl(url)
  }
  )

} }  /><img src={airFIlterUrl} className="w-16 h-16" alt="Air filter file" id="airf" onClick={()=>{

    window.open(airFIlterUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />


{/* *********************************************************************************** */}

<tr>
<td className={cabinFilterCoLor}>Cabin Filter</td>
<td><input type="radio" name="cabinf"  onChange={()=>{
    setcabinFilterColor('bg-green-500')
    setCAbinFilterStatus("good")}} /></td>
<td><input type="radio" name="cabinf"  onChange={()=>{
    setcabinFilterColor('bg-yellow-500')
    setCAbinFilterStatus("ml")}} /></td>
<td><input type="radio" name="cabinf"  onChange={()=>{
    setcabinFilterColor('bg-red-500')
    setCAbinFilterStatus("bad")}} /></td>
</tr>
{(cabinFilterStatus == "bad" || cabinFilterStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setCabinFilter(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"cabin.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setcabinFiterUrl(url)
  }
  )

} }  /><img src={cabinFilterUrl} className="w-16 h-16" alt="Cabin filter file" id="cb" onClick={()=>{

    window.open(cabinFilterUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />







</table>

</div>
<br /> 



            {/* Underhood Fluids */}


            <button className="btnFluids"  onClick={()=>{
                if(fluidShow){
                    setFluidShow(false)
                }else{setFluidShow(true)}
            }}>Underhood Fluids</button>
<div hidden={fluidShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={engineOIlColor}>Engine Oil </td>
<td><input type="radio" name="engineO"  onChange={()=>{
    setengineOilColor('bg-green-500')
    setEngineOiStatus("good")}} /></td>
<td><input type="radio" name="engineO"  onChange={()=>{
    setengineOilColor('bg-yellow-500')
    setEngineOiStatus("ml")}} /></td>
<td><input type="radio" name="engineO"  onChange={()=>{
    setengineOilColor('bg-red-500')
    setEngineOiStatus("bad")}} /></td>
</tr>

{(engineOilStatus == "bad" || engineOilStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setEngineOIl(e.target.value)} />




<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"engine.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setEngineOilUrls(url)
  }
  )

} }  /><img src={engineOilUrls} className="w-16 h-16" alt="Engine Oil file" id="eng" onClick={()=>{

    window.open(engineOilUrls)
    
    }} />
</div> : null}
<br />
<hr />
<br />

{/**************************************************************************************** */}

<tr>
<td className={transmOIlColor}>Transmission Oil </td>
<td><input type="radio" name="transmO"  onChange={()=>{
    setTransmOilColor('bg-green-500')
    setTransmissionOilStatus("good")}} /></td>
<td><input type="radio" name="transmO"  onChange={()=>{
    setTransmOilColor('bg-yellow-500')
    setTransmissionOilStatus("ml")}} /></td>
<td><input type="radio" name="transmO"  onChange={()=>{
    setTransmOilColor('bg-red-500')
    setTransmissionOilStatus("bad")}} /></td>
</tr>
{(transmissionOilStatus == "bad" || transmissionOilStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setTransmissinOIl(e.target.value)} />


<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"transmi.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setTransmissionOilUrls(url)
  }
  )

} }  /><img src={transmissionOilUrls} className="w-16 h-16" alt="Transmission oil file" id="to" onClick={()=>{

    window.open(transmissionOilUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={coolantColor}>Coolant</td>
<td><input type="radio" name="coolant"  onChange={()=>{
    setCoolantColor('bg-green-500')
    setcoolantStatus("good")}} /></td>
<td><input type="radio" name="coolant"  onChange={()=>{
    setCoolantColor('bg-yellow-500')
    setcoolantStatus("ml")}} /></td>
<td><input type="radio" name="coolant"  onChange={()=>{
    setCoolantColor('bg-red-500')
    setcoolantStatus("bad")}} /></td>
</tr>
{(coolantStatus == "bad" || coolantStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setcoolant(e.target.value)} />




<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"coolant.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setCooantUrls(url)
  }
  )

} } /><img src={coolantUrls} className="w-16 h-16" alt="Coolant file" id="coola" onClick={()=>{

    window.open(coolantUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={powerSColor}>Power Steering</td>
<td><input type="radio" name="powers"  onChange={()=>{
    setPowerSColor('bg-green-500')
    setPowerSStatus("good")}} /></td>
<td><input type="radio" name="powers"  onChange={()=>{
    setPowerSColor('bg-yellow-500')
    setPowerSStatus("ml")}} /></td>
<td><input type="radio" name="powers"  onChange={()=>{
    setPowerSColor('bg-red-500')
    setPowerSStatus("bad")}} /></td>
</tr>
{(powerSStatus == "bad" || powerSStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setPowerSteering(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"powerS.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setPowerSUrls(url)
  }
  )

} }  /><img src={powerSUrls} className="w-16 h-16" alt="Power S file" id="pws" onClick={()=>{

    window.open(powerSUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />


{/* *********************************************************************************** */}

<tr>
<td className={brakeFluidColor}>Brake Fluid</td>
<td><input type="radio" name="brakeFluid"  onChange={()=>{
    setbrakeFluidColor('bg-green-500')
    setbrakeFluidStatus("good")}} /></td>
<td><input type="radio" name="brakeFluid"  onChange={()=>{
    setbrakeFluidColor('bg-yellow-500')
    setbrakeFluidStatus("ml")}} /></td>
<td><input type="radio" name="brakeFluid"  onChange={()=>{
    setbrakeFluidColor('bg-red-500')
    setbrakeFluidStatus("bad")}} /></td>
</tr>
{(brakeFluidStatus == "bad" || brakeFluidStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setbrakeFluid(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"brakefluid.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setbrakeFluidUrls(url)
  }
  )

} }  /><img src={brakeFluidUrls} className="w-16 h-16" alt="Brake Fluid file" id="bf" onClick={()=>{

    window.open(brakeFluidUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />







</table>

</div> 
<br />
         {/* TIRES */}


         <button className="btnTires"  onClick={()=>{
                if(tiresShow){
                    setTiresShow(false)
                }else{setTiresShow(true)}
            }}>Tires</button>
<div hidden={tiresShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr >
<td className={tiresColor}> Tires condition</td>
<td><input type="radio" name="tires"  onChange={()=>{
    settiresColor('bg-green-500')
    setTiresStatus("good")}} /></td>
<td><input type="radio" name="tires"  onChange={()=>{
    settiresColor('bg-yellow-500')
    setTiresStatus("ml")}} /></td>
<td><input type="radio" name="tires"  onChange={()=>{
    settiresColor('bg-red-500')
    setTiresStatus("bad")}} /></td>
</tr>

<input type="number" placeholder="Front Right " onChange={(e)=>settirefr(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Left Right " onChange={(e)=>settirefl(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Rear Right " onChange={(e)=>settirerr(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Rear Left " onChange={(e)=>settirerl(parseInt(e.target.value))} /> <br /> <br />


{(tiresStatus == "bad" || tiresStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setTiresIssues(e.target.value)} />




<input type="file"  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"tires.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
.then((url) => {
setTiresUrl(url)
}
)

} }  /><img src={tiresUrl} alt="Tires File" id="tires" onClick={()=>{

window.open(tiresUrl)

}} className="w-16 h-16" />
</div> : null}





</table>

</div>
<br />


         {/* Brkaes */}


         <button className="btnBrakes"  onClick={()=>{
                if(brakepadsShow){
                    setBrakepadsShow(false)
                }else{setBrakepadsShow(true)}
            }}>Brakes</button>
<div hidden={brakepadsShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr >
<td className={brakePadsColer}> Brakes condition</td>
<td><input type="radio" name="bpads"  onChange={()=>{
    setBrakePadsColor('bg-green-500')
    setpadsStatus("good")}} /></td>
<td><input type="radio" name="bpads"  onChange={()=>{
    setBrakePadsColor('bg-yellow-500')
    setpadsStatus("ml")}} /></td>
<td><input type="radio" name="bpads"  onChange={()=>{
    setBrakePadsColor('bg-red-500')
    setpadsStatus("bad")}} /></td>
</tr>

<input type="number" placeholder="Front Right " onChange={(e)=>setpadfr(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Left Right " onChange={(e)=>setpadfl(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Rear Right " onChange={(e)=>setpadrr(parseInt(e.target.value))} /> <br /> <br />
<input type="number" placeholder="Rear Left " onChange={(e)=>setpadrl(parseInt(e.target.value))} /> <br /> <br />


{(padsStatus == "bad" || padsStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setBrakePdasIssues(e.target.value)} />




<input type="file"  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"pads.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
.then((url) => {
setBrakePadsUrl(url)
}
)

} }  /><img src={BrakePadsUrl} alt="Pads File" id="pads" onClick={()=>{

window.open(BrakePadsUrl)

}} className="w-16 h-16" />
</div> : null}



<tr >
<td className={rotorsColor}> Disks</td>
<td><input type="radio" name="rotors"  onChange={()=>{
    setrotorsColor('bg-green-500')
    setrotorsStatus("good")}} /></td>
<td><input type="radio" name="rotors"  onChange={()=>{
    setrotorsColor('bg-yellow-500')
    setrotorsStatus("ml")}} /></td>
<td><input type="radio" name="rotors"  onChange={()=>{
    setrotorsColor('bg-red-500')
    setrotorsStatus("bad")}} /></td>
</tr>


{(rotorsStatus == "bad" || rotorsStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrotors(e.target.value)} />




<input type="file"  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rotorss.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
.then((url) => {
setrotorsUrls(url)
}
)

} }  /><img src={rotorsUrls} alt="Disk File" id="rotos" onClick={()=>{

window.open(rotorsUrls)

}} className="w-16 h-16" />
</div> : null}



<tr >
<td className={caliperColors}> Calipers</td>
<td><input type="radio" name="cali"  onChange={()=>{
    setcaliperColors('bg-green-500')
    setcalipersStatus("good")}} /></td>
<td><input type="radio" name="cali"  onChange={()=>{
    setcaliperColors('bg-yellow-500')
    setcalipersStatus("ml")}} /></td>
<td><input type="radio" name="cali"  onChange={()=>{
    setcaliperColors('bg-red-500')
    setcalipersStatus("bad")}} /></td>
</tr>


{(calipersStatus == "bad" || calipersStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setcalipers(e.target.value)} />




<input type="file"  className="camera" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"calipers.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
.then((url) => {
setcalipersUrls(url)
}
)

} }  /><img src={calipersUrls} alt="Caliper File" id="cvali" onClick={()=>{

window.open(calipersUrls)

}} className="w-16 h-16" />
</div> : null}



</table>

</div>
<br />

            {/* Steering */}


            <button className="btnSteering"  onClick={()=>{
                if(steeringShow){
                    setSteeringShow(false)
                }else{setSteeringShow(true)}
            }}>Steering</button>
<div hidden={steeringShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={steeringColor}> Steering Box </td>
<td><input type="radio" name="st"  onChange={()=>{
    setSteeringColor('bg-green-500')
    setsteeringStatus("good")}} /></td>
<td><input type="radio" name="st"  onChange={()=>{
    setSteeringColor('bg-yellow-500')
    setsteeringStatus("ml")}} /></td>
<td><input type="radio" name="st"  onChange={()=>{
    setSteeringColor('bg-red-500')
    setsteeringStatus("bad")}} /></td>
</tr>
{(steeringStatus == "bad" || steeringStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setSteeringIssue(e.target.value)} /> </div>: null}
<br />
<hr />
<br />


<tr>
<td className={tierotColor}>Tie Rod </td>
<td><input type="radio" name="tieror"  onChange={()=>{
    settierotColor('bg-green-500')
    settierotStatus("good")}} /></td>
<td><input type="radio" name="tieror"  onChange={()=>{
    settierotColor('bg-yellow-500')
    settierotStatus("ml")}} /></td>
<td><input type="radio" name="tieror"  onChange={()=>{
    settierotColor('bg-red-500')
    settierotStatus("bad")}} /></td>
</tr>
{(tierotStatus == "bad" || tierotStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>settierot(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"tierot.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   settierotUrls(url)
  }
  )

} }  /><img src={tieRotUrls} className="w-16 h-16" alt="Tie Rod file" id="tie" onClick={()=>{

    window.open(tieRotUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={tieBootCOor}>Steering Boots</td>
<td><input type="radio" name="sboot"  onChange={()=>{
    setBootColor('bg-green-500')
    settieBootStatus("good")}} /></td>
<td><input type="radio" name="sboot"  onChange={()=>{
    setBootColor('bg-yellow-500')
    settieBootStatus("ml")}} /></td>
<td><input type="radio" name="sboot"  onChange={()=>{
    setBootColor('bg-red-500')
    settieBootStatus("bad")}} /></td>
</tr>
{(tiebootStatus == "bad" || tiebootStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setTieBoot(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"tieboots.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   settiebootUrl(url)
  }
  )

} }  /><img src={tieBootUrl} className="w-16 h-16" alt=" Boots file" id="botos" onClick={()=>{

    window.open(tieBootUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={alignmentColor}> Alignment </td>
<td><input type="radio" name="alignm"  onChange={()=>{
    setAlignmentColor('bg-green-500')
    setalignmentStatus("good")}} /></td>
<td><input type="radio" name="alignm"  onChange={()=>{
    setAlignmentColor('bg-yellow-500')
    setalignmentStatus("ml")}} /></td>
<td><input type="radio" name="alignm"  onChange={()=>{
    setAlignmentColor('bg-red-500')
    setalignmentStatus("bad")}} /></td>
</tr>
{(alignmentStatus == "bad" || alignmentStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setalignment(e.target.value)} /> </div>: null}
<br />
<hr />
<br />







</table>

</div>
<br /> 


         {/* Front Suspension */}


         <button className="btnFsuspesion"  onClick={()=>{
                if(frontSusShow){
                    setFrontSusShow(false)
                }else{setFrontSusShow(true)}
            }}>Front Suspension</button>
<div hidden={frontSusShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={frontSusColor}> Front Suspension </td>
<td><input type="radio" name="st"  onChange={()=>{
    setfrontSusColor('bg-green-500')
    setFronSusStatus("good")}} /></td>
<td><input type="radio" name="st"  onChange={()=>{
    setfrontSusColor('bg-yellow-500')
    setFronSusStatus("ml")}} /></td>
<td><input type="radio" name="st"  onChange={()=>{
    setfrontSusColor('bg-red-500')
    setFronSusStatus("bad")}} /></td>
</tr>
{(frontSusStatus == "bad" || frontSusStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setfronSus(e.target.value)} /> </div>: null}
<br />
<hr />
<br />


<tr>
<td className={shocksFColor}>Shocks / struts </td>
<td><input type="radio" name="shocksf"  onChange={()=>{
    setshocksFColor('bg-green-500')
    setshocksFStatus("good")}} /></td>
<td><input type="radio" name="shocksf"  onChange={()=>{
    setshocksFColor('bg-yellow-500')
    setshocksFStatus("ml")}} /></td>
<td><input type="radio" name="shocksf"  onChange={()=>{
    setshocksFColor('bg-red-500')
    setshocksFStatus("bad")}} /></td>
</tr>
{(shocksFStatus == "bad" || shocksFStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setshockF(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"shokfsF.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setshocksFUrl(url)
  }
  )

} }  /><img src={shocksFUrl} className="w-16 h-16" alt="Shoks F file" id="hojs" onClick={()=>{

    window.open(shocksFUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}


<tr>
<td className={ControlArmsColor}>Control Arms </td>
<td><input type="radio" name="cArm"  onChange={()=>{
    setControlArmColor('bg-green-500')
    setControlArmStatus("good")}} /></td>
<td><input type="radio" name="cArm"  onChange={()=>{
    setControlArmColor('bg-yellow-500')
    setControlArmStatus("ml")}} /></td>
<td><input type="radio" name="cArm"  onChange={()=>{
    setControlArmColor('bg-red-500')
    setControlArmStatus("bad")}} /></td>
</tr>
{(controlArmsStatus == "bad" || controlArmsStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setcontrolArms(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"controlArmsf.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setControlArmsurls(url)
  }
  )

} }  /><img src={controlArmUrls} className="w-16 h-16" alt="Control Arm F file" id="caf" onClick={()=>{

    window.open(controlArmUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={wheelbearingCOlor}>Wheel Bearing </td>
<td><input type="radio" name="wheelBear"  onChange={()=>{
    setWheelbearingColor('bg-green-500')
    setWheelBearingStatus("good")}} /></td>
<td><input type="radio" name="wheelBear"  onChange={()=>{
    setWheelbearingColor('bg-yellow-500')
    setWheelBearingStatus("ml")}} /></td>
<td><input type="radio" name="wheelBear"  onChange={()=>{
    setWheelbearingColor('bg-red-500')
    setWheelBearingStatus("bad")}} /></td>
</tr>
{(wheelBearingStatus == "bad" || wheelBearingStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setWheelbear(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"wheelbears.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setwheelBearUrls(url)
  }
  )

} }  /><img src={wheelBearinUrls} className="w-16 h-16" alt="Wheel Bearing F file" id="whefrc" onClick={()=>{

    window.open(wheelBearinUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={ballJpinColor}>Ball Join </td>
<td><input type="radio" name="bjoinf"  onChange={()=>{
    setballJpinColor('bg-green-500')
    setballJoinStatus("good")}} /></td>
<td><input type="radio" name="bjoinf"  onChange={()=>{
    setballJpinColor('bg-yellow-500')
    setballJoinStatus("ml")}} /></td>
<td><input type="radio" name="bjoinf"  onChange={()=>{
    setballJpinColor('bg-red-500')
    setballJoinStatus("bad")}} /></td>
</tr>
{(ballJoinStatus == "bad" || ballJoinStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setballJjoint(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fbaljoun.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setballJointUrl(url)
  }
  )

} }  /><img src={ballJointUrl} className="w-16 h-16" alt="Ball Join F file" id="bla" onClick={()=>{

    window.open(ballJointUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={alxefColor}>Axle </td>
<td><input type="radio" name="faxle"  onChange={()=>{
    setalxefColor('bg-green-500')
    setalxefStatus("good")}} /></td>
<td><input type="radio" name="faxle"  onChange={()=>{
    setalxefColor('bg-yellow-500')
    setalxefStatus("ml")}} /></td>
<td><input type="radio" name="faxle"  onChange={()=>{
    setalxefColor('bg-red-500')
    setalxefStatus("bad")}} /></td>
</tr>
{(AxleFStatus == "bad" || AxleFStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setaxleF(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"faxle.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setaxlefUrls(url)
  }
  )

} }  /><img src={axlefUrls} className="w-16 h-16" alt="Axle F file" id="bla" onClick={()=>{

    window.open(axlefUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={lengineMojntColor}>Lower Engine Mounrt </td>
<td><input type="radio" name="leof"  onChange={()=>{
    setlengineMojntColor('bg-green-500')
    setlEngineMountStatus("good")}} /></td>
<td><input type="radio" name="leof"  onChange={()=>{
    setlengineMojntColor('bg-yellow-500')
    setlEngineMountStatus("ml")}} /></td>
<td><input type="radio" name="leof"  onChange={()=>{
    setlengineMojntColor('bg-red-500')
    setlEngineMountStatus("bad")}} /></td>
</tr>
{(lEngineMountStatus == "bad" || lEngineMountStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setlengineMojnt(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"lengginem"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setlengineMojnUrl(url)
  }
  )

} }  /><img src={lengineMojnUrl} className="w-16 h-16" alt="Engine Mount F file" id="lem" onClick={()=>{

    window.open(lengineMojnUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={swayBarColor}>Sway Bar Links </td>
<td><input type="radio" name="swe"  onChange={()=>{
    setSwayBArColor('bg-green-500')
    setSwayBarStatu("good")}} /></td>
<td><input type="radio" name="swe"  onChange={()=>{
    setSwayBArColor('bg-yellow-500')
    setSwayBarStatu("ml")}} /></td>
<td><input type="radio" name="swe"  onChange={()=>{
    setSwayBArColor('bg-red-500')
    setSwayBarStatu("bad")}} /></td>
</tr>
{(swaybarfstatus == "bad" || swaybarfstatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setSawyBar(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"swaybarf.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setswayBarUrl(url)
  }
  )

} }  /><img src={swayBarUrl} className="w-16 h-16" alt="Sway Bar Links F file" id="bla" onClick={()=>{

    window.open(swayBarUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={transMountColor}>Transmission Mount </td>
<td><input type="radio" name="trmoun"  onChange={()=>{
    settransMountColor('bg-green-500')
    settransMountstatus("good")}} /></td>
<td><input type="radio" name="trmoun"  onChange={()=>{
    settransMountColor('bg-yellow-500')
    settransMountstatus("ml")}} /></td>
<td><input type="radio" name="trmoun"  onChange={()=>{
    settransMountColor('bg-red-500')
    settransMountstatus("bad")}} /></td>
</tr>
{(transMountstatus == "bad" || transMountstatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>settransMount(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"transmount.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   settransmountUrls(url)
  }
  )

} }  /><img src={transmountUrls} className="w-16 h-16" alt="T mount file" id="bla" onClick={()=>{

    window.open(transmountUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}





</table>

</div>
<br /> 


         {/* Rear Suspension */}


         <button className="btnRsuspesion"  onClick={()=>{
                if(rearSusShow){
                    setrearSusShow(false)
                }else{setrearSusShow(true)}
            }}>Rear Suspension</button>
<div hidden={rearSusShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={rearSusColor}> Rear Suspension </td>
<td><input type="radio" name="rsus"  onChange={()=>{
    setrearSusColor('bg-green-500')
    setrearSusStatus("good")}} /></td>
<td><input type="radio" name="rsus"  onChange={()=>{
    setrearSusColor('bg-yellow-500')
    setrearSusStatus("ml")}} /></td>
<td><input type="radio" name="rsus"  onChange={()=>{
    setrearSusColor('bg-red-500')
    setrearSusStatus("bad")}} /></td>
</tr>
{(rearSusStatus == "bad" || rearSusStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrearSus(e.target.value)} /> </div>: null}
<br />
<hr />
<br />


<tr>
<td className={shocksRColor}>Shocks / struts </td>
<td><input type="radio" name="shocksr"  onChange={()=>{
    setshocksRColor('bg-green-500')
    setshocksRStatus("good")}} /></td>
<td><input type="radio" name="shocksr"  onChange={()=>{
    setshocksRColor('bg-yellow-500')
    setshocksRStatus("ml")}} /></td>
<td><input type="radio" name="shocksr"  onChange={()=>{
    setshocksRColor('bg-red-500')
    setshocksRStatus("bad")}} /></td>
</tr>
{(shocksRStatus == "bad" || shocksRStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setshockR(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"shokfsr.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setshocksRUrl(url)
  }
  )

} }  /><img src={shocksRUrl} className="w-16 h-16" alt="Shoks R file" id="hors" onClick={()=>{

    window.open(shocksRUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}


<tr>
<td className={rControlArmsColor}>Control Arms </td>
<td><input type="radio" name="rcArm"  onChange={()=>{
    setrControlArmColor('bg-green-500')
    setrControlArmStatus("good")}} /></td>
<td><input type="radio" name="rcArm"  onChange={()=>{
    setrControlArmColor('bg-yellow-500')
    setrControlArmStatus("ml")}} /></td>
<td><input type="radio" name="rcArm"  onChange={()=>{
    setrControlArmColor('bg-red-500')
    setrControlArmStatus("bad")}} /></td>
</tr>
{(rcontrolArmsStatus == "bad" || rcontrolArmsStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrcontrolArms(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rcontrolArmsf.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrControlArmsurls(url)
  }
  )

} }  /><img src={rcontrolArmUrls} className="w-16 h-16" alt="Control Arm r file" id="caf" onClick={()=>{

    window.open(rcontrolArmUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={rwheelbearingCOlor}>Wheel Bearing </td>
<td><input type="radio" name="rwheelBear"  onChange={()=>{
    setrWheelbearingColor('bg-green-500')
    setrWheelBearingStatus("good")}} /></td>
<td><input type="radio" name="rwheelBear"  onChange={()=>{
    setrWheelbearingColor('bg-yellow-500')
    setrWheelBearingStatus("ml")}} /></td>
<td><input type="radio" name="rwheelBear"  onChange={()=>{
    setrWheelbearingColor('bg-red-500')
    setrWheelBearingStatus("bad")}} /></td>
</tr>
{(rwheelBearingStatus == "bad" || rwheelBearingStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrWheelbear(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"rwheelbears.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrwheelBearUrls(url)
  }
  )

} }  /><img src={rwheelBearinUrls} className="w-16 h-16" alt="Wheel Bearing r file" id="wherfrc" onClick={()=>{

    window.open(rwheelBearinUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={rballJpinColor}>Ball Join </td>
<td><input type="radio" name="brjoinf"  onChange={()=>{
    setrballJpinColor('bg-green-500')
    setrballJoinStatus("good")}} /></td>
<td><input type="radio" name="brjoinf"  onChange={()=>{
    setrballJpinColor('bg-yellow-500')
    setrballJoinStatus("ml")}} /></td>
<td><input type="radio" name="brjoinf"  onChange={()=>{
    setrballJpinColor('bg-red-500')
    setrballJoinStatus("bad")}} /></td>
</tr>
{(rballJoinStatus == "bad" || rballJoinStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrballJjoint(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fbarljoun.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrballJointUrl(url)
  }
  )

} }  /><img src={rballJointUrl} className="w-16 h-16" alt="Ball Join r file" id="brla" onClick={()=>{

    window.open(rballJointUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={alxeRColor}>Axle </td>
<td><input type="radio" name="raxle"  onChange={()=>{
    setalxeRColor('bg-green-500')
    setalxeRStatus("good")}} /></td>
<td><input type="radio" name="raxle"  onChange={()=>{
    setalxeRColor('bg-yellow-500')
    setalxeRStatus("ml")}} /></td>
<td><input type="radio" name="raxle"  onChange={()=>{
    setalxeRColor('bg-red-500')
    setalxeRStatus("bad")}} /></td>
</tr>
{(axleRStatus == "bad" || axleRStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setaxleR(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"raxle.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setaxleRUrls(url)
  }
  )

} }  /><img src={axleRUrls} className="w-16 h-16" alt="Axle R file" id="blra" onClick={()=>{

    window.open(axleRUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}


<tr>
<td className={rswayBarColor}>Sway Bar Links </td>
<td><input type="radio" name="rraxle"  onChange={()=>{
    setrSwayBArColor('bg-green-500')
    setrSwayBarStatu("good")}} /></td>
<td><input type="radio" name="rraxle"  onChange={()=>{
    setrSwayBArColor('bg-yellow-500')
    setrSwayBarStatu("ml")}} /></td>
<td><input type="radio" name="rraxle"  onChange={()=>{
    setrSwayBArColor('bg-red-500')
    setrSwayBarStatu("bad")}} /></td>
</tr>
{(rswaybarfstatus == "bad" || rswaybarfstatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setrSawyBar(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"swaybarrrf.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setrswayBarUrl(url)
  }
  )

} }  /><img src={rswayBarUrl} className="w-16 h-16" alt="Sway Bar Links R file" id="rrrbla" onClick={()=>{

    window.open(rswayBarUrl)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}





</table>

</div>
<br /> 

            {/* Other Exhaus  */}

            <button className="btnExhaust"  onClick={()=>{
                if(otherShow){
                    setOtherShow(false)
                }else{setOtherShow(true)}
            }}>Others / Exhaust</button>
<div hidden={otherShow}>

<table>

<tr>
    <td>Description</td>
    <td>Good</td>
    <td>Warning</td>
    <td>Bad</td>
</tr>



<tr>
    <td className={otherColors}>Other Issue</td>
<td><input type="radio" name="oths"  onChange={()=>{
    setotherColors("bg-green-500")
    setOtherStatus("good")}} /> </td>
<td><input type="radio" name="oths"  onChange={()=>{
    setotherColors("bg-yellow-500")
    setOtherStatus("ml")}} /> </td>
<td><input type="radio" name="oths"  onChange={()=>{
    setotherColors("bg-red-500")
    setOtherStatus("bad")}} /> </td>

</tr>
<br />
{(otherStatus == "bad" ||otherStatus=="ml"  )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"others.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setothersUrls(url)
  }
  )

} } />

<img src={othersUrls} className="w-16 h-16" alt="Other file" id="oskjd" onClick={()=>{

window.open(othersUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setothers(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


<tr>
    <td className={exhaustColor}>Exhaust</td>
<td><input type="radio" name="exau"  onChange={()=>{
    setExhaustColor("bg-green-500")
    setexhausStatus("good")}} /> </td>
<td><input type="radio" name="exau"  onChange={()=>{
    setExhaustColor("bg-yellow-500")
    setexhausStatus("ml")}} /> </td>
<td><input type="radio" name="exau"  onChange={()=>{
    setExhaustColor("bg-red-500")
    setexhausStatus("bad")}} /> </td>

</tr>
<br />
{(exhausStatus == "bad" ||exhausStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"exahus.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setExhaustUrl(url)
  }
  )

} }  />

<img src={exahustUrl} className="w-16 h-16" alt="Exaust file" id="exaa" onClick={()=>{

window.open(exahustUrl)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setexhaus(e.target.value)} />

</div> : null}
<br />
<hr />
<br />

<tr>
    <td className={leaksColor}>Leaks</td>
<td><input type="radio" name="leaks"  onChange={()=>{
    setLeaksColor("bg-green-500")
    setLeaksStatus("good")}} /> </td>
<td><input type="radio" name="leaks"  onChange={()=>{
    setLeaksColor("bg-yellow-500")
    setLeaksStatus("ml")}} /> </td>
<td><input type="radio" name="leaks"  onChange={()=>{
    setLeaksColor("bg-red-500")
    setLeaksStatus("bad")}} /> </td>

</tr>
<br />
{(leaksStatus == "bad" ||leaksStatus=="ml" )? <div><input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"leakss.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setLeaksUrl(url)
  }
  )

} }  />

<img src={leaksUrls} className="w-16 h-16" alt="Leak file" id="wiperR" onClick={()=>{

window.open(leaksUrls)

}}  />
<input type="text" placeholder="Issue?" onChange={(e)=>setLeakrs(e.target.value)} />

</div> : null}
<br />
<hr />
<br />


</table>


</div> 
<br />


            {/* Services */}


            <button className="btnSvc"  onClick={()=>{
                if(serviceShow){
                    setserviceShow(false)
                }else{setserviceShow(true)}
            }}>Services</button>
<div hidden={serviceShow}>

<table>

<tr>
<td>Description</td>
<td>Good</td>
<td>Warning</td>
<td>Bad</td>
</tr>


<tr>
<td className={fuelColor}> Fuel Clean Service </td>
<td><input type="radio" name="fuel"  onChange={()=>{
    setfuelColor('bg-green-500')
    setfuelServicestatus("good")}} /></td>
<td><input type="radio" name="fuel"  onChange={()=>{
    setfuelColor('bg-yellow-500')
    setfuelServicestatus("ml")}} /></td>
<td><input type="radio" name="fuel"  onChange={()=>{
    setfuelColor('bg-red-500')
    setfuelServicestatus("bad")}} /></td>
</tr>
{(fuelServicestatus == "bad" || fuelServicestatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setfuelService(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"fuels.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setfuelUrs(url)
  }
  )

} }  /><img src={fuelUrs} className="w-16 h-16" alt="Fuel Svc file" id="frfr" onClick={()=>{

    window.open(fuelUrs)
    
    }}  />
</div> : null}

<br />
<hr />
<br />


<tr>
<td className={emisionColor}>Emission Test </td>
<td><input type="radio" name="emis"  onChange={()=>{
    setemiemisionColor('bg-green-500')
    setemisionStatus("good")}} /></td>
<td><input type="radio" name="emis"  onChange={()=>{
    setemiemisionColor('bg-yellow-500')
    setemisionStatus("ml")}} /></td>
<td><input type="radio" name="emis"  onChange={()=>{
    setemiemisionColor('bg-red-500')
    setemisionStatus("bad")}} /></td>
</tr>
{(emisionStatus == "bad" || emisionStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setemisionSvc(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"emisiojf.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setemisionUrls(url)
  }
  )

} }  /><img src={emisionUrls} className="w-16 h-16" alt="Emission file" id="tie" onClick={()=>{

    window.open(emisionUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={inductionColor}>Induction Service</td>
<td><input type="radio" name="indu"  onChange={()=>{
    setinductionColor('bg-green-500')
    setinductionStatus("good")}} /></td>
<td><input type="radio" name="indu"  onChange={()=>{
    setinductionColor('bg-yellow-500')
    setinductionStatus("ml")}} /></td>
<td><input type="radio" name="indu"  onChange={()=>{
    setinductionColor('bg-red-500')
    setinductionStatus("bad")}} /></td>
</tr>
{(inductionStatus == "bad" || inductionStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>setinduction(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"inductoipkid.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   setinductionUrls(url)
  }
  )

} }  /><img src={inductionUrls} className="w-16 h-16" alt=" Induction file" id="indua" onClick={()=>{

    window.open(inductionUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />

{/* *********************************************************************************** */}

<tr>
<td className={tcaseColor}>Tras Case / Differential</td>
<td><input type="radio" name="tcases"  onChange={()=>{
    settcaseColor('bg-green-500')
    settcaseStatus("good")}} /></td>
<td><input type="radio" name="tcases"  onChange={()=>{
    settcaseColor('bg-yellow-500')
    settcaseStatus("ml")}} /></td>
<td><input type="radio" name="tcases"  onChange={()=>{
    settcaseColor('bg-red-500')
    settcaseStatus("bad")}} /></td>
</tr>
{(tcaseStatus == "bad" || tcaseStatus == "ml" ) ? <div><input type="text" placeholder="Issue?" onChange={(e)=>settcase(e.target.value)} />
<input type="file" onChange={ async (param:any)=> {

const file = param.target.files[0];

const refMediaDiag = refSto(storage , "MediaDiagnostic/"+yy+"/"+mm+"/"+dd+"/"+test+"/"+"tcasesasa.jpg"  )




//const uploadTask = uploadBytesResumable(refMediaDiag , file)
await uploadBytes(refMediaDiag , file )



getDownloadURL(refMediaDiag)
  .then((url) => {
   settcaseUrls(url)
  }
  )

} }  /><img src={tcaseUrls} className="w-16 h-16" alt=" Diff file" id="casesa" onClick={()=>{

    window.open(tcaseUrls)
    
    }}  />
</div> : null}
<br />
<hr />
<br />









</table>

</div>
<br /> 





<br />
<br />
<br /><br />
<br />
<button className="btn" onClick={()=>toSend()}>SEND</button>


<br />

        </div>
    )
}