// // server/server.js
// const express = require("express");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom/server");
// const { HelmetProvider } = require("react-helmet-async");
// const path = require("path");
// const fs = require("fs");
// const compression = require("compression");
// const { fetchSSRData } = require("./ssrDataFetcher");

// // ✅ Import sitemap route
// const { mountSitemapRoute } = require("./sitemapRoute");

// const App = require("../src/App").default;

// const app = express();
// const PORT = process.env.PORT || 3001;

// /* -------------------- MIDDLEWARE -------------------- */
// app.use(compression());

// // Serve build static assets
// app.use(
//   express.static(path.resolve(__dirname, "../build"), {
//     maxAge: "1y",
//     index: false,
//   })
// );

// // Serve public assets
// app.use(
//   express.static(path.resolve(__dirname, "../public"), {
//     maxAge: "1y",
//     index: false,
//   })
// );

// /* -------------------- SITEMAP + ROBOTS -------------------- */
// // ✅ Must be mounted BEFORE the catch-all SSR route below
// // Registers: GET /sitemap.xml, GET /sitemap-index.xml, GET /robots.txt
// mountSitemapRoute(app);


// /* -------------------- THEME CSS HELPER -------------------- */
// function buildThemeStyle(theme) {
//   if (!theme) return "";
//   const vars = [];
//   if (theme.primaryColor)
//     vars.push(`--primary-color: ${theme.primaryColor}`);
//   if (theme.secondaryColor)
//     vars.push(`--secondary-color: ${theme.secondaryColor}`);
//   if (theme.darkColor)
//     vars.push(`--dark-color: ${theme.darkColor}`);
//   if (theme.lightColor)
//     vars.push(`--light-color: ${theme.lightColor}`);
//   if (theme.gradientColor)
//     vars.push(`--linearGradient-color: ${theme.gradientColor}`);
//   if (!vars.length) return "";
//   return `<style id="ssr-theme">:root { ${vars.join("; ")}; }</style>`;
// }

// /* -------------------- SSR ROUTE -------------------- */
// app.get("*", async (req, res) => {
//   // Skip static files
//   const staticFileRegex =
//     /\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|pdf)$/;
//   if (staticFileRegex.test(req.path)) {
//     return res.status(404).send("Not Found");
//   }

//   console.log(`\n📄 SSR Request: ${req.url}`);

//   try {
//     // Fetch route-specific data serverside
//     const initialData = await fetchSSRData(req.path);

//     console.log(`📊 SSR Data keys: ${Object.keys(initialData).join(", ")}`);
//     console.log(`🖼️  navLogos value:`, JSON.stringify(initialData.navLogos));

//     const helmetContext = {};
//     const routerContext = {};

//     /* ----------- RENDER REACT APP ----------- */
//     let appString = "";
//     try {
//       appString = ReactDOMServer.renderToString(
//         React.createElement(
//           HelmetProvider,
//           { context: helmetContext },
//           React.createElement(
//             StaticRouter,
//             { location: req.url, context: routerContext },
//             React.createElement(App, { ssrData: initialData })
//           )
//         )
//       );
//       console.log(`✅ React rendered (${appString.length} chars)`);
//     } catch (renderError) {
//       console.error("❌ React render error:", renderError);
//       appString = "<div>Loading...</div>";
//     }

//     // Handle redirects
//     if (routerContext.url) {
//       console.log(`↪️ Redirecting to: ${routerContext.url}`);
//       return res.redirect(301, routerContext.url);
//     }

//     const { helmet } = helmetContext;

//     /* ----------- BUILD THEME STYLE ----------- */
//     const themeStyle = buildThemeStyle(initialData?.theme);

//     /* ----------- READ INDEX.HTML ----------- */
//     const indexFile = path.resolve(__dirname, "../build/index.html");

//     fs.readFile(indexFile, "utf8", (err, htmlData) => {
//       if (err) {
//         console.error("❌ Error reading index.html:", err);
//         return res.status(500).send("Internal Server Error");
//       }

//       // ✅ Build the Helmet head tags string
//       const helmetHeadTags = helmet
//         ? [
//             helmet.title.toString(),
//             helmet.meta.toString(),
//             helmet.link.toString(),
//             helmet.script.toString(),
//           ]
//             .filter(Boolean)
//             .join("\n          ")
//         : "";

//       /* ----------- INJECT SSR + SEO + THEME ----------- */
//       const html = htmlData
//         .replace("<html", "<html lang='en'")
//         .replace(
//           "</head>",
//           `${helmet ? helmet.title.toString() : ""}
//           ${helmet ? helmet.meta.toString() : ""}
//           ${helmet ? helmet.link.toString() : ""}
//           ${helmet ? helmet.script.toString() : ""}
//           ${themeStyle}
//         </head>`
//         )
//         .replace(
//           '<div id="root"></div>',
//           `<div id="root">${appString}</div>`
//         )
//         .replace(
//           "</body>",
//           `<script>
//             window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(
//             /</g,
//             "\\u003c"
//           )};
//           </script></body>`
//         );

//       console.log("✅ HTML sent to client\n");
//       res.send(html);
//     });
//   } catch (err) {
//     console.error("❌ SSR Fatal Error:", err);
//     res.status(500).send("Server Error");
//   }
// });

// /* -------------------- START SERVER -------------------- */
// app.listen(PORT, () => {
//   console.log(`\n🚀 SSR Server running at http://localhost:${PORT}\n`);
// });
// server/server.js
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const { HelmetProvider } = require("react-helmet-async");
const path = require("path");
const fs = require("fs");
const compression = require("compression");
const { fetchSSRData } = require("./ssrDataFetcher");

const { mountSitemapRoute } = require("./sitemapRoute");

const App = require("../src/App").default;

const app = express();
const PORT = process.env.PORT || 3001;

/* -------------------- MIDDLEWARE -------------------- */
app.use(compression());

// ✅ ADD THIS — HSTS header for all responses including redirects
app.use((req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

app.use(
  express.static(path.resolve(__dirname, "../build"), {
    maxAge: "1y",
    index: false,
  })
);

app.use(
  express.static(path.resolve(__dirname, "../public"), {
    maxAge: "1y",
    index: false,
  })
);

/* -------------------- SITEMAP + ROBOTS -------------------- */
mountSitemapRoute(app);

/* -------------------- THEME CSS HELPER -------------------- */
function buildThemeStyle(theme) {
  if (!theme) return "";
  const vars = [];
  if (theme.primaryColor) vars.push(`--primary-color: ${theme.primaryColor}`);
  if (theme.secondaryColor) vars.push(`--secondary-color: ${theme.secondaryColor}`);
  if (theme.darkColor) vars.push(`--dark-color: ${theme.darkColor}`);
  if (theme.lightColor) vars.push(`--light-color: ${theme.lightColor}`);
  if (theme.gradientColor) vars.push(`--linearGradient-color: ${theme.gradientColor}`);
  if (!vars.length) return "";
  return `<style id="ssr-theme">:root { ${vars.join("; ")}; }</style>`;
}

/* -------------------- REDIRECTS -------------------- */
app.get("/featuredSpeaker", (req, res) => {
  res.redirect(301, "/featured-speakers");
});

/* -------------------- SSR ROUTE -------------------- */
app.get("*", async (req, res) => {
  const staticFileRegex =
    /\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|pdf)$/;
  if (staticFileRegex.test(req.path)) {
    return res.status(404).send("Not Found");
  }

  console.log(`\n📄 SSR Request: ${req.url}`);

  try {
    const initialData = await fetchSSRData(req.path);

    console.log(`📊 SSR Data keys: ${Object.keys(initialData).join(", ")}`);
    console.log(`🖼️  navLogos value:`, JSON.stringify(initialData.navLogos));

    const helmetContext = {};
    const routerContext = {};

    let appString = "";
    try {
      appString = ReactDOMServer.renderToString(
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            StaticRouter,
            { location: req.url, context: routerContext },
            React.createElement(App, { ssrData: initialData })
          )
        )
      );
      console.log(`✅ React rendered (${appString.length} chars)`);
    } catch (renderError) {
      console.error("❌ React render error:", renderError);
      appString = "<div>Loading...</div>";
    }

    if (routerContext.url) {
      console.log(`↪️ Redirecting to: ${routerContext.url}`);
      return res.redirect(301, routerContext.url);
    }

    const { helmet } = helmetContext;
    const themeStyle = buildThemeStyle(initialData?.theme);
    const indexFile = path.resolve(__dirname, "../build/index.html");

    fs.readFile(indexFile, "utf8", (err, htmlData) => {
      if (err) {
        console.error("❌ Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }

      // ✅ Build the Helmet head tags string (honoring strict backend-only meta)
      let helmetHeadTags = "";
      if (helmet) {
        const titleTag = helmet.title.toString();
        // 🚨 CRITICAL: react-helmet-async emits '<title data-rh="true"></title>' if title is empty.
        // We MUST filter this out to prevent SEO tools from seeing an empty tag as "Missing title".
        const isTitleEmpty = titleTag === '<title data-rh="true"></title>' || titleTag === '<title data-rh="true"> </title>';
        
        helmetHeadTags = [
          isTitleEmpty ? "" : titleTag,
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join("\n          ");
      }

      // ✅ KEY FIX: Remove any leftover <title> tag from index.html
      // before injecting Helmet tags, preventing duplicates
      let html = htmlData
        // Remove any static <title>...</title> that may exist in index.html
        .replace(/<title>[^<]*<\/title>/i, "")
        // Also strip any static og:/description meta tags from index.html
        // that would conflict with Helmet-injected ones
        .replace(/<meta\s+(?:property="og:[^"]*"|name="description")[^>]*>/gi, "")
        // Add lang attribute
        .replace("<html", "<html lang='en'")
        // Inject Helmet tags + theme just before </head>
        .replace(
          "</head>",
          `  ${helmetHeadTags}
          <!-- SSR DEBUG: 
               Path: ${req.url}
               hasTheme: ${!!initialData?.theme}
               newsDetailCount: ${initialData?.newsDetail?.length || 0}
               newsListCount: ${initialData?.news?.length || 0}
               HelmetTitle: ${helmet?.title?.toString().length || 0}
          -->
          ${themeStyle}
        </head>`
        )
        // Inject rendered React app
        .replace(
          '<div id="root"></div>',
          `<div id="root">${appString}</div>`
        )
        // Inject SSR data
        .replace(
          "</body>",
          `<script>
            window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(
            /</g,
            "\\u003c"
          )};
          </script></body>`
        );

      console.log("✅ HTML sent to client\n");
      const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
      res.send(html);
    });
  } catch (err) {
    console.error("❌ SSR Fatal Error:", err);
    res.status(500).send("Server Error");
  }
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`\n🚀 SSR Server running at http://localhost:${PORT}\n`);
});