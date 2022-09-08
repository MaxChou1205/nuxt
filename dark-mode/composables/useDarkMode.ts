const useDarkMode = () => {
  const isDarkMode = useState("darkMode", () => false);

  return {
    isDarkMode
  };
};

export default useDarkMode;
