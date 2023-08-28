export const conversions = {
  async celsiusToFahrenheit(tempC) {
    const tempF = (tempC * 9) / 5 + 32;
    return tempF;
  },

  async windSpeedToBft(windSpeed) {
    if (windSpeed === 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
    return -1;
  },

  async windDirection(windDirection) {
    if ((windDirection >= 348.75 && windDirection <= 360) || (windDirection >= 0 && windDirection <= 11.25)) {
      return "North";
    } else if (windDirection >= 11.25 && windDirection <= 33.75) {
      return "North NE";
    } else if (windDirection >= 33.75 && windDirection <= 56.25) {
      return "North East";
    } else if (windDirection >= 56.25 && windDirection <= 78.75) {
      return "East NE";
    } else if (windDirection >= 78.75 && windDirection <= 101.25) {
      return "East";
    } else if (windDirection >= 101.25 && windDirection <= 123.75) {
      return "East SE";
    } else if (windDirection >= 123.75 && windDirection <= 146.25) {
      return "South East";
    } else if (windDirection >= 146.25 && windDirection <= 168.75) {
      return "South SE";
    } else if (windDirection >= 168.75 && windDirection <= 191.25) {
      return "South";
    } else if (windDirection >= 191.25 && windDirection <= 213.75) {
      return "South SW";
    } else if (windDirection >= 213.75 && windDirection <= 236.25) {
      return "South West";
    } else if (windDirection >= 236.25 && windDirection <= 258.75) {
      return "West SW";
    } else if (windDirection >= 258.75 && windDirection <= 281.25) {
      return "West";
    } else if (windDirection >= 281.25 && windDirection <= 303.75) {
      return "West NW";
    } else if (windDirection >= 303.75 && windDirection <= 326.25) {
      return "North West";
    } else if (windDirection >= 326.25 && windDirection <= 348.75) {
      return "North NW";
    } else if (windDirection < 0 || windDirection > 360) {
      return "Enter wind direction";
    }
    return "Enter wind direction";
  },

  async windChill(temp, windSpeed) {
    const windChill =
      13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);

    return Math.round(windChill * 100) / 100;
  },

  async codeToWeatherDescription(code) {
    // code is in numerical order increasing by 100. dividing by 100 to make the code more readable.
    switch (code) {
      case 100:
        return "Clear";
      case 200:
        return "Partial Cloud";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers"; // Added this case for code 5
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "Unknown";
    }
  },
};
