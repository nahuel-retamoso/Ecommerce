import React, { useState, useEffect } from 'react';
import CatalogItem from './CatalogItem';
import FilterButton from './FilterButton';
import { getCategories, getMostViewedProducts, getProductsByCategory, getProductsBySubcategory } from '../../firebase/firestore';

const CatalogContainer = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getMostViewedProducts();
      setProducts(products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let products;
        if (selectedSubcategory) {
            products = await getProductsBySubcategory(selectedSubcategory);
            }
        else if (selectedCategory) {
            products = await getProductsByCategory(selectedCategory);
        }
        else {
            products = await getMostViewedProducts();
        }
        setProducts(products);
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  const SelectCategory = (category) => {
      setSelectedCategory(category);
      setSelectedSubcategory(null)
  }

    const SelectSubcategory = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSelectedCategory(null)
    }

  return (
    <div className="flex w-full bg-black/10">
      <div className="w-1/5 h-full sticky top-0 mt-20 ml-40 shadow-sm bg-white/40">
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            name={category.name}
            categoryId={category.id}
            options={category.subcategories}
            selectCategory={SelectCategory}
            selectSubcategory={SelectSubcategory}
          />
        ))}
      </div>
      <div className="w-4/5 mr-40 mt-4">
        <h2 className="ml-6 mt-2 text-2xl">Lo mas visto</h2>
        <div className="grid grid-cols-3 gap-6 p-6 mb-20">
        {products.map((product) => (
            <CatalogItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogContainer;
