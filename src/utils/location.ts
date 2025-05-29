// Detect user's country using IP address (using free service)
export async function detectUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_name === 'Canada' ? 'Canada' : 'United States';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'United States'; // Default to US if detection fails
  }
}