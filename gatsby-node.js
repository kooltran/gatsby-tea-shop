const { graphql } = require("gatsby")
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allProduct(filter: { id: { ne: "dummy" } }) {
        nodes {
          alternative_id
          name
          price
        }
      }
      allCategories(filter: { name: { ne: "Option" } }) {
        nodes {
          alternative_id
          name
        }
      }
    }
  `)

  result.data.allProduct.nodes.forEach(({ alternative_id }) => {
    createPage({
      path: `/product-detail/${alternative_id}`,
      component: path.resolve(`./src/templates/product-detail.js`),
      context: {
        productId: alternative_id,
      },
    })
  })
}
