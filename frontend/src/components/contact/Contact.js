import React from 'react'

export const Contact = () => {
  return (
    <div className="container minH my-2">
      <form action="https://formsubmit.co/3249204376d0b9bbe7864bbb05cc1a07" method="POST">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" autoComplete="off" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' id="email" autoComplete="off" required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="number" className="form-control" name='phone' id="phone" autoComplete="off" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message/Comments</label>
          <textarea type="text" className="form-control" name='message' id="message" autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}