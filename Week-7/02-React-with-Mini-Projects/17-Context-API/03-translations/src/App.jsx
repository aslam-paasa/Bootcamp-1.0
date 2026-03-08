/**
 * Challenge: Translations
 * In this challenge, your goal is to make translation state(as well as a
 * way to update that state) available anywhere in the component tree.
 * 
 * You're given a 'languageContext' with the expected shape of the translation
 * data:
 * a. language: string,
 * b. changeLanguage: function,
 * c. translation: function
 * 
 * Your challenge is to finish the 'LanguageProvider' component - making
 * 'language', 'changeLanguage', and 'translation' available anywhere in
 * the component tree - and then to use those values in any component that
 * needs them.
 * 
 * Tasks:
 * 1. Update the language based on the user's selection
 * 2. Apply the correct translation when the language is changed.
 * 
 * Hint:
 * 1. Remember, context  is a transporter, not a way to manage state. We'll
 *    still need to do the 'managing' of state ourselves with useState.
 *  
 *    Inside of LanguageProvider, we'll need to update 'language' to be a
 *    piece of React state that we can then update in our 'changeLanguage'
 *    function. If it weren't a piece of state using useState, then our
 *    component would never re-render when it changed.
 * 
 *    function LanguageProvider({ children }) {
 *       const [language, setLanguage] = React.useState("en");
 *
 *       const changeLanguage = (newLanguage) => {
 *          setLanguage(newLanguage);
 *       };
 *
 *       const translation = (key) => {
 *          return translations[language]?.[key] || key;
 *       };
 *
 *       return null
 *   }
 * 
 * 2. To make language, changeLanguage, and translation available anywhere
 *    in the component tree, we'll need to render the languageContext.Provider
 *    component with those values as the 'value' prop.
 * 
 *    function LanguageProvider({ children }) {
 *       const [language, setLanguage] = React.useState("en");
 *
 *       const changeLanguage = (newLanguage) => {
 *          setLanguage(newLanguage);
 *       };
 *
 *       const translation = (key) => {
 *          return translations[language]?.[key] || key;
 *       };
 *
 *       return (
 *          <languageContext.Provider value={{ language, changeLanguage, translation }}>
 *             {children}
 *          </languageContext.Provider>
 *      );
 *   }
 * 
 * Notice we're also rendering 'children' in the body of 'languageContext.Provider'.
 * Without it, we wouldn't get any UI since 'children' in this case is our
 * 'LanguageSwitcher' and 'Greeting' elements as seen in the 'App' component.
 * 
 *   function App() {
 *      return (
 *         <LanguageProvider>
 *            <Greeting />
 *         </LanguageProvider>
 *      );
 *   }
 * 
 * 3. In order to get access to any of the values we put on context, we'll
 *    need to invoke 'useContext' passing it our 'languageContext'. 
 * 
 *    function LanguageSwitcher() {
 *       const { language, changeLanguage } = React.useContext(languageContext);
 *
 *       return (
 *          <div>
 *             <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
 *                <option value="en">English</option>
 *                <option value="es">Español</option>
 *                <option value="fr">Français</option>
 *                <option value="de">Deutsch</option>
 *             </select>
 *          </div>
 *       );
 *    }  
*/

import './App.css'

const translations = {
  en: {
    hello: "Hello!",
    welcome: "Welcome to our app!"
  },
  es: {
    hello: "¡Hola!",
    welcome: "¡Bienvenido a nuestra aplicación!"
  },
  fr: {
    hello: "Bonjour !",
    welcome: "Bienvenue dans notre application !"
  },
  de: {
    hello: "Hallo!",
    welcome: "Willkommen in unserer App!"
  }
};

const languageContext = React.createContext({
  language: "en",
  changeLanguage: () => {},
  translation: (key) => key
});

function LanguageProvider({ children }) {
  const [language, setLanguage] = React.useState("en");

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const translation = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <languageContext.Provider value={{ language, changeLanguage, translation }}>
      {children}
    </languageContext.Provider>
  );
}

function LanguageSwitcher() {
  const { language, changeLanguage } = React.useContext(languageContext);

  return (
    <div>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}

function Greeting() {
  const { translation } = React.useContext(languageContext);

  return (
    <div>
      <h1>{translation("hello")}</h1>
      <p>{translation("welcome")}</p>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Greeting />
    </LanguageProvider>
  );
}

export default App
