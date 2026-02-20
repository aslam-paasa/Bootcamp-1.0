const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        Copyright &copy; {currYear}, Made with Love by <strong>Aslam</strong>
      </p>
    </footer>
  );
};

export default Footer;