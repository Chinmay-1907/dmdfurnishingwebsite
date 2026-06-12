# Lighthouse sweep over key templates on the local prod build (port 3111).
$pages = @(
  @{ name = 'home';           url = 'http://localhost:3111/' },
  @{ name = 'products';       url = 'http://localhost:3111/products' },
  @{ name = 'product-detail'; url = 'http://localhost:3111/products/double-drawer-cabinet' },
  @{ name = 'place-hotel';    url = 'http://localhost:3111/products/hotel' },
  @{ name = 'services';       url = 'http://localhost:3111/services' },
  @{ name = 'blog-post';      url = 'http://localhost:3111/blog/what-is-ffe-hospitality' }
)
New-Item -ItemType Directory -Force -Path lh-reports | Out-Null
foreach ($p in $pages) {
  $out = "lh-reports/$($p.name).json"
  npx --yes lighthouse $p.url --only-categories=seo,performance,best-practices,accessibility --output=json --output-path=$out --chrome-flags="--headless=new" --quiet 2>$null | Out-Null
  if (Test-Path $out) {
    $j = Get-Content $out -Encoding UTF8 | ConvertFrom-Json
    $seo = [math]::Round($j.categories.seo.score * 100)
    $perf = [math]::Round($j.categories.performance.score * 100)
    $bp = [math]::Round($j.categories.'best-practices'.score * 100)
    $a11y = [math]::Round($j.categories.accessibility.score * 100)
    Write-Output "$($p.name): SEO=$seo Perf=$perf BP=$bp A11y=$a11y"
  } else {
    Write-Output "$($p.name): LIGHTHOUSE FAILED"
  }
}
