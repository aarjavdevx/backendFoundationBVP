import { useState } from "react"

const Signup = () =>{
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            const response = await fetch('http://localhost:5001/api/auth/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })

            console.log("Response is: ", response)

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Signup failed")
            }   


        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return(
        <>  
        <h1> lets signup today</h1>
        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="enter your name" value={formData.name} onChange={handleChange}  name="name"  />
            <input type="text" placeholder="enter your name" value={formData.email} onChange={handleChange}  name="email"/>
            <input type="text" placeholder="enter your name" value={formData.password} onChange={handleChange} name="password"/>
            {error && <p>{error}</p>} //setTimeout
            <button type="submit" disabled={loading}>{loading ? "registering you": "signup"}</button>
        </form>
        
        </>
    )

}

export default Signup;