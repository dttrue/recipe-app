import { useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetterSignup = () => {

    const [email, setEmail] = useState("");
    const [name , setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:1111/api/recipes/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, name }),
                
            })

            const data = await response.json();
            if(response.ok){
                toast.success(data.message);
                setEmail("");
                setName("");
            }else{
                toast.error(data.message);
            }
        }catch (error) {
            console.log(error);
            toast.error('An error occurred while signing up. Please try again later.');
        }
    }

   

    return (
        
        <div className="container">
  <div className="row mx-0 justify-content-center">
    <div className="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">

        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"   
            
            />
    <h1 className="text"> Our Newsletter</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="w-100 rounded-1 p-4 border bg-white shadow-sm"
        
      >
       <label className="d-block mb-4">
          <span className="form-label d-block">Name</span>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Joe Bloggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="d-block mb-4">
          <span className="form-label d-block">Email address</span>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="joe.bloggs@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary px-3 rounded-3">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
    )
}

export default NewsLetterSignup