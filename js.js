(function () {
  "use strict";

  // Function to extract GitHub repository URLs from HTML content
  function findGitHubURL(htmlContent) {
    // Pattern to match GitHub repository URLs
    const githubPattern =
      /https?:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)(?:\/[^\s"'<>]*)?/gi;
    const matches = htmlContent.match(githubPattern);

    if (!matches) return null;

    // Extract owner/repo from the first match
    const firstMatch = matches[0];
    const repoMatch = firstMatch.match(
      /github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/i
    );

    if (repoMatch) {
      return {
        owner: repoMatch[1],
        repo: repoMatch[2],
        fullUrl: firstMatch,
      };
    }

    return null;
  }

  // Function to create and inject the remix button
  function createRemixButton(owner, repo) {
    // Check if button already exists
    if (document.getElementById("github-remix-button")) return;

    const button = document.createElement("a");
    button.id = "github-remix-button";
    button.href = `https://remix.forgithub.com/${owner}/${repo}`;
    button.target = "_blank";
    button.textContent = "Remix";

    // Style the button
    button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: #238636;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
            cursor: pointer;
        `;

    // Add hover effects
    button.addEventListener("mouseenter", function () {
      this.style.background = "#2ea043";
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.25)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.background = "#238636";
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
    });

    // Inject into page
    document.body.appendChild(button);

    console.log(`GitHub Remix button added for: ${owner}/${repo}`);
  }

  // Main execution
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    // Get entire HTML content
    const htmlContent = document.documentElement.outerHTML;

    // Find GitHub URL
    const githubInfo = findGitHubURL(htmlContent);

    if (githubInfo) {
      createRemixButton(githubInfo.owner, githubInfo.repo);
    } else {
      console.log("No GitHub repository URLs found on this page");
    }
  }

  // Run the script
  init();
})();
