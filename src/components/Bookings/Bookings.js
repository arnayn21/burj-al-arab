import React, { useContext, useEffect, useState } from 'react';
import { UserContex } from '../../App';

const Bookings = () => {
    const [bookings , setBookings] = useState([])
    const [loggedInUser , setLoggedInUser] = useContext(UserContex)
    
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email , {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }

        })
        .then(res=>res.json())
        .then(data => setBookings(data))
    },[])

    return (
        <div>
            <h2>You Have {bookings.length} Bookings</h2>    
            {
                bookings.map(book => <li>{book.name} from: {(new Date (book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date (book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;