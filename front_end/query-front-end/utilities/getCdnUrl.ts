function getCdnUrl() {
  return process.env.NEXT_PUBLIC_CDN_URL;
}

export default function formatedResourceUrl(resource: string) {
  return getCdnUrl() + "/" + resource;
}
