import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function ProductDetailsPage({ data: { product } }) {
  return (
    <Layout>
      <SEO title="Product Details" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </Layout>
  )
}

export const query = graphql`
  query ProductQuery($productId: Int!) {
    product(alternative_id: { eq: $productId }) {
      name
      description
    }
  }
`

export default ProductDetailsPage
