module.exports = {
  siteMetadata: {
    title: "My Writing Dictionary",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "media",
        path: "./src/media/",
      },
      __key: "media",
    },
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
  ],
};
