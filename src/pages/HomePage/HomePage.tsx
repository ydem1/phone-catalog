import React, { useEffect, useState } from 'react';

import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';
import { getHotProducts } from '../../helpers/getFunctions/getHotPriceProducts';
import { ImageSlider } from '../../components/ImageSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getNewProducts } from '../../helpers/getFunctions/getNewProducts';
import { Loader } from '../../components/Loader';
import { Main } from '../../components/Main';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(productsFromServer => {
        setHotPriceProducts(getHotProducts(productsFromServer));
        setNewProducts(getNewProducts(productsFromServer));
      })
      .catch(() => setIsLoading(true))
      .finally(() => setIsError(false));
  }, []);

  const getSlider = (
    products: Product[],
    title: string,
  ) => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p className="error">Error</p>;
    }

    return <ProductsSlider title={title} products={products} />;
  };

  return (
    <Main>
      <ImageSlider />

      {getSlider(
        hotPriceProducts,
        'Hot price',
      )}

      <ShopByCategory />

      {getSlider(
        newProducts,
        'Brand new models',
      )}
    </Main>
  );
};
