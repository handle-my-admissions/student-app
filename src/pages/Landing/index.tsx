import './style.css';

import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user';


export default function Landing() {
  const navigate = useNavigate();
  const {user} =useContext(UserContext);

  if(user) return <Navigate to="adm/" />
  
  return (
    <div className="Landing">
      <section className="showcase">
        <img src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." />
        <div className="overlay" />
        <div className="text">
          <h2>adMISSION Portal </h2>
          <h3>admit with ease</h3>
          <p>
            HANDLE MY ADMISSIONS is a platform that can help high school
            candidates to manage their college applications. The platform serves
            as the central hub for the applicants for their end-to-end
            application journey. It also serves as a central hub for
            institutions in order to manage the incoming applications.
          </p>

          <button className="letsGo" onClick={() => navigate('/login')} type="button">LETS GO</button>
          {/* <a href={hostedUI}>LETS GO!</a> */}
        </div>
      </section>
    </div>
  );
}
