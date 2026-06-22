const dispatchFields = [
  { label: "Title", name: "title", widget: "string" },
  {
    label: "Publish Date",
    name: "date",
    widget: "datetime",
    format: "YYYY-MM-DDTHH:mm:ss.SSSZ",
    picker_utc: false,
  },
  {
    label: "Hero Photo",
    name: "heroPhoto",
    widget: "image",
    required: false,
  },
  {
    label: "Authors",
    name: "authors",
    widget: "relation",
    collection: "people",
    search_fields: ["name"],
    value_field: "{{slug}}",
    display_fields: ["name"],
    multiple: true,
    required: false,
  },
  { label: "Body", name: "body", widget: "markdown" },
];

const talkingPointFields = dispatchFields;

const resourceFields = dispatchFields;

const photoFields = [
  { label: "Photo", name: "image", widget: "image" },
  { label: "Alt Text", name: "alt", widget: "string" },
  {
    label: "Caption",
    name: "caption",
    widget: "text",
    required: false,
  },
  {
    label: "Sort Order",
    name: "order",
    widget: "number",
    required: false,
    default: 0,
  },
];

const regionFields = [
  { label: "Title", name: "title", widget: "string" },
  {
    label: "Instagram URL",
    name: "instagramHref",
    widget: "string",
    required: false,
    pattern: [
      "^https://(www\\.)?instagram\\.com/.+",
      "Enter a valid Instagram URL starting with https://www.instagram.com/",
    ],
  },
  {
    label: "People",
    name: "authors",
    widget: "relation",
    collection: "people",
    search_fields: ["name"],
    value_field: "{{slug}}",
    display_fields: ["name"],
    multiple: true,
    required: false,
  },
  {
    label: "Photos",
    name: "photos",
    widget: "list",
    summary: "{{fields.alt}}",
    required: false,
    fields: photoFields,
  },
];

const collections = [
  {
    name: "people",
    label: "People",
    folder: "content/people",
    create: true,
    slug: "{{slug}}",
    fields: [
      { label: "Name", name: "name", widget: "string" },
      { label: "Picture", name: "picture", widget: "image", required: false },
      { label: "Org Title", name: "orgTitle", widget: "string" },
      { label: "Bio", name: "bio", widget: "text", required: false },
    ],
  },
  {
    name: "call_to_action_dispatch",
    label: "Call to Action Dispatch",
    folder: "content/call-to-action-dispatch",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: dispatchFields,
  },
  {
    name: "talking_points",
    label: "Talking Points Repository",
    folder: "content/talking-points",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: talkingPointFields,
  },
  {
    name: "resources",
    label: "Resources",
    folder: "content/resources",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: resourceFields,
  },
  {
    name: "regions",
    label: "Regions",
    files: [
      {
        label: "Midwest",
        name: "midwest",
        file: "content/regions/midwest/index.md",
        fields: regionFields,
      },
      {
        label: "Northeast",
        name: "northeast",
        file: "content/regions/northeast/index.md",
        fields: regionFields,
      },
      {
        label: "South",
        name: "south",
        file: "content/regions/south/index.md",
        fields: regionFields,
      },
      {
        label: "West",
        name: "west",
        file: "content/regions/west/index.md",
        fields: regionFields,
      },
    ],
  },
  {
    name: "midwest_news",
    label: "Midwest > Midwest News",
    folder: "content/regions/midwest/news",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: dispatchFields,
  },
  {
    name: "northeast_news",
    label: "Northeast > Northeast News",
    folder: "content/regions/northeast/news",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: dispatchFields,
  },
  {
    name: "south_news",
    label: "South > South News",
    folder: "content/regions/south/news",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: dispatchFields,
  },
  {
    name: "west_news",
    label: "West > West Region Dispatch",
    folder: "content/regions/west/news",
    create: true,
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
    fields: dispatchFields,
  },
  {
    name: "links",
    label: "Links Page",
    folder: "content/links",
    create: true,
    slug: "{{slug}}",
    identifier_field: "title",
    summary: "{{title}}",
    fields: [
      { label: "Title", name: "title", widget: "string" },
      { label: "URL", name: "href", widget: "string" },
      {
        label: "Sort Order",
        name: "order",
        widget: "number",
        required: false,
        default: 0,
      },
      { label: "Body", name: "body", widget: "hidden", default: "" },
    ],
  },
].sort((a, b) => a.label.localeCompare(b.label));

const productionHosts = ["digitalgroundgame.org", "beta.digitalgroundgame.org"];
const isProduction = productionHosts.includes(window.location.hostname);
const localProxyUrl = `${window.location.protocol}//${window.location.hostname}:8081/api/v1`;

const backend = isProduction
  ? {
      name: "github",
      repo: "digitalgroundgame/dgg-frontpage",
      branch: "main",
      base_url: window.location.origin,
      auth_endpoint: "api/cms/auth",
    }
  : {
      name: "proxy",
      proxy_url: localProxyUrl,
    };

window.CMS.init({
  config: {
    ...(isProduction ? { publish_mode: "editorial_workflow" } : {}),
    backend,
    media_folder: "public/uploads",
    public_folder: "/uploads",
    collections,
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
    var align =
      data.layout === "image-right" ? "flex-direction:row-reverse" : "";
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

CMS.registerEditorComponent({
  id: "video",
  label: "Video Embed",
  fields: [
    {
      name: "url",
      label: "YouTube URL",
      widget: "string",
    },
    {
      name: "title",
      label: "Title",
      widget: "string",
      default: "Embedded video",
    },
  ],
  pattern: /{%\s*video\s+url="(.*?)"\s+title="(.*?)"\s*%}/,
  fromBlock: function (match) {
    return {
      url: match[1],
      title: match[2],
    };
  },
  toBlock: function (data) {
    return `{% video url="${data.url}" title="${data.title}" %}`;
  },
  toPreview: function (data) {
    return (
      '<div style="border:1px solid #ccc;padding:1rem">' +
      "<strong>Video Embed</strong><br />" +
      '<a href="' +
      data.url +
      '" target="_blank" rel="noopener noreferrer">' +
      data.title +
      "</a>" +
      "</div>"
    );
  },
});
