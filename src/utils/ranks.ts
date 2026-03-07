export const getDisplayRank = (fullRank: string): [string, string] => {
  if (!fullRank) return ['', ''];

  // Extracts the display name (e.g., "(1) Novice" -> "Novice")
  const rankName = fullRank.replace(/\(\d+\)\s*/, '').trim();

  // Extracts the first letter of the rank name (e.g., "Novice" -> "N")
  const initial = rankName.charAt(0).toUpperCase();
  
  return [rankName, initial];
};
