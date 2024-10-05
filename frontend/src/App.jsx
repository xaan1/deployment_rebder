import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './AuthContex';
import axios from 'axios';

const App = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate(); // Isticmaal navigate si aad redirect u samayso
  const [loading, setLoading] = useState(true); // loading state haddii loo baahdo

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:8000/api/users/profile", { withCredentials: true });

  //       if (data) {
  //         setUser(data); // Haddii user la helo xogtiisa ku tiri user state
  //       } else {
  //         setUser(null); // Haddii userka aan la helin, nadiifi user state
  //         navigate('/login'); // Redirect userka haddii aan login ahayn
  //       }
  //     } catch (err) {
  //       console.log("err", err);
  //       setUser(null); // Haddii error dhacdo, user null ka dhig
  //       navigate('/login'); // Redirect userka haddii error dhacdo
  //     } finally {
  //       setLoading(false); // loading state ku dhammee
  //     }
  //   };

  //   fetchUserProfile();
  // }, [navigate, setUser]);

  // if (loading) return <div>Loading...</div>; // Loading inta xogta la sugayo



  useEffect(() => {
		const fetchUserProfile = async () => {
			try {
        const { data } = await axios.get("http://localhost:8000/api/users/profile", { withCredentials: true });
				setUser(data);
			} catch (err) {
				if (err.response.status === 403) {
					// toast.error("please login first");
					navigate("/login");
				}
				console.log("err", err.response.status);
			}
		};
		fetchUserProfile();
	}, [setUser]);





  return (
    <div className='max-w-4xl mx-auto pt-20 mt-10'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
