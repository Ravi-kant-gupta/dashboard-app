// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3307/api/dashboard')
//       .then(response => {
//         setMenus(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
//   }, []);

//   return (
//     <div className="container">
//       <h1>Dashboard</h1>
//       <Link to="/add" className="btn btn-primary">Add Menu</Link>
//       <ul className="list-group">
//         {menus.map(menu => (
//           <li key={menu.menuid} className={`list-group-item ${menu.enable_yn === 'N' ? 'disabled' : ''}`}>
//             {menu.menu_heading} ({menu.menu_name})
//             <Link to={`/edit/${menu.menuid}`} className="btn btn-secondary">Edit</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios.get('http://localhost:3307/api/dashboard')
//       .then(response => {
//         setMenus(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3307/api/dashboard/${id}`)
//       .then(() => {
//         fetchData();
//       })
//       .catch(error => {
//         console.error('There was an error deleting the menu!', error);
//       });
//   };

//   return (
//     <>
//     <nav className='nav-bar'>
//       <h1>Dashboard</h1>
//       <Link to="/add" className="btn btn-primary">Add Menu</Link>
//     </nav>
//     <div className="container">
//       <ul className="list-group">
//         {menus.map(menu => (
//           <li key={menu.menuid} className={`list-group-item ${menu.enable_yn === 'N' ? 'disabled' : ''}`}>
//             {menu.menu_heading} ({menu.menu_name})
//             <div>
//               <Link to={`/edit/${menu.menuid}`} className="btn btn-secondary">Edit</Link>
//               <button onClick={() => handleDelete(menu.menuid)} className="btn btn-danger">Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </>
//   );
// };

// export default Dashboard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3307/api/dashboard')
      .then(response => {
        setMenus(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3307/api/dashboard/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('There was an error deleting the menu!', error);
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            {menus.filter(menu => menu.enable_yn === 'Y' && menu.menu_under === 'header').map(menu => (
              <Nav.Link key={menu.menuid} href={`#${menu.menu_name}`}>{menu.menu_heading}</Nav.Link>
            ))}
          </Nav>
          <Link to="/add">
            <Button variant="primary">Add Menu</Button>
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <ul className="list-group">
          {menus.map(menu => (
            <li key={menu.menuid} className={`list-group-item ${menu.enable_yn === 'N' ? 'disabled' : ''}`}>
              {menu.menu_heading} ({menu.menu_name})
              <div>
                <Link to={`/edit/${menu.menuid}`} className="btn btn-secondary">Edit</Link>
                <Button onClick={() => handleDelete(menu.menuid)} variant="danger">Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Dashboard;

