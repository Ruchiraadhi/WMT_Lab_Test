import { useState } from 'react'; 
import { createItem } from '../api'; 

export default function ItemForm({ onItemAdded }) { 
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [price, setPrice] = useState(''); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        try {
            await createItem({ name, description, price }); 
            setName(''); 
            setDescription(''); 
            setPrice(''); 
            onItemAdded(); 
        } catch (err) {
            console.error('Error creating item:', err);
        }
    }; 
    
    return ( 
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}> 
            <h2>Add New Item</h2> 
            <div style={{ marginBottom: '1rem' }}> 
                <input 
                    placeholder="Item name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.5rem' }}
                /> 
            </div> 
            <div style={{ marginBottom: '1rem' }}> 
                <input 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    step="0.01"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Add Item</button> 
        </form>
    );
}