export default function getBackdropWidth(windowWidth: number) {
  if (windowWidth <= 300) return 300;
  if (windowWidth <= 780) return 780;

  return 1280;
}
