import { useEffect, useState } from "react";


const DropDownMultiple = () => {
    const [states, setStates] = useState<string[]>([])
    const [state, setState] = useState<string>("");
    const [district, setDistrict] = useState<string[] | undefined>(undefined)

    const data = [
        {
            state: "Bihar",
            district: [
                "Arrah",
                "Patna",
                "Buxar",
                "Balia",
                "Rohtas"
            ]
        },
        {
            state: "Uttar Pradesh",
            district: [
                "Agra",
                "Lucknow",
                "Varanasi",
                "Kanpur",
                "Meerut"
            ]
        },
        {
            state: "Maharashtra",
            district: [
                "Mumbai",
                "Pune",
                "Nagpur",
                "Nashik",
                "Thane"
            ]
        },
        {
            state: "Rajasthan",
            district: [
                "Jaipur",
                "Jodhpur",
                "Udaipur",
                "Ajmer",
                "Bikaner"
            ]
        },
        {
            state: "Tamil Nadu",
            district: [
                "Chennai",
                "Coimbatore",
                "Madurai",
                "Tiruchirappalli",
                "Salem"
            ]
        },
        {
            state: "West Bengal",
            district: [
                "Kolkata",
                "Darjeeling",
                "Howrah",
                "Siliguri",
                "Asansol"
            ]
        },
        {
            state: "Karnataka",
            district: [
                "Bengaluru",
                "Mysuru",
                "Mangaluru",
                "Hubballi",
                "Belagavi"
            ]
        },
        {
            state: "Kerala",
            district: [
                "Thiruvananthapuram",
                "Kochi",
                "Kozhikode",
                "Thrissur",
                "Kollam"
            ]
        }
    ];
    

useEffect(()=>{
    const allState =  data.map((item)=> item.state)
    setStates(allState)
},[])

useEffect(()=>{
    console.log(state)
    const allDistricts =  data.find((item)=> item.state === state)
      console.log("allDistricts", allDistricts?.district)
      setDistrict(allDistricts?.district)
},[state])





  return (
    <div>

      <div>
        <h1 className="text-bold">Select State</h1>
         <select onChange={(e)=>setState(e.target.value)}>
            <option >Select State</option>
            {states.map((item:string, index:number)=>{
                return (
                    <option key={index} value={item}>{item}</option>
                )
            })}
         </select>
      </div>

      <div className="text-bold">
        <h1>Select District</h1>
        <select>
            <option>Select District</option>
            {district?.map((item, index)=>{
                return (
                    <option key={index} value={item}>{item}</option>
                )
            })}
        </select>
      </div>

    </div>
  )
}

export default DropDownMultiple;