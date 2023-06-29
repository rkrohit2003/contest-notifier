import React, { useState } from 'react'
import "./Platform.css"
import { useNavigate } from "react-router-dom"

export const Platform = () => {
  const [Val,setVal]=useState("codeforces");
  const navigate=useNavigate();
  function getDetails(){
    navigate(`/contestpage/${Val}`);
  }
  return (
    <div className="container mt-3 minH">
      <p>Select Coding Platform</p>
    <select className="form-select form-select-md mb-3" onChange={e=>setVal(e.target.value)} aria-label=".form-select-lg example">
  <option value="codeforces">Codeforces</option>
      <option value="code_chef">Codechef</option>
      <option value="leet_code">LeetCode</option>
      <option value="hacker_rank">HackerRank</option>
      <option value="hacker_earth">HackerEarth</option>
      <option value="at_coder">Atcoder</option>
      <option value="top_coder">TopCoder</option>
      <option value="codeforces_gym">Codeforces::Gym</option>
      <option value="cs_academy">CS Academy</option>
      <option value="all">All of the above</option>
</select>
<button className="btn btn-primary btn-md" type="submit"  onClick={getDetails}>View Contest Details</button>
</div>
  )
}
