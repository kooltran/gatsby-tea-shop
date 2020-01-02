module.exports = {
  siteMetadata: {
    title: `My Tea Shop`,
    description: `Buy Delicious Tea.`,
    author: `@kooltran`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        entitiesArray: [
          {
            url: `http://tiamo.localdev/api/products.json`,
            method: "get",
            name: `product`,
          },
          {
            url: `http://tiamo.localdev/api/categories.json`,
            method: "get",
            name: `categories`,
          },
        ],
      },
    },
  ],
}
