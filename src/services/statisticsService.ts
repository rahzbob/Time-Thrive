import { api } from 'src/boot/axios';

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

      return (
        (femaleLifeExpectancy.life_expectancy +
          maleLifeExpectancy.life_expectancy) /
        2
      );
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

export function calculateObesityLifeExpectancyLoss(
  height: number,
  weight: number
) {
  height = (height / 100) ** 2;

  const bmi = weight / height;

  if (bmi < 30) return 0;
  else if (bmi >= 30 && bmi < 35) return 1.6;
  else if (bmi >= 35 && bmi < 40) return 6.5;
  else if (bmi >= 40 && bmi < 45) return 6.5;
  else if (bmi >= 45 && bmi < 50) return 8.9;
  else if (bmi >= 50 && bmi < 55) return 9.8;
  else return 13.7;
}
