window.CMS.init({
  config: {
    local_backend: true,
    backend: {
      name: "github",
      repo: "digitalgroundgame/dgg-frontpage",
      branch: "main",
      base_url: window.location.origin,
      auth_endpoint: "api/cms/auth",
    },
    media_folder: "public/uploads",
    public_folder: "/uploads",
    collections: [
      {
        name: "pages",
        label: "Pages",
        files: [
          {
            name: "home",
            label: "Home Page",
            file: "content/pages/home.md",
            fields: [
              { label: "Title", name: "title", widget: "string" },
              { label: "Intro", name: "intro", widget: "text" },
              { label: "Body", name: "body", widget: "markdown" },
            ],
          },
        ],
      },
      {
        name: "posts",
        label: "Posts",
        folder: "content/posts",
        create: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          { label: "Draft", name: "draft", widget: "boolean", default: true },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
    ],
  },
});
