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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MWD-Icon`,
        short_name: `mwd`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#00adb5`,
        display: `minimal-ui`,
        icon: `src/images/mwd.png`,
      },
    },
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
  ],
};
