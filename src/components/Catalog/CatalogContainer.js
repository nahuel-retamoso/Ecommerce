import React, { useState, useEffect } from 'react';
import CatalogItem from './CatalogItem';
import FilterButton from './FilterButton';
import { getCategories, getCategoryProducts, getSubcategoryProducts } from '../../sanity';

const CatalogContainer = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const content = await getCategories()
      setCategories(content.length > 0 ? content : null)
      // console.log(content)
  }
  fetchData()
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const products = await getMostViewedProducts();
  //     setProducts(products);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let data;
        if (selectedSubcategory) {
            data = await getSubcategoryProducts(selectedSubcategory);
            }
        else if (selectedCategory) {
            data = await getCategoryProducts(selectedCategory);
        }
        setProducts(data);
        console.log(products)
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  const SelectCategory = (category) => {
      console.log(category)
      setSelectedCategory(category);
      setSelectedSubcategory(null)
  }

    const SelectSubcategory = (subcategory) => {
        console.log(subcategory)
        setSelectedSubcategory(subcategory);
        setSelectedCategory(null)
    }

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-1/5 h-full sticky top-10 my-20 ml-40 shadow-sm bg-base-200 shadow-xl rounded-2xl overflow-hidden">
        {categories?.map((category) => (
          <FilterButton
            key={category._id}
            name={category.category}
            categoryId={category._id}
            options={category.subcategories}
            selectCategory={SelectCategory}
            selectSubcategory={SelectSubcategory}
          />
        ))}
      </div>
      <div className="w-4/5 mr-40 mt-4">
        <h2 className="ml-6 mt-2 text-2xl">Lo mas visto</h2>
        <div className="grid grid-cols-3 gap-6 p-6 mb-20">
        {products?.map((product) => (
            <CatalogItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogContainer;
