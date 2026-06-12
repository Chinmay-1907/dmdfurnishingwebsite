param(
  [Parameter(Mandatory = $true)][string]$OutDir
)

# Sequential Lighthouse batch against the local prod server on :3006.
# Keep the machine quiet while this runs — concurrent builds contaminate scores.

$pages = [ordered]@{
  'home'           = 'http://localhost:3006/'
  'products'       = 'http://localhost:3006/products'
  'place-hotel'    = 'http://localhost:3006/products/hotel'
  'type-page'      = 'http://localhost:3006/products/hotel/guest-room'
  'product-detail' = 'http://localhost:3006/products/double-drawer-cabinet'
  'projects'       = 'http://localhost:3006/projects'
  'about'          = 'http://localhost:3006/about'
  'services'       = 'http://localhost:3006/services'
  'contact'        = 'http://localhost:3006/contact'
  'blog'           = 'http://localhost:3006/blog'
  'blog-post'      = 'http://localhost:3006/blog/what-is-ffe-hospitality'
  'guide'          = 'http://localhost:3006/guides/hospitality-ffe'
  'inspirations'   = 'http://localhost:3006/inspirations'
}

New-Item -ItemType Directory -Force $OutDir | Out-Null

foreach ($name in $pages.Keys) {
  $out = Join-Path $OutDir "$name.json"
  Write-Output ">>> $name"
  npx lighthouse $pages[$name] --output=json --output-path=$out --quiet --chrome-flags="--headless=new" | Out-Null
  if (Test-Path $out) {
    $j = Get-Content $out -Raw | ConvertFrom-Json
    Write-Output ("{0}: perf={1} a11y={2} bp={3} seo={4}" -f $name,
      [math]::Round($j.categories.performance.score * 100),
      [math]::Round($j.categories.accessibility.score * 100),
      [math]::Round($j.categories.'best-practices'.score * 100),
      [math]::Round($j.categories.seo.score * 100))
  } else {
    Write-Output "$name : FAILED (no output file)"
  }
}
Write-Output 'BATCH DONE'
