import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MenuForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState({
    menu_heading: '',
    menu_name: '',
    menu_under: '',
    enable_yn: 'Y'
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3307/api/dashboard/${id}`)
        .then(response => {
          setMenu(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(menu.menu_heading.trim() === ""){
      alert("Please Enter Menu Heading");
    }
    else if(menu.menu_name.trim() === ""){
      alert("Please Enter Menu Name");
    }else if(menu.menu_under.trim() === ""){
      alert("Please Enter Menu Under");
    }else{
      const method = id ? 'put' : 'post';
      const url = id ? `http://localhost:3307/api/dashboard/${id}` : 'http://localhost:3307/api/dashboard';
      axios[method](url, menu)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
    }
    console.log(menu.menu_heading);
    
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Menu' : 'Add Menu'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Menu Heading</label>
          <input type="text" name="menu_heading" value={menu.menu_heading} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Menu Name</label>
          <input type="text" name="menu_name" value={menu.menu_name} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Menu Under</label>
          <input type="text" name="menu_under" value={menu.menu_under} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Enable</label>
          <select name="enable_yn" value={menu.enable_yn} onChange={handleChange} className="form-control">
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default MenuForm;
