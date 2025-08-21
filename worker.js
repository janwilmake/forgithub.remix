export default {
  config: { domain: "remix.forgithub.com" },
  fetch: async (request) => {
    const url = new URL(request.url);
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
    const specUrl = `${uithubUrl}/SPEC.md`;
    const result = await fetch(specUrl);
    if (!result.ok) {
      return new Response(
        `${
          result.status
        } (${await result.text()}) - Please ensure there's a SPEC.md available in the specified folder`
      );
    }
    const spec = await result.text();
    const query = `${uithubUrl}

${spec}`;

    const Location = `https://letmeprompt.com/?q=${encodeURIComponent(query)}`;
    return new Response(null, { status: 302, headers: { Location } });
  },
};
