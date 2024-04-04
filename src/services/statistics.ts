import { api } from 'src/boot/axios';

// STOCKAGE DE TOUTES LES FONCTIONS API

export async function fetchCountries() {
  try {
    const response = await api.get('/statistics');
    const databaseCountries = response.data.femaleLifeExpectancy.map(
      (databaseCountry: { country: string }) => databaseCountry.country
    );

    return databaseCountries;
  } catch (error) {
    console.error('Error fetching countries from the database:', error);
    throw error;
  }
}

export async function fetchLifeExpectancy(
  selectedCountry: string,
  gender: 'Female' | 'Male' | 'Other'
) {
  try {
    const response = await api.get('/statistics');
    const femaleLifeExpectancyData = response.data.femaleLifeExpectancy;
    const maleLifeExpectancyData = response.data.maleLifeExpectancy;

    if (gender === 'Other') {
      const femaleLifeExpectancy = femaleLifeExpectancyData.find(
        (country: { country: string }) => country.country === selectedCountry
      );
      const maleLifeExpectancy = maleLifeExpectancyData.find(
        (country: { country: string }) => country.country === selectedCountry
      );

      return Number(
        (
          (femaleLifeExpectancy.life_expectancy +
            maleLifeExpectancy.life_expectancy) /
          2
        ).toFixed(1)
      ); // We went from a number to a string to a number again - average javascript brainfuck...
    } else {
      const lifeExpectancyData =
        gender === 'Female' ? femaleLifeExpectancyData : maleLifeExpectancyData;
      const lifeExpectancy = lifeExpectancyData.find(
        (country: { country: string }) => country.country === selectedCountry
      );

      return lifeExpectancy.life_expectancy;
    }
  } catch (error) {
    console.error(
      `Error fetching ${gender} life expectancy from the database:`,
      error
    );
    throw error;
  }
}
