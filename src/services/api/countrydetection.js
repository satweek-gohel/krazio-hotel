export const detectUserCountry = async (defaultCountry = "in") => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch country data");
    }
    const data = await response.json();
    return data.country_code ? data.country_code.toLowerCase() : defaultCountry;
  } catch (error) {
    console.error("Error detecting country:", error);
    return defaultCountry;
  }
};

export const detectUserCountryWithCache = async (defaultCountry = "in") => {
  const cachedCountry = localStorage.getItem("userCountry");
  const cacheTimestamp = localStorage.getItem("userCountryTimestamp");

  const CACHE_DURATION = 24 * 60 * 60 * 1000;

  if (cachedCountry && cacheTimestamp) {
    const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
    if (!isExpired) {
      return cachedCountry;
    }
  }

  const countryCode = await detectUserCountry(defaultCountry);

  localStorage.setItem("userCountry", countryCode);
  localStorage.setItem("userCountryTimestamp", Date.now().toString());

  return countryCode;
};
