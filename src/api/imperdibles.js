const BASE_URL = `https://visitbogota.co/ce`;
const BASE_URL_VISITBOG = `https://visitbogota.co`;
const BASE_URL_DRPL = `https://files.visitbogota.co/drpl/es/api/v1/es`;
const BASE_URL_DRPLV2 = `https://files.visitbogota.co/drpl/es/api/v2`;

export const fetchBogotaGetFolder = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL_VISITBOG}${endpoint}`);
    return await res.json();
  } catch (e) {
    console.log("Error fetchBogotaGetFolder", e.message);
    return [];
  }
};
export const fetchBogota = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    return await res.json();
  } catch (e) {
    console.log("Error fetchBogota", e.message);
    return [];
  }
};
export const fetchBogotaDrpl = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL_DRPL}${endpoint}`);
    return await res.json();
  } catch (e) {
    console.log("Error fetchBogotaDrpl", e.message);
    return [];
  }
};
export const fetchBogotaDrplV2 = async (
  endpoint,
  actualLanguage = "es",
  queryParams = {}
) => {
  try {
    // Creamos un objeto URLSearchParams para agregar parámetros dinámicos
    const urlParams = new URLSearchParams({ langcode: actualLanguage });

    // Agregar parámetros dinámicos del objeto queryParams
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        urlParams.append(key, queryParams[key]);
      }
    }

    // Construimos la URL con los parámetros dinámicos

    const res = await fetch(
      `${BASE_URL_DRPLV2}${endpoint}?${urlParams.toString()}`
    );

    return await res.json();
  } catch (e) {
    console.log("Error fetchBogotaDrplV2", e.message);
    return [];
  }
};

export const number_format = (number, decimals, decPoint, thousandsSep) => {
  decimals = decimals || 0;
  number = parseFloat(number);
  if (!decPoint || !thousandsSep) {
    decPoint = ".";
    thousandsSep = ",";
  }
  var roundedNumber = Math.round(Math.abs(number) * ("1e" + decimals)) + "";
  var numbersString = decimals
    ? roundedNumber.slice(0, decimals * -1)
    : roundedNumber;
  var decimalsString = decimals ? roundedNumber.slice(decimals * -1) : "";
  var formattedNumber = "";
  while (numbersString.length > 3) {
    formattedNumber = thousandsSep + numbersString.slice(-3) + formattedNumber;
    numbersString = numbersString.slice(0, -3);
  }
  return (
    (number < 0 ? "-" : "") +
    numbersString +
    formattedNumber +
    (decimalsString ? decPoint + decimalsString : "")
  );
};

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}
export const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);
    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (sec == 60) {
      return `${minute + 1}:00`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

export const formattedTime = (timeInMilliseconds) => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  return `${minutes}:${formattedSeconds < 10 ? "0" : ""}${formattedSeconds}`;
};

export const postData = async (url = "", data = {}) => {
  const response = await fetch(`https://files.visitbogota.co/ce/${url}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
};
