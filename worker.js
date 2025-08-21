export default {
  config: { domain: "remix.forgithub.com" },
  fetch: async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/badge") {
      return new Response(null, {
        status: 302,
        headers: { Location: `https://img.shields.io/badge/Remix_App-orange` },
      });
    }
    const [owner, repo, page, branch, ...pathParts] = url.pathname
      .slice(1)
      .split("/");

    const path = (pathParts || []).join("/");
    if (!owner || !repo) {
      return new Response(
        "Usage: https://remix.forgithub.com/owner/repo/tree/branch/...path"
      );
    }
    const branchPart = branch || "main";
    const pathPart = path ? `/${path}` : "";
    const uithubUrl = `https://uithub.com/${owner}/${repo}/tree/${branchPart}${pathPart}`;
    const specUrl = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branchPart}/SPEC.md`;
    const result = await fetch(specUrl);

    const spec = result.ok
      ? await result.text()
      : `Consider this code and create me a "remix" with the following changes:\n\nYOUR SPEC`;
    console.log({ spec, specUrl });
    const query = `${uithubUrl}

${spec}`;

    const Location = `https://letmeprompt.com/?q=${encodeURIComponent(query)}`;
    return new Response(null, { status: 302, headers: { Location } });
  },
};
