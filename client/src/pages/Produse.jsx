import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import TopTitle from "../assets/components/AboutMe/Introduction/TopTitle/TopTitle";
import ProductsContainer from "../assets/components/Produse/ProductsContainer/ProductsContainer";

export const loader = async () => {
  const response = await fetch("/api/produse");
  if (!response.ok) {
    throw new Response("Nu s-au putut prelua produsele", {
      status: response.status,
    });
  }
  const data = await response.json();
  return data;
};

const Products = () => {
  const products = useRouteLoaderData("produse");
  return (
    <section className="produse">
      <header>
        <TopTitle first="Produse" second="Calitate și inovație" />
      </header>
      <ProductsContainer products={products} />
    </section>
  );
};

export default Products;
