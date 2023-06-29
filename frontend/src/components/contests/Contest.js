import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Contest.css"

export const Contest = () => {
    const {Val}=useParams();
    const [contestInfo,setContestInfo]=useState([]);
    const [isError,setIsError]=useState(null);
    const [isEmpty,setIsEmpty]=useState(null);

    const fetchData=async()=>{
        try {
            const response=await fetch(`https://kontests.net/api/v1/${Val}`);
            const contestData=await response.json();
            setContestInfo(contestData);
            if(contestData.length===0){
              setIsEmpty("empty");
            }
        } catch (error) {
            setIsError("error");
        }
    }

      const getIndianTime = (utcDateString) => {
        const indianDate = new Date(utcDateString).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short'});
        return indianDate;
      }
      
    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <div className="container minH">
          {contestInfo.length>0 && Val==="all" && (
            <div>
          <h1>Contest Details</h1>
          <div className="over">
            <table  className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Contest</th>
                <th>Site</th>
                <th>Start-time</th>
                <th>End-time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {contestInfo.map((item,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td><a href={item.url} target="_blank"> {item.name} </a></td>
                    <td>{item.site}</td>
                    <td>{getIndianTime(item.start_time)}</td>
                    <td>{getIndianTime(item.end_time)}</td>
                    <td>{parseInt(item.duration/3600)} hr {((item.duration)%3600)/60} min</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          )}
        {contestInfo.length>0 && Val!=="all" && (
            <div>
          <h1>Contest Details</h1>
            <div className="over">
            <table  className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Contest</th>
                <th>Start-time</th>
                <th>End-time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {contestInfo.map((item,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td><a href={item.url} target="_blank"> {item.name} </a></td>
                    <td>{getIndianTime(item.start_time)}</td>
                    <td>{getIndianTime(item.end_time)}</td>
                    <td>{parseInt(item.duration/3600)} hr {((item.duration)%3600)/60} min</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          )}
          {(isError!==null) && (
            <div>
            <h1>Error 404!</h1>
            <h2>Page Not Found</h2>
            </div>
          )}
          {(isEmpty!==null) && (
            <div className='mt-2'>
              <h2>Sorry, there are no upcoming contests listed on this site.</h2>
              </div>
          )}
          </div>
      )
}
