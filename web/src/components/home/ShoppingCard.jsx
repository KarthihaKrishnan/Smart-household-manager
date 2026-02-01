import { useState, useEffect } from 'react';

function ShoppingCard() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/grocery-items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching grocery items:', error));
  }, []);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      const response = await fetch('http://localhost:3001/api/grocery-items', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_name: newItem }),
      });
      const savedItem = await response.json();
      setItems((prevItems) => [...prevItems, savedItem]);
      setNewItem('');
  }
    catch (error) {
      console.error('Error adding grocery item:', error);
    }
  };

  const handleToggleItemPurchased = async (itemId) => {
    const currentItem = items.find(item => item.id === itemId);
    if (!currentItem) return;

    const newStatus =
    currentItem.status === "pending" ? "purchased" : "pending";

    try {
      const response = await fetch(`http://localhost:3001/api/grocery-items/${itemId}`, 
        { method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
         }
      );
      const updatedItem = await response.json();
      setItems((prevItems) => 
        prevItems.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
    } catch (error) {
      console.error('Error updating item purchased status:', error);
    }
  };

  const handleDeleteItem = async(itemId) => {
    try {
      await fetch(`http://localhost:3001/api/grocery-items/${itemId}`, {  
        method: 'DELETE',
      });
      setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="shopping-card-container">
      <div className='shopping-card-header'>
        <h3 className='shopping-card-title'>
          Shopping List
          <span className='arrow'>&gt;</span> 
        </h3>
       
      <div className='shopping-card-primary-action'>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.status === "purchased"}
                onChange={() => handleToggleItemPurchased(item.id)}
              />
              <span 
                style={{ 
                  textDecoration: item.purchased ? 'line-through' : 'none', 
                  marginLeft: '8px',
                  marginRight: '8px',
                }}
              >
                {item.item_name}
              </span>
              <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className='shopping-card-body'>
          What do we need to buy?
          <input 
          type="text"
          placeholder="Enter a new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)} /> 
          <button type="button" onClick={handleAddItem}>+ Add</button>
        </div>
      </div>
      );
}

export default ShoppingCard;