import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const DataQuery = graphql`
  query DataQuery {
    allProduct(filter: { id: { ne: "dummy" } }) {
      nodes {
        alternative_id
        name
        price
        category
      }
    }
    allCategories(filter: { name: { ne: "Option" } }) {
      nodes {
        alternative_id
        name
      }
    }
  }
`

function IndexPage() {
  const {
    allProduct: { nodes: products },
    allCategories: { nodes: categories },
  } = useStaticQuery(DataQuery)

  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(cat => cat.alternative_id)
  )

  function onSelectCategory(id) {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(s => s.filter(catId => catId !== id))
    } else {
      setSelectedCategories(s => [...s, id])
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {categories.map(category => (
          <div key={category.alternative_id}>
            {category.name}
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.alternative_id)}
              onChange={() => onSelectCategory(category.alternative_id)}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          width: "50%",
          boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
            fontWeight: "600",
          }}
        >
          <span>Name</span>
          <span>Price</span>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", margin: "0" }}>
          {products
            .filter(product =>
              selectedCategories
                .map(id => `/api/categories/${id}`)
                .includes(product.category)
            )
            .map(product => (
              <li
                key={product.alternative_id}
                style={{
                  listStyle: "none",
                  padding: "10px 20px",
                  background: "#e6f7fa",
                  color: "#333",
                  margin: "0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Link
                  to={`/product-detail/${product.alternative_id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    color: "#333",
                    width: "100%",
                  }}
                >
                  <span>{product.name}</span>
                  <span>{product.price}đ</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
