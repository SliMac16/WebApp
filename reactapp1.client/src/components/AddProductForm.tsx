import React, { useState } from 'react';

const AddProductForm: React.FC = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedPrice = parseFloat(price.toString());

        const newProduct = {
            name: name,
            price: isNaN(parsedPrice) ? 0 : parsedPrice,
            description: description,
            imageUrl: imageUrl
        };

        try {
            const response = await fetch('https://localhost:7021/api/Products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (response.ok) {
                console.log('Produkt zosta³ dodany');
            } else {
                console.error('B³¹d podczas dodawania produktu', response.statusText);
                return;
            }

            setName('');
            setPrice(0);
            setDescription('');
            setImageUrl('');
            console.log('Produkt zosta³ dodany pomyœlnie');
        }
        catch (error) {
            console.error('B³¹d podczas dodawania produktu POST', error);
        }
    };

    return (
        <div>
            <h2>Dodaj nowy produkt</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nazwa:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Cena:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label>Opis:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Adres obrazka (URL):</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Zapisz</button>
            </form>
        </div>
    );
};

export default AddProductForm;