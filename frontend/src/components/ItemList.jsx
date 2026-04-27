import { deleteItem } from '../api'; 

export default function ItemList({ items, onRefresh }) { 
    const handleDelete = async (id) => {
        try {
            await deleteItem(id); 
            onRefresh(); 
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    }; 
    
    return ( 
        <div> 
            <h2>Items</h2> 
            {items && items.length > 0 ? (
                items.map(item => ( 
                    <div key={item._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}> 
                        <h3>{item.name}</h3>
                        <p><strong>Serial No:</strong> {item.serialNo}</p>
                        <p><strong>Description:</strong> {item.description}</p> 
                        <p><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p> 
                        <button onClick={() => handleDelete(item._id)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button> 
                    </div> 
                ))
            ) : (
                <p>No items found. Add one to get started!</p>
            )}
        </div> 
    ); 
}
