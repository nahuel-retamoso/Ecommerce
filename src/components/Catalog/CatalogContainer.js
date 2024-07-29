import React, { useState, useEffect } from 'react';
import CatalogItem from './CatalogItem';
import FilterButton from './FilterButton';
import { getCategories, getCategoryProducts, getProducts, getSubcategoryProducts } from '../../sanity';

const CatalogContainer = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [clickAll, setClickAll] = useState(false)

  const [category, setCategory] = useState(null);

  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const content = await getCategories()
      setCategories(content.length > 0 ? content : null)
    }
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setProducts(products);
      console.log(products)
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (clickAll === true) {
      const fetchData = async () => {
        const products = await getProducts();
        setProducts(products);
        console.log(products)
        setClickAll(false)
        setCategory(null)
        setSubcategory(null)
      }
      fetchData();
    }

  }, [clickAll]);

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

  const SelectCategory = (category, title) => {
    console.log(category)
    setSelectedCategory(category);
    setSelectedSubcategory(null)
    setCategory(title)
    setSubcategory(null)
  }

  const SelectSubcategory = (subcategory, title) => {
    console.log(subcategory)
    setSelectedSubcategory(subcategory);
    setSelectedCategory(null)
    setSubcategory(title)
  }

  return (
    <div className="flex w-full min-h-screen px-20 bg-base-100">
      <div className="w-1/5 h-full sticky top-10 my-20 shadow-sm bg-base-100 shadow-md rounded-sm overflow-hidden">
        <div className='flex justify-around items-center t h-20 hover:bg-accent' onClick={() => setClickAll(true)}>
          <p className='font-light'>Todo</p>
        </div>
        {categories?.length === 0 ? <div className='flex justify-around items-center h-20'><span className="text-gray-500 loading loading-dots loading-lg"></span></div> : <div>{categories?.map((category) => (
          <FilterButton
            key={category._id}
            name={category.category}
            categoryId={category._id}
            options={category.subcategories}
            selectCategory={SelectCategory}
            selectSubcategory={SelectSubcategory}
          />
        ))}</div>}
      </div>
      <div className="w-full mt-4">
        <div className="breadcrumbs text-sm ml-12 mt-2">
                    {category == null ?
                     <ul className="text-gray-600">
                        <li><a>Todo</a></li>
                    </ul> : 
                    
                    <ul className="text-gray-600">
                        <li><a>{category}</a></li>
                        <li><a>{subcategory}</a></li>
                    </ul>}
                </div>
        <div className="grid grid-cols-3 gap-4 p-8 mb-20 w-full">
          {products?.map((product) => (
            <CatalogItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogContainer;
