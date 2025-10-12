export const exportType = ["notion", "obsidian", "anki"];

export default function getExportTypeVideo(selectedExportType: string) {
  if (selectedExportType == exportType[0]) {
    return process.env.NEXT_PUBLIC_NOTION_EXPORT_VIDEO;
  }

  if (selectedExportType == exportType[1]) {
    return process.env.NEXT_PUBLIC_OBSIDIAN_EXPORT_VIDEO;
  }

  return process.env.NEXT_PUBLIC_ANKI_EXPORT_VIDEO;
}
