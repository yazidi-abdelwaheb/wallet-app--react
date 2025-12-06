import { useEffect, useState } from "react";
import "./style.css";
import api from "../../../api/axios";
import User from "../../../models/user.model";
import { toast } from "react-toastify";
export default function Profile() {
  const [user,setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(()=>{
    const fetchUser = async()=>{
        try {
        const res = await api.get<{ doc: User }>("/auth/me");
        console.log(res.data);
        setUser(res.data.doc);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchUser()
  },[])

  const handelEdit = async ()=>{
    try {
        const res = await api.put<{ message: string }>("/auth/me" ,{ user});
        console.log(res.data);
        toast.success(res.data.message);
      } catch (err) {
        console.error("Error update profile:", err);
      }
  }

  return (
    <div className="profile-card shadow-sm">
      <h3 className="profile-title">
        <i className="bi bi-person-circle me-2"></i> 
        <span>My Profile</span>
      </h3>

      <form className="profile-form">
         {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            readOnly
          />
        </div>
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={user.firstName}
            onChange={(e)=>setUser({...user , firstName: e.target.value})}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={user.lastName}
            onChange={(e)=>setUser({...user , lastName: e.target.value})}
          />
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <button type="button" onClick={handelEdit} className="btn btn-primary px-5">
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}
