import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const favouritesContext = createContext(null);

export const useFavouritesContext = () => {
  const context = useContext(favouritesContext);

  if (context === undefined) {
    throw new Error(
      'FavouritesContext should be within FavouritesContextProvider',
    );
  }

  return context;
};

const FavouritesContextProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavouritesHandler = useCallback(
    item => {
      const oldFavourites = [...favourites];

      const newFavourites = oldFavourites.concat(item);

      setFavourites(newFavourites);
    },
    [favourites],
  );

  const removeFromFavouritesHandler = useCallback(
    item => {
      const oldFavourites = [...favourites];

      const newFavourites = oldFavourites.filter(
        loopitem => item.id !== loopitem.id,
      );

      setFavourites(newFavourites);
    },
    [favourites],
  );

  const value = useMemo(
    () => ({
      favourites,
      addToFavouritesHandler,
      removeFromFavouritesHandler,
    }),
    [favourites, addToFavouritesHandler, removeFromFavouritesHandler],
  );

  return (
    <favouritesContext.Provider value={value}>
      {children}
    </favouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
