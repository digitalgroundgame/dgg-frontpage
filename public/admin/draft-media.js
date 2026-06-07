(function () {
  var productionHosts = ["digitalgroundgame.org", "beta.digitalgroundgame.org"];
  var isProduction = productionHosts.indexOf(window.location.hostname) !== -1;
  var uploadPrefix = "/uploads/";
  var repoRawBase =
    "https://raw.githubusercontent.com/digitalgroundgame/dgg-frontpage";

  if (!isProduction) {
    return;
  }

  function getWorkflowEntry() {
    var hash = window.location.hash || "";
    var match = hash.match(
      /\/collections\/([^/]+)\/entries\/([^/?#]+)|\/workflow\/([^/]+)\/entries\/([^/?#]+)/,
    );

    if (!match) {
      return null;
    }

    return {
      collection: decodeURIComponent(match[1] || match[3]),
      slug: decodeURIComponent(match[2] || match[4]),
    };
  }

  function getDraftMediaUrl(pathname) {
    var entry = getWorkflowEntry();

    if (!entry || pathname.indexOf(uploadPrefix) !== 0) {
      return "";
    }

    var branch =
      "refs/heads/cms/" +
      encodeURIComponent(entry.collection) +
      "/" +
      encodeURIComponent(entry.slug);
    var mediaPath = "public" + pathname;

    return repoRawBase + "/" + branch + "/" + mediaPath;
  }

  document.addEventListener(
    "error",
    function (event) {
      var image = event.target;

      if (!image || image.tagName !== "IMG" || image.dataset.dggDraftMedia) {
        return;
      }

      var src = image.getAttribute("src") || "";
      var url;

      try {
        url = new URL(src, window.location.origin);
      } catch {
        return;
      }

      var draftUrl = getDraftMediaUrl(url.pathname);

      if (!draftUrl) {
        return;
      }

      image.dataset.dggDraftMedia = "true";
      image.src = draftUrl;
    },
    true,
  );
})();
