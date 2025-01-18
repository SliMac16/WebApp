import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:7021/api/Products')
            .then(response => response.json())
            .then(data => {
                console.log('Odebrane dane z serwera:', data);
                setProducts(data);
            })
            .catch(error => {
                console.error('B³¹d podczas pobierania produktów', error);
            });
    }, []);

    return (
        <div>
            <h2>Lista produktów</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Cena: {product.price} PLN</p>
                        {product.description && <p>{product.description}</p>}
                        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};    

export default ProductsList;