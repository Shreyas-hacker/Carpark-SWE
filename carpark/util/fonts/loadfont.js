import { useEffect } from 'react';
import * as Font from 'expo-font';

const useLoadFonts = () => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-Regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-Bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-ExtraBold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
        "OpenSans-Medium": require("../../assets/fonts/OpenSans-Light.ttf"),
        "OpenSans-Italic": require("../../assets/fonts/OpenSans-Italic.ttf"),
        "OpenSans-BoldItalic": require("../../assets/fonts/OpenSans-BoldItalic.ttf"),
        "OpenSans-ExtraBoldItalic": require("../../assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
        "OpenSans-MediumItalic": require("../../assets/fonts/OpenSans-MediumItalic.ttf"),
        "OpenSans_Condensed-Bold": require("../../assets/fonts/OpenSans_Condensed-Bold.ttf"),  
      });
    }

    loadFonts();
  }, []);
};

export default useLoadFonts;
