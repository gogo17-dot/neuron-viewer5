# Simple static file server for the Neural Network Simulator (no Node required)
$port = 8080
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$public = Join-Path $root "public"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Interactive Brainstem running at http://localhost:$port"
Write-Host "Press Ctrl+C to stop."
Write-Host ""

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".glb"  = "model/gltf-binary"
  ".json" = "application/json"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
}

function Get-Mime([string]$path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLower()
  if ($mime.ContainsKey($ext)) { return $mime[$ext] }
  return "application/octet-stream"
}

function Send-File([System.Net.HttpListenerResponse]$res, [string]$filePath) {
  $bytes = [System.IO.File]::ReadAllBytes($filePath)
  $res.ContentType = Get-Mime $filePath
  $res.ContentLength64 = $bytes.Length
  if ($res.HttpMethod -ne 'HEAD') {
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  }
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
    if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }

  $relative = $urlPath.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)

  $candidates = @(
    (Join-Path $root $relative),
    (Join-Path $public $relative)
  )

  $filePath = $null
  foreach ($candidate in $candidates) {
    if (Test-Path $candidate -PathType Leaf) {
      $filePath = $candidate
      break
    }
  }

    try {
      if ($null -ne $filePath) {
        Send-File $response $filePath
        $response.StatusCode = 200
      }
      else {
        $notFound = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
        $response.StatusCode = 404
        $response.ContentType = "text/plain"
        $response.OutputStream.Write($notFound, 0, $notFound.Length)
      }
    }
    catch {
      $response.StatusCode = 500
    }
    finally {
      $response.Close()
    }
  }
}
finally {
  $listener.Stop()
}
