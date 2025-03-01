import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [traders, setTraders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Trader',
    strategy: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    try {
      const response = await fetch(`${API_URL}/traders`);
      const data = await response.json();
      setTraders(data);
    } catch (error) {
      console.error('Error fetching traders:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let url = `${API_URL}/traders`;
      let method = 'POST';
      
      if (editing) {
        url = `${API_URL}/traders/${currentId}`;
        method = 'PUT';
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ name: '', type: 'Trader', strategy: '' });
        setEditing(false);
        setCurrentId(null);
        fetchTraders();
      }
    } catch (error) {
      console.error('Error saving trader:', error);
    }
  };

  const handleEdit = (trader) => {
    setEditing(true);
    setCurrentId(trader._id);
    setFormData({
      name: trader.name,
      type: trader.type,
      strategy: trader.strategy
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/traders/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchTraders();
      }
    } catch (error) {
      console.error('Error deleting trader:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading AI Platform</h1>
      </header>
      <main className="container">
        <div className="row">
          <div className="col">
            <h2>{editing ? 'Edit Trader' : 'Add New Trader'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Type:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="CEO">CEO</option>
                  <option value="Trader">Trader</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Strategy:</label>
                <textarea
                  name="strategy"
                  value={formData.strategy}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                {editing ? 'Update' : 'Create'} Trader
              </button>
              
              {editing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setCurrentId(null);
                    setFormData({ name: '', type: 'Trader', strategy: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
          
          <div className="col">
            <h2>Traders List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Strategy</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {traders.map(trader => (
                  <tr key={trader._id}>
                    <td>{trader.name}</td>
                    <td>{trader.type}</td>
                    <td>{trader.strategy}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(trader)}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(trader._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;