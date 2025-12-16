<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/s:urlset">
    <html lang="sv">
      <head>
        <meta charset="UTF-8"/>
        <title>Glitterdalen Sitemap</title>
        <style>
          body { font-family: "Work Sans", -apple-system, system-ui, sans-serif; padding: 24px; color: #083b4d; background: #fffaf3; }
          h1 { font-family: "Baloo 2", "Fredoka", system-ui, sans-serif; margin: 0 0 12px; }
          p { margin: 0 0 16px; }
          table { width: 100%; border-collapse: collapse; background: #fff; border: 2px solid rgba(8,59,77,0.14); box-shadow: 0 10px 24px rgba(8,59,77,0.08); }
          th, td { padding: 10px 12px; border-bottom: 1px solid rgba(8,59,77,0.08); text-align: left; }
          th { background: #e9f7ff; font-weight: 700; }
          tr:nth-child(even) td { background: #f9fdfd; }
          a { color: #118ab2; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
          .count { font-weight: 600; }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <h1>Glitterdalen sitemap</h1>
        <p>Visar <span class="count"><xsl:value-of select="count(s:url)"/></span> indexerade adresser.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Senast uppdaterad</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:url">
              <xsl:sort select="s:loc"/>
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td>
                  <xsl:choose>
                    <xsl:when test="string-length(normalize-space(s:lastmod))">
                      <xsl:value-of select="s:lastmod"/>
                    </xsl:when>
                    <xsl:otherwise>—</xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
