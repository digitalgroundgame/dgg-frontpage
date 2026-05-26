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
        name: "call_to_action_dispatch",
        label: "Call to Action Dispatch",
        folder: "content/call-to-action-dispatch",
        create: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          {
            label: "Hero Photo",
            name: "heroPhoto",
            widget: "image",
            required: false,
          },
          {
            label: "Hero Filter",
            name: "heroFilter",
            widget: "boolean",
            required: false,
            default: true,
          },
          {
            label: "Author",
            name: "author",
            widget: "relation",
            collection: "authors",
            search_fields: ["name"],
            value_field: "{{slug}}",
            display_fields: ["name"],
          },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
      {
        name: "west_region_dispatch",
        label: "West Region Dispatch",
        folder: "content/west-region-dispatch",
        create: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          {
            label: "Hero Photo",
            name: "heroPhoto",
            widget: "image",
            required: false,
          },
          {
            label: "Hero Filter",
            name: "heroFilter",
            widget: "boolean",
            required: false,
            default: true,
          },
          {
            label: "Author",
            name: "author",
            widget: "relation",
            collection: "authors",
            search_fields: ["name"],
            value_field: "{{slug}}",
            display_fields: ["name"],
          },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
      {
        name: "northeast_news",
        label: "Northeast News",
        folder: "content/northeast-news",
        create: true,
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          {
            label: "Hero Photo",
            name: "heroPhoto",
            widget: "image",
            required: false,
          },
          {
            label: "Hero Filter",
            name: "heroFilter",
            widget: "boolean",
            required: false,
            default: true,
          },
          {
            label: "Author",
            name: "author",
            widget: "relation",
            collection: "authors",
            search_fields: ["name"],
            value_field: "{{slug}}",
            display_fields: ["name"],
          },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },
      {
        name: "authors",
        label: "Authors",
        folder: "content/authors",
        create: true,
        slug: "{{slug}}",
        fields: [
          { label: "Name", name: "name", widget: "string" },
          { label: "Picture", name: "picture", widget: "image" },
          { label: "Bio", name: "bio", widget: "text" },
        ],
      },
    ],
  },
});

CMS.registerEditorComponent({
  id: "two-column",
  label: "Two Column Image & Text",
  fields: [
    {
      name: "image",
      label: "Image",
      widget: "image",
    },
    {
      name: "alt",
      label: "Alt Text",
      widget: "string",
    },
    {
      name: "text",
      label: "Text Content",
      widget: "markdown",
    },
    {
      name: "layout",
      label: "Layout",
      widget: "select",
      options: [
        { label: "Image Left", value: "image-left" },
        { label: "Image Right", value: "image-right" },
      ],
      default: ["image-left"],
    },
  ],
  pattern:
    /{%\s*two-column\s+image="(.*?)"\s+alt="(.*?)"\s+layout="(.*?)"\s*%}\n?([\s\S]*?)\n?{%\s*\/two-column\s*%}/,
  fromBlock: function (match) {
    return {
      image: match[1],
      alt: match[2],
      layout: match[3],
      text: match[4],
    };
  },
  toBlock: function (data) {
    return `{% two-column image="${data.image}" alt="${data.alt}" layout="${data.layout}" %}\n${data.text}\n{% /two-column %}`;
  },
  toPreview: function (data) {
    var align = data.layout === "image-right" ? "flex-direction:row-reverse" : "";
    return (
      '<div style="display:flex;' +
      align +
      ';gap:1rem;align-items:flex-start">' +
      '<img src="' +
      data.image +
      '" alt="' +
      data.alt +
      '" style="width:50%;max-width:300px" />' +
      '<div style="width:50%">' +
      data.text +
      "</div>" +
      "</div>"
    );
  },
});
