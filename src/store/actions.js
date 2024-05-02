// actions.js

import { useSelector } from "react-redux";
import {
  fetchBogota,
  fetchBogotaDrpl,
  fetchBogotaDrplV2,
} from "../api/imperdibles";

export const fetchData = () => async (dispatch, getState) => {
  const state = getState();
  const actualLanguage = state.language.language;
  if (state.filters.places.length === 0) {
    try {
      const placesResponse = await fetchBogota("/bestplaces/");
      dispatch(setPlacesData(placesResponse));
    } catch (error) {
      console.error("Error fetching places data:", error);
    }
  }
  if (state.filters.para.length === 0) {
    try {
      const paraResponse = await fetchBogotaDrplV2("/para/all", actualLanguage);
      dispatch(setParaData(paraResponse));
    } catch (error) {
      console.error("Error fetching places data:", error);
    }
  }
  if (state.filters.subproductos.length === 0) {
    try {
      const subproductosResponse = await fetchBogotaDrplV2(
        "/products/all/all",
        actualLanguage
      );
      dispatch(setSubproductosData(subproductosResponse));
    } catch (error) {
      console.error("Error fetching places data:", error);
    }
  }
  if (state.filters.localidades.length === 0) {
    try {
      const localidadesResponse = await fetchBogotaDrplV2(
        "/zones/all",
        actualLanguage
      );
      dispatch(setLocalidadesData(localidadesResponse));
    } catch (error) {
      console.error("Error fetching places data:", error);
    }
  }
};
export const fetchPlacesWithFilters =
  (ID = "all", para = "all", subproduct = "all", localidad = "all") =>
  async (dispatch, getState) => {
    const state = getState();
    const actualLanguage = state.language.language;
    let stringsubProds = "all";
    try {
      if (subproduct != "all") {
        const subRelResponse = await fetchBogotaDrplV2(
          `/subproducts/${subproduct}`,
          actualLanguage
        );
        stringsubProds = subRelResponse.map((item) => item.nid).join("+");
      }
      const endpoint = `/places/${ID}/${para}/${stringsubProds}/${localidad}`;
      const placesResponse = await fetchBogotaDrplV2(endpoint, actualLanguage);
      const uniqueNids = new Set();
      const uniqueData = [];
      for (const item of placesResponse) {
        if (!uniqueNids.has(item.nid)) {
          uniqueNids.add(item.nid);
          uniqueData.push(item);
        }
      }
      console.log(placesResponse, "fetchPlacesWithFilters");
      dispatch(setPlacesData(uniqueData));
    } catch (error) {
      console.error("Error fetching places data:", error);
    }
  };
export const fetchAllEvents = () => async (dispatch, getState) => {
  const state = getState();
  const actualLanguage = state.language.language;
  try {
    // ID
    // Zona Relacionada
    // Categoría Evento
    // Agenda de Evento
    const endpoint = `/events/all/all/all/all`;
    const eventsResponse = await fetchBogotaDrplV2(endpoint, actualLanguage);
    const uniqueNids = new Set();
    const uniqueData = [];
    for (const item of eventsResponse) {
      if (!uniqueNids.has(item.nid)) {
        uniqueNids.add(item.nid);
        uniqueData.push(item);
      }
    }
    dispatch(setEventsData(uniqueData));
  } catch (error) {
    console.error("Error fetching places data:", error);
  }
};
export const fetchAllHoteles = () => async (dispatch, getState) => {
  const state = getState();
  const actualLanguage = state.language.language;
  try {
    // ID
    // Zona Relacionada
    // Categoría Evento
    // Agenda de Evento
    const endpoint = `/hotels/all/all/all/all/all`;
    const eventsResponse = await fetchBogotaDrplV2(endpoint, actualLanguage);
    const uniqueNids = new Set();
    const uniqueData = [];
    for (const item of eventsResponse) {
      if (!uniqueNids.has(item.nid)) {
        uniqueNids.add(item.nid);
        uniqueData.push(item);
      }
    }
    dispatch(setHotelsData(uniqueData));
  } catch (error) {
    console.error("Error fetching places data:", error);
  }
};
export const fetchAllRestaurants = () => async (dispatch, getState) => {
  const state = getState();
  const actualLanguage = state.language.language;
  try {
    // ID
    // Categoria Restaurante
    // Zona de la ciudad
    // Zona Gastronómica relacionada
    // Rango de precios
    const endpoint = `/restaurants/all/all/all/all/all`;
    const eventsResponse = await fetchBogotaDrplV2(endpoint, actualLanguage);
    const uniqueNids = new Set();
    const uniqueData = [];
    for (const item of eventsResponse) {
      if (!uniqueNids.has(item.nid)) {
        uniqueNids.add(item.nid);
        uniqueData.push(item);
      }
    }
    dispatch(setRestaurantsData(uniqueData));
  } catch (error) {
    console.error("Error fetching places data:", error);
  }
};
export const fetchAllPLanes = () => async (dispatch, getState) => {
  const state = getState();
  const actualLanguage = state.language.language;
  try {
    const endpoint = `/ofertasapp/all/all/all/all/all`;
    const eventsResponse = await fetchBogotaDrplV2(endpoint, actualLanguage);
    const uniqueNids = new Set();
    const uniqueData = [];
    for (const item of eventsResponse) {
      if (item.field_img != "") {
        if (!uniqueNids.has(item.nid)) {
          uniqueNids.add(item.nid);
          uniqueData.push(item);
        }
      }
    }
    dispatch(setPlanesData(uniqueData));
  } catch (error) {
    console.error("Error fetching places data:", error);
  }
};
export const fetchAllFilters =
  (filters, filterType) => async (dispatch, getState) => {
    const state = getState();
    const actualLanguage = state.language.language;
    if (filterType == "hoteles") {
      try {
        const arrayFilters = await Promise.all(
          filters.map(async (filter) => {
            const response = await fetchBogotaDrpl(
              `/micefilters?filter=${filter}`
            );
            return response;
          })
        );

        dispatch(setFiltersHotelsData({ filters: arrayFilters, filterType }));
      } catch (error) {
        console.error("Error fetching filters data:", error);
      }
    }
    if (filterType == "restaurantes") {
      try {
        const arrayFilters = await Promise.all(
          filters.map(async (filter) => {
            const response = await fetchBogotaDrpl(
              `/micefilters?filter=${filter}`
            );
            return response;
          })
        );

        dispatch(
          setFiltersRestaurantssData({ filters: arrayFilters, filterType })
        );
      } catch (error) {
        console.error("Error fetching filters data:", error);
      }
    }
    if (filterType == "planes") {
      try {
        const arrayFilters = await Promise.all(
          filters.map(async (filter) => {
            const response = await fetchBogotaDrpl(`/tax/${filter}`);
            return response;
          })
        );

        dispatch(setFiltersPlanesData({ filters: arrayFilters, filterType }));
      } catch (error) {
        console.error("Error fetching filters data:", error);
      }
    }
  };
export const fetchAllWords = () => async (dispatch) => {
  const langs = ["es", "en", "fr", "pt-br"];
  const reemplazarCaracteresEspeciales = (arr) => {
    const resultado = arr.map((palabra) => palabra.replace(/&#039;/g, "'"));
    return resultado;
  };
  try {
    const wordsByLang = await Promise.all(
      langs.map(async (lang) => {
        const response = await fetchBogotaDrplV2(
          `/palabras_interfaz/3273`,
          lang
        );
        const palabrasArray = response[0].field_palabras.split("|");
        const palabrasDecodificadas =
          reemplazarCaracteresEspeciales(palabrasArray);
        return { [lang]: palabrasDecodificadas };
      })
    );

    const resultObject = wordsByLang.reduce((acc, langObject) => {
      return { ...acc, ...langObject };
    }, {});

    dispatch(setAllWords(resultObject));
  } catch (error) {
    console.error("Error fetching filters data:", error);
  }
};

export const setPlacesData = (data) => {
  return {
    type: "SET_PLACES_DATA",
    payload: data,
  };
};
export const setEventsData = (data) => {
  return {
    type: "SET_EVENTS_DATA",
    payload: data,
  };
};
export const setHotelsData = (data) => {
  return {
    type: "SET_HOTELS_DATA",
    payload: data,
  };
};
export const setRestaurantsData = (data) => {
  return {
    type: "SET_REST_DATA",
    payload: data,
  };
};
export const setPlanesData = (data) => {
  return {
    type: "SET_PLANES_DATA",
    payload: data,
  };
};
export const setFiltersData = (filters, filterType) => {
  return {
    type: "SET_FILTERS_DATA",
    payload: {
      filters,
      filterType,
    },
  };
};
export const setFiltersHotelsData = (data) => {
  return {
    type: "SET_HOTELS_FILTER_DATA",
    payload: data,
  };
};
export const setFiltersRestaurantssData = (data) => {
  return {
    type: "SET_REST_FILTER_DATA",
    payload: data,
  };
};
export const setFiltersPlanesData = (data) => {
  return {
    type: "SET_PLANES_FILTER_DATA",
    payload: data,
  };
};
export const setParaData = (data) => {
  return {
    type: "SET_PARA_DATA",
    payload: data,
  };
};
export const setSubproductosData = (data) => {
  return {
    type: "SET_SUBPRODUCTOS_DATA",
    payload: data,
  };
};
export const setLocalidadesData = (data) => {
  return {
    type: "SET_LOCALIDADES_DATA",
    payload: data,
  };
};
export const setLanguage = (language = "es") => ({
  type: "SET_LANGUAGE",
  payload: language,
});
export const setAllWords = (words) => ({
  type: "GET_ALL_WORDS_LANGUAGE",
  payload: words,
});
export const setLocation = (location) => ({
  type: "SET_LOCATION",
  payload: location,
});
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});
export const logOutUser = () => ({
  type: "LOGOUT_USER",
});
